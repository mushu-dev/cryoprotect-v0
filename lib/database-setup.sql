-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE toxicity_level AS ENUM ('very_low', 'low', 'moderate', 'high');
CREATE TYPE prediction_type AS ENUM ('success_rate', 'toxicity', 'permeability', 'sar');
CREATE TYPE experiment_status AS ENUM ('planned', 'running', 'completed', 'failed');
CREATE TYPE team_role AS ENUM ('owner', 'admin', 'researcher', 'viewer');

-- Molecules table
CREATE TABLE molecules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  formula VARCHAR(100) NOT NULL,
  smiles TEXT NOT NULL,
  molecular_weight DECIMAL(10,3) NOT NULL,
  log_p DECIMAL(5,2),
  tpsa DECIMAL(6,2),
  hbd INTEGER,
  hba INTEGER,
  success_rate DECIMAL(5,2) DEFAULT 0,
  toxicity_level toxicity_level DEFAULT 'moderate',
  toxicity_score DECIMAL(5,2) DEFAULT 50,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Predictions table
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  molecule_id UUID REFERENCES molecules(id) ON DELETE CASCADE,
  model_name VARCHAR(100) NOT NULL,
  prediction_type prediction_type NOT NULL,
  prediction_value DECIMAL(5,2) NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL,
  insights TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  model_version VARCHAR(20) DEFAULT '1.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research teams table
CREATE TABLE research_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES research_teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role team_role DEFAULT 'researcher',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Experiments table
CREATE TABLE experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  molecule_id UUID REFERENCES molecules(id) ON DELETE CASCADE,
  researcher_id UUID REFERENCES auth.users(id),
  team_id UUID REFERENCES research_teams(id),
  protocol_id UUID,
  conditions JSONB DEFAULT '{}',
  results JSONB DEFAULT '{}',
  success_rate DECIMAL(5,2),
  notes TEXT,
  status experiment_status DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Collections table
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  team_id UUID REFERENCES research_teams(id),
  created_by UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT false,
  molecule_ids UUID[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics views for dashboard
CREATE VIEW molecule_analytics AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_molecules,
  AVG(success_rate) as avg_success_rate,
  COUNT(CASE WHEN toxicity_level = 'very_low' THEN 1 END) as very_low_toxicity,
  COUNT(CASE WHEN toxicity_level = 'low' THEN 1 END) as low_toxicity,
  COUNT(CASE WHEN toxicity_level = 'moderate' THEN 1 END) as moderate_toxicity,
  COUNT(CASE WHEN toxicity_level = 'high' THEN 1 END) as high_toxicity
FROM molecules 
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Indexes for performance
CREATE INDEX idx_molecules_success_rate ON molecules(success_rate DESC);
CREATE INDEX idx_molecules_toxicity ON molecules(toxicity_level);
CREATE INDEX idx_molecules_created_at ON molecules(created_at DESC);
CREATE INDEX idx_predictions_molecule_id ON predictions(molecule_id);
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_experiments_researcher ON experiments(researcher_id);

-- Row Level Security policies
ALTER TABLE molecules ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Molecules policies
CREATE POLICY "Public molecules are viewable by everyone" ON molecules
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own molecules" ON molecules
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own molecules" ON molecules
  FOR UPDATE USING (auth.uid() = created_by);

-- Team policies
CREATE POLICY "Team members can view their teams" ON research_teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Insert sample data
INSERT INTO molecules (name, formula, smiles, molecular_weight, log_p, tpsa, hbd, hba, success_rate, toxicity_level, toxicity_score) VALUES
('Trehalose', 'C12H22O11', 'C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O', 342.30, -3.20, 189.5, 8, 11, 92.0, 'very_low', 15.0),
('DMSO', 'C2H6OS', 'CS(=O)C', 78.13, -1.35, 36.3, 0, 1, 87.0, 'moderate', 45.0),
('Glycerol', 'C3H8O3', 'C(C(CO)O)O', 92.09, -1.76, 60.7, 3, 3, 84.0, 'low', 25.0),
('Ethylene Glycol', 'C2H6O2', 'C(CO)O', 62.07, -1.36, 40.5, 2, 2, 89.0, 'moderate', 55.0),
('Propylene Glycol', 'C3H8O2', 'CC(CO)O', 76.09, -0.92, 40.5, 2, 2, 85.0, 'low', 30.0),
('Sucrose', 'C12H22O11', 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@@H](O2)CO)O)O)CO)O)O)O)O', 342.30, -3.70, 189.5, 8, 11, 88.0, 'very_low', 12.0),
('Mannitol', 'C6H14O6', 'C([C@H]([C@H]([C@@H]([C@H](CO)O)O)O)O)O', 182.17, -3.10, 121.4, 6, 6, 79.0, 'very_low', 18.0);

-- Insert sample predictions
INSERT INTO predictions (molecule_id, model_name, prediction_type, prediction_value, confidence_score, insights, recommendations) 
SELECT 
  id,
  'CryoSuccess-AI',
  'success_rate',
  success_rate + (RANDOM() * 10 - 5),
  85 + (RANDOM() * 15),
  ARRAY['Excellent membrane permeability', 'Low cytotoxicity profile', 'Optimal molecular weight range'],
  ARRAY['Increase concentration to 15%', 'Combine with 5% DMSO', 'Monitor osmotic stress']
FROM molecules;

-- Enable Row Level Security
-- Note: Run this in your Supabase SQL Editor

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
  created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid()
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
  created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
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
  researcher_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
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
  created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  is_public BOOLEAN DEFAULT false,
  molecule_ids UUID[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics view for dashboard
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
CREATE INDEX idx_molecules_name ON molecules USING gin(to_tsvector('english', name));
CREATE INDEX idx_molecules_formula ON molecules(formula);
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

-- Molecules policies (public read, authenticated write)
CREATE POLICY "Public molecules are viewable by everyone" ON molecules
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert molecules" ON molecules
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own molecules" ON molecules
  FOR UPDATE USING (auth.uid() = created_by OR auth.uid() IS NULL);

CREATE POLICY "Users can delete their own molecules" ON molecules
  FOR DELETE USING (auth.uid() = created_by OR auth.uid() IS NULL);

-- Predictions policies
CREATE POLICY "Public predictions are viewable by everyone" ON predictions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert predictions" ON predictions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Team policies
CREATE POLICY "Team members can view their teams" ON research_teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    ) OR auth.uid() IS NULL
  );

CREATE POLICY "Authenticated users can create teams" ON research_teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Collections policies
CREATE POLICY "Public collections are viewable by everyone" ON collections
  FOR SELECT USING (is_public = true OR auth.uid() = created_by OR auth.uid() IS NULL);

CREATE POLICY "Authenticated users can create collections" ON collections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.uid() IS NULL);

-- Experiments policies
CREATE POLICY "Public experiments are viewable by everyone" ON experiments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create experiments" ON experiments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.uid() IS NULL);

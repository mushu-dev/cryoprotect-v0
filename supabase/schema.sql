-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set up tables with relationships and timestamps
-- All tables include created_at and updated_at timestamps

-- Molecules table
CREATE TABLE IF NOT EXISTS molecules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    smiles TEXT NOT NULL,
    inchi TEXT NOT NULL,
    inchikey VARCHAR(27) NOT NULL,
    formula VARCHAR(255) NOT NULL,
    molecular_weight NUMERIC(12, 6) NOT NULL,
    source VARCHAR(255) NOT NULL,
    source_id VARCHAR(255),
    source_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_molecules_name ON molecules(name);
CREATE INDEX IF NOT EXISTS idx_molecules_inchikey ON molecules(inchikey);
CREATE INDEX IF NOT EXISTS idx_molecules_formula ON molecules(formula);

-- Molecular properties table
CREATE TABLE IF NOT EXISTS molecular_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE CASCADE,
    property_type VARCHAR(50) NOT NULL,
    value NUMERIC(12, 6) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    temperature NUMERIC(12, 6),
    temperature_unit VARCHAR(50),
    pressure NUMERIC(12, 6),
    pressure_unit VARCHAR(50),
    method_id VARCHAR(255),
    is_experimental BOOLEAN NOT NULL DEFAULT TRUE,
    source VARCHAR(255),
    confidence NUMERIC(5, 4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_molecular_properties_molecule_id ON molecular_properties(molecule_id);
CREATE INDEX IF NOT EXISTS idx_molecular_properties_property_type ON molecular_properties(property_type);

-- Mixtures table
CREATE TABLE IF NOT EXISTS mixtures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_id UUID,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_mixtures_name ON mixtures(name);
CREATE INDEX IF NOT EXISTS idx_mixtures_created_by ON mixtures(created_by);
CREATE INDEX IF NOT EXISTS idx_mixtures_project_id ON mixtures(project_id);

-- Mixture components table
CREATE TABLE IF NOT EXISTS mixture_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mixture_id UUID NOT NULL REFERENCES mixtures(id) ON DELETE CASCADE,
    molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE RESTRICT,
    amount NUMERIC(12, 6) NOT NULL,
    amount_unit VARCHAR(50) NOT NULL,
    role VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(mixture_id, molecule_id)
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_mixture_components_mixture_id ON mixture_components(mixture_id);
CREATE INDEX IF NOT EXISTS idx_mixture_components_molecule_id ON mixture_components(molecule_id);

-- Experiments table
CREATE TABLE IF NOT EXISTS experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    mixture_id UUID NOT NULL REFERENCES mixtures(id) ON DELETE RESTRICT,
    preparation_protocol TEXT,
    temperature NUMERIC(12, 6) NOT NULL,
    temperature_unit VARCHAR(50) NOT NULL,
    pressure NUMERIC(12, 6) NOT NULL,
    pressure_unit VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'planned',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT status_check CHECK (status IN ('planned', 'in_progress', 'completed', 'failed', 'cancelled'))
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_experiments_name ON experiments(name);
CREATE INDEX IF NOT EXISTS idx_experiments_mixture_id ON experiments(mixture_id);
CREATE INDEX IF NOT EXISTS idx_experiments_status ON experiments(status);
CREATE INDEX IF NOT EXISTS idx_experiments_created_by ON experiments(created_by);

-- Experiment properties table
CREATE TABLE IF NOT EXISTS experiment_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experiment_id UUID NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
    property_type VARCHAR(50) NOT NULL,
    value NUMERIC(12, 6) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    method_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_experiment_properties_experiment_id ON experiment_properties(experiment_id);
CREATE INDEX IF NOT EXISTS idx_experiment_properties_property_type ON experiment_properties(property_type);

-- Predictions table
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE CASCADE,
    property_type VARCHAR(50) NOT NULL,
    predicted_value NUMERIC(12, 6) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    method_id VARCHAR(255) NOT NULL,
    model_version VARCHAR(100) NOT NULL,
    confidence NUMERIC(5, 4) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_predictions_molecule_id ON predictions(molecule_id);
CREATE INDEX IF NOT EXISTS idx_predictions_property_type ON predictions(property_type);
CREATE INDEX IF NOT EXISTS idx_predictions_method_id ON predictions(method_id);

-- Protocols table
CREATE TABLE IF NOT EXISTS protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mixture_id UUID NOT NULL REFERENCES mixtures(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    temperature_min NUMERIC(12, 6),
    temperature_max NUMERIC(12, 6),
    temperature_unit VARCHAR(50),
    steps JSONB NOT NULL,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_protocols_name ON protocols(name);
CREATE INDEX IF NOT EXISTS idx_protocols_mixture_id ON protocols(mixture_id);
CREATE INDEX IF NOT EXISTS idx_protocols_created_by ON protocols(created_by);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update the updated_at column automatically
CREATE TRIGGER update_molecules_modtime
BEFORE UPDATE ON molecules
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_molecular_properties_modtime
BEFORE UPDATE ON molecular_properties
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_mixtures_modtime
BEFORE UPDATE ON mixtures
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_mixture_components_modtime
BEFORE UPDATE ON mixture_components
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_experiments_modtime
BEFORE UPDATE ON experiments
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_experiment_properties_modtime
BEFORE UPDATE ON experiment_properties
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_predictions_modtime
BEFORE UPDATE ON predictions
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_protocols_modtime
BEFORE UPDATE ON protocols
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create views for common queries

-- View for molecules with their property counts
CREATE OR REPLACE VIEW molecule_with_property_counts AS
SELECT 
    m.*,
    COUNT(mp.id) AS property_count,
    COUNT(p.id) AS prediction_count
FROM 
    molecules m
LEFT JOIN 
    molecular_properties mp ON m.id = mp.molecule_id
LEFT JOIN 
    predictions p ON m.id = p.molecule_id
GROUP BY 
    m.id;

-- View for mixtures with component counts
CREATE OR REPLACE VIEW mixture_with_component_counts AS
SELECT 
    mix.*,
    COUNT(DISTINCT mc.molecule_id) AS component_count,
    COUNT(DISTINCT e.id) AS experiment_count,
    COUNT(DISTINCT pr.id) AS protocol_count
FROM 
    mixtures mix
LEFT JOIN 
    mixture_components mc ON mix.id = mc.mixture_id
LEFT JOIN 
    experiments e ON mix.id = e.mixture_id
LEFT JOIN 
    protocols pr ON mix.id = pr.mixture_id
GROUP BY 
    mix.id;

-- View for experiments with their results
CREATE OR REPLACE VIEW experiment_with_results AS
SELECT 
    e.*,
    m.name AS mixture_name,
    COUNT(ep.id) AS property_count,
    AVG(CASE WHEN ep.property_type = 'viability' THEN ep.value ELSE NULL END) AS avg_viability,
    AVG(CASE WHEN ep.property_type = 'recovery' THEN ep.value ELSE NULL END) AS avg_recovery
FROM 
    experiments e
JOIN 
    mixtures m ON e.mixture_id = m.id
LEFT JOIN 
    experiment_properties ep ON e.id = ep.experiment_id
GROUP BY 
    e.id, m.name;

-- Enable Row Level Security (RLS)
ALTER TABLE mixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;

-- Create policies for mixtures
CREATE POLICY "Public mixtures are viewable by everyone" 
ON mixtures FOR SELECT
USING (is_public = TRUE);

CREATE POLICY "Users can view their own mixtures" 
ON mixtures FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own mixtures" 
ON mixtures FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own mixtures" 
ON mixtures FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own mixtures" 
ON mixtures FOR DELETE
USING (created_by = auth.uid());

-- Create policies for experiments
CREATE POLICY "Users can view their own experiments" 
ON experiments FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Users can view experiments for public mixtures" 
ON experiments FOR SELECT
USING (
    mixture_id IN (
        SELECT id FROM mixtures WHERE is_public = TRUE
    )
);

CREATE POLICY "Users can insert their own experiments" 
ON experiments FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own experiments" 
ON experiments FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own experiments" 
ON experiments FOR DELETE
USING (created_by = auth.uid());

-- Create policies for protocols
CREATE POLICY "Users can view their own protocols" 
ON protocols FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Users can view protocols for public mixtures" 
ON protocols FOR SELECT
USING (
    mixture_id IN (
        SELECT id FROM mixtures WHERE is_public = TRUE
    )
);

CREATE POLICY "Users can insert their own protocols" 
ON protocols FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own protocols" 
ON protocols FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own protocols" 
ON protocols FOR DELETE
USING (created_by = auth.uid());

-- Seed data for molecules
INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
VALUES
    ('Dimethyl Sulfoxide', 'CS(=O)C', 'InChI=1S/C2H6OS/c1-4(2)3/h1-2H3', 'IAZDPXIOMUYVGZ-UHFFFAOYSA-N', 'C₂H₆OS', 78.13, 'PubChem', TRUE),
    ('Glycerol', 'C(C(CO)O)O', 'InChI=1S/C3H8O3/c4-1-3(6)2-5/h3-6H,1-2H2', 'PEDCQBHIVMGVHV-UHFFFAOYSA-N', 'C₃H₈O₃', 92.09, 'PubChem', TRUE),
    ('Ethylene Glycol', 'C(CO)O', 'InChI=1S/C2H6O2/c3-1-2-4/h3-4H,1-2H2', 'LYCAIKOWRPUZTN-UHFFFAOYSA-N', 'C₂H₆O₂', 62.07, 'PubChem', TRUE),
    ('Propylene Glycol', 'CC(CO)O', 'InChI=1S/C3H8O2/c1-3(5)2-4/h3-5H,2H2,1H3', 'DNIAPMSPPWPWGF-UHFFFAOYSA-N', 'C₃H₈O₂', 76.09, 'PubChem', TRUE),
    ('Trehalose', 'C1C(C(C(C(C1O)OC2C(C(C(C(O2)CO)O)O)O)O)O)O', 'InChI=1S/C12H22O11/c13-1-4-7(16)8(17)9(18)11(21-4)23-12-6(3-15)22-10(19)5(2-14)20-12/h4-19H,1-3H2', 'CXQWRCVTCMQVQX-UHFFFAOYSA-N', 'C₁₂H₂₂O₁₁', 342.3, 'PubChem', TRUE);

-- Seed data for molecular properties
INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
VALUES
    -- Dimethyl Sulfoxide properties
    ((SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 'freezing_point', 18.5, '°C', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 'viscosity', 1.996, 'cP', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 'toxicity', 3, 'scale', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 'permeability', 85, '%', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 'osmolality', 1000, 'mOsm/kg', TRUE),
    
    -- Glycerol properties
    ((SELECT id FROM molecules WHERE name = 'Glycerol'), 'freezing_point', 17.8, '°C', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Glycerol'), 'viscosity', 1.412, 'cP', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Glycerol'), 'toxicity', 1, 'scale', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Glycerol'), 'permeability', 65, '%', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Glycerol'), 'osmolality', 850, 'mOsm/kg', TRUE),
    
    -- Ethylene Glycol properties
    ((SELECT id FROM molecules WHERE name = 'Ethylene Glycol'), 'freezing_point', -12.9, '°C', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Ethylene Glycol'), 'viscosity', 1.61, 'cP', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Ethylene Glycol'), 'toxicity', 4, 'scale', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Ethylene Glycol'), 'permeability', 90, '%', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Ethylene Glycol'), 'osmolality', 1200, 'mOsm/kg', TRUE),
    
    -- Propylene Glycol properties
    ((SELECT id FROM molecules WHERE name = 'Propylene Glycol'), 'freezing_point', -59, '°C', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Propylene Glycol'), 'viscosity', 0.581, 'cP', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Propylene Glycol'), 'toxicity', 2, 'scale', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Propylene Glycol'), 'permeability', 75, '%', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Propylene Glycol'), 'osmolality', 950, 'mOsm/kg', TRUE),
    
    -- Trehalose properties
    ((SELECT id FROM molecules WHERE name = 'Trehalose'), 'freezing_point', -0.5, '°C', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Trehalose'), 'viscosity', 2.12, 'cP', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Trehalose'), 'toxicity', 0, 'scale', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Trehalose'), 'permeability', 30, '%', TRUE),
    ((SELECT id FROM molecules WHERE name = 'Trehalose'), 'osmolality', 600, 'mOsm/kg', TRUE);

-- Seed data for mixtures (assuming user_id exists in auth.users)
-- Replace 'your-user-id' with an actual UUID from your auth.users table
DO $$
DECLARE
    user_id UUID := '00000000-0000-0000-0000-000000000000'; -- Replace with actual user ID
BEGIN
    -- Insert mixtures
    INSERT INTO mixtures (name, description, is_public, created_by)
    VALUES
        ('DMSO-PBS Solution', 'Standard DMSO solution in phosphate-buffered saline', TRUE, user_id),
        ('Glycerol-Sucrose Mix', 'Glycerol mixture with sucrose for cell preservation', TRUE, user_id),
        ('DMSO-Glycerol-Trehalose', 'Combined cryoprotectant mixture for improved viability', TRUE, user_id);

    -- Insert mixture components
    INSERT INTO mixture_components (mixture_id, molecule_id, amount, amount_unit, role)
    VALUES
        -- DMSO-PBS Solution components
        ((SELECT id FROM mixtures WHERE name = 'DMSO-PBS Solution'), 
         (SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 
         10, '%v/v', 'cryoprotectant'),
        
        -- Glycerol-Sucrose Mix components
        ((SELECT id FROM mixtures WHERE name = 'Glycerol-Sucrose Mix'), 
         (SELECT id FROM molecules WHERE name = 'Glycerol'), 
         15, '%v/v', 'cryoprotectant'),
        
        -- DMSO-Glycerol-Trehalose components
        ((SELECT id FROM mixtures WHERE name = 'DMSO-Glycerol-Trehalose'), 
         (SELECT id FROM molecules WHERE name = 'Dimethyl Sulfoxide'), 
         7.5, '%v/v', 'cryoprotectant'),
        ((SELECT id FROM mixtures WHERE name = 'DMSO-Glycerol-Trehalose'), 
         (SELECT id FROM molecules WHERE name = 'Glycerol'), 
         7.5, '%v/v', 'cryoprotectant'),
        ((SELECT id FROM mixtures WHERE name = 'DMSO-Glycerol-Trehalose'), 
         (SELECT id FROM molecules WHERE name = 'Trehalose'), 
         5, '%w/v', 'stabilizer');

    -- Insert experiments
    INSERT INTO experiments (name, description, mixture_id, temperature, temperature_unit, pressure, pressure_unit, status, created_by)
    VALUES
        ('DMSO Concentration Effects', 'Testing various concentrations of DMSO on cell viability', 
         (SELECT id FROM mixtures WHERE name = 'DMSO-PBS Solution'), 
         -196, '°C', 1, 'atm', 'completed', user_id),
        
        ('Glycerol Permeability Study', 'Investigating glycerol permeability across cell membranes', 
         (SELECT id FROM mixtures WHERE name = 'Glycerol-Sucrose Mix'), 
         -196, '°C', 1, 'atm', 'completed', user_id),
        
        ('Combined Cryoprotectant Test', 'Testing synergistic effects of multiple cryoprotectants', 
         (SELECT id FROM mixtures WHERE name = 'DMSO-Glycerol-Trehalose'), 
         -196, '°C', 1, 'atm', 'in_progress', user_id);

    -- Insert experiment properties
    INSERT INTO experiment_properties (experiment_id, property_type, value, unit)
    VALUES
        -- DMSO Concentration Effects properties
        ((SELECT id FROM experiments WHERE name = 'DMSO Concentration Effects'), 
         'viability', 85, '%'),
        ((SELECT id FROM experiments WHERE name = 'DMSO Concentration Effects'), 
         'recovery', 78, '%'),
        
        -- Glycerol Permeability Study properties
        ((SELECT id FROM experiments WHERE name = 'Glycerol Permeability Study'), 
         'viability', 80, '%'),
        ((SELECT id FROM experiments WHERE name = 'Glycerol Permeability Study'), 
         'recovery', 75, '%');

    -- Insert protocols
    INSERT INTO protocols (mixture_id, name, description, temperature_min, temperature_max, temperature_unit, steps, created_by)
    VALUES
        ((SELECT id FROM mixtures WHERE name = 'DMSO-PBS Solution'), 
         'Standard Slow Freezing Protocol', 
         'A standard slow freezing protocol for cell preservation using DMSO',
         22, -196, '°C',
         '[
            {
                "id": "' || uuid_generate_v4() || '",
                "name": "Sample Preparation",
                "description": "Prepare cell samples in culture medium",
                "duration": 30,
                "duration_unit": "min",
                "temperature": 22,
                "temperature_unit": "°C",
                "action": "Prepare cells at concentration of 1-2 million/mL"
            },
            {
                "id": "' || uuid_generate_v4() || '",
                "name": "Cryoprotectant Addition",
                "description": "Add DMSO solution to cells",
                "duration": 15,
                "duration_unit": "min",
                "temperature": 4,
                "temperature_unit": "°C",
                "action": "Add dropwise while gently swirling"
            },
            {
                "id": "' || uuid_generate_v4() || '",
                "name": "Cooling",
                "description": "Cool samples at controlled rate",
                "duration": 60,
                "duration_unit": "min",
                "temperature": -80,
                "temperature_unit": "°C",
                "action": "Use CoolCell container for controlled cooling"
            }
         ]'::jsonb,
         user_id);
END $$;

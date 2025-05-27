-- Seed data for molecules
DO $$
DECLARE
    dmso_id UUID;
    glycerol_id UUID;
    eg_id UUID;
    pg_id UUID;
    trehalose_id UUID;
    dmso_mix_id UUID;
    glycerol_mix_id UUID;
    combined_mix_id UUID;
    exp1_id UUID;
    exp2_id UUID;
    exp3_id UUID;
    user_id UUID := '00000000-0000-0000-0000-000000000000'; -- Replace with actual user ID
BEGIN
    -- Insert molecules and store their IDs
    INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
    VALUES ('Dimethyl Sulfoxide', 'CS(=O)C', 'InChI=1S/C2H6OS/c1-4(2)3/h1-2H3', 'IAZDPXIOMUYVGZ-UHFFFAOYSA-N', 'C₂H₆OS', 78.13, 'PubChem', TRUE)
    RETURNING id INTO dmso_id;
    
    INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
    VALUES ('Glycerol', 'C(C(CO)O)O', 'InChI=1S/C3H8O3/c4-1-3(6)2-5/h3-6H,1-2H2', 'PEDCQBHIVMGVHV-UHFFFAOYSA-N', 'C₃H₈O₃', 92.09, 'PubChem', TRUE)
    RETURNING id INTO glycerol_id;
    
    INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
    VALUES ('Ethylene Glycol', 'C(CO)O', 'InChI=1S/C2H6O2/c3-1-2-4/h3-4H,1-2H2', 'LYCAIKOWRPUZTN-UHFFFAOYSA-N', 'C₂H₆O₂', 62.07, 'PubChem', TRUE)
    RETURNING id INTO eg_id;
    
    INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
    VALUES ('Propylene Glycol', 'CC(CO)O', 'InChI=1S/C3H8O2/c1-3(5)2-4/h3-5H,2H2,1H3', 'DNIAPMSPPWPWGF-UHFFFAOYSA-N', 'C₃H₈O₂', 76.09, 'PubChem', TRUE)
    RETURNING id INTO pg_id;
    
    INSERT INTO molecules (name, smiles, inchi, inchikey, formula, molecular_weight, source, is_verified)
    VALUES ('Trehalose', 'C1C(C(C(C(C1O)OC2C(C(C(C(O2)CO)O)O)O)O)O)O', 'InChI=1S/C12H22O11/c13-1-4-7(16)8(17)9(18)11(21-4)23-12-6(3-15)22-10(19)5(2-14)20-12/h4-19H,1-3H2', 'CXQWRCVTCMQVQX-UHFFFAOYSA-N', 'C₁₂H₂₂O₁₁', 342.3, 'PubChem', TRUE)
    RETURNING id INTO trehalose_id;

    -- Seed data for molecular properties
    -- Dimethyl Sulfoxide properties
    INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
    VALUES 
        (dmso_id, 'freezing_point', 18.5, '°C', TRUE),
        (dmso_id, 'viscosity', 1.996, 'cP', TRUE),
        (dmso_id, 'toxicity', 3, 'scale', TRUE),
        (dmso_id, 'permeability', 85, '%', TRUE),
        (dmso_id, 'osmolality', 1000, 'mOsm/kg', TRUE);
    
    -- Glycerol properties
    INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
    VALUES
        (glycerol_id, 'freezing_point', 17.8, '°C', TRUE),
        (glycerol_id, 'viscosity', 1.412, 'cP', TRUE),
        (glycerol_id, 'toxicity', 1, 'scale', TRUE),
        (glycerol_id, 'permeability', 65, '%', TRUE),
        (glycerol_id, 'osmolality', 850, 'mOsm/kg', TRUE);
    
    -- Ethylene Glycol properties
    INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
    VALUES
        (eg_id, 'freezing_point', -12.9, '°C', TRUE),
        (eg_id, 'viscosity', 1.61, 'cP', TRUE),
        (eg_id, 'toxicity', 4, 'scale', TRUE),
        (eg_id, 'permeability', 90, '%', TRUE),
        (eg_id, 'osmolality', 1200, 'mOsm/kg', TRUE);
    
    -- Propylene Glycol properties
    INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
    VALUES
        (pg_id, 'freezing_point', -59, '°C', TRUE),
        (pg_id, 'viscosity', 0.581, 'cP', TRUE),
        (pg_id, 'toxicity', 2, 'scale', TRUE),
        (pg_id, 'permeability', 75, '%', TRUE),
        (pg_id, 'osmolality', 950, 'mOsm/kg', TRUE);
    
    -- Trehalose properties
    INSERT INTO molecular_properties (molecule_id, property_type, value, unit, is_experimental)
    VALUES
        (trehalose_id, 'freezing_point', -0.5, '°C', TRUE),
        (trehalose_id, 'viscosity', 2.12, 'cP', TRUE),
        (trehalose_id, 'toxicity', 0, 'scale', TRUE),
        (trehalose_id, 'permeability', 30, '%', TRUE),
        (trehalose_id, 'osmolality', 600, 'mOsm/kg', TRUE);

    -- Insert mixtures
    INSERT INTO mixtures (name, description, is_public, created_by)
    VALUES ('DMSO-PBS Solution', 'Standard DMSO solution in phosphate-buffered saline', TRUE, user_id)
    RETURNING id INTO dmso_mix_id;
    
    INSERT INTO mixtures (name, description, is_public, created_by)
    VALUES ('Glycerol-Sucrose Mix', 'Glycerol mixture with sucrose for cell preservation', TRUE, user_id)
    RETURNING id INTO glycerol_mix_id;
    
    INSERT INTO mixtures (name, description, is_public, created_by)
    VALUES ('DMSO-Glycerol-Trehalose', 'Combined cryoprotectant mixture for improved viability', TRUE, user_id)
    RETURNING id INTO combined_mix_id;

    -- Insert mixture components
    -- DMSO-PBS Solution components
    INSERT INTO mixture_components (mixture_id, molecule_id, amount, amount_unit, role)
    VALUES (dmso_mix_id, dmso_id, 10, '%v/v', 'cryoprotectant');
    
    -- Glycerol-Sucrose Mix components
    INSERT INTO mixture_components (mixture_id, molecule_id, amount, amount_unit, role)
    VALUES (glycerol_mix_id, glycerol_id, 15, '%v/v', 'cryoprotectant');
    
    -- DMSO-Glycerol-Trehalose components
    INSERT INTO mixture_components (mixture_id, molecule_id, amount, amount_unit, role)
    VALUES 
        (combined_mix_id, dmso_id, 7.5, '%v/v', 'cryoprotectant'),
        (combined_mix_id, glycerol_id, 7.5, '%v/v', 'cryoprotectant'),
        (combined_mix_id, trehalose_id, 5, '%w/v', 'stabilizer');

    -- Insert experiments
    INSERT INTO experiments (name, description, mixture_id, temperature, temperature_unit, pressure, pressure_unit, status, created_by)
    VALUES ('DMSO Concentration Effects', 'Testing various concentrations of DMSO on cell viability', 
            dmso_mix_id, -196, '°C', 1, 'atm', 'completed', user_id)
    RETURNING id INTO exp1_id;
    
    INSERT INTO experiments (name, description, mixture_id, temperature, temperature_unit, pressure, pressure_unit, status, created_by)
    VALUES ('Glycerol Permeability Study', 'Investigating glycerol permeability across cell membranes', 
            glycerol_mix_id, -196, '°C', 1, 'atm', 'completed', user_id)
    RETURNING id INTO exp2_id;
    
    INSERT INTO experiments (name, description, mixture_id, temperature, temperature_unit, pressure, pressure_unit, status, created_by)
    VALUES ('Combined Cryoprotectant Test', 'Testing synergistic effects of multiple cryoprotectants', 
            combined_mix_id, -196, '°C', 1, 'atm', 'in_progress', user_id)
    RETURNING id INTO exp3_id;

    -- Insert experiment properties
    -- DMSO Concentration Effects properties
    INSERT INTO experiment_properties (experiment_id, property_type, value, unit)
    VALUES 
        (exp1_id, 'viability', 85, '%'),
        (exp1_id, 'recovery', 78, '%');
    
    -- Glycerol Permeability Study properties
    INSERT INTO experiment_properties (experiment_id, property_type, value, unit)
    VALUES
        (exp2_id, 'viability', 80, '%'),
        (exp2_id, 'recovery', 75, '%');

    -- Insert protocols
    INSERT INTO protocols (mixture_id, name, description, temperature_min, temperature_max, temperature_unit, steps, created_by)
    VALUES (
        dmso_mix_id, 
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
        user_id
    );
END $$;

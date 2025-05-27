-- Insert sample molecules
INSERT INTO molecules (name, formula, smiles, molecular_weight, log_p, tpsa, hbd, hba, success_rate, toxicity_level, toxicity_score) VALUES
('Trehalose', 'C12H22O11', 'C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O', 342.30, -3.20, 189.5, 8, 11, 92.0, 'very_low', 15.0),
('DMSO', 'C2H6OS', 'CS(=O)C', 78.13, -1.35, 36.3, 0, 1, 87.0, 'moderate', 45.0),
('Glycerol', 'C3H8O3', 'C(C(CO)O)O', 92.09, -1.76, 60.7, 3, 3, 84.0, 'low', 25.0),
('Ethylene Glycol', 'C2H6O2', 'C(CO)O', 62.07, -1.36, 40.5, 2, 2, 89.0, 'moderate', 55.0),
('Propylene Glycol', 'C3H8O2', 'CC(CO)O', 76.09, -0.92, 40.5, 2, 2, 85.0, 'low', 30.0),
('Sucrose', 'C12H22O11', 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@@H](O2)CO)O)O)CO)O)O)O)O', 342.30, -3.70, 189.5, 8, 11, 88.0, 'very_low', 12.0),
('Mannitol', 'C6H14O6', 'C([C@H]([C@H]([C@@H]([C@H](CO)O)O)O)O)O', 182.17, -3.10, 121.4, 6, 6, 79.0, 'very_low', 18.0),
('Sorbitol', 'C6H14O6', 'C([C@H]([C@H]([C@@H]([C@@H](CO)O)O)O)O)O', 182.17, -3.10, 121.4, 6, 6, 76.0, 'very_low', 20.0),
('Xylitol', 'C5H12O5', 'C([C@H]([C@H]([C@@H](CO)O)O)O)O', 152.15, -2.40, 101.2, 5, 5, 73.0, 'very_low', 22.0),
('Erythritol', 'C4H10O4', 'C([C@H]([C@H](CO)O)O)O', 122.12, -1.90, 80.9, 4, 4, 71.0, 'very_low', 25.0),
('Maltose', 'C12H22O11', 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O', 342.30, -3.40, 189.5, 8, 11, 81.0, 'very_low', 16.0),
('Lactose', 'C12H22O11', 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O', 342.30, -3.50, 189.5, 8, 11, 78.0, 'very_low', 18.0),
('Raffinose', 'C18H32O16', 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@@H](O2)CO)O)O)CO)O)O)O[C@@H]3[C@H]([C@@H]([C@@H]([C@H](O3)CO)O)O)O', 504.44, -4.20, 268.7, 11, 16, 69.0, 'very_low', 14.0),
('Proline', 'C5H9NO2', 'C1C[C@H](NC1)C(=O)O', 115.13, -2.54, 49.3, 2, 3, 67.0, 'low', 28.0),
('Betaine', 'C5H11NO2', 'C[N+](C)(C)CC(=O)[O-]', 117.15, -4.00, 40.1, 0, 3, 65.0, 'low', 32.0),
('Taurine', 'C2H7NO3S', 'C(CS(=O)(=O)O)N', 125.15, -4.20, 77.8, 3, 4, 63.0, 'low', 35.0),
('Hydroxyethyl Starch', 'C6H12O6', 'CC(C(C(C(C=O)O)O)O)O', 180.16, -2.80, 110.4, 5, 6, 82.0, 'low', 24.0),
('Polyethylene Glycol 400', 'C2H4O', 'C(CO)O', 400.00, -1.20, 40.5, 2, 2, 86.0, 'low', 28.0),
('Ficoll 70', 'C12H18O9', 'CC1C(C(C(C(O1)OC2C(OC(C(C2O)O)OC3C(OC(C(C3O)O)O)CO)CO)O)O)O', 342.30, -2.90, 158.4, 7, 9, 74.0, 'very_low', 19.0),
('Dextran 40', 'C6H10O5', 'C1C(C(C(C(O1)OC2C(OC(C(C2O)O)O)CO)O)O)O', 162.14, -2.60, 99.4, 4, 5, 77.0, 'very_low', 21.0),
('Albumin Fragment', 'C20H32N4O6', 'CC(C)C[C@@H](C(=O)N[C@@H](CC1=CC=CC=C1)C(=O)N[C@@H](CC(=O)O)C(=O)N[C@@H](CCCCN)C(=O)O)NC(=O)[C@H](CC(C)C)N', 424.49, -1.80, 155.6, 6, 10, 72.0, 'low', 26.0);

-- Insert sample predictions for each molecule
INSERT INTO predictions (molecule_id, model_name, prediction_type, prediction_value, confidence_score, insights, recommendations)
SELECT 
  id,
  'CryoSuccess-AI',
  'success_rate',
  success_rate + (RANDOM() * 10 - 5),
  85 + (RANDOM() * 15),
  CASE 
    WHEN toxicity_level = 'very_low' THEN ARRAY['Excellent membrane permeability', 'Minimal cytotoxicity', 'Optimal molecular weight range']
    WHEN toxicity_level = 'low' THEN ARRAY['Good membrane permeability', 'Low cytotoxicity profile', 'Suitable for most applications']
    WHEN toxicity_level = 'moderate' THEN ARRAY['Moderate membrane permeability', 'Requires careful dosing', 'Monitor for side effects']
    ELSE ARRAY['Limited membrane permeability', 'High cytotoxicity risk', 'Use with extreme caution']
  END,
  CASE 
    WHEN success_rate > 85 THEN ARRAY['Increase concentration to 15%', 'Excellent standalone performance', 'Consider for primary protocols']
    WHEN success_rate > 70 THEN ARRAY['Combine with 5% DMSO for synergy', 'Monitor osmotic stress', 'Good for secondary protocols']
    ELSE ARRAY['Use in combination only', 'Reduce concentration', 'Monitor cellular viability closely']
  END
FROM molecules;

-- Insert toxicity predictions
INSERT INTO predictions (molecule_id, model_name, prediction_type, prediction_value, confidence_score, insights, recommendations)
SELECT 
  id,
  'ToxPredict',
  'toxicity',
  toxicity_score + (RANDOM() * 10 - 5),
  80 + (RANDOM() * 20),
  CASE 
    WHEN toxicity_level = 'very_low' THEN ARRAY['No reactive metabolites predicted', 'Minimal protein binding', 'Low hepatotoxicity risk']
    WHEN toxicity_level = 'low' THEN ARRAY['Low reactive metabolite formation', 'Moderate protein binding', 'Acceptable hepatotoxicity profile']
    WHEN toxicity_level = 'moderate' THEN ARRAY['Some reactive metabolites possible', 'Significant protein binding', 'Monitor liver function']
    ELSE ARRAY['High reactive metabolite risk', 'Extensive protein binding', 'Hepatotoxicity concerns']
  END,
  CASE 
    WHEN toxicity_level = 'very_low' THEN ARRAY['Safe for extended use', 'No special monitoring required', 'Suitable for sensitive applications']
    WHEN toxicity_level = 'low' THEN ARRAY['Safe for standard protocols', 'Basic monitoring recommended', 'Good safety margin']
    WHEN toxicity_level = 'moderate' THEN ARRAY['Use with caution', 'Regular monitoring required', 'Consider dose reduction']
    ELSE ARRAY['Avoid if possible', 'Intensive monitoring required', 'Use only when necessary']
  END
FROM molecules;

-- Insert permeability predictions
INSERT INTO predictions (molecule_id, model_name, prediction_type, prediction_value, confidence_score, insights, recommendations)
SELECT 
  id,
  'Membrane-Perm',
  'permeability',
  CASE 
    WHEN molecular_weight < 200 THEN 85 + (RANDOM() * 15)
    WHEN molecular_weight < 400 THEN 70 + (RANDOM() * 20)
    ELSE 50 + (RANDOM() * 25)
  END,
  88 + (RANDOM() * 12),
  CASE 
    WHEN molecular_weight < 200 THEN ARRAY['Excellent cellular uptake', 'Rapid membrane penetration', 'Uniform distribution']
    WHEN molecular_weight < 400 THEN ARRAY['Good cellular uptake', 'Moderate penetration rate', 'Even distribution pattern']
    ELSE ARRAY['Limited cellular uptake', 'Slow penetration kinetics', 'Potential gradient formation']
  END,
  CASE 
    WHEN molecular_weight < 200 THEN ARRAY['Standard application protocols', 'No penetration enhancers needed', 'Monitor for rapid effects']
    WHEN molecular_weight < 400 THEN ARRAY['Allow extra equilibration time', 'Consider mild permeabilization', 'Monitor distribution']
    ELSE ARRAY['Use permeabilization agents', 'Extended incubation times', 'Check for uniform uptake']
  END
FROM molecules;

-- Create a sample research team
INSERT INTO research_teams (name, description) VALUES
('CryoProtect Research Lab', 'Advanced cryoprotectant discovery and optimization team'),
('Biopreservation Institute', 'Leading research in cellular preservation technologies'),
('Molecular Cryobiology Group', 'Specialized in molecular mechanisms of cryoprotection');

-- Create sample collections
INSERT INTO collections (name, description, is_public, molecule_ids) 
SELECT 
  'High-Performance Cryoprotectants',
  'Collection of molecules with >85% success rate',
  true,
  ARRAY(SELECT id FROM molecules WHERE success_rate > 85 LIMIT 5);

INSERT INTO collections (name, description, is_public, molecule_ids)
SELECT 
  'Low-Toxicity Compounds',
  'Safe cryoprotectants with minimal cytotoxicity',
  true,
  ARRAY(SELECT id FROM molecules WHERE toxicity_level IN ('very_low', 'low') LIMIT 8);

INSERT INTO collections (name, description, is_public, molecule_ids)
SELECT 
  'Natural Sugar-Based Protectants',
  'Naturally occurring sugar molecules for cryoprotection',
  true,
  ARRAY(SELECT id FROM molecules WHERE name IN ('Trehalose', 'Sucrose', 'Maltose', 'Lactose', 'Raffinose'));

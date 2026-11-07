
-- 1. Add missing ingredients and nutrition values.
-- Nutrition values are approximate per 100 g, except milk (per 100 ml).

-- STEP 1: Insert products BEFORE inserting recipes.

INSERT INTO public.products
(id, slug, name, category, price, size, tag, description, image, ingredients, available)
VALUES
(
'classic-oats',
'classic-oats',
'Classic Oats',
'Oats',
49,
'1 bowl',
'Everyday favourite',
'Quaker oats with banana, pomegranate and chia seeds.',
'/images/Classic Oats Bowl.png',
'["Quaker oats","Milk","Banana","Pomegranate","Chia seeds"]'::jsonb,
true
),
(
'dressed-oats',
'rolled-oats-with-dressing',
'Rolled Oats with Dressing',
'Oats',
59,
'1 bowl',
'Fresh & fruity',
'Rolled oats with fruits, seeds, peanut butter and chocolate dressing.',
'/images/Oats with dressing.png',
'["Quaker oats","Milk","Peanut butter","Pomegranate","Apple","Banana","Chia seeds","Pumpkin seeds","Sunflower seeds","Black raisins","Green raisins","Hersheys chocolate syrup"]'::jsonb,
true
),
(
'chocolate-oats',
'high-protein-chocolate-oatmeal',
'High Protein Chocolate Oatmeal',
'Oats',
79,
'1 bowl',
'Customer favourite',
'Chocolate peanut butter oats with fruits, seeds and delicious toppings.',
'/images/Chocolate Oats.png',
'["Quaker oats","Milk","Chocolate peanut butter","Apple","Banana","Pomegranate","Chia seeds","Pumpkin seeds","Sunflower seeds","Black raisins","Green raisins","Hersheys chocolate syrup"]'::jsonb,
true
),
(
'ragi-malt',
'ragi-malt',
'Traditional Ragi Malt',
'Drinks',
15,
'1 glass',
'Traditional goodness',
'Ragi malt with curd, sweet corn, onion, carrot and lemon.',
'/images/Ragi Malt.png',
'["Ragi flour","Curd","Boiled sweet corn","Onion","Carrot","Salt","Lemon"]'::jsonb,
true
),
(
'fresh-sprouts',
'fresh-sprouts',
'Fresh Sprouts',
'Fresh',
15,
'1 serving',
'Freshly prepared',
'Fresh green gram sprouts with chickpeas, peanuts and beans.',
'/images/Sprouts.png',
'["Green gram sprouts","Boiled chana","Peanuts","Beans"]'::jsonb,
true
)
ON CONFLICT (id) DO UPDATE SET
slug = EXCLUDED.slug,
name = EXCLUDED.name,
category = EXCLUDED.category,
price = EXCLUDED.price,
size = EXCLUDED.size,
tag = EXCLUDED.tag,
description = EXCLUDED.description,
image = EXCLUDED.image,
ingredients = EXCLUDED.ingredients,
available = EXCLUDED.available;


-- Additional ingredients required by all five recipes


-- Insert all ingredients before creating recipe mappings.
-- Nutrition values are approximate per 100 g, except milk (per 100 ml).

INSERT INTO public.ingredients
(id, name, unit, kcal, protein, carbs, fat, fibre, sugar, saturated_fat, added_sugar)
VALUES
('oats', 'Quaker Oats', 'g', 389, 16.9, 66.3, 6.9, 10.6, 0.9, 1.2, 0),
('milk', 'Milk', 'ml', 61, 3.2, 4.8, 3.3, 0, 4.8, 1.9, 0),
('banana', 'Banana', 'g', 89, 1.1, 22.8, 0.3, 2.6, 12.2, 0.1, 0),
('pomegranate', 'Pomegranate', 'g', 83, 1.7, 18.7, 1.2, 4.0, 13.7, 0.1, 0),
('chia', 'Chia Seeds', 'g', 486, 16.5, 42.1, 30.7, 34.4, 0, 3.3, 0),
('pb', 'Chocolate Peanut Butter', 'g', 600, 25, 40, 40, 6, 20, 8, 10),
('apple', 'Apple', 'g', 52, 0.3, 13.8, 0.2, 2.4, 10.4, 0, 0),
('pumpkin-seeds', 'Pumpkin Seeds', 'g', 559, 30.2, 10.7, 49.1, 6.0, 1.4, 8.7, 0),
('sunflower-seeds', 'Sunflower Seeds', 'g', 584, 20.8, 20.0, 51.5, 8.6, 2.6, 4.5, 0),
('raisins', 'Black and Green Raisins', 'g', 299, 3.1, 79.2, 0.5, 3.7, 59.2, 0.1, 0),
('choco-syrup', 'Hersheys Chocolate Syrup', 'g', 286, 2.1, 68.0, 1.3, 1.4, 58.0, 0.5, 55),
('ragi', 'Ragi Flour', 'g', 336, 7.3, 72.0, 1.3, 11.5, 0.6, 0.3, 0),
('curd', 'Curd', 'g', 61, 3.5, 4.7, 3.3, 0, 4.7, 2.1, 0),
('corn', 'Boiled Sweet Corn', 'g', 96, 3.4, 21, 1.5, 2.4, 4.5, 0.2, 0),
('onion', 'Onion', 'g', 40, 1.1, 9.3, 0.1, 1.7, 4.2, 0, 0),
('carrot', 'Carrot', 'g', 41, 0.9, 9.6, 0.2, 2.8, 4.7, 0, 0),
('lemon', 'Lemon Juice', 'g', 22, 0.4, 6.9, 0.2, 0.3, 2.5, 0, 0),
('sprouts', 'Green Gram Sprouts', 'g', 30, 3.0, 5.9, 0.2, 1.8, 4.0, 0, 0),
('chana', 'Boiled Chickpeas', 'g', 164, 8.9, 27.4, 2.6, 7.6, 4.8, 0.3, 0),
('peanuts', 'Peanuts', 'g', 567, 25.8, 16.1, 49.2, 8.5, 4.7, 6.8, 0),
('beans', 'Green Beans', 'g', 31, 1.8, 7.0, 0.2, 2.7, 3.3, 0, 0)
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name,
unit = EXCLUDED.unit,
kcal = EXCLUDED.kcal,
protein = EXCLUDED.protein,
carbs = EXCLUDED.carbs,
fat = EXCLUDED.fat,
fibre = EXCLUDED.fibre,
sugar = EXCLUDED.sugar,
saturated_fat = EXCLUDED.saturated_fat,
added_sugar = EXCLUDED.added_sugar;

-- 2. Update existing product ingredient lists.

UPDATE public.products
SET
  name = 'Classic Oats',
  ingredients = '["Quaker oats","Milk","Banana","Pomegranate","Chia seeds"]'::jsonb
WHERE id = 'classic-oats';

UPDATE public.products
SET
  name = 'Rolled Oats with Dressing',
  ingredients = '["Quaker rolled oats","Milk","Peanut butter","Pomegranate","Apple","Banana","Chia seeds","Pumpkin seeds","Sunflower seeds","Black raisins","Green raisins","Hersheys chocolate syrup"]'::jsonb
WHERE id = 'dressed-oats';

UPDATE public.products
SET
  name = 'High Protein Chocolate Oatmeal',
  ingredients = '["Quaker oats","Milk","Chocolate peanut butter","Apple","Banana","Pomegranate","Chia seeds","Pumpkin seeds","Sunflower seeds","Black raisins","Green raisins","Hersheys chocolate syrup"]'::jsonb
WHERE id = 'chocolate-oats';

UPDATE public.products
SET
  ingredients = '["Ragi flour","Curd","Boiled sweet corn","Onion","Carrot","Salt","Lemon"]'::jsonb
WHERE id = 'ragi-malt';

UPDATE public.products
SET
  ingredients = '["Green gram sprouts","Boiled chana","Peanuts","Beans"]'::jsonb
WHERE id = 'fresh-sprouts';


-- 3. Create or update recipes.

INSERT INTO public.recipes (id, product_id, servings)
VALUES
('classic', 'classic-oats', 1),
('dressed', 'dressed-oats', 1),
('chocolate', 'chocolate-oats', 1),
('ragi', 'ragi-malt', 1),
('sprouts', 'fresh-sprouts', 1)

ON CONFLICT (id) DO UPDATE SET
product_id = EXCLUDED.product_id,
servings = EXCLUDED.servings;


-- 4. Remove previous recipe mappings so old toppings
-- do not remain in the calculations.

DELETE FROM public.recipe_ingredients
WHERE recipe_id IN ('classic', 'dressed', 'chocolate', 'ragi', 'sprouts');


-- 5. Add accurate recipe quantities per serving.
-- Milk quantities are in ml; other quantities are in grams.

INSERT INTO public.recipe_ingredients
(recipe_id, ingredient_id, quantity)
VALUES

-- CLASSIC OATS
('classic', 'oats', 40),
('classic', 'milk', 200),
('classic', 'banana', 60),
('classic', 'pomegranate', 20),
('classic', 'chia', 5),

-- ROLLED OATS WITH DRESSING
('dressed', 'oats', 40),
('dressed', 'milk', 200),
('dressed', 'pb', 12),
('dressed', 'pomegranate', 20),
('dressed', 'apple', 30),
('dressed', 'banana', 30),
('dressed', 'chia', 4),
('dressed', 'pumpkin-seeds', 4),
('dressed', 'sunflower-seeds', 4),
('dressed', 'raisins', 6),
('dressed', 'choco-syrup', 5),

-- HIGH PROTEIN CHOCOLATE OATMEAL
('chocolate', 'oats', 40),
('chocolate', 'milk', 200),
('chocolate', 'pb', 24),
('chocolate', 'apple', 30),
('chocolate', 'banana', 60),
('chocolate', 'pomegranate', 20),
('chocolate', 'chia', 4),
('chocolate', 'pumpkin-seeds', 5),
('chocolate', 'sunflower-seeds', 5),
('chocolate', 'raisins', 6),
('chocolate', 'choco-syrup', 10),

-- RAGI MALT
('ragi', 'ragi', 10),
('ragi', 'curd', 10),
('ragi', 'corn', 15),
('ragi', 'onion', 10),
('ragi', 'carrot', 10),
('ragi', 'lemon', 5),

-- FRESH SPROUTS
('sprouts', 'sprouts', 150),
('sprouts', 'chana', 50),
('sprouts', 'peanuts', 15),
('sprouts', 'beans', 30);

UPDATE public.products
SET image = '/images/Classic Oats Bowl.png'
WHERE id = 'classic-oats';

UPDATE public.products
SET image = '/images/Oats with dressing.png'
WHERE id = 'dressed-oats';

UPDATE public.products
SET image = '/images/Chocolate Oats .png'
WHERE id = 'chocolate-oats';

UPDATE public.products
SET image = '/images/Ragi Malt.png'
WHERE id = 'ragi-malt';

UPDATE public.products
SET image = '/images/Sprouts.png'
WHERE id = 'fresh-sprouts';
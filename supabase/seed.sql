insert into public.products (id,slug,name,category,price,size,tag,description,image,ingredients,available) values
('classic-oats','classic-oats','Classic Rolled Oats','Oats',49,'1 bowl','Everyday favourite','Creamy rolled oats prepared with milk and finished with chia and fresh pomegranate.','https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=1000&q=85','["Rolled oats","Milk","Chia seeds","Pomegranate"]',true),
('dressed-oats','rolled-oats-with-dressing','Rolled Oats with Dressing','Oats',59,'1 bowl','Fresh & fruity','A comforting rolled-oats bowl with a light fruit dressing and a gentle touch of sweetness.','https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=1000&q=85','["Rolled oats","Milk","Banana","Honey"]',true),
('chocolate-oats','high-protein-chocolate-oatmeal','High Protein Chocolate Oatmeal','Oats',79,'1 bowl','Customer favourite','Rich chocolate-peanut flavour with banana, oats and a satisfying creamy texture.','https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=1000&q=85','["High-protein oats","Milk","Chocolate peanut butter","Banana","Chia seeds"]',true),
('ragi-malt','ragi-malt','Traditional Ragi Malt','Drinks',15,'1 glass','Traditional goodness','A simple traditional ragi drink with curd and boiled corn.','https://images.unsplash.com/photo-1553787499-6f9133860278?w=1000&q=85','["Ragi flour","Curd","Boiled sweet corn"]',true),
('fresh-sprouts','fresh-sprouts','Fresh Sprouts','Fresh',15,'1 serving','Freshly prepared','Fresh mixed mung sprouts served as a light, wholesome snack.','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=85','["Mixed mung sprouts"]',true)
on conflict (id) do nothing;

insert into public.ingredients (id,name,unit,kcal,protein,carbs,fat,fibre,sugar,saturated_fat,added_sugar) values
('oats','Rolled oats','g',389,16.9,66.3,6.9,10.6,0.9,1.2,0),
('milk','Milk (toned)','ml',58,3.1,4.8,3,0,4.8,1.9,0),
('banana','Banana','g',89,1.1,22.8,0.3,2.6,12.2,0.1,0),
('pb','Chocolate peanut butter','g',590,25,38,42,6,18,9,12),
('chia','Chia seeds','g',486,16.5,42.1,30.7,34.4,0,3.3,0),
('pomegranate','Pomegranate','g',83,1.7,18.7,1.2,4,13.7,0.1,0),
('ragi','Ragi flour','g',336,7.3,72,1.5,11.5,0.6,0.3,0),
('curd','Curd','g',61,3.5,4.7,3.3,0,4.7,2.1,0),
('corn','Boiled sweet corn','g',96,3.4,21,1.5,2.4,4.5,0.2,0),
('sprouts','Mixed mung sprouts','g',30,3,5.9,0.2,1.8,4,0,0),
('honey','Honey','g',304,0.3,82.4,0,0.2,82.1,0,82.1)
on conflict (id) do nothing;

insert into public.recipes (id,product_id,servings) values
('classic','classic-oats',1),
('dressed','dressed-oats',1),
('chocolate','chocolate-oats',1),
('ragi','ragi-malt',1),
('sprouts','fresh-sprouts',1)
on conflict (id) do nothing;

insert into public.recipe_ingredients (recipe_id,ingredient_id,quantity) values
('classic','oats',40),('classic','milk',200),('classic','chia',4),('classic','pomegranate',20),
('dressed','oats',40),('dressed','milk',200),('dressed','banana',35),('dressed','honey',5),
('chocolate','oats',40),('chocolate','milk',200),('chocolate','pb',24),('chocolate','banana',60),('chocolate','chia',3),
('ragi','ragi',10),('ragi','curd',10),('ragi','corn',15),
('sprouts','sprouts',150)
on conflict (recipe_id,ingredient_id) do nothing;

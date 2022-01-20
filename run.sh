# /recipes
cd recipes
yarn
yarn dev > recipes.log 2>&1 &
cd ..

# /chefs
cd chefs
yarn
yarn dev > chefs.log 2>&1 &
cd ..

# /auth
cd auth
yarn
yarn dev > auth.log 2>&1 &
cd ..

# /front-end-public
cd front-end-public
yarn
yarn build:sass > sass.log 2>&1 &
yarn nodemon > front-end-public.log 2>&1 &
cd ..

# /
yarn
yarn build:sass > sass.log 2>&1 &
yarn nodemon

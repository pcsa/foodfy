cd recipes
yarn dev > recipes.log 2>&1 &

cd ..

# cd auth
# yarn dev > auth.log 2>&1 &

# cd ..
yarn build:sass > sass.log 2>&1 &
yarn nodemon

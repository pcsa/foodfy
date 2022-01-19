const axios = require('axios').default;

const baseURL = process.env.RECIPES_SERVICE_BASE_URL;

const recipesAPI = axios.create({ baseURL });

module.exports = { recipesAPI };

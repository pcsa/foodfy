const axios = require('axios').default;

const baseURL = process.env.CHEFS_SERVICE_BASE_URL;

const chefsAPI = axios.create({ baseURL });

module.exports = { chefsAPI };

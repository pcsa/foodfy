const axios = require('axios').default;

const baseURL = process.env.AUTH_SERVICE_BASE_URL;

const authAPI = axios.create({ baseURL });

module.exports = { authAPI };

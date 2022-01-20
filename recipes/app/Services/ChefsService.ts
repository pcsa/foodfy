import axios from 'axios'

const baseURL = process.env.CHEFS_SERVICE_BASE_URL

const chefsAPI = axios.create({ baseURL })

export { chefsAPI }

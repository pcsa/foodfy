import axios from 'axios'

const baseURL = process.env.RECIPES_SERVICE_BASE_URL

const recipesAPI = axios.create({ baseURL })

export { recipesAPI }

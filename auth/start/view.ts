import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('publicServiceBaseUrl', Env.get('PUBLIC_SERVICE_BASE_URL'))

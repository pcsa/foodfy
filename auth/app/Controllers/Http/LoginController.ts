import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'

export default class LoginController {
  viewState = {
    user: {
      email: '',
      password: '',
    },
    validationErrorMessages: {
      email: '',
    },
    error: null,
    success: null,
  }

  public async index({ view }: HttpContextContract) {
    const state = this.viewState

    return view.render('login', state)
  }

  public async store({ view, request, response, auth }: HttpContextContract) {
    try {
      const requestedUser = request.all()

      const existingUser = await User.findBy('email', requestedUser.email)

      if (!existingUser) {
        return view.render('login', {
          error: 'Usuário não encontrado. Tem certeza que digitou as credenciais corretas?',
          user: requestedUser,
        })
      }

      const verifyPasswordResult = await Hash.verify(existingUser.password, requestedUser.password)

      if (!verifyPasswordResult) {
        return view.render('login', {
          error: 'Senha inválida',
          user: requestedUser,
        })
      }

      const token = await auth.use('api').attempt(requestedUser.email, requestedUser.password)

      let baseUrl = ''
      if (existingUser.isAdmin) {
        baseUrl = Env.get('ADMIN_SERVICE_BASE_URL')
      } else {
        baseUrl = Env.get('CLIENT_SERVICE_BASE_URL')
      }

      return response.redirect(
        `${baseUrl}/admin/profile?success=Usuário autenticado com sucesso&token=${token.token}`
      )
    } catch (err) {
      return view.render('login', {
        error: 'Houve um erro na autenticação do usuário. Por favor, tente novamente.',
      })
    }
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    return { isAutheticated: !!user, user }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

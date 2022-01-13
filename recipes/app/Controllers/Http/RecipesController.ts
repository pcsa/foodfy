import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
  public async index({ request }: HttpContextContract) {
    const { userId, title } = request.all()

    const query = Recipe.query()

    if (userId) {
      query.where({ userId })
    }

    if (title) {
      query.where('title', 'like', `%${title}%`)
    }

    return query
  }

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()

    const recipe = await Recipe.find(id)

    return recipe
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

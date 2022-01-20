import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
  public async index({ request }: HttpContextContract) {
    const { userId, title, chefId, chefName, photo } = request.all()

    const query = Recipe.query()

    if (userId) {
      query.where({ userId })
    }

    if (title) {
      query.where('title', 'like', `%${title}%`)
    }

    if (chefId) {
      query.where('chefId', chefId)
    }

    const recipes = await query

    if (chefName) await Recipe.addChefNameProp(recipes)

    if (photo) await Recipe.addPhotoProp(recipes)

    return recipes
  }

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const { id, chefName, photo } = request.params()

    const recipe = await Recipe.find(id)

    if (chefName) await Recipe.addChefNameProp([recipe!])

    if (photo) await Recipe.addPhotoProp([recipe!])

    return recipe
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

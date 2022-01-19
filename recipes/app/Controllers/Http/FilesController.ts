import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'

export default class FilesController {
  public async index({ request }: HttpContextContract) {
    const { recipes_id: recipesId } = request.params()

    const query = Recipe.query().where('recipeId', recipesId)

    return query
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

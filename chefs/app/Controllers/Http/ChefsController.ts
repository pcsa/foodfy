import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chef from 'App/Models/Chef'
import File from 'App/Models/File'
import { recipesAPI } from 'App/Services/RecipesService'

export default class ChefsController {
  public async index({ request }: HttpContextContract) {
    const { avatar, totalRecipes, orderByName } = request.all()

    const query = Chef.query().preload('file')

    if (orderByName) query.orderBy('name', orderByName)

    let chefs = await query

    if (avatar) await Chef.addAvatarProp(chefs)

    if (totalRecipes) await Chef.addTotalRecipesProp(chefs)

    return chefs
  }

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const { avatar, totalRecipes } = request.all()

    const { id } = request.params()

    const chef = await Chef.findBy('id', id)

    if (avatar) await Chef.addAvatarProp([chef!])

    if (totalRecipes) await Chef.addTotalRecipesProp([chef!])

    return chef
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

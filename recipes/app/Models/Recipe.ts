import { DateTime } from 'luxon'
import { afterFetch, afterFind, BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { chefsAPI } from 'App/Services/ChefsService'
import File from 'App/Models/File'

export default class Recipe extends BaseModel {
  public serializeExtras() {
    return {
      chef_name: this.$extras.chef_name ?? null,
      photo: this.$extras.photo ?? null,
    }
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public ingredients: any

  @column()
  public preparations: any

  @column()
  public information: string

  @column()
  public chefId: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => File)
  public file: HasOne<typeof File>

  @afterFetch()
  public static ingredients(recipes: Recipe[]) {
    Recipe.convertStringToArray(recipes)
  }

  @afterFind()
  public static preparations(recipe: Recipe) {
    Recipe.convertStringToArray([recipe])
  }

  public static convertStringToArray(recipes: Recipe[]) {
    recipes.map((r) => {
      r.merge({ ingredients: r.ingredients.split('|'), preparations: r.preparations.split('|') })
    })
  }

  public static async addChefNameProp(recipes: Recipe[]) {
    try {
      await Promise.all(
        recipes.map(async (r) => {
          const chefResponse = await chefsAPI.get(`/chefs/${r.chefId}`)

          r.$extras.chef_name = chefResponse.data.name

          return r
        })
      )
    } catch (error) {
      console.log('ERROR: erro ao requisitar chefs')
    }
  }

  public static async addPhotoProp(recipes: Recipe[]) {
    await Promise.all(
      recipes.map(async (r) => {
        await r.load('file')

        r.$extras.photo = r.file?.path

        return r
      })
    )
  }
}

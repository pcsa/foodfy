import { DateTime } from 'luxon'
import { afterFetch, afterFind, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Recipe extends BaseModel {
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
}

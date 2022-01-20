import { DateTime } from 'luxon'
import {
  afterFetch,
  afterFind,
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import File from './File'
import { recipesAPI } from 'App/Services/RecipesService'

export default class Chef extends BaseModel {
  public serializeExtras() {
    return {
      avatar: this.$extras.avatar,
      total_recipes: this.$extras.total_recipes,
    }
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fileId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => File)
  public file: BelongsTo<typeof File>

  public static async addAvatarProp(chefs: Chef[]) {
    const promisses = await Promise.all(
      chefs.map(async (c) => {
        await c.load('file')
        c.$extras.avatar = c.file.path
        return c
      })
    )

    return promisses
  }

  public static async addTotalRecipesProp(chefs: Chef[]) {
    try {
      await Promise.all(
        chefs.map(async (c) => {
          const recipesResponse = await recipesAPI.get('/recipes', {
            params: {
              chefId: c.id,
            },
          })

          const total_recipes = recipesResponse.data.length

          c.$extras.total_recipes = total_recipes

          return c
        })
      )
    } catch (error) {
      console.log('ERROR: erro ao requisitar receitas')
    }
  }
}

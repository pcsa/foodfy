import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Chef from 'App/Models/Chef'
import File from 'App/Models/File'

export default class ChefSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const file = await File.create({
      name: 'chef-mayk',
      path: 'https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
    })

    await Chef.createMany([
      {
        name: 'Mayk Brito',
        fileId: file.id,
      },
    ])
  }
}

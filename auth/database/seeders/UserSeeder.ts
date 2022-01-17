import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        name: 'Administrador',
        email: 'administrador@foodfy.com',
        password: '123',
        isAdmin: true,
      },
      {
        name: 'Usuário Comum',
        email: 'usuariocomum@foodfy.com',
        password: '123',
        isAdmin: false,
      },
    ])
  }
}

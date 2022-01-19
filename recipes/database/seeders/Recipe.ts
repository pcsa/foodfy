import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe'

export default class RecipeSeeder extends BaseSeeder {
  public async run() {
    await Recipe.createMany([
      {
        title: 'Triplo bacon burger',
        ingredients: [
          '3 kg de carne moída (escolha uma carne magra e macia)',
          '300 g de bacon moído',
          '1 ovo',
          '3 colheres (sopa) de farinha de trigo',
          '3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador',
          '30 ml de água gelada',
        ].join('|'),
        preparations: [
          'Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.',
          'Faça porções de 90 g a 100 g.',
          'Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.',
          'Faça um de cada vez e retire o aro logo em seguida.',
          'Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).',
          'Faça no máximo 4 camadas por forma e leve para congelar.',
          'Retire do congelador, frite ou asse e está pronto.',
        ].join('|'),
        information:
          'Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres.',
        userId: 1,
        chefId: 1,
      },
      {
        title: 'Pizza 4 estações',
        ingredients: [
          '1 xícara (chá) de leite',
          '1 ovo',
          '1 colher (chá) de sal',
          '1 colher (chá) de açúcar',
          '1 colher (sopa) de margarina',
          '1 e 1/2 xícara (chá) de farinha de trigo',
          '1 colher (sobremesa) de fermento em pó',
          '1/2 lata de molho de tomate',
          '250 g de mussarela ralada grossa',
          '2 tomates fatiados',
          'azeitona picada',
          'orégano a gosto',
        ].join('|'),
        preparations: [
          'No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.',
          'Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.',
          'Retire do forno e despeje o molho de tomate.',
          'Cubra a massa com mussarela ralada, tomate e orégano a gosto.',
          'Leve novamente ao forno até derreter a mussarela.',
        ].join('|'),
        information: 'Pizza de liquidificador é uma receita deliciosa e supersimples de preparar.',
        userId: 1,
        chefId: 1,
      },
      {
        title: 'Asinhas de frango ao barbecue',
        ingredients: [
          '12 encontros de asinha de galinha, temperados a gosto',
          '2 colheres de sopa de farinha de trigo',
          '1/2 xícara (chá) de óleo',
          '1 xícara de molho barbecue',
        ].join('|'),
        preparations: [
          'Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.',
          'Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.',
          'Para servir fica bonito com salada, ou abuse da criatividade.',
        ].join('|'),
        information: '',
        userId: 1,
        chefId: 1,
      },
      {
        title: 'Lasanha mac n cheese',
        ingredients: [
          'massa pronta de lasanha',
          '400 g de presunto',
          '400 g de mussarela ralada',
          '2 copos de requeijão',
          '150 g de mussarela para gratinar',
        ].join('|'),
        preparations: [
          'Em uma panela, coloque a manteiga para derreter.',
          'Acrescente a farinha de trigo e misture bem com auxílio de um fouet.',
          'Adicione o leite e misture até formar um creme homogêneo.',
          'Tempere com sal, pimenta e noz-moscada a gosto.',
          'Desligue o fogo e acrescente o creme de leite; misture bem e reserve.',
        ].join('|'),
        information: 'Recheie a lasanha com o que preferir.',
        chefId: 1,
        userId: 1,
      },
    ])
  }
}

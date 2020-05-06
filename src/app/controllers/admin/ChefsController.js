const Chef = require('../../models/Chef');
const File = require('../../models/File');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the chefs operations related to
    the admin domain
*/
class ChefsController {
    async index(req, res) {
        const { success, error } = req.query;

        try {
            let chefs = await Chef.findAll();
            chefs = chefs.map((chef) => ({
                ...chef,
                avatar: formatFilePath(req, chef.avatar),
            }));

            return res.render('admin/chefs/index', {
                chefs,
                success,
                error,
            });
        } catch (err) {
            return res.render('admin/chefs/index', {
                error: 'Erro ao listar chefs',
            });
        }
    }

    create(_, res) {
        return res.render('admin/chefs/create');
    }

    async post(req, res) {
        try {
            if (!req.file)
                return res.render('admin/chefs/create', {
                    error: 'Faça o upload de um avatar para o chef',
                    chef: req.body,
                });

            const file = await File.create({
                name: req.file.name,
                path: req.file.path,
            });
            const chef = await Chef.create({
                name: req.body.name,
                file_id: file.id,
            });

            return res.redirect(
                301,
                `/admin/chefs/${chef.id}?success=Chef criado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/create', {
                error:
                    'Houve um erro ao criar um chef. Por favor, tente novamente.',
                chef: req.body,
            });
        }
    }

    async show(req, res) {
        const { success, error } = req.query;
        try {
            let chef = await Chef.find(req.params.id);

            if (!chef)
                return res.redirect('/admin/chefs?error=Chef não encontrado');

            chef = {
                ...chef,
                avatar: formatFilePath(req, chef.avatar),
            };

            let chefRecipes = await Chef.chefRecipes(req.params.id);
            chefRecipes = chefRecipes.map((recipe) => ({
                ...recipe,
                photo: formatFilePath(req, recipe.photo),
            }));

            return res.render('admin/chefs/show', {
                chef,
                chefRecipes,
                success,
                error,
            });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a procura de um chef',
                errorData,
            });
        }
    }

    async edit(req, res) {
        try {
            let chef = await Chef.find(req.params.id);

            if (!chef)
                return res.redirect('/admin/chefs?error=Chef não encontrado');

            chef = {
                ...chef,
                avatar_url: formatFilePath(req, chef.avatar),
            };

            return res.render('admin/chefs/edit', {
                chef,
            });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error:
                    'Houve um erro durante o render da view de edição um chef',
                errorData,
            });
        }
    }

    async put(req, res) {
        try {
            let chef = await Chef.find(req.params.id);
            if (!chef)
                return res.redirect('/admin/chefs?error=Chef não encontrado');

            const updatedValues = {
                ...chef,
                ...req.body,
            };

            if (req.file) {
                const file = await File.create({
                    name: req.file.name,
                    path: req.file.path,
                });
                updatedValues.file_id = file.id;
            }

            chef = await Chef.update({
                id: req.params.id,
                fieldsData: {
                    name: updatedValues.name,
                    file_id: updatedValues.file_id,
                },
            });

            return res.redirect(
                301,
                `/admin/chefs/${chef.id}?success=Chef editado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/edit', {
                error:
                    'Houve um erro ao editar o chef. Por favor, tente novamente',
                chef: req.body,
            });
        }
    }

    async delete(req, res) {
        try {
            await Chef.delete(req.params.id);
            return res.redirect(
                301,
                `/admin/chefs?success=Chef deletado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/edit', {
                error:
                    'Houve um erro ao deletar o chef. Por favor, tente novamente',
                chef: req.body,
            });
        }
    }
}

module.exports = new ChefsController();

const Recipe = require('../../models/Recipe');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the recipes operations related to
    the admin domain
*/
class RecipesAdminController {
    async index(req, res) {
        const { success, error } = req.query;
        const { user } = req.session;
        try {
            const results = user.is_admin
                ? await Recipe.allByUser(user.id)
                : await Recipe.all();
            const recipes = results.rows.map((recipe) => ({
                ...recipe,
                photo: recipe.photo
                    ? formatFilePath(req, recipe.photo)
                    : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
            }));

            return res.render('admin/recipes/index', {
                recipes,
                success,
                error,
            });
        } catch (err) {
            return res.render('admin/recipes/index', {
                error: 'Erro ao listar receitas',
            });
        }
    }

    async create(req, res) {
        try {
            const results = await Recipe.chefOptions();
            const chefOptions = results.rows;

            return res.render('admin/recipes/create', { chefOptions });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error:
                    'Houve um erro ao renderizar a view de criação uma receita',
                errorData,
            });
        }
    }

    async post(req, res) {
        try {
            const results = await Recipe.create(req.body);
            const recipe = results.rows[0];

            const recipeFilesPromises = req.files.map((file) =>
                Recipe.createFile({ file, recipe_id: recipe.id })
            );
            await Promise.all(recipeFilesPromises);

            return res.redirect(
                301,
                `/admin/recipes/${recipe.id}?success=Receita criada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/create', {
                error:
                    'Houve um erro ao criar a receita. Por favor, tente novamente.',
                recipe: req.body,
                chefOptions: req.chefOptions,
            });
        }
    }

    async show(req, res) {
        const { success, error } = req.query;
        try {
            // Get recipe
            let results = await Recipe.find(req.params.id);
            const recipe = results.rows[0];

            if (!recipe) return res.status(404).send('Recipe not found');

            // Get recipe files
            results = await Recipe.files(req.params.id);
            const files = results.rows.map((file) => ({
                ...file,
                path: formatFilePath(req, file.path),
            }));

            return res.render('admin/recipes/show', {
                recipe,
                files,
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
                error: 'Houve um erro ao procurar pela receita',
                errorData,
            });
        }
    }

    async edit(req, res) {
        try {
            // Get recipe
            let results = await Recipe.find(req.params.id);
            const recipe = results.rows[0];

            // Get chef options
            results = await Recipe.chefOptions();
            const chefOptions = results.rows;

            // Get recipe files
            results = await Recipe.files(req.params.id);
            let files = results.rows;

            files = files.map((file) => ({
                ...file,
                path: formatFilePath(req, file.path),
            }));

            return res.render('admin/recipes/edit', {
                recipe,
                chefOptions,
                files,
            });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error:
                    'Houve um erro durante o render da view de edição uma receita',
                errorData,
            });
        }
    }

    async put(req, res) {
        try {
            const values = [
                req.body.chef_id,
                req.body.title,
                req.body.ingredients,
                req.body.preparations,
                req.body.information,
                req.params.id,
            ];

            const results = await Recipe.update(values);
            const recipe = results.rows[0];

            if (req.files) {
                const recipeFilesPromises = req.files.map((file) =>
                    Recipe.createFile({ file, recipe_id: recipe.id })
                );

                await Promise.all(recipeFilesPromises);
            }

            if (req.body.removed_files) {
                const removedFilesId = req.body.removed_files.split(',');

                removedFilesId.splice(removedFilesId.length - 1, 1);

                const removedFilesPromises = removedFilesId.map((id) =>
                    Recipe.deleteFile({
                        file_id: parseInt(id, 10),
                        recipe_id: recipe.id,
                    })
                );

                await Promise.all(removedFilesPromises);
            }

            return res.redirect(
                301,
                `/admin/recipes/${recipe.id}?success=Receita editada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/edit', {
                error:
                    'Houve um erro ao editar a receita. Por favor, tente novamente',
                recipe: req.body,
            });
        }
    }

    async delete(req, res) {
        try {
            await Recipe.delete(req.params.id);
            return res.redirect(
                301,
                `/admin/recipes?success=Receita deletada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/edit', {
                error:
                    'Houve um erro ao deletar a receita. Por favor, tente novamente',
                recipe: req.body,
            });
        }
    }
}

module.exports = new RecipesAdminController();

const { check } = require('express-validator');
const Recipe = require('../models/Recipe');
const { parseValidationErrors } = require('../../lib/utils');
const { formatFilePath } = require('../../lib/utils');

class ProfileValidator {
    postFields() {
        return [
            check('title')
                .not()
                .isEmpty()
                .withMessage('Digite o título da receita'),
            check('chef_id').not().isEmpty().withMessage('Selecione um chef'),
            check('ingredients')
                .not()
                .isEmpty()
                .withMessage('Adicione um ingrediente'),
            check('preparations')
                .not()
                .isEmpty()
                .withMessage(
                    'Adicione pelo menos uma instrução para o modo de preparo'
                ),
        ];
    }

    async post(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);
        const results = await Recipe.chefOptions();
        const chefOptions = results.rows;

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/recipes/create', {
                validationErrorMessages,
                recipe: req.body,
                chefOptions,
            });
        }

        req.chefOptions = chefOptions;

        return next();
    }

    putFields() {
        return [
            check('title')
                .not()
                .isEmpty()
                .withMessage('Digite o título da receita'),
            check('chef_id').not().isEmpty().withMessage('Selecione um chef'),
            check('ingredients')
                .not()
                .isEmpty()
                .withMessage('Adicione um ingrediente'),
            check('preparations')
                .not()
                .isEmpty()
                .withMessage(
                    'Adicione pelo menos uma instrução para o modo de preparo'
                ),
        ];
    }

    async put(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            let results = await Recipe.chefOptions();
            const chefOptions = results.rows;

            // Get recipe files
            results = await Recipe.files(req.params.id);
            let files = results.rows;

            files = files.map((file) => ({
                ...file,
                path: formatFilePath(req, file.path),
            }));

            return res.render('admin/recipes/edit', {
                validationErrorMessages,
                recipe: { ...req.body, id: req.params.id },
                chefOptions,
                files,
                chef_id: req.body.chef_id,
            });
        }

        return next();
    }
}

module.exports = new ProfileValidator();
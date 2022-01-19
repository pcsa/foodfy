const fs = require('fs');
const db = require('../../config/database');
const File = require('./File');
const Base = require('./Base');
const { recipesAPI } = require('../services/recipes-service');

class Recipe extends Base {
    constructor() {
        super('recipes');
    }

    async findOne(id) {
        // const query = `
        //         SELECT recipes.*, chefs.id as chef_id, chefs.name as chef_name, files.path as photo
        //         FROM recipe_files
        //         FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
        //         LEFT JOIN files ON (recipe_files.file_id = files.id)
        //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //         WHERE recipes.id = $1
        //     `;

        // const results = await db.query(query, [id]);

        const recipesResponse = await recipesAPI.get(`/recipes/${id}`);

        // return results.rows[0];

        return recipesResponse.data;
    }

    async findAll() {
        // const query = `
        //         SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
        //         FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
        //         LEFT JOIN files ON (recipe_files.file_id = files.id)
        //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //         ORDER BY created_at DESC
        //     `;

        // const results = await db.query(query);

        const recipesResponse = await recipesAPI.get('/recipes');

        return recipesResponse.data;

        // return results.rows;
    }

    async findAllByUser(userId) {
        // const query = `
        //     SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
        //     FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
        //     LEFT JOIN files ON (recipe_files.file_id = files.id)
        //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //     WHERE recipes.user_id = $1
        //     ORDER BY created_at DESC
        // `;

        const recipesResponse = await recipesAPI.get('/recipes', {
            params: {
                userId,
            },
        });

        return recipesResponse.data;
        // return results.rows;
    }

    async findBy(values) {
        // const query = `
        //         SELECT recipes.*, chefs.name AS chef_name, files.path as photo
        //         FROM recipe_files
        //         RIGHT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
        //         LEFT JOIN files ON (recipe_files.file_id = files.id)
        //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //         WHERE 1 = 1
        //         AND recipes.title ILIKE '%${values.filter}%'
        //         ORDER BY updated_at DESC
        //     `;

        const recipesResponse = await recipesAPI.get('/recipes', {
            params: {
                title: values.filter,
            },
        });

        // const results = await db.query(query);
        // return results.rows;

        return recipesResponse.data;
    }

    async chefOptions() {
        const query = `
                SELECT * FROM chefs ORDER BY name ASC
            `;
        const results = await db.query(query);
        return results.rows;
    }

    async files(id) {
        // const query = `
        //     SELECT recipe_files.*, files.path FROM recipe_files
        //     LEFT JOIN files ON (recipe_files.file_id = files.id)
        //     WHERE recipe_files.recipe_id = $1
        // `;

        // const results = await db.query(query, [id]);

        const filesResponse = await recipesAPI.get(`/recipes/${id}/files`);

        return filesResponse.data;
    }
}

module.exports = new Recipe();

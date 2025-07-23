import { NEON_DATABASE_URL } from '$env/static/private';
import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import { Post } from '$lib/server/models/Post';
import { Cover } from '$lib/server/models/Cover';

export const sequelize = new Sequelize(NEON_DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    models: [Post, Cover]
});

import { POSTGRES_URL } from '$env/static/private';
import { Sequelize } from 'sequelize-typescript';
import { Post } from '$lib/server/models/Post';
import { Cover } from '$lib/server/models/Cover';

export const sequelize = new Sequelize(POSTGRES_URL, { models: [Post, Cover] });

module.exports = {

    development: {
        client: 'pg',
        connection: {
        host : 'dpg-c97mlej97ej8dpgdpfm0-a.oregon-postgres.render.com',
        user : 'project3_user',
        password : 'BBnuRPL9b6PHO6UoY0eQw1YMdc8kz1u0',
        database : 'project3',
        port: 5432
        },
        migrations: {
        directory: __dirname + '/knex/migrations',
        },
        seeds: {
        directory: __dirname + '/knex/seeds'
        }
    },
    
    production: {
        client: 'pg',
        connection: {
            connectionString : process.env.DATABASE_URL,
            ssl: {
            rejectUnauthorized: false
            }
        },  
        migrations: {
        directory: './knex/migrations',
        tableName: 'knex_migrations',
        },
        seeds: {directory: './knex/seeds'},
    }
    
    };              
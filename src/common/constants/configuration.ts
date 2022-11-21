type Envs = 'development' | 'production'

const {
	PORT,
	NODE_ENV: ProcessEnv,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_DATABASE,
	SECRET = 'test123'
} = process.env

const NODE_ENV: Envs = (ProcessEnv as Envs) || 'development'

const dbConfig = {
	host: DATABASE_HOST ?? 'localhost',
	port: DATABASE_PORT && Number.isInteger(DATABASE_PORT) ? +DATABASE_PORT : 3306,
	username: DATABASE_USERNAME ?? 'root',
	password: DATABASE_PASSWORD ?? 'admin',
	database: DATABASE_DATABASE ?? 'upmeal'
}

export { NODE_ENV, dbConfig, SECRET, PORT }

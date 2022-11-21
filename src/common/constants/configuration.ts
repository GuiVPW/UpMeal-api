type Envs = 'development' | 'production'

const { PORT, NODE_ENV: ProcessEnv, DATABASE_URI, SECRET = 'test123' } = process.env

const NODE_ENV: Envs = (ProcessEnv as Envs) || 'development'

const dbConfig = {
	connectionString: DATABASE_URI ?? 'mysql://root:admin@localhost:3306'
}

export { NODE_ENV, dbConfig, SECRET, PORT }

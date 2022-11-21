import { PORT, dbConfig } from '@common/constants/configuration'

export interface AppConfig {
	nest: NestConfig
	database: DatabaseConfig
}

export interface NestConfig {
	port: number
}

export interface DatabaseConfig {
	host: string
	port: string | number
	username: string
	password: string
	database: string
}

const config: AppConfig = {
	nest: {
		port: +(PORT as string) ?? 8080
	},
	database: {
		host: dbConfig.host,
		port: dbConfig.port,
		username: dbConfig.username,
		password: dbConfig.password,
		database: dbConfig.database
	}
}

export default (): AppConfig => config

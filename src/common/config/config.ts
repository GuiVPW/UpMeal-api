import { PORT, dbConfig } from '@common/constants/configuration'

export interface AppConfig {
	nest: NestConfig
	database: DatabaseConfig
}

export interface NestConfig {
	port: number
}

export interface DatabaseConfig {
	username: string
	password: string
	uri?: string
}

const config: AppConfig = {
	nest: {
		port: +(PORT as string) ?? 8080
	},
	database: {
		password: dbConfig.password as string,
		username: dbConfig.user as string,
		uri: dbConfig.connectionString as string
	}
}

export default (): AppConfig => config

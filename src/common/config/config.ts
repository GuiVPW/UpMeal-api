import { PORT, dbConfig } from '@common/constants/configuration'

export interface AppConfig {
	nest: NestConfig
	database: DatabaseConfig
}

export interface NestConfig {
	port: number
}

export interface DatabaseConfig {
	uri?: string
}

const config: AppConfig = {
	nest: {
		port: +(PORT as string) ?? 8080
	},
	database: {
		uri: dbConfig.connectionString
	}
}

export default (): AppConfig => config

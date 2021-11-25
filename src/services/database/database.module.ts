import { DatabaseConfig } from '@common/config'
import { Client } from '@modules/clients/entities'
import { Food } from '@modules/foods/entities'
import { Reservation } from '@modules/reservations/entities'
import { Shop } from '@modules/shops/entities'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import oracledb from 'oracledb'

import { CustomNamingStrategy } from './custom-name-strategy'

const entities = [Shop, Client, Reservation, Food]

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const databaseConfig = configService.get<DatabaseConfig>('database')

				if (process.platform === 'win32') {
					// Windows
					oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_11' })
				} else if (process.platform === 'darwin') {
					// macOS
					oracledb.initOracleClient({
						libDir: `${process.env.HOME}/Downloads/instantclient_19_8`
					})
				}

				return {
					...databaseConfig,
					type: 'oracle',
					logging: true,
					connectString: databaseConfig?.uri,
					synchronize: false,
					entities,
					keepConnectionAlive: true,
					entityPrefix: 'T_CLG_',
					namingStrategy: new CustomNamingStrategy()
				}
			}
		}),
		TypeOrmModule.forFeature(entities)
	],
	exports: [TypeOrmModule]
})
export class DatabaseModule {}

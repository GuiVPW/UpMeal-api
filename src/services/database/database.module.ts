import { DatabaseConfig } from '@common/config'
import { NODE_ENV } from '@common/constants/configuration'
import { Client } from '@modules/clients/entities'
import { Food } from '@modules/foods/entities'
import { Reservation } from '@modules/reservations/entities'
import { Shop } from '@modules/shops/entities'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CustomNamingStrategy } from './custom-name-strategy'

const entities = [Shop, Client, Reservation, Food]

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const databaseConfig = configService.get<DatabaseConfig>('database')

				return {
					...databaseConfig,
					type: 'mysql',
					logging: NODE_ENV === 'development',
					host: databaseConfig?.uri ?? 'localhost',
					port: 3306,
					username: databaseConfig?.username ?? 'root',
					password: databaseConfig?.password ?? 'admin',
					database: 'upmeal',
					synchronize: NODE_ENV === 'development',
					entities,
					keepConnectionAlive: true,
					entityPrefix: 'T_GS_',
					namingStrategy: new CustomNamingStrategy()
				}
			}
		}),
		TypeOrmModule.forFeature(entities)
	],
	exports: [TypeOrmModule]
})
export class DatabaseModule {}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { DatabaseConfig } from '@common/config'
import { NODE_ENV } from '@common/constants/configuration'

import { Client } from '@modules/clients/entities'
import { Food } from '@modules/foods/entities'
import { Reservation } from '@modules/reservations/entities'
import { Shop } from '@modules/shops/entities'

import { CustomNamingStrategy } from './custom-name-strategy'

const entities = [Shop, Client, Reservation, Food]

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
				const databaseConfig = configService.get<DatabaseConfig>('database')

				return {
					...databaseConfig,
					type: 'mysql',
					logging: NODE_ENV === 'development',
					host: 'localhost',
					port: 3306,
					username: 'root',
					password: 'admin',
					database: 'upmeal',
					synchronize: true,
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

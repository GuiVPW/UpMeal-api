import { Global, Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Shop } from './entities'
import { ShopsController } from './shops.controller'
import { ShopService } from './shops.service'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([Shop]),
		MulterModule.register({ limits: { fileSize: 2_500_000, files: 1 } })
	],
	controllers: [ShopsController],
	providers: [...UseCases, ShopService],
	exports: [ShopService, TypeOrmModule]
})
export class ShopsModule {}

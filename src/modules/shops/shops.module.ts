import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Shop } from './entities'
import { ShopsController } from './shops.controller'
import { ShopService } from './shops.service'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Shop])],
	controllers: [ShopsController],
	providers: [...UseCases, ShopService],
	exports: [ShopService, TypeOrmModule]
})
export class ShopsModule {}

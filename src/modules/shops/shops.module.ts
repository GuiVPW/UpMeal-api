import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Shop } from './entities'
import { shopsController } from './shops.controller'
import { ShopService } from './shops.service'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Shop])],
	controllers: [shopsController],
	providers: [...UseCases, ShopService],
	exports: [ShopService, TypeOrmModule]
})
export class ShopsModule {}

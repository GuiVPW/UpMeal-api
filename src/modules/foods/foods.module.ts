import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Food } from './entities'
import { FoodsController } from './foods.controller'
import { FoodService } from './foods.service'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Food])],
	controllers: [FoodsController],
	providers: [...UseCases, FoodService],
	exports: [FoodService, TypeOrmModule]
})
export class FoodsModule {}

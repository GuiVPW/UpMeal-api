import { BasicAuthGuard } from '@common/guards'
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Delete,
	HttpCode,
	Query,
	Put
} from '@nestjs/common'

import { CreateDto, UpdateDto } from './dtos'
import { FoodService } from './foods.service'

@Controller('shops/:shopId/foods')
export class FoodsController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	async findMany(
		@Param('shopId') shopId: string,
		@Query('isAvailable') isAvailable?: string
	) {
		const data = await this.foodService.findMany(
			+shopId,
			isAvailable ? { isAvailable: JSON.parse(isAvailable) } : {}
		)

		return {
			foods: data
		}
	}

	@UseGuards(BasicAuthGuard)
	@Post()
	@HttpCode(201)
	async create(@Body() input: CreateDto, @Param('shopId') shopId: string) {
		const created = await this.foodService.create(+shopId, input)

		return {
			food: created
		}
	}

	@UseGuards(BasicAuthGuard)
	@Put('/:id')
	@HttpCode(204)
	async update(
		@Body() input: UpdateDto,
		@Param('shopId') shopId: string,
		@Param('id') foodId: string
	) {
		const updated = await this.foodService.update(+shopId, +foodId, input)

		return {
			food: updated
		}
	}

	@UseGuards(BasicAuthGuard)
	@Delete('/:id')
	@HttpCode(204)
	async delete(@Param('shopId') shopId: string, @Param('id') foodId: string) {
		const deleted = await this.foodService.delete(+shopId, +foodId)

		if (deleted) {
			return
		}
	}
}

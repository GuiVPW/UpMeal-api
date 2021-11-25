import { Injectable } from '@nestjs/common'

import { CreateDto, FindManyDto, UpdateDto } from './dtos'
import { CreateUseCase, UpdateUseCase, FindManyUseCase, DeleteUseCase } from './use-cases'

@Injectable()
export class FoodService {
	constructor(
		private createUseCase: CreateUseCase,
		private updateUseCase: UpdateUseCase,
		private findManyUseCase: FindManyUseCase,
		private deleteUseCase: DeleteUseCase
	) {}

	async create(shopId: number, input: CreateDto) {
		return this.createUseCase.execute(shopId, input)
	}

	async update(shopId: number, foodId: number, input: UpdateDto) {
		return this.updateUseCase.execute(shopId, foodId, input)
	}

	async findMany(shopId: number, fields: FindManyDto) {
		return this.findManyUseCase.execute(shopId, fields)
	}

	async delete(shopId: number, foodId: number) {
		return this.deleteUseCase.execute(shopId, foodId)
	}
}

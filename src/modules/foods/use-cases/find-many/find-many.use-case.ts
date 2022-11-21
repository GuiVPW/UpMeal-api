import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { FindManyDto } from '@modules/foods/dtos'

import { Food } from '../../entities'

@Injectable()
export class FindManyUseCase implements BaseUseCase<Food> {
	private logger: Logger = new Logger('FindManyFoods')

	constructor(
		@InjectRepository(Food)
		private readonly foodRepository: Repository<Food>
	) {}

	async execute(shopId: number, input: FindManyDto): Promise<Food[]> {
		const foundFoods = await this.foodRepository.find({
			cache: true,
			where: { ...input, shopId }
		})

		this.logger.log('Found many foods')

		return foundFoods
	}
}

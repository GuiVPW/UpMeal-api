import { BaseUseCase } from '@common/domain/base'
import { FindManyDto } from '@modules/foods/dtos'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Food } from '../../entities'

@Injectable()
export class FindManyUseCase implements BaseUseCase<Food> {
	private logger: Logger = new Logger('FindManySpecialty')

	constructor(
		@InjectRepository(Food)
		private readonly foodRepository: Repository<Food>
	) {}

	async execute(shopId: number, input: FindManyDto): Promise<{ foods: Food[] }> {
		const foundFoods = await this.foodRepository.find({
			cache: true,
			where: { ...input, shopId }
		})

		this.logger.log('Found many foods')

		return {
			foods: foundFoods
		}
	}
}

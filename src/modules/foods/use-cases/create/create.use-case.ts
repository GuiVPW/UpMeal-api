import { BaseUseCase } from '@common/domain/base'
import { CreateDto } from '@modules/foods/dtos'
import { Food } from '@modules/foods/entities'
import { ShopService } from '@modules/shops/shops.service'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CreateUseCase implements BaseUseCase<Food> {
	private logger: Logger = new Logger('CreateFood')

	constructor(
		private readonly shopService: ShopService,
		@InjectRepository(Food)
		private readonly foodRepository: Repository<Food>
	) {}

	async execute(shopId: number, input: CreateDto): Promise<{ food: Food }> {
		const shopExists = await this.shopService.findById(shopId)

		if (!shopExists) {
			this.logger.error('Throwing because food does not exist')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const createdFood = await this.foodRepository.save({ ...input, shopId })

		return {
			food: createdFood
		}
	}
}

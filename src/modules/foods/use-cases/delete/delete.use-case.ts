import { BaseUseCase } from '@common/domain/base'
import { Food } from '@modules/foods/entities'
import { ShopService } from '@modules/shops/shops.service'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class DeleteUseCase implements BaseUseCase<Food> {
	private logger: Logger = new Logger('DeleteFood')

	constructor(
		private readonly shopService: ShopService,
		@InjectRepository(Food)
		private readonly foodRepository: Repository<Food>
	) {}

	async execute(shopId: number, foodId: number): Promise<boolean> {
		const shopExists = await this.shopService.findById(shopId)

		if (!shopExists) {
			this.logger.error('Throwing because food does not exist')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const foodExists = await this.foodRepository.findOne({
			where: {
				id: foodId
			}
		})

		if (!foodExists) {
			this.logger.error('Throwing because food does not exist')
			throw new NotFoundException('Alimento não existe')
		}

		await this.foodRepository.remove(foodExists)

		return true
	}
}

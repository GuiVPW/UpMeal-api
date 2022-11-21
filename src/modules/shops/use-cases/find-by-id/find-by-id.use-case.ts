import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { Shop } from '@modules/shops/entities'

@Injectable()
export class FindByIdUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('FindShopById')

	constructor(
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(id: number, select?: (keyof Shop)[]): Promise<Shop | null> {
		const foundShop = await this.shopRepository.findOne({
			where: { id },
			select
		})

		if (!foundShop) {
			this.logger.log('Throwing because no shop was found')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const { password, ...fields } = foundShop

		return fields
	}
}

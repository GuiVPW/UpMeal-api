import { BaseUseCase } from '@common/domain/base'
import { Shop } from '@modules/shops/entities'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FindByIdUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('FindSpecialtyById')

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

		delete foundShop.password

		return foundShop
	}
}

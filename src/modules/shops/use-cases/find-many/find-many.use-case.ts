import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { FindManyDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'

@Injectable()
export class FindManyUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('FindManyShops')

	constructor(
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(where: FindManyDto): Promise<Shop[]> {
		const keys: Partial<Record<keyof Shop, unknown>> = {}

		if (where.name) {
			this.logger.log('Adding name query with insensitive case and starts with method')
			keys.name = ILike(`${where.name}%`)
		}

		const foundShops = await this.shopRepository.find({
			cache: true,
			where: keys
		})

		const formattedShops = foundShops.map(shop => {
			const { password, ...fields } = shop

			return fields
		})

		return formattedShops
	}
}

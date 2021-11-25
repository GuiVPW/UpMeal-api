import { BaseUseCase } from '@common/domain/base'
import { formatPhone } from '@common/utils'
import { FindOneDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FindOneUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(where: FindOneDto, method: 'AND' | 'OR' = 'OR'): Promise<Shop | null> {
		const keys: Partial<Shop> = where

		let foundShop: Shop | undefined

		if (method === 'OR') {
			const finalWhere: Array<Record<string, unknown>> = []

			Object.entries(keys).map(([key, value]) =>
				finalWhere.push({ [key as keyof Shop]: value })
			)

			foundShop = await this.shopRepository.findOne({ where: finalWhere })
		} else {
			foundShop = await this.shopRepository.findOne({ where: keys })
		}

		if (!foundShop) {
			return null
		}

		const { phone: phoneNumbers, phoneDigits, password, ...fields } = foundShop

		foundShop = {
			...fields,
			phone: formatPhone(phoneDigits as number, phoneNumbers as number)
		}

		return foundShop
	}
}

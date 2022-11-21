import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { LoginDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'

import { CryptService } from '@services/crypt'

@Injectable()
export class LoginUseCase {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		private readonly cryptService: CryptService,
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(input: LoginDto): Promise<{ shop: Shop; token: string }> {
		const { password, email } = input

		const foundShop = await this.shopRepository.findOne({
			where: {
				email
			}
		})

		if (!foundShop) {
			this.logger.error('Shop not found')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const { password: shopPassword, ...shopFields } = foundShop

		const comparedPassword = await this.cryptService.compare(
			password,
			shopPassword as string
		)

		if (!comparedPassword) {
			this.logger.error('Incorrect password')
			throw new BadRequestException('Senha incorreta')
		}

		const token = Buffer.from(`${email}:${password}`).toString('base64')

		return {
			token: `Basic ${token}`,
			shop: shopFields
		}
	}
}

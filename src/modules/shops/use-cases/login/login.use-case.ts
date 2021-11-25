import { formatPhone } from '@common/utils'
import { LoginDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CryptService } from '@services/crypt'
import { Repository } from 'typeorm'

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

		let foundShop = await this.shopRepository.findOne({
			where: {
				email
			}
		})

		if (!foundShop) {
			this.logger.error('Shop not found')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const {
			phone: phoneNumbers,
			password: shopPassword,
			phoneDigits,
			...fields
		} = foundShop

		const comparedPassword = await this.cryptService.compare(
			password,
			shopPassword as string
		)

		if (!comparedPassword) {
			this.logger.error('Incorrect password')
			throw new BadRequestException('Senha incorreta')
		}

		const token = Buffer.from(`${email}:${password}`).toString('base64')

		foundShop = {
			...fields,
			phone: formatPhone(phoneDigits as number, phoneNumbers as number)
		}

		return {
			token: `Basic ${token}`,
			shop: foundShop
		}
	}
}

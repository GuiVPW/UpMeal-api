import { BaseUseCase } from '@common/domain/base'
import { splitPhone, uploadStream } from '@common/utils'
import { SignUpDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CryptService } from '@services/crypt'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SignUpUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('SignupShop')

	constructor(
		private readonly cryptService: CryptService,
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(input: SignUpDto): Promise<{ shop: Shop; token: string }> {
		const {
			email,
			name,
			password: userPassword,
			phone,
			file,
			latitude,
			longitude,
			...otherFields
		} = input

		const [dddPhone, fullPhone] = splitPhone(
			+phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
		)

		const shopExists = await this.shopRepository.count({
			where: [
				{
					email
				},
				{
					phoneDigits: dddPhone,
					phone: fullPhone
				}
			]
		})

		if (shopExists > 0) {
			this.logger.error('Throwing because shop already exists')
			throw new BadRequestException('Estabelecimento já existe')
		}

		const password = await this.cryptService.encrypt(userPassword)

		let imageUrl: string | undefined = file === null ? undefined : undefined

		if (file) {
			this.logger.log('Uploading avatar url to s3 bucket and returning its url')
			const { stream, mimetype } = file
			const [, fileExtension] = mimetype.split('/')

			imageUrl = await uploadStream({
				key: `${name}-${uuid()}.${fileExtension}`,
				bucket: process.env.AWS_BUCKETNAME as string,
				body: stream
			})
		}

		const creationData: Omit<Shop, 'foods' | 'reservations' | 'id'> = {
			...otherFields,
			email,
			password,
			name,
			phone: fullPhone,
			phoneDigits: dddPhone,
			imageUrl,
			latitude: +latitude.toFixed(5),
			longitude: +longitude.toFixed(5)
		}

		const createdShop = await this.shopRepository.save(creationData)

		const basicToken = Buffer.from(`${email}:${userPassword}`).toString('base64')

		const {
			password: createdPassword,
			phone: phoneNumbers,
			phoneDigits,
			...fields
		} = createdShop

		return {
			token: `Basic ${basicToken}`,
			shop: {
				...fields,
				phone
			}
		}
	}
}

import { Readable } from 'stream'

import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { BaseUseCase } from '@common/domain/base'
import { uploadStream } from '@common/utils'

import { UpdateDto } from '@modules/shops/dtos'
import { Shop } from '@modules/shops/entities'

@Injectable()
export class UpdateUseCase implements BaseUseCase<Shop> {
	private logger: Logger = new Logger('UpdateShop')

	constructor(
		@InjectRepository(Shop)
		private readonly shopRepository: Repository<Shop>
	) {}

	async execute(id: number, input: UpdateDto): Promise<boolean> {
		const { name, phone, file } = input

		const foundShop = await this.shopRepository.findOne({
			where: [
				{
					id
				}
			]
		})

		if (foundShop == null) {
			this.logger.error('Throwing because shop does not exists')
			throw new BadRequestException('Estabelecimento não existe')
		}

		let imageUrl: string | undefined = file === null ? undefined : undefined

		if (file) {
			this.logger.log('Uploading avatar url to s3 bucket and returning its url')
			const { mimetype, buffer } = file
			const stream = Readable.from(buffer)
			const [, fileExtension] = mimetype.split('/')

			imageUrl = await uploadStream({
				key: `${foundShop.name.toLowerCase()}-${uuid()}.${fileExtension}`,
				bucket: process.env.AWS_BUCKETNAME as string,
				body: stream
			})
		}

		const updatedShop = await this.shopRepository.update(
			{ id },
			{ name, phone: phone ?? foundShop.phone, imageUrl: imageUrl ?? foundShop.imageUrl }
		)
		return updatedShop.affected === 1
	}
}

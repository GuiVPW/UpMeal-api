import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { SignUpDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'

@Injectable()
export class SignUpUseCase implements BaseUseCase<Client> {
	private logger: Logger = new Logger('SignupClient')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: SignUpDto): Promise<{ client: Client; token: string }> {
		const { name, phone, ...otherFields } = input

		const clientExists = await this.clientRepository.count({
			where: [
				{
					name
				},
				{
					phone
				}
			]
		})

		if (clientExists > 0) {
			this.logger.error('Throwing because client already exists')
			throw new BadRequestException('Cliente já existe')
		}

		const accessId = (Math.random() + 1).toString(36).substring(7)

		const createdClient = await this.clientRepository.save({
			...otherFields,
			name,
			phone,
			accessId
		})

		const { reservations, ...client } = createdClient

		return {
			client,
			token: accessId
		}
	}
}

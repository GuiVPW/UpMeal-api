import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { SignUpDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'

import { CryptService } from '@services/crypt'

@Injectable()
export class SignUpUseCase implements BaseUseCase<Client> {
	private logger: Logger = new Logger('SignupClient')

	constructor(
		private readonly cryptService: CryptService,
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: SignUpDto): Promise<{ client: Client; token: string }> {
		const { name, phone, password, ...otherFields } = input

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

		const hashedPassword = await this.cryptService.encrypt(password)

		const createdClient = await this.clientRepository.save({
			...otherFields,
			name,
			phone,
			password: hashedPassword
		})

		const { reservations, password: clientPassword, ...client } = createdClient

		const token = Buffer.from(`${name}:${password}`).toString('base64')

		return {
			client,
			token: `Basic ${token}`
		}
	}
}

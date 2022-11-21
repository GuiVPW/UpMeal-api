import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { LoginDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'

import { CryptService } from '@services/crypt'

@Injectable()
export class LoginUseCase {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		private readonly cryptService: CryptService,
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: LoginDto): Promise<{ client: Client; token: string }> {
		const { name, password } = input

		const foundClient = await this.clientRepository.findOne({
			where: {
				name
			}
		})

		if (!foundClient) {
			this.logger.error('Client not found')
			throw new NotFoundException('Token inválido ou cliente não existe')
		}
		const { password: shopPassword, ...shopFields } = foundClient

		const comparedPassword = await this.cryptService.compare(
			password,
			shopPassword as string
		)

		if (!comparedPassword) {
			this.logger.error('Incorrect password')
			throw new BadRequestException('Senha incorreta')
		}

		const token = Buffer.from(`${name}:${password}`).toString('base64')

		return {
			token: `Basic ${token}`,
			client: shopFields
		}
	}
}

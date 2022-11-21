import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { LoginDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'

@Injectable()
export class LoginUseCase {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: LoginDto): Promise<{ client: Client; token: string }> {
		const { accessToken } = input

		const foundClient = await this.clientRepository.findOne({
			where: {
				accessId: accessToken
			}
		})

		if (!foundClient) {
			this.logger.error('Client not found')
			throw new NotFoundException('Token inválido ou cliente não existe')
		}

		return {
			token: accessToken,
			client: foundClient
		}
	}
}

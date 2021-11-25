import { formatPhone } from '@common/utils'
import { LoginDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class LoginUseCase {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: LoginDto): Promise<{ client: Client; token: string }> {
		const { accessToken } = input

		let foundClient = await this.clientRepository.findOne({
			where: {
				accessToken
			}
		})

		if (!foundClient) {
			this.logger.error('Client not found')
			throw new NotFoundException('Token inválido ou cliente não existe')
		}

		const { phone: phoneNumbers, phoneDigits, ...fields } = foundClient

		foundClient = {
			...fields,
			phone: formatPhone(phoneDigits as number, phoneNumbers as number)
		}

		return {
			token: accessToken,
			client: foundClient
		}
	}
}

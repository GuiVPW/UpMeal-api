import { BaseUseCase } from '@common/domain/base'
import { formatPhone } from '@common/utils'
import { Client } from '@modules/clients/entities'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FindByIdUseCase implements BaseUseCase<Client> {
	private logger: Logger = new Logger('FindClientById')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(
		id: number,
		select?: (keyof Client)[]
	): Promise<Omit<Client, 'accessId'> | null> {
		const foundClient = await this.clientRepository.findOne({
			where: { id },
			select
		})

		if (!foundClient) {
			this.logger.log('Throwing because no client was found')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const { phone: phoneNumbers, phoneDigits, accessId, ...fields } = foundClient

		return {
			...fields,
			phone: formatPhone(phoneDigits as number, phoneNumbers as number)
		}
	}
}

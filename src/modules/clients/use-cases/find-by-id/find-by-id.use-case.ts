import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { Client } from '@modules/clients/entities'

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

		const { accessId, ...client } = foundClient

		return client
	}
}

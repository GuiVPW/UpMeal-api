import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { FindOneDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'

@Injectable()
export class FindOneUseCase implements BaseUseCase<Client> {
	private logger: Logger = new Logger('LoginPatient')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(where: FindOneDto, method: 'AND' | 'OR' = 'OR'): Promise<Client | null> {
		const keys: Partial<Client> = where

		let foundClient: Client | undefined

		if (method === 'OR') {
			const finalWhere: Array<Record<string, unknown>> = []

			Object.entries(keys).map(([key, value]) =>
				finalWhere.push({ [key as keyof Client]: value })
			)

			foundClient = await this.clientRepository.findOne({ where: finalWhere })
		} else {
			foundClient = await this.clientRepository.findOne({ where: keys })
		}
		this.logger.log('Found client with given data')

		if (!foundClient) {
			this.logger.log('No client was found')
			return null
		}

		return foundClient
	}
}

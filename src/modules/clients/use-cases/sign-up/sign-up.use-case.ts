import { BaseUseCase } from '@common/domain/base'
import { splitPhone } from '@common/utils'
import { SignUpDto } from '@modules/clients/dtos'
import { Client } from '@modules/clients/entities'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SignUpUseCase implements BaseUseCase<Client> {
	private logger: Logger = new Logger('SignupClient')

	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>
	) {}

	async execute(input: SignUpDto): Promise<{ client: Client; token: string }> {
		const { name, phone, ...otherFields } = input

		const [dddPhone, fullPhone] = splitPhone(
			+phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
		)

		const clientExists = await this.clientRepository.count({
			where: [
				{
					name
				},
				{
					phoneDigits: dddPhone,
					phone: fullPhone
				}
			]
		})

		if (clientExists > 0) {
			this.logger.error('Throwing because client already exists')
			throw new BadRequestException('Cliente já existe')
		}

		const accessId = uuid()

		const createdClient = await this.clientRepository.save({
			...otherFields,
			phone: fullPhone,
			phoneDigits: dddPhone,
			accessId
		})

		const { phone: clientPhone, phoneDigits, reservations, ...client } = createdClient

		return {
			token: accessId,
			client: {
				...client,
				phone
			}
		}
	}
}

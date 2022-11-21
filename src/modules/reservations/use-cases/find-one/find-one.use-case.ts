import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseUseCase } from '@common/domain/base'

import { Reservation } from '@modules/reservations/entities'

@Injectable()
export class FindOneUseCase implements BaseUseCase<Reservation> {
	private logger: Logger = new Logger('FindOneReservation')

	constructor(
		@InjectRepository(Reservation)
		private readonly reservationRepository: Repository<Reservation>
	) {}

	async execute(shopId: number, clientId: number): Promise<Reservation | null> {
		const foundReservation = await this.reservationRepository.findOne({
			cache: true,
			where: { shopId, clientId }
		})

		if (!foundReservation) {
			this.logger.log('No reservation was found to client with given id')
			return null
		}

		return foundReservation
	}
}

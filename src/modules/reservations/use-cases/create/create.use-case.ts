import { BaseUseCase } from '@common/domain/base'
import { Reservation } from '@modules/reservations/entities'
import { ShopService } from '@modules/shops/shops.service'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CreateUseCase implements BaseUseCase<Reservation> {
	private logger: Logger = new Logger('CreateReservation')

	constructor(
		private readonly shopService: ShopService,
		@InjectRepository(Reservation)
		private readonly reservationRepository: Repository<Reservation>
	) {}

	async execute(shopId: number, clientId: number): Promise<Reservation> {
		const shopExists = await this.shopService.findById(shopId)

		if (!shopExists) {
			this.logger.error('Throwing because reservation does not exist')
			throw new NotFoundException('Estabelecimento não existe')
		}

		const createdReservation = await this.reservationRepository.save({ clientId, shopId })

		return createdReservation
	}
}

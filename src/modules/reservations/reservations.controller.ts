import { AccessTokenGuard } from '@common/guards'
import { Client } from '@modules/clients/decorators'
import { Controller, Get, Post, Param, UseGuards, HttpCode } from '@nestjs/common'

import { ReservationService } from './reservations.service'

@Controller('shops/{shopId}/reservations')
export class ReservationsController {
	constructor(private readonly reservationService: ReservationService) {}

	@UseGuards(AccessTokenGuard)
	@Get()
	async findOne(@Param('shopId') shopId: number, @Client('id') clientId: number) {
		return this.reservationService.findOne(shopId, clientId)
	}

	@UseGuards(AccessTokenGuard)
	@Post()
	@HttpCode(201)
	async create(@Param('shopId') shopId: number, @Client('id') clientId: number) {
		return this.reservationService.create(shopId, clientId)
	}
}

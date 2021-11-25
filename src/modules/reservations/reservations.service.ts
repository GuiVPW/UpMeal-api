import { Injectable } from '@nestjs/common'

import { CreateUseCase, FindOneUseCase } from './use-cases'

@Injectable()
export class ReservationService {
	constructor(
		private createUseCase: CreateUseCase,
		private findOneUseCase: FindOneUseCase
	) {}

	async create(shopId: number, clientId: number) {
		return this.createUseCase.execute(shopId, clientId)
	}

	async findOne(shopId: number, clientId: number) {
		return this.findOneUseCase.execute(shopId, clientId)
	}
}

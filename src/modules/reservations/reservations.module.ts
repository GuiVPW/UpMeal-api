import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Reservation } from './entities'
import { ReservationsController } from './reservations.controller'
import { ReservationService } from './reservations.service'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Reservation])],
	controllers: [ReservationsController],
	providers: [...UseCases, ReservationService],
	exports: [ReservationService, TypeOrmModule]
})
export class ReservationsModule {}

import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClientsController } from './clients.controller'
import { ClientService } from './clients.service'
import { Client } from './entities'
import { UseCases } from './use-cases'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Client])],
	controllers: [ClientsController],
	providers: [...UseCases, ClientService],
	exports: [ClientService, TypeOrmModule]
})
export class ClientsModule {}

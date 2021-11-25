import { AccessTokenGuard } from '@common/guards'
import { Controller, Get, Post, Body, Param, UseGuards, HttpCode } from '@nestjs/common'

import { ClientService } from './clients.service'
import { Client } from './decorators'
import { LoginDto, SignUpDto } from './dtos'

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	@HttpCode(201)
	async signUp(@Body() input: SignUpDto) {
		return this.clientService.signUp(input)
	}

	@Post('authenticate')
	async login(@Body() input: LoginDto) {
		return this.clientService.login(input)
	}

	@UseGuards(AccessTokenGuard)
	@Get('me')
	async me(@Client('id') id: number) {
		const data = await this.clientService.findById(id)

		return {
			me: data
		}
	}

	@UseGuards(AccessTokenGuard)
	@Get(':id')
	async findById(@Param('id') id: string) {
		const data = await this.clientService.findById(+id)

		return {
			client: data
		}
	}
}

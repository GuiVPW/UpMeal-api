import { Injectable } from '@nestjs/common'

import { SignUpDto, LoginDto, FindOneDto } from './dtos'
import { SignUpUseCase, LoginUseCase, FindOneUseCase, FindByIdUseCase } from './use-cases'

@Injectable()
export class ClientService {
	constructor(
		private signUpUseCase: SignUpUseCase,
		private loginUseCase: LoginUseCase,
		private findOneUseCase: FindOneUseCase,
		private findByIdCase: FindByIdUseCase
	) {}

	async signUp(input: SignUpDto) {
		return this.signUpUseCase.execute(input)
	}

	async login(input: LoginDto) {
		return this.loginUseCase.execute(input)
	}

	async findOne(fields: FindOneDto) {
		return this.findOneUseCase.execute(fields)
	}

	async findById(id: number) {
		return this.findByIdCase.execute(id)
	}
}

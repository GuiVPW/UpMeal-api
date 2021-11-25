import { BasicAuthGuard, AccessTokenGuard } from '@common/guards'
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
	UseGuards,
	HttpCode
} from '@nestjs/common'

import { Shop } from './decorators'
import { FindManyDto, LoginDto, SignUpDto } from './dtos'
import { ShopService } from './shops.service'

@Controller('shops')
export class ShopsController {
	constructor(private readonly shopService: ShopService) {}

	@Post('signup')
	@HttpCode(201)
	async signUp(@Body() input: SignUpDto) {
		return this.shopService.signUp(input)
	}

	@Post('login')
	async login(@Body() input: LoginDto) {
		return this.shopService.login(input)
	}

	@UseGuards(BasicAuthGuard)
	@Get('me')
	async me(@Shop('id') id: number) {
		const data = await this.shopService.findById(id)

		return {
			me: data
		}
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const data = await this.shopService.findById(+id)

		return {
			shop: data
		}
	}

	@UseGuards(AccessTokenGuard)
	@Get()
	async findMany(@Query() queries: FindManyDto) {
		const data = await this.shopService.findMany(queries)

		return {
			shops: data
		}
	}
}

import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
	UseGuards,
	HttpCode,
	UseInterceptors,
	UploadedFile,
	Patch
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { BasicAuthGuard, AccessTokenGuard } from '@common/guards'

import { FoodService } from '@modules/foods/foods.service'

import { Shop } from './decorators'
import { FindManyDto, LoginDto, SignUpDto, UpdateDto } from './dtos'
import { ShopService } from './shops.service'

@Controller('shops')
export class ShopsController {
	constructor(
		private readonly shopService: ShopService,
		private readonly foodService: FoodService
	) {}

	@Post()
	@HttpCode(201)
	@UseInterceptors(FileInterceptor('image'))
	async signUp(@Body() input: SignUpDto, @UploadedFile() file: Express.Multer.File) {
		return this.shopService.signUp({ file, ...input })
	}

	@Post('authenticate')
	async login(@Body() input: LoginDto) {
		const shopData = await this.shopService.login(input)
		const foodData = await this.foodService.findMany(shopData.shop.id, {})

		return {
			shop: {
				...shopData.shop,
				foods: foodData
			},
			token: shopData.token
		}
	}

	@UseGuards(BasicAuthGuard)
	@Get('me')
	async me(@Shop('id') id: number) {
		const shopData = await this.shopService.findById(id)
		const foodData = await this.foodService.findMany(id, {})

		return {
			me: {
				...shopData,
				foods: foodData
			}
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

	@Patch(':id')
	@HttpCode(201)
	@UseInterceptors(FileInterceptor('image'))
	@UseGuards(BasicAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() input: UpdateDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.shopService.update(+id, { file, ...input })
	}
}

import { NestConfig } from '@common/config'
import { HttpExceptionFilter } from '@common/filters'
import { ValidationPipe } from '@common/pipes'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

const bootstrap = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: {
			allowedHeaders: ['Content-type', 'Authorization'],
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			origin: '*'
		}
	})

	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalPipes(new ValidationPipe())

	app.enableCors()

	const configService = app.get(ConfigService)
	const nestConfig = configService.get<NestConfig>('nest')

	const port = nestConfig?.port || 8080

	await app.listen(port, () => {
		Logger.log(`App running at port: ${port}`)
	})
}

bootstrap()

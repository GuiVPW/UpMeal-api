import { ShopService } from '@modules/shops/shops.service'
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common'
import { CryptService } from '@services/crypt'
import { FastifyRequest } from 'fastify'

@Injectable()
export class BasicAuthGuard implements CanActivate {
	private logger: Logger = new Logger('BasicAuthGuard')

	constructor(
		private readonly shopService: ShopService,
		private readonly cryptService: CryptService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as FastifyRequest

		const authHeader = request.headers['authorization']

		if (!authHeader) {
			this.logger.error('No authorization header given')
			throw new HttpException(
				'Você não tem autorização para realizar esse acesso',
				HttpStatus.UNAUTHORIZED
			)
		}

		const splitted = authHeader.split(' ')

		if (!splitted[1]) {
			this.logger.error('Header not valid or without Basic word')
			throw new HttpException(
				'Você não tem autorização para realizar esse acesso',
				HttpStatus.UNAUTHORIZED
			)
		}

		const basicToken = splitted[1]

		let decoded: string[]

		try {
			const decodedToken = Buffer.from(basicToken, 'base64').toString()

			decoded = decodedToken.split(':')
		} catch {
			this.logger.error('Token invalid or expired')
			throw new HttpException('Token inválido ou expirado', HttpStatus.UNAUTHORIZED)
		}

		const shop = await this.shopService.findOne({ email: decoded[0] })

		if (!shop) {
			this.logger.error('Shop does not exists')
			throw new HttpException(
				'Estabelecimento com o email fornecido não existe',
				HttpStatus.NOT_FOUND
			)
		}

		const compared = await this.cryptService.compare(decoded[1], shop.password as string)

		if (!compared) {
			this.logger.error('Wrong password')
			throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED)
		}

		request.user = shop

		return true
	}
}

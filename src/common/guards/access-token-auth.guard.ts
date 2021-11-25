import { ClientService } from '@modules/clients/clients.service'
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AccessTokenGuard implements CanActivate {
	private logger: Logger = new Logger('AccessTokenGuard')

	constructor(private readonly clientService: ClientService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		this.logger.log('Getting HTTP Request')
		const request = context.switchToHttp().getRequest() as Request

		const authHeader = request.headers['authorization']

		if (!authHeader) {
			this.logger.error('No authorization header given')
			throw new HttpException(
				'Você não tem autorização para realizar esse acesso',
				HttpStatus.UNAUTHORIZED
			)
		}

		if (authHeader.length !== 60) {
			this.logger.error('Header not valid or without Basic word')
			throw new HttpException(
				'Você não tem autorização para realizar esse acesso',
				HttpStatus.UNAUTHORIZED
			)
		}

		const client = await this.clientService.findOne({ accessId: authHeader })

		if (!client) {
			this.logger.error('Client does not exists')
			throw new HttpException(
				'Client com o acesso fornecido não existe',
				HttpStatus.NOT_FOUND
			)
		}

		request.user = client

		return true
	}
}

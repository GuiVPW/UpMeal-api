import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Client as ClientEntity } from '../entities'

export const Client = createParamDecorator(
	(data: keyof ClientEntity, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()

		if (req.user) {
			return data ? req.user[data] : req.user
		}

		return data
	}
)

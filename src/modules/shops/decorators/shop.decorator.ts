import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Shop as ShopEntity } from '../entities'

export const Shop = createParamDecorator(
	(data: keyof ShopEntity, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()

		if (req.user) {
			return data ? req.user[data] : req.user
		}

		return data
	}
)

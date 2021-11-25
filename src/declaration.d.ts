import { Client } from '@modules/clients/entities'
import { Shop } from '@modules/shops/entities'

declare module 'express' {
	export interface Request {
		user: Client | Shop
	}
}

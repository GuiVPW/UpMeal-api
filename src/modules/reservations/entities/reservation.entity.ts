import { Client } from '@modules/clients/entities'
import { Shop } from '@modules/shops/entities'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('RESERVA')
export class Reservation {
	@PrimaryGeneratedColumn({ name: 'CD_RESERVA', type: 'number' })
	id!: number

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'number', precision: 5 })
	shopId!: number

	@Column({ name: 'CD_CLIENTE', type: 'number', precision: 5 })
	clientId!: number

	@ManyToOne(() => Shop, shop => shop.foods, { eager: true })
	@JoinColumn({
		name: 'RESERVA_ESTAB'
	})
	shop!: Shop

	@ManyToOne(() => Client, client => client.reservations, { eager: true })
	@JoinColumn({
		name: 'RESERVA_CLIENTE'
	})
	client!: Client
}

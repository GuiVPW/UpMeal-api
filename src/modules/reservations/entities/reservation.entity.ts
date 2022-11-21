import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

/* eslint-disable import/no-cycle */
import { Client } from '@modules/clients/entities'
import { Shop } from '@modules/shops/entities'
/* eslint-enable import/no-cycle */

@Entity('RESERVA')
export class Reservation {
	@PrimaryGeneratedColumn({ name: 'CD_RESERVA', type: 'int' })
	id!: number

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'int', precision: 5 })
	shopId!: number

	@Column({ name: 'CD_CLIENTE', type: 'int', precision: 5 })
	clientId!: number

	@ManyToOne(() => Shop, shop => shop.foods, { eager: true })
	@JoinColumn({
		name: 'CD_ESTABELECIMENTO',
		referencedColumnName: 'id'
	})
	shop!: Shop

	@ManyToOne(() => Client, client => client.reservations, { eager: true })
	@JoinColumn({
		name: 'CD_CLIENTE',
		referencedColumnName: 'id'
	})
	client!: Client
}

import { Client } from '@modules/clients/entities'
import { Shop } from '@modules/shops/entities'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('RESERVA')
export class Reservation {
	@PrimaryGeneratedColumn({ name: 'CD_RESERVA', type: 'int' })
	id!: number

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'int' })
	shopId!: number

	@Column({ name: 'CD_CLIENTE', type: 'int' })
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

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserModel } from '@common/domain/entities'

// eslint-disable-next-line import/no-cycle
import { Reservation } from '@modules/reservations/entities'

@Entity('CLIENTE')
export class Client extends UserModel {
	@PrimaryGeneratedColumn({ name: 'CD_CLIENTE' })
	id!: number

	@Column({ name: 'NM_CLIENTE', type: 'varchar', length: 50 })
	name!: string

	@Column({ name: 'ID_ACESSO', type: 'varchar', length: 10 })
	accessId!: string

	@OneToMany(() => Reservation, reservation => reservation.client)
	reservations?: Reservation[]
}

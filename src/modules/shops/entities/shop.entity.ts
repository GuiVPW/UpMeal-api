import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserModel } from '@common/domain/entities'

/* eslint-disable import/no-cycle */
import { Food } from '@modules/foods/entities'
import { Reservation } from '@modules/reservations/entities'
/* eslint-enable import/no-cycle */

@Entity('ESTABELECIMENTO')
export class Shop extends UserModel {
	@PrimaryGeneratedColumn({ name: 'CD_ESTABELECIMENTO', type: 'int' })
	id!: number

	@Column({ name: 'NM_ESTABELECIMENTO', type: 'varchar', length: 50 })
	name!: string

	@Column({ name: 'DS_EMAIL', unique: true, type: 'varchar', length: 50 })
	email!: string

	@Column({ name: 'DS_SENHA', type: 'varchar', length: 75 })
	password?: string

	@Column({ name: 'DS_IMAGEM_URL', type: 'varchar', length: 100, nullable: true })
	imageUrl?: string

	@Column({ name: 'VL_LATITUDE', type: 'int' })
	latitude!: number

	@Column({ name: 'VL_LONGITUDE', type: 'int' })
	longitude!: number

	@OneToMany(() => Food, food => food.shop)
	foods!: Food[]

	@OneToMany(() => Reservation, reservation => reservation.shop)
	reservations?: Reservation[]
}

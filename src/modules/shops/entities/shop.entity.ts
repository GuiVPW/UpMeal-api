import { UserModel } from '@common/domain/entities'
import { Food } from '@modules/foods/entities'
import { Reservation } from '@modules/reservations/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ESTABELECIMENTO')
export class Shop extends UserModel {
	@PrimaryGeneratedColumn({ name: 'CD_ESTABELECIMENTO', type: 'number' })
	id!: number

	@Column({ name: 'NM_ESTABELECIMENTO', type: 'varchar2', length: 50 })
	name!: string

	@Column({ name: 'DS_EMAIL', unique: true, type: 'varchar2', length: 50 })
	email!: string

	@Column({ name: 'DS_SENHA', type: 'varchar2', length: 75 })
	password?: string

	@Column({ name: 'DS_IMAGEM_URL', type: 'varchar2', length: 100, nullable: true })
	imageUrl?: string

	@Column({ name: 'VL_LATITUDE', type: 'number', scale: 6, precision: 8 })
	latitude!: number

	@Column({ name: 'VL_LONGITUDE', type: 'number', scale: 6, precision: 9 })
	longitude!: number

	@OneToMany(() => Food, food => food.shop, { eager: false })
	foods: Food[] = []

	@OneToMany(() => Reservation, reservation => reservation.shop)
	reservations?: Reservation[]
}

import { UserModel } from '@common/domain/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('CLIENTE')
export class Client extends UserModel {
	@PrimaryGeneratedColumn({ name: 'CD_CLIENTE', type: 'number' })
	id!: number

	@Column({ name: 'NM_CLIENTE', type: 'varchar2', length: 50 })
	name!: string

	@Column({ name: 'ID_ACCESSO', type: 'varchar2', length: 36 })
	@OneToMany(() => Reservation, reservation, reservation.client)
	reservations?: Reservation[]
}

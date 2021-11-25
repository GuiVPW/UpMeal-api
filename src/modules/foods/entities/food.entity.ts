import { Shop } from '@modules/shops/entities'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ALIMENTO')
export class Food {
	@PrimaryGeneratedColumn({ name: 'CD_ALIMENTO', type: 'number' })
	id!: number

	@Column({ name: 'NM_ALIMENTO', type: 'varchar2', length: 50 })
	name!: string

	@Column({ name: 'VL_DISPONIBILIDADE', type: 'number', precision: 1, default: 1 })
	isAvailable!: number

	@Column({ name: 'NR_QUANTIDADE', type: 'number', precision: 6, scale: 2 })
	quantity!: number

	@Column({ name: 'DT_VALIDADE', type: 'date' })
	validity!: Date

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'number', precision: 5 })
	shopId!: number

	@ManyToOne(() => Shop, shop => shop.foods)
	@JoinColumn({
		name: 'CD_ESTABELECIMENTO',
		referencedColumnName: 'id'
	})
	shop!: Shop
}

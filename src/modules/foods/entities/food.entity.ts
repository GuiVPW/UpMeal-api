import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// eslint-disable-next-line import/no-cycle
import { Shop } from '@modules/shops/entities'

@Entity('ALIMENTO')
export class Food {
	@PrimaryGeneratedColumn({ name: 'CD_ALIMENTO', type: 'int' })
	id!: number

	@Column({ name: 'NM_ALIMENTO', type: 'varchar', length: 50 })
	name!: string

	@Column({ name: 'VL_DISPONIBILIDADE', type: 'int', precision: 1, default: 1 })
	isAvailable!: boolean

	@Column({ name: 'NR_QUANTIDADE', type: 'int', precision: 6 })
	quantity!: number

	@Column({ name: 'DT_VALIDADE', type: 'date' })
	validationDate!: Date

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'int', precision: 5 })
	shopId!: number

	@ManyToOne(() => Shop, shop => shop.foods)
	@JoinColumn({
		name: 'CD_ESTABELECIMENTO',
		referencedColumnName: 'id'
	})
	shop!: Shop
}

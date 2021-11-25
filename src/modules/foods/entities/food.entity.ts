import { Shop } from '@modules/shops/entities'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ALIMENTO')
export class Food {
	@PrimaryGeneratedColumn({ name: 'CD_ALIMENTO', type: 'number' })
	id!: number

	@Column({ name: 'NM_ALIMENTO', type: 'varchar2', length: 50 })
	name!: string

	@Column({ name: 'VL_DISPONIBILIDADE', type: 'boolean' })
	isAvailable!: boolean

	@Column({ name: 'NR_QUANTIDADE', type: 'number', precision: 6, scale: 2 })
	quantity!: number

	@Column({ name: 'DT_VALIDADE', type: 'date' })
	validity!: Date

	@Column({ name: 'CD_ESTABELECIMENTO', type: 'number', precision: 5 })
	shopId!: number

	@ManyToOne(() => Shop, shop => shop.foods, { eager: true })
	@JoinColumn({
		name: 'ALIMENTO_ESTAB'
	})
	shop!: Shop
}

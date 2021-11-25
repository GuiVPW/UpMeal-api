import { Column } from 'typeorm'

export abstract class UserModel {
	@Column({ name: 'DS_CIDADE', type: 'varchar2', length: 30 })
	city!: string

	@Column({ name: 'DS_UF', type: 'char', length: 2 })
	state!: string

	@Column({ name: 'NR_TELEFONE', type: 'number', precision: 9, unique: true })
	phone?: number | string

	@Column({ name: 'NR_TELEFONE_DDD', type: 'number', precision: 2 })
	phoneDigits?: number
}

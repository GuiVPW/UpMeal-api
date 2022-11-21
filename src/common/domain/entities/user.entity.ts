import { Column } from 'typeorm'

export abstract class UserModel {
	@Column({ name: 'DS_CIDADE', type: 'varchar', length: 30 })
	city!: string

	@Column({ name: 'DS_UF', type: 'char', length: 2 })
	state!: string

	@Column({ name: 'NR_TELEFONE', type: 'varchar', unique: true })
	phone?: string
}

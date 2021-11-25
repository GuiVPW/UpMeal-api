import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm'

export class CustomNamingStrategy
	extends DefaultNamingStrategy
	implements NamingStrategyInterface
{
	foreignKeyName(tableOrName: Table | string, _: any, referencedTablePath?: string) {
		return `FK_GS_${
			typeof tableOrName === 'string'
				? tableOrName.replace('T_GS', '').toUpperCase()
				: tableOrName.name.replace('T_GS', '').toUpperCase()
		}_${referencedTablePath?.toUpperCase()}`
	}
}

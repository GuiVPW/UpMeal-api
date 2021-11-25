import { IsBoolean } from 'class-validator'

export class FindManyDto {
	@IsBoolean()
	isAvailable?: boolean = true
}

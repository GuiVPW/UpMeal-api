import { IsOptional, IsString } from 'class-validator'

export class FindManyDto {
	@IsString()
	@IsOptional()
	name?: string
}

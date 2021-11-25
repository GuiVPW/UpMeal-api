import { IsOptional, IsString } from 'class-validator'

export class FindOneDto {
	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	accessId?: string
}

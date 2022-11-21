import { IsOptional, IsEmail, IsString, IsPhoneNumber } from 'class-validator'

export class FindOneDto {
	@IsEmail()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	name?: string

	@IsPhoneNumber('BR')
	@IsOptional()
	phone?: string
}

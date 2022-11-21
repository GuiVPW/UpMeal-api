import { IsPhoneNumber, IsString, Length, MinLength } from 'class-validator'

export class SignUpDto {
	@IsString()
	@Length(2, 50)
	name!: string

	@IsPhoneNumber('BR')
	phone!: string

	@IsString()
	@MinLength(6)
	password!: string

	@IsString()
	city!: string

	@IsString()
	@Length(2, 2)
	state!: string
}

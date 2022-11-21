import { IsPhoneNumber, IsString, Length } from 'class-validator'

export class SignUpDto {
	@IsString()
	@Length(2, 50)
	name!: string

	@IsPhoneNumber('BR')
	phone!: string

	@IsString()
	city!: string

	@IsString()
	@Length(2, 2)
	state!: string
}

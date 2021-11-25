import { IsString, Length } from 'class-validator'

export class SignUpDto {
	@IsString()
	@Length(2, 50)
	name!: string

	@IsString()
	phone!: string

	@IsString()
	city!: string

	@IsString()
	@Length(2, 2)
	state!: string
}

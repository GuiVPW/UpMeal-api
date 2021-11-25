import { Exclude } from 'class-transformer'
import { IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator'

export class SignUpDto {
	@IsEmail()
	email!: string

	@IsString()
	@Length(2, 50)
	name!: string

	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
	@IsString()
	password!: string

	@IsString()
	phone!: string

	@Exclude()
	file?: Express.Multer.File

	@IsNumber()
	latitude!: number

	@IsNumber()
	longitude!: number

	@IsString()
	city!: string

	@IsString()
	@Length(2, 2)
	state!: string
}

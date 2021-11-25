import { Exclude } from 'class-transformer'
import { IsEmail, IsNumber, IsString, Length, MinLength } from 'class-validator'

export class SignUpDto {
	@IsEmail()
	email!: string

	@IsString()
	@Length(2, 50)
	name!: string

	@IsString()
	@MinLength(6)
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

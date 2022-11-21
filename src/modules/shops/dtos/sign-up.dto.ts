import { Exclude } from 'class-transformer'
import {
	IsEmail,
	IsNumberString,
	IsPhoneNumber,
	IsString,
	Length,
	MinLength
} from 'class-validator'

export class SignUpDto {
	@IsEmail()
	email!: string

	@IsString()
	@Length(2, 50)
	name!: string

	@IsString()
	@MinLength(6)
	password!: string

	@IsPhoneNumber('BR')
	phone!: string

	@Exclude()
	file?: Express.Multer.File

	@IsNumberString()
	latitude!: string

	@IsNumberString()
	longitude!: string

	@IsString()
	city!: string

	@IsString()
	@Length(2, 2)
	state!: string
}

import { Exclude } from 'class-transformer'
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator'

export class UpdateDto {
	@IsString()
	@Length(2, 50)
	@IsOptional()
	name?: string

	@IsPhoneNumber('BR')
	phone?: string

	@Exclude()
	@IsOptional()
	file?: Express.Multer.File
}

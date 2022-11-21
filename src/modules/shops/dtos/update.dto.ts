import { Exclude } from 'class-transformer'
import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateDto {
	@IsString()
	@Length(2, 50)
	@IsOptional()
	name?: string

	@Exclude()
	@IsOptional()
	file?: Express.Multer.File
}

import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateDto {
	@IsString()
	@IsOptional()
	name?: string

	@IsNumber({ maxDecimalPlaces: 1 })
	@IsOptional()
	quantity?: number

	@IsDateString()
	@IsOptional()
	validationDate?: string

	@IsBoolean()
	@IsOptional()
	isAvailable?: boolean
}

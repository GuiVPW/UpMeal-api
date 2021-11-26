import { IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateDto {
	@IsString()
	name!: string

	@IsNumber({ maxDecimalPlaces: 2 })
	quantity!: number

	@IsDateString()
	validationDate!: string
}

import { IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateDto {
	@IsString()
	name!: string

	@IsNumber({ maxDecimalPlaces: 1 })
	quantity!: number

	@IsDateString()
	validity!: string
}

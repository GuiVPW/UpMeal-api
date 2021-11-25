import { Provider } from '@nestjs/common'

export * from './create'
export * from './update'
export * from './find-many'
export * from './delete'

export const UseCases = Object.values(exports).filter(
	value => typeof value === 'function' && /UseCase/i.test(value.name)
) as Provider[]

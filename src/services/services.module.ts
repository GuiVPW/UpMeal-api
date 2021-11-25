import { Global, Module } from '@nestjs/common'

import { CryptService } from './crypt'
import { DatabaseModule } from './database'

@Global()
@Module({
	imports: [DatabaseModule],
	providers: [CryptService],
	exports: [CryptService, DatabaseModule]
})
export class ServicesModule {}

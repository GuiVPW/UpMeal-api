import { config } from '@common/config'
import { ClientsModule } from '@modules/clients/clients.module'
import { FoodsModule } from '@modules/foods/foods.module'
import { ShopsModule } from '@modules/shops/shops.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServicesModule } from '@services/services.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		ServicesModule,
		FoodsModule,
		ShopsModule,
		ClientsModule
	]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { ProvidersModule } from './providers/providers.module';
import { TvaModule } from './tva/tva.module';
import { ClientsModule } from './clients/clients.module';
import { ModelesModule } from './modeles/modeles.module';
import { BrandsModule } from './brands/brands.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { PaimentsModule } from './paiments/paiments.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // À utiliser uniquement en développement
    }),
    UsersModule,
    AuthModule,
    SharedModule,
    CategoryModule,
    ProvidersModule,
    TvaModule,
    ClientsModule,
    ModelesModule,
    BrandsModule,
    ProductModule,
    RoleModule,
    ImageModule,
    PaimentsModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

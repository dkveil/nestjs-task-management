import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'production';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: true,
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}

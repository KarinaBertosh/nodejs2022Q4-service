import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './database/db.module';
import { UserModule } from './modules/users/user.module';
import { TrackModule } from './modules/tracks/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    DbModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize: false,
      migrationsTableName: process.env.POSTGRES_DB,
    }),
  ],
})
export class AppModule {}

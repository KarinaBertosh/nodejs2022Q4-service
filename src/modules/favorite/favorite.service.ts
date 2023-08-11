import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotExist, EntityNotFound } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { Favorites } from './favorite.entity';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../tracks/track.service';

const types = [entities.track, entities.album, entities.artist];

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoriteRepository: Repository<Favorites>,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) { }

  findAll() {
    // return this.db.fav.findAll();
  }

  async create(id: string, type: string) {
    // if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    // let item;
    // switch (type) {
    //   case entities.artist:
    //     item = this.db.artist.findOne(id);
    //     break;
    //   case entities.album:
    //     item = this.db.album.findOne(id);
    //     break;
    //   case entities.track:
    //     item = this.db.track.findOne(id);
    //     break;
    // }
    // if (!item) {
    //   throw new EntityNotFound(type);
    // }
    // return await this.db.fav.save(id, type);
  }

  async delete(id: string, type: string) {
    // if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    // return this.db.fav.delete(id, type);
  }
}

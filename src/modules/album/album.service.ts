import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { randomUUID } from 'crypto';
import { Album } from 'src/utils/types';
import { DB } from 'src/database/db.service';
import { ArtistService } from '../artist/artist.service';
import { ArtistNotExist } from 'src/errors/errors';

@Injectable()
export class AlbumService {
  public type = 'albums';
  constructor(private db: DB, private artistService: ArtistService) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  findAlbum(entity: any) {
    return this.db.findOne(this.type, entity.albumId);
  }

  create(dto: AlbumDto) {
    const album = this.db.create(this.type, {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });

    const artist = this.artistService.findOne(dto.artistId);
    if (!artist) throw new ArtistNotExist();
    return album;
  }

  update(album: any, newData: Album) {
    return this.db.update(this.type, album, newData);
  }

  delete(album: any) {
    return this.db.delete(this.type, album);
  }

  makeNull(album: any) {
    return this.db.makeNull(this.type, album);
  }
}

import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) { }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string, errors = false) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album && !errors) throw new EntityNotExist(entities.album);
    if (!album && errors) return null;

    return album;
  }

  async create(dto: AlbumDto) {
    const newAlbum = new Album({ ...dto });
    newAlbum.id = randomUUID();
    const createdTrack = await this.albumRepository.create(newAlbum);
    return await this.albumRepository.save(createdTrack);
  }

  async update(id: string, updateDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotExist(entities.album);

    const updatedAlbum = Object.assign(album, updateDto);
    return await this.albumRepository.save(updatedAlbum);
  }

  async delete(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotExist(entities.album);
    await this.albumRepository.delete(id);
  }
}

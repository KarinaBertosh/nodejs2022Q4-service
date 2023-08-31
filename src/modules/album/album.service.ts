import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { EntityNotContent, EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private artistService: ArtistService,
  ) { }

  private checkAndMakeCorrectIdArtist = async (
    options: AlbumDto | UpdateAlbumDto,
  ): Promise<void> => {
    const artist = await this.artistService.findOne(options.artistId);

    if (!artist) {
      options.artistId = null;
    }
  };


  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  async create(dto: AlbumDto) {
    if (dto.artistId) {
      await this.checkAndMakeCorrectIdArtist(dto);
    }
    const album = await this.albumRepository.create(dto);
    return await this.albumRepository.save(album);
  }

  async update(id: string, updateDto: UpdateAlbumDto) {
    if (updateDto.artistId) {
      await this.checkAndMakeCorrectIdArtist(updateDto);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (!album) return null;

    await this.albumRepository.update({ id }, updateDto);
    return await this.albumRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityNotExist(entities.album);
    await this.albumRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto.js';
import { UpdateFolderDto } from './dto/update-folder.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './entities/folder.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name) private readonly foldetModel: Model<Folder>,
  ) {}

  create(createFolderDto: CreateFolderDto) {
    return this.foldetModel.create({
      ...createFolderDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  }

  findAll() {
    return `This action returns all folders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}

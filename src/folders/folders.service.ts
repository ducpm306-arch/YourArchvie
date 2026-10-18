import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto.js';
import { UpdateFolderDto } from './dto/update-folder.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './entities/folder.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name) private readonly folderModel: Model<Folder>,
  ) {}

  create(createFolderDto: CreateFolderDto) {
    return this.folderModel.create({
      ...createFolderDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  }

  findAll() {
    return this.folderModel
      .find({ isDeleted: false })
      .populate('parent')
      .exec();
  }

  async findOne(id: string) {
    const folder = await this.folderModel.findById(id);
    if (!folder || folder.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return folder;
  }

  update(id: string, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: string) {
    return `This action removes a #${id} folder`;
  }
}

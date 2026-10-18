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

  async update(id: string, updateFolderDto: UpdateFolderDto) {
    const folder = await this.folderModel
      .findByIdAndUpdate(
        id,
        updateFolderDto,
        { new: true, runValidators: true },
      )
      .populate('parent')
      .exec();
    if (!folder || folder.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return folder;
  }

  async remove(id: string) {
    await this.findOne(id);

    const folder = await this.folderModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!folder) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return folder;
  }
}

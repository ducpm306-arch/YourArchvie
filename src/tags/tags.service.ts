import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return this.tagModel.create({
      ...createTagDto,
      isDeleted: false,
    });
  }

  async findAll() {
    return this.tagModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string) {
    const tag = await this.tagModel.findById(id);
    if (!tag) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.tagModel
      .findByIdAndUpdate(
        id,
        updateTagDto,
        { new: true, runValidators: true },
      )
      .exec();

    if (!tag || tag.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return tag;
  }

  async remove(id: string) {
    await this.findOne(id);

    const tag = await this.tagModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!tag || tag.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return tag;
  }
}

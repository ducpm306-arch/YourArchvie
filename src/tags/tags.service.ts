import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity.js';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return this.tagModel.create({
      ...createTagDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  }

  async findAll() {
    return this.tagModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string) {
    const tag = await this.tagModel.findById(id);
    if (!tag || tag.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return tag;
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: string) {
    return `This action removes a #${id} tag`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { UpdateDocumentDto } from './dto/update-document.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './entities/document.entity.js';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private readonly documentModel: Model<Document>,
  ) {}

  create(createDocumentDto: CreateDocumentDto) {
    return this.documentModel.create({
      ...createDocumentDto,
      isDeleted: false,
    });
  }

  findAll() {
    return this.documentModel
      .find({ isDeleted: false })
      .populate('tag', 'document')
      .exec();
  }

  async findOne(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document || document.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentModel
      .findByIdAndUpdate(
        id,
        updateDocumentDto,
        { new: true, runValidators: true },
      )
      .populate('tag', 'document')
      .exec();
    if (!document || document.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return document;
  }

  async remove(id: string) {
    await this.findOne(id);

    const document = await this.documentModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!document) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return document;
  }
}

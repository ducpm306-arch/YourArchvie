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
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  }

  findAll() {
    return this.documentModel
      .find({ isDeleted: false })
      .populate('tag', 'folder')
      .exec();
  }

  async findOne(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document || document.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return document;
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: string) {
    return `This action removes a #${id} document`;
  }
}

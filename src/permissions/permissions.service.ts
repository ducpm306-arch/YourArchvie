import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './entities/permission.entity.js';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.permissionModel.create({
      ...createPermissionDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  }

  async findAll() {
    return this.permissionModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string) {
    const permission = await this.permissionModel.findById(id);
    if (!permission || permission.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return permission;
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: string) {
    return `This action removes a #${id} permission`;
  }
}

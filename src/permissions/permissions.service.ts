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

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionModel
      .findByIdAndUpdate(
        id,
        updatePermissionDto,
        { new: true, runValidators: true },
      )
      .exec();
    if (!permission || permission.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return permission;
  }

  async remove(id: string) {
    await this.findOne(id);

    const permission = await this.permissionModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!permission) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return permission;
  }
}

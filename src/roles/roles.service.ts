import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create({
      ...createRoleDto,
      isDeleted: false,
    });
  }

  async findAll() {
    return this.roleModel
      .find({ isDeleted: false })
      .populate('permissions')
      .exec();
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id);
    if (!role || role.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel
      .findByIdAndUpdate(
        id,
        updateRoleDto,
        { new: true, runValidators: true },
      )
      .populate('permissions')
      .exec();
    if (!role || role.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return role;
  }

  async remove(id: string) {
    await this.findOne(id);

    const role = await this.roleModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!role) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return role;
  }
}

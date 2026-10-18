import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      ...createUserDto,
      isDeleted: false,
    });
  }

  async findAll() {
    return this.userModel.find({ isDeleted: false }).populate('role').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true, runValidators: true },
      )
      .populate('role')
      .exec();

    if (!user || user.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return user;
  }

  async remove(id: string) {
    await this.findOne(id);

    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return user;
  }
}

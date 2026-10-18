import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create({
      ...createProjectDto,
      isDeleted: false,
    });
  }

  async findAll() {
    return this.projectModel
      .find({ isDeleted: false })
      .populate('owner')
      .exec();
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project || project.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        updateProjectDto,
        { new: true, runValidators: true },
      )
      .populate('owner')
      .exec();

    if (!project || project.isDeleted) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }
    return project;
  }

  async remove(id: string) {
    await this.findOne(id);

    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true, runValidators: true },
      )
      .exec();

    if (!project) {
      throw new NotFoundException('Không tìm thấy dữ liệu');
    }

    return project;
  }
}

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
      createdAt: new Date(),
      updatedAt: new Date(),
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

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}

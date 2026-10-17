import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { PermissionsModule } from './permissions/permissions.module.js';
import { RolesModule } from './roles/roles.module.js';
import { DocumentsModule } from './documents/documents.module.js';
import { FoldersModule } from './folders/folders.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [UsersModule, ProjectsModule, FoldersModule, DocumentsModule, RolesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

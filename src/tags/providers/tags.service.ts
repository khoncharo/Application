import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/providers/prisma.service';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({ orderBy: { name: 'asc' } });
  }

  async findOrCreate(createTagDto: CreateTagDto) {
    const normalized = createTagDto.name.trim().toLowerCase();
    return this.prisma.tag.upsert({
      where: { name: normalized },
      update: {},
      create: { name: normalized },
    });
  }

  async findByIds(ids: string[]) {
    return this.prisma.tag.findMany({ where: { id: { in: ids } } });
  }
}

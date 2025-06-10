import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { Pivot } from '@prisma/client';

@Injectable()
export class PivotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async findAll() {
    return this.prisma.pivot.findMany();
  }

  async findOne(id: number) {
    const pivot = await this.prisma.pivot.findUnique({ where: { id } });
    if (!pivot) {
      throw new NotFoundException(`Pivot ${id} not found`);
    }
    return pivot;
  }

  async create(data: any) {
    return this.prisma.pivot.create({ data });
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    const updated = await this.prisma.pivot.update({ where: { id }, data });
    this.websocketGateway.emitPivotUpdate(updated);
    return updated;
  }
  async remove(id: number) {
    await this.findOne(id); // Isso garante que lance erro se não existir
    return this.prisma.pivot.delete({ where: { id } });
  }
  
}

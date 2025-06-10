import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Farm } from '@prisma/client';

@Injectable()
export class FarmService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma nova fazenda
  async create(data: { name: string }): Promise<Farm> {
    return this.prisma.farm.create({
      data: {
        name: data.name,
      },
    });
  }

  // Retorna todas as fazendas
  async findAll(): Promise<Farm[]> {
    return this.prisma.farm.findMany();
  }

  // Retorna uma fazenda por ID (lança NotFoundException se não existir)
  async findOne(id: number): Promise<Farm> {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
    });
    if (!farm) {
      throw new NotFoundException(`Farm com ID ${id} não encontrado`);
    }
    return farm;
  }

  // Atualiza o nome de uma fazenda (verifica existência antes)
  async update(id: number, data: { name?: string }): Promise<Farm> {
    await this.findOne(id);
    return this.prisma.farm.update({
      where: { id },
      data,
    });
  }

  // Remove uma fazenda (verifica existência antes)
  async remove(id: number): Promise<Farm> {
    await this.findOne(id);
    return this.prisma.farm.delete({
      where: { id },
    });
  }
}

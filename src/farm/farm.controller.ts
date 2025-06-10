import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { FarmService } from './farm.service';
  import { Farm } from '@prisma/client';
  
  @Controller('farms')
  export class FarmController {
    constructor(private readonly farmService: FarmService) {}
  
    // POST /farms
    @Post()
    async create(@Body('name') name: string): Promise<Farm> {
      return this.farmService.create({ name });
    }
  
    // GET /farms
    @Get()
    async findAll(): Promise<Farm[]> {
      return this.farmService.findAll();
    }
  
    // GET /farms/:id
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
      return this.farmService.findOne(id);
    }
  
    // PATCH /farms/:id
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body('name') name: string,
    ): Promise<Farm> {
      return this.farmService.update(id, { name });
    }
  
    // DELETE /farms/:id
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
      return this.farmService.remove(id);
    }
  }
  
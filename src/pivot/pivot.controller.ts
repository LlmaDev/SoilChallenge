import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { PivotService } from './pivot.service';

@Controller('pivots')
export class PivotController {
  constructor(private readonly pivotService: PivotService) {}

  @Get()
  findAll() {
    return this.pivotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pivotService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: any) {
    return this.pivotService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.pivotService.update(Number(id), data);
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.pivotService.remove(id);
  }

}

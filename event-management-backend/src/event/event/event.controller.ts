import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param, Delete , UploadedFile, UseInterceptors} from '@nestjs/common';
import { EventService } from './event.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { UpdateEventDto } from 'src/dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Express } from 'express'; // Required for Express.Multer.File type



@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo')) // Handle file upload
  create(
    @Body() dto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ) {
    const base64 = file?.buffer.toString('base64'); //  Convert to base64
    return this.eventService.create({ ...dto, photo: base64 }, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.eventService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    console.log('Logged in user ID:', req.user.userId);
    return this.eventService.findById(id, req.user.userId);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  )  {
    const base64 = file?.buffer.toString('base64');
    const updatedDto = { ...dto, ...(base64 && { photo: base64 }) };
    return this.eventService.update(id, updatedDto, req.user.userId);
  }


  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.eventService.delete(id, req.user.userId);
  }
}



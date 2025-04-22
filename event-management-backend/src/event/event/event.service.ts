
import { Injectable, BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { UpdateEventDto } from 'src/dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(dto: CreateEventDto, userId: string): Promise<any> {

    const existingEvent = await this.eventModel.findOne({
      eventName: dto.eventName,
      organizerId: userId,
    });
  
    if (existingEvent) {
      // Throwing an error so that NestJS sends a proper JSON error response
      throw new BadRequestException('Event already exists for this user.');
    }
  
    const newEvent = await this.eventModel.create({ ...dto, organizerId: userId });
  
    return {
      success: true,
      message: 'Event created successfully.',
      _id: newEvent._id, //Explicitly return _id for frontend navigation
      data: newEvent,
    };
  }
  
  

  
  
  async update(id: string, dto: UpdateEventDto, userId: string): Promise<any> {
    const updatedEvent = await this.eventModel.findOneAndUpdate(
      { _id: id, organizerId: userId },
      dto,
      { new: true }
    );
    
    if (!updatedEvent) {
      return {
        success: false,
        message: 'Event not found or you are not authorized to update it.',
      };
    }
    
    return {
      success: true,
      message: 'Event updated successfully.',
      data: updatedEvent,
    };
  }

  async findAllByUser(userId: string): Promise<any> {
    const events = await this.eventModel.find({ organizerId: userId });

    return {
      success: true,
      message: events.length
        ? 'Events retrieved successfully.'
        : 'No events found for this user.',
      data: events,
    };
  }
  
  async findById(id: string, userId: string) {
    const event = await this.eventModel.findOne({ _id: id, organizerId: userId });

  if (!event) {
    throw new NotFoundException('Event not found or access denied');
  }

  return {
    message: 'Event fetched successfully',
    event,
  };

}
  

  
async delete(id: string, userId: string): Promise<any> {
  const deletedEvent = await this.eventModel.findOneAndDelete({ _id: id, organizerId: userId });

  if (!deletedEvent) {
    return {
      success: false,
      message: 'Event not found or you are not authorized to delete it.',
    };
  }

  return {
    success: true,
    message: 'Event deleted successfully.',
    data: deletedEvent,
  };
}

  
}


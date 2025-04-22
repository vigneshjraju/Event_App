export class CreateEventDto {
    eventName: string;
    location: string;
    ticketPrice: number;
    date: string;
    description: string;
    photo?: string; // Optional, because multer sets it in controller
    
  }
  
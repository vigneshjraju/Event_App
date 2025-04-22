import { Controller, Post, Body ,Res, UseGuards, Get, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { User } from './user.schema';
import { LoginDto } from './dto/login.dto';

import { Request } from 'express';
import { RequestWithUser } from 'src/types/RequestWithUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body() body: { 

      name: string;
      email: string;
      password: string;
      role: 'organizer' | 'customer'  
    }, 
  ): Promise<{ message: string; newUser: User }> {
    return this.userService.signup(body.name, body.email, body.password); //, body.role
  }

  


  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, message } = await this.userService.login(loginDto.email, loginDto.password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'lax',
    });

    return { message };
  }

  // ✅ Protected route to get current user details
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.userService.getUserById(userId);
  }

}


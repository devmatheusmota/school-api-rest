import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller('/')
export class AppController {
  @Get('/')
  async getHello() {
    return {
      status: 'OK',
      message: 'API working fine.',
      documentation: `${process.env.API_URL || 'http://localhost:3000'}/docs`,
    };
  }
}

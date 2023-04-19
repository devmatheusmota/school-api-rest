import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        password: {
          type: 'string',
          example: '123456',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        auth: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjQyZjQxZjQwZjQwMDA0ZjQwZjQwMCIsImlhdCI6MTYxNjQyNjQ2MiwiZXhwIjoxNjE',
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Email and/or password invalid!',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },
        message: {
          type: 'string',
          example: 'Email and/or password are incorrect!',
        },
        error: {
          type: 'string',
          example: 'Unauthorized',
        },
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}

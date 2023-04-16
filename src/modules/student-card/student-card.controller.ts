import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentCardService } from './student-card.service';
import { CreateStudentCardDto } from './dto/create-student-card.dto';
import { UpdateStudentCardDto } from './dto/update-student-card.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { AuthGuard } from '@nestjs/passport';
import { ROLE, Roles } from 'src/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Student Card')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('student-card')
export class StudentCardController {
  constructor(private readonly studentCardService: StudentCardService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Criação de Carteira de Estudante' })
  async create(@Body() createStudentCardDto: CreateStudentCardDto) {
    try {
      const studentCard = await this.studentCardService.create(
        createStudentCardDto,
      );

      return {
        message: 'Student card created successfully.',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Listagem de Carteiras de Estudante' })
  async findAll() {
    try {
      const studentCards = await this.studentCardService.findAll();

      return {
        message: 'Student Cards',
        studentCards,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Listagem de Carteira de Estudante' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
  async findOne(@Param('id') id: string) {
    try {
      const studentCard = await this.studentCardService.findOne(id);

      return {
        message: 'Student Card',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Atualização de Carteira de Estudante' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentCardDto: UpdateStudentCardDto,
  ) {
    try {
      const studentCard = await this.studentCardService.update(
        id,
        updateStudentCardDto,
      );

      return {
        message: 'Student card updated successfully.',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.update.name);
    }
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Remoção de Carteira de Estudante' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
  async remove(@Param('id') id: string) {
    try {
      await this.studentCardService.remove(id);

      return {
        message: 'Student card deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.remove.name);
    }
  }
}

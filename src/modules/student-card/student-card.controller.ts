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
  constructor(private readonly student_cardService: StudentCardService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Create Student Card' })
  async create(@Body() createStudentCardDto: CreateStudentCardDto) {
    try {
      const student_card = await this.student_cardService.create(
        createStudentCardDto,
      );

      return {
        message: 'Student card created successfully.',
        student_card,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Student Card' })
  async findAll() {
    try {
      const student_cards = await this.student_cardService.findAll();

      return {
        message: 'Student Cards',
        student_cards,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Student Card By ID' })
  @ApiParam({
    name: 'id',
    description: 'Student Card ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  async findOne(@Param('id') id: string) {
    try {
      const student_card = await this.student_cardService.findOne(id);

      return {
        message: 'Student Card',
        student_card,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Update Student Card' })
  @ApiParam({
    name: 'id',
    description: 'Student Card ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStudentCardDto: UpdateStudentCardDto,
  ) {
    try {
      const student_card = await this.student_cardService.update(
        id,
        updateStudentCardDto,
      );

      return {
        message: 'Student card updated successfully.',
        student_card,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.update.name);
    }
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Delete Student Card' })
  @ApiParam({
    name: 'id',
    description: 'Student Card ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.student_cardService.remove(id);

      return {
        message: 'Student card deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.remove.name);
    }
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StudentModule } from 'src/modules/student/student.module';
import { TeacherModule } from 'src/modules/teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    TeacherModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

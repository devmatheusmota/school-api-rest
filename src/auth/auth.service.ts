import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { StudentService } from 'src/modules/student/student.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    let user: any;
    try {
      user =
        (await this.studentService.findByEmail(email)) ||
        (await this.teacherService.findByEmail(email));

      if (!user) return null;
    } catch (error) {
      return null;
    }

    const passwordMatch = await compare(senha, user.password);

    if (!passwordMatch) return null;

    return user;
  }

  async login(user: any) {
    let payload = {};

    payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      auth: { token: this.jwtService.sign(payload) },
    };
  }
}

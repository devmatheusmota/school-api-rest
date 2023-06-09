import { randomUUID } from 'crypto';
import { IActivityRepository } from './activity.repository.interface';
import { Activity } from '../entities/activity.entity';

export class InMemoryActivityRepository implements IActivityRepository {
  private activity: Activity[] = [];

  async create(data: Activity): Promise<Activity> {
    data.id = randomUUID();

    data.course = {
      id: data.course_id,
      name: 'Test Course',
      year: 2021,
    };

    data.course.Student = [
      {
        id: 'Test Student ID',
        name: 'Test Student',
        email: 'test@test.com',
        password: 'Test Password',
        course_id: data.course_id,
      },
    ];

    this.activity.push(data);

    return data;
  }

  async findById(id: string): Promise<Activity> {
    const activity = this.activity.find((activity) => activity.id === id);

    return activity;
  }

  async findAll(): Promise<Activity[]> {
    const activity = this.activity;

    return activity;
  }

  async findByStudentId(student_id: string): Promise<Activity[]> {
    const activity = this.activity.map((activity) => {
      if (activity.course.Student.map((student) => student.id === student_id)) {
        return activity;
      }
    });

    return activity;
  }

  async findByTeacherId(teacher_id: string): Promise<Activity[]> {
    const activities = this.activity.map((activity) => {
      if (activity.course.Teacher.map((teacher) => teacher.id === teacher_id)) {
        return activity;
      }
    });

    return activities;
  }

  async findByCourseId(course_id: string): Promise<Activity[]> {
    const activities = this.activity.map((activity) => {
      if (activity.course.id === course_id) {
        return activity;
      }
    });

    return activities;
  }

  async findBySubjectId(subject_id: string): Promise<Activity[]> {
    const activities = this.activity.map((activity) => {
      if (activity.subject_id === subject_id) {
        return activity;
      }
    });

    return activities;
  }

  async update(id: string, activity: Activity): Promise<Activity> {
    const activityIndex = this.activity.findIndex(
      (activity) => activity.id === id,
    );
    activity.id = this.activity[activityIndex].id;
    this.activity[activityIndex] = activity;

    return activity;
  }

  async delete(id: string): Promise<void> {
    const activityIndex = this.activity.findIndex(
      (activity) => activity.id === id,
    );

    this.activity.splice(activityIndex, 1);
  }
}

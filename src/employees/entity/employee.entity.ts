import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  position: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'time' })
  work_time: string;

  @Column({ type: 'int' })
  hours_per_day: number;

  @Column({ type: 'varchar', length: 50 })
  work_schedule: string;
}

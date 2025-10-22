import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  //   ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

// atual urgencia e progresso para as tarefas atuais
export const TaskStatusValue = {
  PENDENTE: 'PENDENTE',
  EM_ANDAMENTO: 'EM ANDAMENTO',
  CONCLUIDA: 'CONCLUÍDA',
  ARQUIVADA: 'ARQUIVADA',
} as const;

export type TaskStatus = (typeof TaskStatusValue)[keyof typeof TaskStatusValue];

export const TaskUrgencyValue = {
  BAIXA: 'BAIXA',
  MEDIA: 'MÉDIA',
  ALTA: 'ALTA',
  CRITICA: 'CRÍTICA',
} as const;

export type TaskUrgency =
  (typeof TaskUrgencyValue)[keyof typeof TaskUrgencyValue];

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskUrgencyValue,
    default: TaskUrgencyValue.BAIXA,
  })
  urgency: TaskUrgency;

  @Column({
    type: 'enum',
    enum: TaskStatusValue,
    default: TaskStatusValue.PENDENTE,
  })
  progress: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

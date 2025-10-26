import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TaskUrgencyValue } from '../entities/task.entity';
import type { TaskUrgency } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título breve da tarefa.',
    example: 'Comprar pão',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa e detalhes',
    example: 'Preciso ir na padaria comprar 2 pães',
  })
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Nível de urgência',
    enum: Object.values(TaskUrgencyValue),
    default: TaskUrgencyValue.BAIXA,
  })
  urgency: TaskUrgency;

  @ApiProperty({
    description: 'Data limite para a conclusão da tarefa',
    example: '2025-11-05T10:00:00Z',
    type: 'string',
  })
  dueDate?: Date;
}

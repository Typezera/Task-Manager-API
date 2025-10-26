import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Config a inicialização do Swagger para a aplicação
 * *@param instancia da aplicação nest.
 */

export function setupSwagger(app: INestApplication): void {
  // configuração do documento
  const config = new DocumentBuilder()
    .setTitle('API de Tarefas (TaskManagerAPI)')
    .setDescription(
      'Documentação da API de criação de tarefas, onde é possível um usuário criar a conta e logar e começar a fazer a gestão de suas tarefas.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Entre com o token JWT: ',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerPath = 'api/docs';
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // log para console informação de acesso as rotas
  console.log(`Swagger UI disponível em: http://localhost:3000/${swaggerPath}`);
}

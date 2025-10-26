import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('ID do Token (req.user):', request.user); // <-- O que aparece aqui?
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('ID da URL (params):', request.params.id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as { userId: string; email: string };

    const userIdFromToken = user.userId.trim();

    const targetUserId = user.userId.trim();

    if (userIdFromToken !== targetUserId) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar o perfil de outro usuário.',
      );
    }

    return true;
  }
}

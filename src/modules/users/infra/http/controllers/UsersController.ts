import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    try {
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json(classToClass(user));
    } catch (error) {
      // só para teste, retornar o objeto de erro inteiro
      return response.status(500).json(error);
    }
  }
}

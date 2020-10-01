import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        name,
        email,
        password,
      });
      delete user.password;
      return response.json(user);
    } catch (error) {
      // só para teste, retornar o objeto de erro inteiro
      return response.status(500).json(error);
    }
  }
}
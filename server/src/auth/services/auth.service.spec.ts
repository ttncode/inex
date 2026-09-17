import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

jest.mock('argon2', () => ({ hash: async () => 'hashed' }));

describe('AuthService.register', () => {
  it('ignores role and hashPassword sent by the client', async () => {
    let saved: Record<string, unknown> = {};
    const userModel = Object.assign(
      function (this: any, data: Record<string, unknown>) {
        saved = data;
        Object.assign(this, data, { role: ['user'] });
        this.save = async () => undefined;
        this.toObject = () => ({ ...this });
      },
      { findOne: async () => null },
    );
    const jwt = { sign: () => 'token' } as unknown as JwtService;
    const response = {
      cookie: jest.fn(),
      status: () => ({ json: (body: unknown) => body }),
    };
    const service = new AuthService(userModel as any, jwt);

    await service.register(response, {
      username: 'eve',
      email: 'eve@example.com',
      password: 'secret',
      role: ['admin'],
      hashPassword: 'attacker',
    } as any);

    expect(saved).toEqual({
      username: 'eve',
      email: 'eve@example.com',
      avatar: undefined,
      hashPassword: 'hashed',
    });
  });
});

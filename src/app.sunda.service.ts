import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppSundaService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,

    @Inject('MESSAGE')
    private readonly message: string,
  ) {}

  getHello(): string {
    return `Hallo sadayana from ${this.name}, ${this.message}`;
  }
}

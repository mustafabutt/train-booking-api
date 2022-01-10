import { NestMiddleware } from '@nestjs/common';
import { Exceptions } from '../exceptions/exceptions';
export declare class UserMiddleware implements NestMiddleware {
    private exceptions;
    constructor(exceptions: Exceptions);
    use(req: any, res: any, next: () => void): void;
}

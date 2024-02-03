import * as bcrypt from 'bcrypt';
import { IHashService } from '../interfaces';

export class HashService implements IHashService {
  async hash(password: string) {
    return await bcrypt.hash(password, 11);
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}

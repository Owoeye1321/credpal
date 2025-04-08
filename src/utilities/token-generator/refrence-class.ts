import ReferenceInterface from './reference-interface';
import * as crypto from 'crypto';

export default class ReferenceGenerator implements ReferenceInterface {
  generate(strength: number): string {
    return crypto
      .randomBytes(Math.ceil(strength / 2)) // Generate enough bytes
      .toString('hex') // Convert the bytes to a hexadecimal string
      .slice(0, strength)
      .toUpperCase();
  }
}

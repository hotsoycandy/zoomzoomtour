import crypto from 'crypto'
import util from 'node:util'

const pbkdf2 = util.promisify(crypto.pbkdf2)

export async function createHash(
  password: string,
  salt: string,
): Promise<string> {
  const hashedBuffer = await pbkdf2(password, salt, 6126, 64, 'sha512')
  return hashedBuffer.toString('base64url')
}

export function createSalt(): string {
  return crypto.randomBytes(32).toString('base64url')
}

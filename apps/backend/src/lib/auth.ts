import { hash, verify } from '@node-rs/argon2'

export async function createPasswordHash(password: string): Promise<string> {
  return await hash(password, {
    memoryCost: 19_456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  })
}

export async function verifyPasswordHash(password: string, passwordHash: string): Promise<boolean> {
  return await verify(passwordHash, password, {
    memoryCost: 19_456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  })
}

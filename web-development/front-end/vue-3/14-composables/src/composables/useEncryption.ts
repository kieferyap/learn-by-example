import bcrypt from 'bcryptjs'

// const hashed = await generateHash(password)
export async function generateHash(password: string): Promise<string> {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

// const isAuthenticated = await verifyPassword(password, storedHash)
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

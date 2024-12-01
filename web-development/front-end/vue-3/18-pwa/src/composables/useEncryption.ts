import bcrypt from 'bcryptjs'

export default function useEncryption () {
  // Usage: const hashed = await generateHash(password)
  const generateHash = async (password: string): Promise<string> => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }
  
  // Usage: const isAuthenticated = await verifyPassword(password, storedHash)
  const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
  }

  return {
    generateHash,
    verifyPassword
  }
}

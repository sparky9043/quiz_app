import bcrypt from 'bcrypt';

// Hash raw password
const hash = async (rawPassword: string): Promise<string> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

  return passwordHash;
};

// Compare raw password with hashed password
const compare = async (rawPassword: string, passwordHash: string): Promise<boolean> => {
  const isPasswordCorrect = await bcrypt.compare(rawPassword, passwordHash);

  return isPasswordCorrect;
};

export default { hash, compare };
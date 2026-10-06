import bcrypt from 'bcrypt-ts';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRound = 10;
    const passowrdHash = await bcrypt.hash(password, saltRound);
    return passowrdHash;
}

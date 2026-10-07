import { genSalt, hash} from 'bcrypt-ts';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRound = await genSalt(10);
    const passowrdHash = await hash(password, saltRound);
    return passowrdHash;
}

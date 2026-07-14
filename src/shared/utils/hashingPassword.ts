import bcrypt from 'bcrypt'


export const hashedPassword = async (password: string): Promise<string> => {
    const hashPass = await bcrypt.hash(password, 10)

    return hashPass
}

export const confirmPassword = async (password: string, userpass: string): Promise<boolean> => {
    const encyrtPass = await bcrypt.compare(password, userpass)

    return encyrtPass
}
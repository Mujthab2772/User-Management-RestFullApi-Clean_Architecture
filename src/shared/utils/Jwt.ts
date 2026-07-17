import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string): string => {
  const token = jwt.sign(
    {
      userId: id,
      role: role,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "2h",
    },
  );

  return token;
};

export const verifyToken = (token: string) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  return decode;
};

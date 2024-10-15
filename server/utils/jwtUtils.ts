import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTPayload {
  id: string;
  email: string;
}

export const createJWT = (payload: JWTPayload): string => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    },
  );
  return token;
};

export const verifyJWT = (
  token: string,
): string | JwtPayload => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  );
  return decoded;
};

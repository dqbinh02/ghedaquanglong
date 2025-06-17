import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export const authOptions = {
  secret: JWT_SECRET,
  jwt: {
    secret: JWT_SECRET,
  },
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    )
    return verified.payload
  } catch (err) {
    throw new Error("Invalid token")
  }
}

export function getTokenFromHeader(authHeader: string | undefined) {
  if (!authHeader) return null
  const [bearer, token] = authHeader.split(" ")
  if (bearer !== "Bearer" || !token) return null
  return token
} 
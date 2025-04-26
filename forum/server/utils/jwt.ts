import jwt from 'jsonwebtoken'

export const verifyJWT = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject('Token no válido')
      } else {
        resolve(decoded)
      }
    })
  })
}

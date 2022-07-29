export interface IJWTHeaderDto {
  id: number | undefined,
  username: string,
  role: string
  email: string,
  password?: string,
}

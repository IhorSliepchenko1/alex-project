export type User = {
     id: number
     login: string
     password: string
     role: "USER" | "ADMIN"
     createdAt?: Date
     updatedAt?: Date
}

export type UpdateUser = {
     data: {
          login: string
          newPassword: string
          oldPassword: string
          role: ROLES
     }; id: number
}

export type Status = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
     color: string
}

export type UpdateStatus = {
     data: {
          name: string;
     }
     id: number;
}

export type Register = { login: string, password: string, role: "ADMIN" | "USER" }


export type PageLimit = { limit: number, page: number }
export type Children = { children: React.ReactNode }


export enum ROLES {
     ADMIN = "ADMIN",
     USER = "USER",
}

export type Message = {
     id: number
     name: string,
     email: string,
     phone: string,
     message: string
     status: string,
     color: string
     createdAt: string
}
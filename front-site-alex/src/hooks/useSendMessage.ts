import { instance } from "@/constants";
import { useCallback } from "react";

type Data = {
     name: string,
     email: string,
     phone: string,
     message: string
}

type Response = {
     message: string
}

export const useSendMessage = () => {
     const createMessage = useCallback(async (data: Data) => {
          try {
               const response: Response = await instance.post('/message', data)
               return response.message
          }
          catch (error) {
               console.log(error);
          }
     }, [])

     return { createMessage }
}
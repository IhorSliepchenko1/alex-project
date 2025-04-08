import { Message } from "../types";
import { api } from "./api"

export const messageApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addMessage: builder.mutation<{ message: string }, Message>({
               query: (data) => ({
                    url: "message",
                    method: "POST",
                    body: data,
               }),
          }),
          updateMessage: builder.mutation<{ message: string }, { name: string, id: number }>({
               query: ({ name, id }) => ({
                    url: `message/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllMessagees: builder.query<{ rows: Message[], count: number }, void>({
               query: () => ({
                    url: "message",
                    method: "GET",
               }),
          }),
          getByIdMessage: builder.query<Message, number>({
               query: (id) => ({
                    url: `message/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useAddMessageMutation,
     useGetAllMessageesQuery,
     useGetByIdMessageQuery,
     useLazyGetAllMessageesQuery,
     useLazyGetByIdMessageQuery,
     useUpdateMessageMutation
} = messageApi
import { Status } from "../types";
import { api } from "./api"


type Data = {
     data: {
          name: string;
          color: string
     }
     id: number;
}



export const statusesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addStatus: builder.mutation<Status, {
               name: string;
               color: string
          }>({
               query: (data) => ({
                    url: "status",
                    method: "POST",
                    body: data,
               }),
          }),
          updateStatus: builder.mutation<Status, Data>({
               query: ({ data, id }) => ({
                    url: `status/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
          getAllStatuses: builder.query<{ rows: Status[] }, void>({
               query: () => ({
                    url: "status",
                    method: "GET",
               }),
          }),
          getByIdStatus: builder.query<Status, number>({
               query: (id) => ({
                    url: `status/${id}`,
                    method: "GET",
               }),
          }),
          deleteStatus: builder.mutation<void, number>({
               query: (id) => ({
                    url: `status/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddStatusMutation,
     useDeleteStatusMutation,
     useGetAllStatusesQuery,
     useGetByIdStatusQuery,
     useLazyGetAllStatusesQuery,
     useLazyGetByIdStatusQuery,
     useUpdateStatusMutation
} = statusesApi
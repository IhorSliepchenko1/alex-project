import { api } from "./api"

type DataServiceType = {
     id: number;
     name: string;
     createdAt: Date;
     updatedAt: Date;
}

export const serviceTypeApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addServiceType: builder.mutation<{ name: string }, { name: string }>({
               query: (data) => ({
                    url: "service-type",
                    method: "POST",
                    body: data,
               }),
          }),
          updateServiceType: builder.mutation<{ message: string }, {
               data: {
                    name: string;
               }
               id: number;
          }
          >({
               query: ({ data, id }) => ({
                    url: `service-type/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
          getAllServiceType: builder.query<{ rows: DataServiceType[] }, void>({
               query: () => ({
                    url: "service-type",
                    method: "GET",
               }),
          }),
          getByIdServiceType: builder.query<DataServiceType, number>({
               query: (id) => ({
                    url: `service-type/${id}`,
                    method: "GET",
               }),
          }),
          deleteServiceType: builder.mutation<void, number>({
               query: (id) => ({
                    url: `service-type/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddServiceTypeMutation,
     useDeleteServiceTypeMutation,
     useGetAllServiceTypeQuery,
     useGetByIdServiceTypeQuery,
     useLazyGetAllServiceTypeQuery,
     useLazyGetByIdServiceTypeQuery,
     useUpdateServiceTypeMutation
} = serviceTypeApi
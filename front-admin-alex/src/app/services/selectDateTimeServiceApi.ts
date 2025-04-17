import { api } from "./api"

type PropsPost = {
     id: number,
     date: string,
     time: string,
     limits: number,
     booked: number,
     createdAt: Date,
     updatedAt: Date,
}

export const selectDateTimeApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addSelectDateTime: builder.mutation<{ message: string }, {
               date: string,
               time: string,
               limits: number,
          }>({
               query: (data) => ({
                    url: "select-date-time",
                    method: "POST",
                    body: data,
               }),
          }),
          updateSelectDateTime: builder.mutation<{ message: string }, {
               data: {
                    date: string,
                    time: string,
                    limits: number,
               }
               id: number;
          }
          >({
               query: ({ data, id }) => ({
                    url: `select-date-time/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
          getAllSelectDateTime: builder.query<{ rows: PropsPost[] }, void>({
               query: () => ({
                    url: "select-date-time/all",
                    method: "GET",
               }),
          }),


     }),
})

export const {
     useAddSelectDateTimeMutation,
     useGetAllSelectDateTimeQuery,
     useLazyGetAllSelectDateTimeQuery,
     useUpdateSelectDateTimeMutation
} = selectDateTimeApi
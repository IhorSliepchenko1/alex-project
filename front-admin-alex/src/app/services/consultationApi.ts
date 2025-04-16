import { Consultation } from "../types";
import { api } from "./api"

type PageLimit = {
     limit: number;
     page: number;
}

type Image = {
     id: number, "photos.file_name": string
}

export const consultationApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addConsultation: builder.mutation<{ message: string }, Consultation>({
               query: (data) => ({
                    url: "consultation",
                    method: "POST",
                    body: data,
               }),
          }),
          updateConsultation: builder.mutation<{ message: string }, { name: string, id: number }>({
               query: ({ name, id }) => ({
                    url: `consultation/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllConsultations: builder.query<{ rows: Consultation[], count: number, images: Image[] }, PageLimit>({
               query: ({ limit, page }) => ({
                    url: "consultation",
                    method: "GET",
                    params: { limit, page }
               }),
          }),
          getByIdConsultation: builder.query<Consultation, number>({
               query: (id) => ({
                    url: `consultation/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useAddConsultationMutation,
     useGetAllConsultationsQuery,
     useGetByIdConsultationQuery,
     useLazyGetAllConsultationsQuery,
     useLazyGetByIdConsultationQuery,
     useUpdateConsultationMutation
} = consultationApi
import { Divider } from "@mantine/core"
import { useGetAllSelectDateTimeQuery } from "../app/services/selectDateTimeServiceApi"
import { SelectDateTimeComponent } from "../app/components/features/select-date-time/select-date-time-component"
import { AddSelectDateTime } from "../app/components/form/add-select-date-time"

export const SelectDateTime = () => {
     const { data, isLoading } = useGetAllSelectDateTimeQuery()

     return (
          <>
               <AddSelectDateTime />
               <Divider my="sm" />
               <SelectDateTimeComponent
                    text="Select Date Time"
                    data={data}
                    isLoading={isLoading}
               />
          </>
     )
}

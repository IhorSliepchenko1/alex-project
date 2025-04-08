import { Divider } from "@mantine/core"
import { useGetAllStatusesQuery } from "../app/services/statusesApi"
import { AddStatuses } from "../app/components/form/add-statuses"
import { StatusComponent } from "../app/components/features/status/status-component"

export const Statuses = () => {
  const { data, isLoading } = useGetAllStatusesQuery()

  return (
    <>
      <AddStatuses />
      <Divider my="sm" />
      <StatusComponent
        text="Status list"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

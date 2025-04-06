import { Divider } from "@mantine/core"
import { useGetAllStatusesQuery } from "../app/services/statusesApi"
import { ItemComponent } from "../app/components/features/item/item-component"
import { AddStatuses } from "../app/components/form/add-statuses"

export const Statuses = () => {
  const { data, isLoading } = useGetAllStatusesQuery()

  return (
    <>
      <AddStatuses />
      <Divider my="sm" />
      <ItemComponent
        text="Список статусов"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

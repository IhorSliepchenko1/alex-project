import { Divider } from "@mantine/core"
import { AddServiceType } from "../app/components/form/add-service-type"
import { useGetAllServiceTypeQuery } from "../app/services/serviceTypeApi"
import { ServiceTypeComponent } from "../app/components/features/service-type/service-type-component"

export const ServiceType = () => {
  const { data, isLoading } = useGetAllServiceTypeQuery()

  return (
    <>
      <AddServiceType />
      <Divider my="sm" />
      <ServiceTypeComponent
        text="Service type list"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

import { Group, Select, Table } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react';
import { useGetAllMessageesQuery, useUpdateMessageMutation } from '../app/services/messageApi';
import { useGetAllStatusesQuery } from '../app/services/statusesApi';
import { useNotification } from '../app/hooks/useNotification/useNotification';
import { useCalendarInputDate } from '../app/hooks/useCalendarInputDate';
import { errorMessages } from '../utils/has-error-field';
import { LoaderComponent } from '../app/components/layout/loader';


export const Messages = () => {
     const { data, refetch, isLoading } = useGetAllMessageesQuery()
     const { data: statusData, isLoading: statusLoading } = useGetAllStatusesQuery()

     const selectStatusValue = useMemo(() => {
          if (statusData) {
               const result = statusData.rows.map(item => {
                    return item.name
               })
               result.push("new message")
               return result
          }

          return []
     }, [statusLoading])

     const [update] = useUpdateMessageMutation();
     const { succeed, error } = useNotification();
     const [value, setValue] = useState<string | null>(null)
     const [id, setId] = useState<number>(0)
     const { formatDate } = useCalendarInputDate()

     const updateStatus = async () => {
          try {
               await update({ id, name: value as string }).unwrap();
               succeed("Status updated!");
               await refetch()
          } catch (err) {
               error(errorMessages(err));
          }
     };

     useEffect(() => {
          if (value && value !== "new message") {
               updateStatus();
          } else {
               if (value === "new message") {
                    error("new message - base name for new data!");
               }
          }
     }, [value]);

     const rows = useMemo(() => {
          if (data) {
               return data?.rows.map((element, index) => (
                    <Table.Tr key={index} onClick={() => setId(element.id)}>
                         <Table.Td>{formatDate(element.createdAt)}</Table.Td>
                         <Table.Td>{element.name}</Table.Td>
                         <Table.Td>{element.email}</Table.Td>
                         <Table.Td>{element.phone}</Table.Td>
                         <Table.Td className="max-w-28 whitespace-normal break-words">
                              {element.message}
                         </Table.Td>
                         <Table.Td style={{ background: element.color }}>
                              <Select
                                   data={selectStatusValue}
                                   defaultValue={element.status}
                                   onChange={(status) => setValue(status as string)}
                              />
                         </Table.Td>
                    </Table.Tr>
               ));
          }
     }, [data, refetch])

     return (
          <>
               {
                    isLoading && statusLoading
                         ? <LoaderComponent />
                         :
                         <Group justify="space-between">

                              <Table>
                                   <Table.Thead>
                                        <Table.Tr>
                                             <Table.Th>Time</Table.Th>
                                             <Table.Th>Name</Table.Th>
                                             <Table.Th>Email</Table.Th>
                                             <Table.Th>Phone</Table.Th>
                                             <Table.Th>Message</Table.Th>
                                             <Table.Th>Status</Table.Th>
                                        </Table.Tr>
                                   </Table.Thead>
                                   <Table.Tbody>
                                        {rows}
                                   </Table.Tbody>

                              </Table>
                         </Group >}
          </>
     )
}

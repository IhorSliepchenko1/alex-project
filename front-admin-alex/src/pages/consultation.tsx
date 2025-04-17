import { Select, Table } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllStatusesQuery } from '../app/services/statusesApi';
import { useNotification } from '../app/hooks/useNotification/useNotification';
import { useCalendarInputDate } from '../app/hooks/useCalendarInputDate';
import { errorMessages } from '../utils/has-error-field';
import { LoaderComponent } from '../app/components/layout/loader';
import { useTotalPage } from '../app/hooks/useTotalPage';
import { Pagination } from '../app/components/ui/pagination';
import { useGetAllConsultationsQuery, useUpdateConsultationMutation } from '../app/services/consultationApi';
import { FaImages } from "react-icons/fa";
import { Slider } from '../app/components/ui/carousel';

export const Consultation = () => {
     const [page, setPage] = useState(1);
     const limit = 9;
     const { data, refetch, isLoading } = useGetAllConsultationsQuery({ limit, page });
     const { data: statusData, isLoading: statusLoading } = useGetAllStatusesQuery();
     const total = useTotalPage(data?.count, limit);

     const selectStatusValue = useMemo(() => {
          if (statusData) {
               const result = statusData.rows.map(item => item.name);
               result.push("new message");
               return result;
          }
          return [];
     }, [statusLoading, statusData]);

     const [update] = useUpdateConsultationMutation();
     const { succeed, error } = useNotification();
     const { formatDate } = useCalendarInputDate();

     const [value, setValue] = useState<string | null>(null);
     const [id, setId] = useState<number>(0);
     const [opened, setOpened] = useState<boolean>(false);
     const [currentImages, setCurrentImages] = useState<string[]>([]);

     const updateStatus = async () => {
          try {
               await update({ id, name: value as string }).unwrap();
               succeed("Status updated!");
               await refetch();
          } catch (err) {
               error(errorMessages(err));
          }
     };

     useEffect(() => {
          if (value && value !== "new message") {
               updateStatus();
          } else if (value === "new message") {
               error("new message - base name for new data!");
          }
     }, [value]);

     const handleImageClick = (elementId: number) => {
          setId(elementId);
          const result = data?.images?.filter(item => item.id === elementId).map(i => i['photos.file_name']) || [];
          if (result.length > 0) {
               setCurrentImages(result);
               setOpened(true);
          } else {
               error("No photo!");
          }
     };

     useEffect(() => {
          if (!opened) {
               setId(0);
               setCurrentImages([]);
          }
     }, [opened]);

     const rows = useMemo(() => {
          if (data) {
               return data.rows.map((element, index) => (
                    <Table.Tr key={index} onClick={() => setId(element.id)}>
                         <Table.Td>{formatDate(element.createdAt)}</Table.Td>
                         <Table.Td>{element.full_name}</Table.Td>
                         <Table.Td>{element.email}</Table.Td>
                         <Table.Td>{element.phone}</Table.Td>
                         <Table.Td>{element.street}</Table.Td>
                         <Table.Td>{element.state}</Table.Td>
                         <Table.Td>{element.zip}</Table.Td>
                         <Table.Td>{element.descriptions}</Table.Td>
                         <Table.Td>{element['select_date_time.date']} {element['select_date_time.time']}</Table.Td>
                         <Table.Td>{element['service_type.name']}</Table.Td>
                         <Table.Td onClick={() => handleImageClick(element.id)}>
                              <div className='flex justify-center'>
                                   <FaImages />
                              </div>
                         </Table.Td>
                         <Table.Td style={{ background: element.color, maxWidth: 150 }}>
                              <Select
                                   data={selectStatusValue}
                                   defaultValue={element.status}
                                   onChange={(status) => setValue(status as string)}
                              />
                         </Table.Td>
                    </Table.Tr>
               ));
          }
     }, [data, formatDate, selectStatusValue, isLoading, statusLoading]);

     return (
          <>
               {isLoading ? (
                    <LoaderComponent />
               ) : (
                    <div className="flex flex-col justify-between items-center min-h-[90vh] w-full">
                         <Table>
                              <Table.Thead>
                                   <Table.Tr>
                                        <Table.Th>Time</Table.Th>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Email</Table.Th>
                                        <Table.Th>Phone</Table.Th>
                                        <Table.Th>Street</Table.Th>
                                        <Table.Th>State</Table.Th>
                                        <Table.Th>Zip</Table.Th>
                                        <Table.Th>Descriptions</Table.Th>
                                        <Table.Th>Date time</Table.Th>
                                        <Table.Th>Service type</Table.Th>
                                        <Table.Th>Images</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                   </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>{rows}</Table.Tbody>
                         </Table>
                         <Pagination total={total} setPage={setPage} />
                         <Slider opened={opened} setOpened={setOpened} arrayImg={currentImages} />
                    </div>
               )}
          </>
     );
};

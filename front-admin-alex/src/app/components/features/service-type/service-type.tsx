import { Group } from '@mantine/core'
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { DeleteModals } from '../../modals/delete-modals';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../ui/open-modal-component';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { errorMessages } from '../../../../utils/has-error-field';
import { useDeleteServiceTypeMutation, useLazyGetAllServiceTypeQuery } from '../../../services/serviceTypeApi';
import { UpdateServiceType } from '../../modals/update-service-type';

type Props = {
     id: number
     index: number
     name: string
}

export const ServiceType: React.FC<Props> = ({ id, index, name }) => {
     const [opened, { open, close }] = useDisclosure(false);
     const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const [deleteServiceType] = useDeleteServiceTypeMutation()
     const [triggerAllServiceType] = useLazyGetAllServiceTypeQuery()


     const deleteItem = async () => {
          try {
               await deleteServiceType(id).unwrap();
               succeed("Service type removed!")
               await triggerAllServiceType().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div>{name}</div>
               </div>
               {
                    decoded.role === ROLES.ADMIN &&
                    <>
                         <OpenModalComponent
                              openUpdateModal={openUpdateModal}
                              openDeleteModal={openDeleteModal}
                         />
                         <UpdateServiceType
                              opened={opened}
                              close={close}
                              id={id}
                              name={name}
                              typeModal={typeModal}
                         />

                         <DeleteModals
                              opened={opened}
                              close={close}
                              title={`Confirm deletion of '${name}'`}
                              onClick={deleteItem}
                              typeModal={typeModal}
                         />
                    </>
               }

          </Group >
     )
}

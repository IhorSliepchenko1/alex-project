import { Group } from '@mantine/core'
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { DeleteModals } from '../../modals/delete-modals';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../ui/open-modal-component';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { errorMessages } from '../../../../utils/has-error-field';
import { useDeleteStatusMutation, useLazyGetAllStatusesQuery } from '../../../services/statusesApi';
import { UpdateStatus } from '../../modals/update-status';

type Props = {
     id: number
     index: number
     name: string
     color?: string
}

export const Status: React.FC<Props> = ({ id, index, name, color = "" }) => {
     const [opened, { open, close }] = useDisclosure(false);
     const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const [deleteStatuses] = useDeleteStatusMutation()
     const [triggerAllStatuses] = useLazyGetAllStatusesQuery()


     const deleteItem = async () => {
          try {
               await deleteStatuses(id).unwrap();
               succeed("Status removed!")
               await triggerAllStatuses().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div style={{ background: color }}>{name}</div>
               </div>
               {
                    decoded.role === ROLES.ADMIN &&
                    <>
                         <OpenModalComponent
                              openUpdateModal={openUpdateModal}
                              openDeleteModal={openDeleteModal}
                         />
                         <UpdateStatus
                              opened={opened}
                              close={close}
                              id={id}
                              name={name}
                              typeModal={typeModal}
                              color={color}
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

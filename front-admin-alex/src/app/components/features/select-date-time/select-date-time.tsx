import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../ui/open-modal-component';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { UpdateSelectDateTime } from '../../modals/update-select-date-time';
import { DeleteModals } from '../../modals/delete-modals';
import { errorMessages } from '../../../../utils/has-error-field';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDeleteSelectDateTimeMutation, useLazyGetAllSelectDateTimeQuery } from '../../../services/selectDateTimeServiceApi';

type Props = {
  id: number
  index: number
  date: string
  time: string
  period: string
  booked: number
  limits: number
}
export const SelectDateTime: React.FC<Props> = ({ date, time, booked, limits, id, period }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
  const { decoded } = useCheckValidToken()
  const { succeed, error } = useNotification()

  const [deleteSelectDateTime] = useDeleteSelectDateTimeMutation()
  const [triggerAllSelectDateTime] = useLazyGetAllSelectDateTimeQuery()
  const deleteItem = async () => {
    try {
      await deleteSelectDateTime(id).unwrap();
      succeed("SelectDateTime removed!")
      await triggerAllSelectDateTime().unwrap();
      close()

    } catch (err) {
      error(errorMessages(err));
    }
  }


  return (
    <Group justify="space-between">
      <div className="flex gap-2">
        <div className='flex gap-1 items-center'>
          <div>{date}</div>
          <div>{time}</div>
          <div>{period}</div>
        </div>
        <div>{booked ? booked : 0} / {limits}</div>
      </div>
      {
        decoded.role === ROLES.ADMIN &&
        <>
          <OpenModalComponent
            openUpdateModal={openUpdateModal}
            openDeleteModal={openDeleteModal}
          />
          <UpdateSelectDateTime
            opened={opened}
            close={close}
            id={id}
            date={date}
            time={time}
            limits={limits}
            period={period}
            typeModal={typeModal}
          />

          <DeleteModals
            opened={opened}
            close={close}
            title={`Confirm delete?`}
            onClick={deleteItem}
            typeModal={typeModal}
          />
        </>
      }

    </Group >
  )
}

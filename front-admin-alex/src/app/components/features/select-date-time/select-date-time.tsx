import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../ui/open-modal-component';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { UpdateSelectDateTime } from '../../modals/update-select-date-time';

type Props = {
  id: number
  index: number
  date: string
  time: string
  booked: number
  limits: number
}
export const SelectDateTime: React.FC<Props> = ({ date, time, booked, limits, id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
  const { decoded } = useCheckValidToken()


  return (
    <Group justify="space-between">
      <div className="flex gap-2">
        <div className='flex gap-1 items-center'>
          <div>{date}</div>
          <div>{time}</div>
        </div>
        <div>{booked ? booked : 0} / {limits}</div>
      </div>
      {
        decoded.role === ROLES.ADMIN &&
        <>
          <OpenModalComponent
            openUpdateModal={openUpdateModal}
            openDeleteModal={openDeleteModal}
            btnStatus={false}
          />
          <UpdateSelectDateTime
            opened={opened}
            close={close}
            id={id}
            date={date}
            time={time}
            limits={limits}
            typeModal={typeModal}
          />
        </>
      }

    </Group >
  )
}

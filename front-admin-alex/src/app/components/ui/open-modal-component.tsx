import { ButtonModalOpen } from "../button/button-open-modal"


type Props = {
     openUpdateModal: () => void
     openDeleteModal: () => void
     btnStatus?: boolean
}

export const OpenModalComponent: React.FC<Props> = ({ openUpdateModal, openDeleteModal, btnStatus = true }) => {

     return (
          <div className="flex items-center gap-2">
               <ButtonModalOpen onClick={openUpdateModal} text="Edit" typeColor="EDIT" />
               {btnStatus && <ButtonModalOpen onClick={openDeleteModal} text="Delete" typeColor="DELETE" />}
          </div>
     )
}

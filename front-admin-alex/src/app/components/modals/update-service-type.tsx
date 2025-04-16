import { Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useEffect } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";
import { errorMessages } from "../../../utils/has-error-field";
import { useLazyGetAllServiceTypeQuery, useUpdateServiceTypeMutation } from "../../services/serviceTypeApi";

type SubmitData = { name: string }

type Props = {
     id: number
     opened: boolean
     close: () => void
     name: string
     typeModal: "delete" | "update"
}

export const UpdateServiceType: React.FC<Props> = ({ id, opened, close, name, typeModal }) => {

     const form = useForm<SubmitData>({
          validate: {
               name: (value) => (!value ? "Mandatory field!" : null),
          },
          mode: "uncontrolled",
          initialValues: { name }
     });

     const [updateServiceType, { isLoading }] = useUpdateServiceTypeMutation()
     const [triggerAllServiceTypeQuery] = useLazyGetAllServiceTypeQuery()
     const { succeed, error } = useNotification()

     useEffect(() => {
          if (opened) {
               form.setValues({
                    name
               });
               form.resetDirty();
          }
     }, [opened]);

     const updateItem = async (data: SubmitData) => {
          try {
               await updateServiceType({ data, id }).unwrap();
               succeed(`The status of '${name}' has been updated!`)
               form.reset();
               await triggerAllServiceTypeQuery().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          typeModal === "update" && <Modal opened={opened} onClose={close} title="Updating the property name information">
               <form onSubmit={form.onSubmit(updateItem)}>
                    <TextInput
                         label="Service type"
                         key={form.key("name")}
                         {...form.getInputProps("name")}
                    />

                    <ModalActionComponent
                         disabled={!form.isDirty()}
                         loading={isLoading}
                         close={close}
                    />
               </form>
          </Modal>
     )
}

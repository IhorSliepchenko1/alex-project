import { ColorInput, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useEffect } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";
import { errorMessages } from "../../../utils/has-error-field";
import { useLazyGetAllStatusesQuery, useUpdateStatusMutation } from "../../services/statusesApi";

type SubmitData = { name: string, color: string }

type Props = {
     id: number
     opened: boolean
     close: () => void
     name: string
     typeModal: "delete" | "update"
     color: string
}

export const UpdateStatus: React.FC<Props> = ({ id, opened, close, name, typeModal, color = '' }) => {

     const form = useForm<SubmitData>({
          validate: {
               name: (value) => (!value ? "Обязательное поле!" : null),
               color: (value) => (!value ? "Обязательное поле!" : null),
          },
          mode: "uncontrolled",
          initialValues: { name, color }
     });

     const [updateStatus, { isLoading }] = useUpdateStatusMutation()
     const [triggerAllStatusesQuery] = useLazyGetAllStatusesQuery()
     const { succeed, error } = useNotification()

     useEffect(() => {
          if (opened) {
               form.setValues({
                    name, color
               });
               form.resetDirty();
          }
     }, [opened]);

     const updateItem = async (data: SubmitData) => {
          try {
               if (data.color === color) {
                    data.color = ''
               }

               await updateStatus({ data, id }).unwrap();
               succeed(`Тип базы '${name}' обновлён!`)
               form.reset();
               await triggerAllStatusesQuery().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          typeModal === "update" && <Modal opened={opened} onClose={close} title="Обновление информации названия свойства">
               <form onSubmit={form.onSubmit(updateItem)}>
                    <TextInput
                         label="Тип базы"
                         key={form.key("name")}
                         {...form.getInputProps("name")}
                    />

                    <ColorInput
                         label={"Цвет для данного типа базы"}
                         placeholder={"Выберите цвет для данного типа"}
                         key={form.key("color")}
                         {...form.getInputProps("color")}
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

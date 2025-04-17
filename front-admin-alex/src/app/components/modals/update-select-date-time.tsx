import { Modal, NumberInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useEffect } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";
import { errorMessages } from "../../../utils/has-error-field";
import { useLazyGetAllSelectDateTimeQuery, useUpdateSelectDateTimeMutation } from "../../services/selectDateTimeServiceApi";

type SubmitData = { date: string, time: string, limits: number, period: string }

type Props = {
     id: number
     opened: boolean
     close: () => void
     date: string
     time: string
     period: string
     limits: number
     typeModal: "delete" | "update"
}

export const UpdateSelectDateTime: React.FC<Props> = ({ id, opened, close, date, time, limits, period, typeModal }) => {

     const form = useForm<SubmitData>({
          mode: "uncontrolled",
          initialValues: { date, time, limits, period }
     });

     const [updateSelectDateTime, { isLoading }] = useUpdateSelectDateTimeMutation()
     const [triggerAllSelectDateTimeQuery] = useLazyGetAllSelectDateTimeQuery()
     const { succeed, error } = useNotification()

     useEffect(() => {
          if (opened) {
               form.setValues({
                    date,
                    time,
                    limits,
               });
               form.resetDirty();
          }
     }, [opened]);

     const updateItem = async (data: SubmitData) => {
          try {
               await updateSelectDateTime({ data, id }).unwrap();
               succeed(`update!`)
               form.reset();
               await triggerAllSelectDateTimeQuery().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          typeModal === "update" && <Modal opened={opened} onClose={close} title="Updating the property name information">
               <form onSubmit={form.onSubmit(updateItem)}>
                    <TextInput
                         label="Date"
                         key={form.key("date")}
                         {...form.getInputProps("date")}
                    />
                    <TextInput
                         label="Time"
                         key={form.key("time")}
                         {...form.getInputProps("time")}
                    />
                    <NumberInput
                         label="Limits"
                         key={form.key("limits")}
                         {...form.getInputProps("limits")}
                    />
                    <Select
                         label="Period"
                         key={form.key("period")}
                         {...form.getInputProps("period")}
                         data={['morning', 'afternoon', 'evening']}
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


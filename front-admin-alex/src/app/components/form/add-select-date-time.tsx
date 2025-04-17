import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { errorMessages } from "../../../utils/has-error-field";
import { NumberInput, TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { useAddSelectDateTimeMutation, useLazyGetAllSelectDateTimeQuery } from "../../services/selectDateTimeServiceApi";

export const AddSelectDateTime = () => {
     const { decoded } = useCheckValidToken()
     const form = useForm<{
          date: string,
          time: string,
          limits: number,
     }>({
          mode: "uncontrolled",
          initialValues: {
               date: '',
               time: '',
               limits: 0
          },
          validate: {
               date: (value) => (!value ? "Mandatory field" : null),
               time: (value) => (!value ? "Mandatory field" : null),
               limits: (value) => (!value ? "Mandatory field" : null),
          },
     });

     const [addSelectDateTime, { isLoading }] = useAddSelectDateTimeMutation()
     const [triggerAllSelectDateTimeQuery] = useLazyGetAllSelectDateTimeQuery()
     const { succeed, error } = useNotification()


     const onSubmit = async (data: {
          date: string,
          time: string,
          limits: number,
     }) => {
          try {
               await addSelectDateTime(data).unwrap();
               succeed("New service-type added!");
               form.reset();
               await triggerAllSelectDateTimeQuery().unwrap();

          } catch (err) {
               error(errorMessages(err));
          }
     };

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
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
               <ButtonSubmit loading={isLoading} text={"Add"} />
          </form>
     )
}

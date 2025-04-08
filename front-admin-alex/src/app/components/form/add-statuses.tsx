import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { errorMessages } from "../../../utils/has-error-field";
import { ColorInput, TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { useAddStatusMutation, useLazyGetAllStatusesQuery } from "../../services/statusesApi";

type Data = { name: string, color: string }

export const AddStatuses = () => {
     const { decoded } = useCheckValidToken()
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "", color: "" },
          validate: {
               name: (value) => (!value ? "Mandatory field" : (value === "new message" ? "new message - base name for new data!" : null)),
               color: (value) => (!value ? "Mandatory field" : null),
          },
     });

     const [addStatus, { isLoading }] = useAddStatusMutation()
     const [triggerAllStatusesQuery] = useLazyGetAllStatusesQuery()
     const { succeed, error } = useNotification()


     const onSubmit = async (data: Data) => {
          try {
               await addStatus(data).unwrap();
               succeed("New status added!");
               form.reset();
               await triggerAllStatusesQuery().unwrap();

          } catch (err) {
               error(errorMessages(err));
          }
     };

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label="Status"
                    placeholder={"Enter a name status"}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
               />
               <ColorInput
                    label={"Color status"}
                    placeholder={"Select a status color"}
                    key={form.key("color")}
                    {...form.getInputProps("color")}
               />
               <ButtonSubmit loading={isLoading} text={"Add"} />
          </form>
     )
}

import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { errorMessages } from "../../../utils/has-error-field";
import {TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { useAddServiceTypeMutation, useLazyGetAllServiceTypeQuery } from "../../services/serviceTypeApi";


export const AddServiceType = () => {
     const { decoded } = useCheckValidToken()
     const form = useForm<{ name: string }>({
          mode: "uncontrolled",
          initialValues: { name: "" },
          validate: {
               name: (value) => (!value ? "Mandatory field" : (value === "new message" ? "new message - base name for new data!" : null)),
          },
     });

     const [addServiceType, { isLoading }] = useAddServiceTypeMutation()
     const [triggerAllServiceTypeQuery] = useLazyGetAllServiceTypeQuery()
     const { succeed, error } = useNotification()


     const onSubmit = async (data: { name: string }) => {
          try {
               await addServiceType(data).unwrap();
               succeed("New service-type added!");
               form.reset();
               await triggerAllServiceTypeQuery().unwrap();

          } catch (err) {
               error(errorMessages(err));
          }
     };

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label="Service type"
                    placeholder={"Enter a name status"}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
               />
               <ButtonSubmit loading={isLoading} text={"Add"} />
          </form>
     )
}

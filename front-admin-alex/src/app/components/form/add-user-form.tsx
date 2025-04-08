import { useForm } from "@mantine/form";
import { PasswordInput, Select, TextInput } from "@mantine/core";
import { Register } from "../../types";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../../services/userApi";
import { errorMessages } from "../../../utils/has-error-field";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { ButtonSubmit } from "../button/button-submit";
import { ROLES, roles } from "../../../utils/role-list";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";

export const AddUserForm = () => {
     const form = useForm<Register>({
          mode: "uncontrolled",
          initialValues: { login: "", password: "", role: "USER" },
          validate: {
               login: (value) => (value.length < 5 ? "Minimum login length is 5 characters!" : null),
               password: (value) => (value.length < 6 ? "Minimum password length is 6 characters!" : null),
          },
     });

     const [registration, { isLoading }] = useRegisterMutation()
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const onSubmit = async (data: Register) => {
          try {
               await registration(data).unwrap()
               succeed("User added!")
               form.reset()
               await triggerAllUsersQuery().unwrap()

          } catch (err) {
               error(errorMessages(err));
          }
     }


     return (
          decoded.role === ROLES.ADMIN && <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label="Login"
                    placeholder="Enter login"
                    key={form.key("login")}
                    {...form.getInputProps("login")}
               />
               <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
               />
               <Select
                    label="Role"
                    placeholder="Select the user role"
                    key={form.key("role")}
                    {...form.getInputProps("role")}
                    data={roles}
               />
               <ButtonSubmit loading={isLoading} text={"Add user"} />
          </form>
     )
}

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useLazyCheckQuery, useLoginMutation } from "../../app/services/userApi";
import { useNavigate } from "react-router-dom";
import { errorMessages } from "../../utils/has-error-field";
import { useNotification } from "../../app/hooks/useNotification/useNotification";
import { ButtonSubmit } from "../../app/components/button/button-submit";

export const Login = () => {
     const form = useForm<{ login: string, password: string }>({
          mode: "uncontrolled",
          initialValues: { login: "", password: "" },
          validate: {
               login: (value) => (value.length < 5 ? "Minimum login length is 5 characters!" : null),
               password: (value) => (value.length < 6 ? "Minimum password length is 6 characters!" : null),
          },
     });

     const [login, { isLoading }] = useLoginMutation()
     const navigate = useNavigate()
     const [triggerCurrentQuery] = useLazyCheckQuery()

     const { succeed, error } = useNotification()

     const onSubmit = async (data: { login: string, password: string }) => {
          try {
               await login(data).unwrap()
               await triggerCurrentQuery().unwrap()
               succeed("You're logged in!")
               form.reset()
               navigate("/")

          } catch (err) {
               form.reset()
               error(errorMessages(err));
          }
     }

     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4">
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
               <ButtonSubmit loading={isLoading} text={"Войти"} />
          </form>
     )
}

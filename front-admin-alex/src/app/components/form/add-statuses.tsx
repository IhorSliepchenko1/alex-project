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
               name: (value) => (!value ? "Обязательное поле!" : null),
               color: (value) => (!value ? "Обязательное поле!" : null),
          },
     });

     const [addStatus, { isLoading }] = useAddStatusMutation()
     const [triggerAllStatusesQuery] = useLazyGetAllStatusesQuery()
     const { succeed, error } = useNotification()


     const onSubmit = async (data: Data) => {
          try {
               await addStatus(data).unwrap();
               succeed(`Новый тип базы добавлен!`);
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
                    label="Тип базы"
                    placeholder={"Введите название"}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
               />
               <ColorInput
                    label={"Цвет типа базы"}
                    placeholder={"Выберите цвет для базы"}
                    key={form.key("color")}
                    {...form.getInputProps("color")}
               />
               <ButtonSubmit loading={isLoading} text={"Добавить"} />
          </form>
     )
}

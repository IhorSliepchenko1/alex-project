import React, { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useLazyGetAllUsersQuery, useUpdateUserMutation } from "../../services/userApi";
import { Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ModalActionComponent } from "../ui/modal-action-component";
import { ROLES } from "../../types";
import { roles } from "../../../utils/role-list";
import { errorMessages } from "../../../utils/has-error-field";

type Props = {
     login: string;
     role: ROLES;
     id: number;
     opened: boolean;
     close: () => void;
     typeModal: "delete" | "update"
};

type SubmitData = {
     login: string
     newPassword: string
     oldPassword: string
     role: ROLES
};

export const UpdateUserModal: React.FC<Props> = ({ id, login, role, opened, close, typeModal }) => {
     const form = useForm<SubmitData>({
          initialValues: {
               login,
               newPassword: "",
               oldPassword: "",
               role,
          },
          validate: {
               login: (value) => (value.length < 5 ? "Minimum login length is 5 characters!" : null),
               newPassword: (value) => (value && value.length < 6 ? "Minimum password length is 6 characters!" : null),
               oldPassword: (value) => (value && value.length < 6 ? "Minimum password length is 6 characters!" : null),
          },
     });

     const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery();
     const { succeed, error } = useNotification();

     useEffect(() => {
          if (opened) {
               form.setValues({
                    login,
                    newPassword: "",
                    oldPassword: "",
                    role,
               });
               form.resetDirty();
          }
     }, [opened]);

     const updateUser = async (data: SubmitData) => {
          try {
               await updateUserMutation({ id, data }).unwrap();
               succeed("User updated!");
               await triggerAllUsersQuery().unwrap();
               close();
          } catch (err) {
               error(errorMessages(err));
          }
     };

     return (
          typeModal === "update" &&
          <Modal
               opened={opened}
               onClose={close}
               title="Updating user information"
          >
               <form onSubmit={form.onSubmit(updateUser)}>
                    <TextInput
                         label="Login"
                         placeholder="Enter login"
                         key={form.key("login")}
                         {...form.getInputProps("login")}
                    />
                    <PasswordInput
                         label="Current password"
                         placeholder="Enter the current password"
                         key={form.key("oldPassword")}
                         {...form.getInputProps("oldPassword")}
                    />
                    <PasswordInput
                         label="New password"
                         placeholder="Enter a new password"
                         key={form.key("newPassword")}
                         {...form.getInputProps("newPassword")}
                    />
                    <Select
                         label="Role"
                         placeholder="Select the user role"
                         key={form.key("role")}
                         {...form.getInputProps("role")}
                         data={roles}
                    />
                    <ModalActionComponent
                         disabled={!form.isDirty()}
                         loading={isLoading}
                         close={close}
                    />
               </form>
          </Modal>
     );
};

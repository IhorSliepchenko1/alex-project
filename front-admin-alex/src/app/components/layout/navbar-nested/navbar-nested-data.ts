import { CiLogout } from "react-icons/ci";
import { ROLES } from "../../../../utils/role-list";
import { FaUsers } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { SiDatefns } from "react-icons/si";

export const data = (logoutSession: () => void) => {

     return [
          {
               label: "Users",
               icon: FaUsers,
               link: "/",
               access: [ROLES.ADMIN]
          },
          {
               label: "Messages",
               icon: MdMessage,
               link: "/messages",
               access: [ROLES.ADMIN]
          },
          {
               label: "Consultation",
               icon: BiSolidMessageAltDetail,
               link: "/consultation",
               access: [ROLES.ADMIN]
          },
          {
               label: "Statuses",
               icon: CiBoxList,
               link: "/statuses",
               access: [ROLES.ADMIN]
          },
          {
               label: "Service type",
               icon: CiBoxList,
               link: "/service-type",
               access: [ROLES.ADMIN]
          },
          {
               label: "Date-time",
               icon: SiDatefns ,
               link: "/select-date-time",
               access: [ROLES.ADMIN]
          },

          // {
          //      label: "Добавления",
          //      icon: FiPlusSquare,
          //      links: [
          //           { label: "Пользователи", link: "/users" },
          //           { label: "Города", link: "/city" },
          //           { label: "Типы баз", link: "/type-number" },
          //           { label: "Результаты", link: "/result" },
          //      ],
          //      access: [ROLES.ADMIN, ROLES.USER]
          // },
          // {
          //      label: "Импорт",
          //      icon: BsDatabaseAdd,
          //      links: [
          //           { label: "Номера", link: "/numbers" },
          //           { label: "Результаты", link: "/result-history" },
          //           { label: "Гости", link: "/guest" },
          //      ],
          //      access: [ROLES.ADMIN, ROLES.USER]
          // },
          // {
          //      label: "История",
          //      icon: TbHistory,
          //      link: "/histories-import",
          //      access: [ROLES.ADMIN, ROLES.USER]
          // },

          {
               label: "Exit",
               icon: CiLogout,
               link: "/auth",
               onClick: logoutSession,
               logout: true,
               access: [ROLES.ADMIN, ROLES.USER]
          },
     ];
}
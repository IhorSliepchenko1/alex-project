import { Status as TStatus } from "../../../types"
import { Status } from "../status/status"
import { LoaderComponent } from "../../layout/loader"
import { ScrolContainer } from "../../layout/scrol-container"

type Data = TStatus & {
     color?: string
}

type Props = {
     isLoading: boolean
     data: { rows: Data[] } | undefined
     text: string
}

export const StatusComponent: React.FC<Props> = ({ isLoading, data, text }) => {
     return (
          <ScrolContainer>
               <p className="text-center text-xl sticky top-0">{text}</p>
               {isLoading
                    ? <LoaderComponent />
                    : data?.rows.map((item, index) => (
                         <Status
                              key={item.id}
                              id={item.id}
                              index={index + 1}
                              name={item.name}
                              color={item?.color}
                         />))}
          </ScrolContainer>
     )
}

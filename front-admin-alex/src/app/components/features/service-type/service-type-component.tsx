import { LoaderComponent } from "../../layout/loader"
import { ScrolContainer } from "../../layout/scrol-container"
import { ServiceType } from "./service-type"

type Data = {
     id: number;
     name: string;
     createdAt: Date;
     updatedAt: Date;
}

type Props = {
     isLoading: boolean
     data: { rows: Data[] } | undefined
     text: string
}

export const ServiceTypeComponent: React.FC<Props> = ({ isLoading, data, text }) => {
     return (
          <ScrolContainer>
               <p className="text-center text-xl sticky top-0">{text}</p>
               {isLoading
                    ? <LoaderComponent />
                    : data?.rows.map((item, index) => (
                         <ServiceType
                              key={item.id}
                              id={item.id}
                              index={index + 1}
                              name={item.name}
                         />))}
          </ScrolContainer>
     )
}

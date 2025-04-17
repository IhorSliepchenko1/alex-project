import { LoaderComponent } from "../../layout/loader"
import { ScrolContainer } from "../../layout/scrol-container"
import { SelectDateTime } from "./select-date-time";

type Data = {
  id: number;
  date: string,
  time: string,
  period: string,
  limits: number,
  booked: number
  createdAt: Date;
  updatedAt: Date;
}

type Props = {
  isLoading: boolean
  data: { rows: Data[] } | undefined
  text: string
}


export const SelectDateTimeComponent: React.FC<Props> = ({ isLoading, data, text }) => {
  return (
    <ScrolContainer>
      <p className="text-center text-xl sticky top-0">{text}</p>
      {isLoading
        ? <LoaderComponent />
        : data?.rows.map((item, index) => (
          <SelectDateTime
            key={item.id}
            id={item.id}
            index={index + 1}
            date={item.date}
            time={item.time}
            limits={item.limits}
            period={item.period}
            booked={item.booked}
          />))}
    </ScrolContainer>
  )
}

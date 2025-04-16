import { Modal } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { BASE_URL } from '../../../constants';

type Props = { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>>, arrayImg: string[] }

export const Slider: React.FC<Props> = ({ opened, setOpened, arrayImg }) => {


     const TRANSITION_DURATION = 200;
     return (

          opened && <Modal
               opened={opened}
               size={700}
               padding={0}
               transitionProps={{ duration: TRANSITION_DURATION }}
               withCloseButton={false}
               onClose={() => setOpened(false)}
          >
               <Carousel loop maw={700}>
                    {
                         arrayImg.map((img_name) => (
                              <Carousel.Slide key={img_name + new Date()}>
                                   <img
                                        src={`${BASE_URL}/${img_name}`}
                                        alt={img_name}
                                        style={{ width: 700, height: 500, objectFit: 'cover' }}
                                   />
                              </Carousel.Slide>
                         ))

                    }

               </Carousel>
          </Modal>

     )
}

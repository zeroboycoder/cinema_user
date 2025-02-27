import {useState} from 'react'
import BackButton from "@/components/backButton";
import DefaultLayout from "@/layouts/default"
import { useDetails } from "@/machine/useDetails"
import { historylist, deleteBooking } from "@/services/api";
import { Button } from "@heroui/button";
import { useCookieState, useRequest } from "ahooks";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { parseAsInteger, useQueryState } from "nuqs";
import moment from 'moment';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";


const History = () => {
  const {details} = useDetails(s=>s);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedBookingId, setSelectedBookingId] = useState()
  const [cantDelete, setCantDelete] = useState(false)
  const {data} = useRequest(()=>historylist({
    page:1,
    pageSize:10,
    order:"DESC"
  }),{
    cacheKey:"history_list"
  });

  const navigate = useNavigate();
 
  const [,setPrice] = useQueryState('booking_id',{
    defaultValue:""
  })
  
  const onDeleteHandler = async (id, createdAt) => {
    setSelectedBookingId(id)
    // check createdAt is more than 3 hour
    // if yes show error
    // else delete
    if(moment(createdAt).isBefore(moment().subtract(3, 'hours'))) {
      setCantDelete(true)
      onOpen()
    } else {
    setCantDelete(false)
     onOpen()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                  {cantDelete ? "Can't delete booking" : "Cancel booking"}
                  </ModalHeader>
                  <ModalBody>
                    <p>
                    {
                    cantDelete ? "You can't delete booking after 3 hours of booking" : "Are you sure you want to cancel this booking?"
                    }
                    </p>
                  </ModalBody>
                  {
                    cantDelete ? <ModalFooter>
                    
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  </ModalFooter> : <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={async() => {
                      await deleteBooking(selectedBookingId)
                      onClose()
                      window.location.reload()
                    }}>
                      Delete
                    </Button>
                  </ModalFooter>
                  }
                </>
              )}
            </ModalContent>
      </Modal>
      <DefaultLayout>
        <div className="flex justify-between items-center mb-9">
            <h1 className="text-2xl font-bold text-white">History</h1>
            <div>
              <BackButton/>
            </div>
        </div>
          {
            data?.length > 0 && (
              data?.map((item:any ,index:any)=>(
                <div className="container flex justify-between bg-secondary rounded-lg mb-5 p-3" key={index}>
                  <div key={index} className="container  flex gap-7">
                      <img src={item?.movie?.image} className="rounded-lg" width={100} height={70}  alt={details?.image} />
                      <div className="flex flex-col gap-2">
                      <h1 className="text-2xl font-bold  mt-1 text-white">{item?.movie?.name}</h1>
                      <p>Seat : {item?.seat_numbers.join(", ")}</p>
                      <p>Date : {dayjs(item?.movie_date?.date).format("DD MMMM YYYY")}</p>
                      <p>Time : {item?.time}</p>
                  </div>
              </div>
                  <div className="flex gap-4 items-start">
                    <Button color="primary" onClick={()=> {
                        setPrice(item?.id)
                        navigate('/details',{
                          state:item?.movie?.id
                        })
                    } } variant="bordered">Edit</Button>
                    <Button color="danger" variant="bordered" onClick={() => onDeleteHandler(item?.id, item?.createdAt)}>Delete</Button>
                  </div>

                </div>
              ))
            )
          }
      </DefaultLayout>
    </>
  )
}

export default History

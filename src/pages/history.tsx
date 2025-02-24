import BackButton from "@/components/backButton";
import DefaultLayout from "@/layouts/default"
import { useDetails } from "@/machine/useDetails"
import { historylist } from "@/services/api";
import { useRequest } from "ahooks";
import dayjs from "dayjs";

const History = () => {
  const {details} = useDetails(s=>s);
  const {data} = useRequest(()=>historylist({
    page:1,
    pageSize:10,
    order:"DESC"
  }),{
    cacheKey:"history_list"
  });
  console.log(data)
  return (
    <DefaultLayout>
       <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl font-bold text-white">History</h1>
          <div>
             <BackButton/>
          </div>
       </div>
        {
          data?.length > 0 && (
            data?.map((item:any ,index:any)=>(
              <div key={index} className="bg-secondary flex gap-7 rounded-lg  p-3">
              <img src={details?.image || '/images/spider.png'} className="rounded-lg" width={100} height={70}  alt={details?.image} />
              <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold  mt-1 text-white">{"Ben Ten"}</h1>
                  <p>Card Number : {item?.card_number}</p>
                  <p>Date : {dayjs(item?.date).format("D MMMM YYYY")}</p>
                  <p>Expired Date : {item?.mmyy}</p>
                  <p>CCV : {item?.cvv}</p>
              </div>
             </div>
            ))
          )
        }
    </DefaultLayout>
  )
}

export default History

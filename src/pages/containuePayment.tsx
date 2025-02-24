import lazyToast from '@/components/alert'
import BackButton from '@/components/backButton'
import DefaultLayout from '@/layouts/default'
import { useDetails } from '@/machine/useDetails'
import { useSeat } from '@/machine/useSeat'
import { bookService } from '@/services/api'
import { errorMessageResolver } from '@/utils'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { button } from '@heroui/theme'
import { useRequest, useSafeState } from 'ahooks'
import { useLocation, useNavigate } from 'react-router-dom'

const ContainuePayment = () => {
    const {details} = useDetails(s=>s)
    const navigate = useNavigate();
    const location = useLocation();
    const {seating} = useSeat(s=>s);
    const [cardNumber,setCardNumber] = useSafeState('');
    const [cvc,setCvc]  = useSafeState('');
    const [exp,setExp] = useSafeState('')
    const sturctureData = {
         movie_id:location.state,
         seat_number:seating[0].seat,
         date:"2025-03-01",
         time:"4:00 PM",
        card_number:cardNumber,
         mmyy:exp,
         cvv:cvc

    }
    const {runAsync ,loading} =useRequest(bookService,{
        manual:true
    });
    const handleBook = ()=>{
         lazyToast(runAsync(sturctureData),{
            loading:"Booking",
            error : (err)=> errorMessageResolver(err),
            success:()=>{
                navigate('/history')
               return "Booking Success"
            }
         })
    }
    return (
        <DefaultLayout>
            <div className='flex justify-between mb-7'>
                <h1 className='text-2xl font-bold'>Payment</h1>
                 <BackButton/>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className=''>
                    <Input size='lg' className='mb-4' onChange={(e)=>setCardNumber(e.target.value)} placeholder="Card Number" classNames={{
                        inputWrapper: "",
                        input: "",
                    }} />
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <Input size='lg' placeholder="exp" onChange={(e)=>setExp(e.target.value)} classNames={{
                            inputWrapper: "",
                            input: "",
                        }} />
                        <Input size='lg' placeholder="CVC" onChange={(e)=>setCvc(e.target.value)} classNames={{
                            inputWrapper: "",
                            input: "",
                        }} />
                    </div>
                    <Input size='lg' className='mb-4' placeholder="Holder Name" classNames={{
                        inputWrapper: "",
                        input: "",
                    }} />
                    <div>
                        <div  className='flex justify-end'>
                            <Button 
                            onClick={handleBook}
                            isLoading={loading}
                            className={button({
                                color: "primary",
                                variant: "shadow",
                                radius: "lg"
                            })}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='my-2 flex justify-between items-center '>
                            <div>
                            <h1 className='text-2xl font-bold '>Total Price</h1>
                            <p>Amount : 20USD </p>
                            </div>
                            <img src={details?.image} width={70} height={70} className='object-cover' alt={details?.image} />
                        </div>
                        <div>

                        </div>
                    </div>
                    <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam quas accusamus amet ipsam exercitationem</p>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default ContainuePayment

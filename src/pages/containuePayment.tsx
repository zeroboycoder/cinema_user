import { seataAtom, seatbAtom, seatcAtom, seatdAtom, seateAtom, seatfAtom } from '@/atom/data'
import lazyToast from '@/components/alert'
import BackButton from '@/components/backButton'
import DefaultLayout from '@/layouts/default'
import { useDetails } from '@/machine/useDetails'
import { useSeat } from '@/machine/useSeat'
import { bookService, updateBook } from '@/services/api'
import { errorMessageResolver } from '@/utils'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { button, card } from '@heroui/theme'
import { useRequest, useSafeState } from 'ahooks'
import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const ContainuePayment = () => {
    const { details } = useDetails(s => s)
    const navigate = useNavigate();
    const location = useLocation();
    const { seating ,handleClearSeat} = useSeat(s => s);
    const [seats, setSeats] = useSafeState([])
    const [cardNumber, setCardNumber] = useSafeState('');
    const [cvc, setCvc] = useSafeState('');
    const [exp, setExp] = useSafeState('');
    const [totalPrice, setTotalPrice] = useSafeState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [cardHolderName,setCardHolderName] = useSafeState('');
    const [seatA, setSeatA] = useAtom<any>(seataAtom);
    const [seatB, setSeatB] = useAtom<any>(seatbAtom);
    const [seatC, setSeatC] = useAtom<any>(seatcAtom);
    const [seatD, setSeatD] = useAtom<any>(seatdAtom);
    const [seatE, setSeatE] = useAtom<any>(seateAtom);
    const [seatF, setSeatF] = useAtom<any>(seatfAtom);
    const [bookid,] = useQueryState('booking_id', {
        defaultValue: ""
    })
    // const  = useRequest();

    const isHas = !(cardNumber && cvc && exp && cardHolderName)
    console.log(isHas)
    const sturctureData = {
        movie_id: location.state,
        seat_numbers: seats,
        movie_date_id: searchParams.get("movieDateId"),
        time: searchParams.get("movieTime"),
        card_number: cardNumber,
        mmyy: exp,
        cvv: cvc,
        price: totalPrice
    }
    const price = {
        "A": 3000,
        "B": 4500,
        "C": 4500,
        "D": 5500,
        "E": 5500,
        "F": 12000,
    }
    useEffect(() => {
        let priceTemp = 0;
        const _seats = seating.map((item: any) => item.seat)
        setSeats(_seats)
        seating.map((item: any) => {
            const seatLetter = item.seat[item.seat.length - 1]
            priceTemp += price[seatLetter]
        });
        setTotalPrice(priceTemp)
    }, [])

    const { runAsync, loading } = useRequest(bookid ? updateBook : bookService, {
        manual: true
    });
    const handleBook = () => {
        lazyToast(runAsync(sturctureData, bookid), {
            loading: "Booking",
            error: (err) => errorMessageResolver(err),
            success: () => {
                handleClearSeat()
                setSeatA([]);
                setSeatB([]);
                setSeatC([]);
                setSeatD([]);
                setSeatE([]);
                setSeatF([]);
            
                navigate('/history')
                return bookid ? "Update Booking Success" : "Booking Success"
            }
        })
    }
    return (
        <DefaultLayout>
            <div className='flex justify-between mb-7'>
                <h1 className='text-2xl font-bold'>Payment</h1>
                <BackButton />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className=''>
                    <Input size='lg' className='mb-4' onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" classNames={{
                        inputWrapper: "",
                        input: "",
                    }} />
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <Input size='lg' placeholder="exp" onChange={(e) => setExp(e.target.value)} classNames={{
                            inputWrapper: "",
                            input: "",
                        }} />
                        <Input size='lg' placeholder="CVC" onChange={(e) => setCvc(e.target.value)} classNames={{
                            inputWrapper: "",
                            input: "",
                        }} />
                    </div>
                    <Input size='lg' onChange={(e)=>setCardHolderName(e.target.value)} className='mb-4' placeholder="Holder Name" classNames={{
                        inputWrapper: "",
                        input: "",
                    }} />
                    <div>
                        <div className='flex justify-end'>
                            <Button
                                disabled={isHas}
                                onClick={handleBook}
                                isLoading={loading}
                                className={button({
                                    color: "primary",
                                    variant: "shadow",
                                    radius: "lg",
                                    className:"disabled:opacity-60"
                                })}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='my-2 flex justify-between'>
                            <div className='flex flex-col justify-start gap-2'>
                                <h1 className='text-2xl font-bold'>{details?.name}</h1>
                                <p>Total Amount : {totalPrice || 0} MMK </p>
                                <p>Seats : {seats.join(", ")}</p>
                            </div>

                            <img src={searchParams.get("movieImage")} width={90} className='object-cover' alt={details?.image} />
                        </div>
                        <div>

                        </div>
                    </div>
                    {/* <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam quas accusamus amet ipsam exercitationem</p> */}
                </div>

            </div>
        </DefaultLayout>
    )
}

export default ContainuePayment

import { seataAtom, seatbAtom, seatcAtom, seatdAtom, seateAtom, seatfAtom } from "@/atom/data"
import BackButton from "@/components/backButton"
import DefaultLayout from "@/layouts/default"
import { useSeat } from "@/machine/useSeat"
import { seatList } from "@/services/api"
import { Button } from "@heroui/button"
import { button, menuItem } from "@heroui/theme"
import { useRequest, useSafeState } from "ahooks"
import { useAtom } from "jotai"
import { useQueryState } from "nuqs"
import { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const ChooseSeat = () => {
    // const seat =[{
    //     isHas:false,
    //     "1"
    // }, "2", "3", "4", "5", "6", "7", "8", "9", "10" , "11" , "12"]
    const seat = [
        {
            isHas: false,
            seat: "1"
        },
        {
            isHas: false,
            seat: "2"
        },
        {
            isHas: false,
            seat: "3"
        },
        {
            isHas: false,
            seat: "4"
        },
        {
            isHas: false,
            seat: "5"
        },
        {
            isHas: false,
            seat: "6"
        },
        {
            isHas: false,
            seat: "7"
        },
        {
            isHas: false,
            seat: "8"
        }, {
            isHas: false,
            seat: "9"
        },
        {
            isHas: false,
            seat: "10"
        },
        {
            isHas: false,
            seat: "11"
        },
        {
            isHas: false,
            seat: "12"
        },
    ]
    const [allSeatListA, setSeatListA] = useSafeState(seat)
    const [allSeatListB, setSeatListB] = useSafeState(seat)

    const [allSeatListC, setSeatListC] = useSafeState(seat)
    const [allSeatListD, setSeatListD] = useSafeState(seat)
    const [allSeatListE, setSeatListE] = useSafeState(seat)
    const [allSeatListF, setSeatListF] = useSafeState(seat)

    const [seatA, setSeatA] = useAtom<any>(seataAtom);
    const [seatB, setSeatB] = useAtom<any>(seatbAtom);
    const [seatC, setSeatC] = useAtom<any>(seatcAtom);
    const [seatD, setSeatD] = useAtom<any>(seatdAtom);
    const [seatE, setSeatE] = useAtom<any>(seateAtom);
    const [seatF, setSeatF] = useAtom<any>(seatfAtom);

    const [bookid] = useQueryState('booking_id',{
        defaultValue:""
    })
    const { handleSeat: handleSeating, handleSeatFilter ,seating ,handleClearSeat  } = useSeat(s => s);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams,]= useSearchParams()

    const { runAsync } = useRequest(() => seatList(location.state, searchParams.get("movieDateId")), {
        cacheKey: `seat-list${location.state}`, manual: true
    });

    console.log(seating,"I am seating")

    useEffect(() => {
        runAsync().then(async (res) => {
            if (res.length == 0) {
                return
            }
            setSeatListA(allSeatListA.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}A`)
                };
            }));
            setSeatListB(allSeatListB.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}B`)
                };
            }));
            setSeatListC(allSeatListC.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}C`)
                };
            }));
            setSeatListD(allSeatListD.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}D`)
                };
            }));
            setSeatListE(allSeatListE.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}E`)
                };
            }));
            setSeatListF(allSeatListF.map((seat) => {
                return {
                    ...seat,
                    isHas: res.includes(`${seat.seat}F`)
                };
            }));
            const a = res.map((test: any) => {
                if (test.includes("A")) {
                    return {
                        isHas: true,
                        seat: test.replace('A', "")
                    }
                }
            })
            const b = res.map((test: any) => {
                if (test.includes("B")) {
                    return {
                        isHas: true,
                        seat: test.replace('B', '')
                    }
                }
            })
            const c = res.map((test: any) => {
                if (test.includes("C")) {
                    return {
                        isHas: true,
                        seat: test.replace('C', '')
                    }
                }
            })

            const d = res.map((test: any) => {
                if (test.includes("D")) {
                    return {
                        isHas: true,
                        seat: test.replace('D', '')
                    }
                }
            })
            const e = res.map((test: any) => {
                if (test.includes("E")) {
                    return {
                        isHas: true,
                        seat: test.replace('E', '')
                    }
                }
            })
            const f = res.map((test: any) => {
                if (test.includes("F")) {
                    return {
                        isHas: true,
                        seat: test.replace('F', '')
                    }
                }
            });
            setSeatA([...seatA, ...a.filter((item) => item !== undefined)]);
            setSeatB([...seatB, ...b.filter((item) => item !== undefined)]);
            setSeatC([...seatC, ...c.filter((item) => item !== undefined)]);
            setSeatD([...seatD, ...d.filter((item) => item !== undefined)]);
            setSeatE([...seatE, ...e.filter((item) => item !== undefined)]);
            setSeatF([...seatF, ...f.filter((item) => item !== undefined)]);
        })
    }, [])


    const handleSeat = (seat: any, item: any) => {
        if (seat === "A") {
            if (seatA.some((seat: any) => seat?.seat == item?.seat)) {
                handleSeatFilter({ ...item, seat: `${item.seat}A` })
                setSeatA(seatA.filter((seat: any) => seat?.seat !== item.seat))
                return
            } else {
                handleSeating({ ...item, seat: `${item.seat}A` })
                setSeatA([...seatA, item])
            }
        }
        if (seat === "B") {
            if (seatB.some((seat: any) => seat?.seat == item?.seat)) {
                handleSeatFilter({ ...item, seat: `${item.seat}B` })

                setSeatB(seatB.filter((seat: any) => seat?.seat !== item?.seat))
                return
            } else {
                handleSeating({ ...item, seat: `${item.seat}B` })
                setSeatB([...seatB, item])
            }

        }
        if (seat === "C") {
            if (seatC.some((seat: any) => seat?.seat == item?.seat)) {
                setSeatC(seatC.filter((seat: any) => seat?.seat !== item?.seat))
                handleSeatFilter({ ...item, seat: `${item.seat}C` })
                return
            } else {
                setSeatC([...seatC, item])
                handleSeating({ ...item, seat: `${item.seat}C` })
            }
        }
        if (seat === "D") {
            if (seatD.some((seat: any) => seat?.seat == item?.seat)) {
                handleSeatFilter({ ...item, seat: `${item.seat}D` })
                setSeatD(seatD.filter((seat: any) => seat?.seat !== item?.seat))
                return
            } else {
                handleSeating({ ...item, seat: `${item.seat}D` })
                setSeatD([...seatD, item])
            }
        }
        if (seat === "E") {
            if (seatE.some((seat: any) => seat?.seat == item?.seat)) {
                handleSeatFilter({ ...item, seat: `${item.seat}E` })
                setSeatE(seatE.filter((seat: any) => seat?.seat !== item?.seat))
                return
            } else {
                handleSeating({ ...item, seat: `${item.seat}E` })
                setSeatE([...seatE, item])
            }
        }
        if (seat === "F") {
            if (seatF.some((seat: any) => seat?.seat == item?.seat)) {
                handleSeatFilter({ ...item, seat: `${item.seat}F` })
                setSeatF(seatF.filter((seat: any) => seat?.seat !== item?.seat))
                return
            } else {
                handleSeating({ ...item, seat: `${item.seat}F` })
                setSeatF([...seatF, item])
            }
        }
    }

    return (
        <DefaultLayout>
            <div className="flex  justify-between ">
                <h1 className="text-2xl font-bold mb-10">Choose Seat</h1>

                <Button
                    onClick={() => {
                        handleClearSeat()
                        setSeatA([]);
                        setSeatB([]);
                        setSeatC([]);
                        setSeatD([]);
                        setSeatE([]);
                        setSeatF([]);
                        navigate(-1)
                    }}
                    className={
                        button({
                            color: "primary",
                            radius: "lg",
                            variant: "shadow"
                        })
                    }>
                    Back
                </Button>
            </div>
            <div>

                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListA.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                                    disabled={item?.isHas}
                                    onClick={() => {
                                        handleSeat("A", item)
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatA.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"
                                    })}>
                                    {item.seat}
                                </Button>

                            </div>
                        ))
                    }
                    A
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListB.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                                    disabled={item?.isHas}
                                    onClick={() => {
                                        handleSeat("B", item)
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatB.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"

                                    })}>
                                    {item.seat}
                                </Button>

                            </div>
                        ))
                    }
                    B
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListC.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                    
                                    disabled={item?.isHas}
                                    onClick={() => {

                                        handleSeat("C", item)

                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatC.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"

                                    })}>
                                    {item.seat}
                                </Button>

                            </div>
                        ))
                    }
                    C
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListD.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                                    disabled={item?.isHas}
                                    onClick={() => {
                                        if (item?.isHas) {
                                            return
                                        } else {
                                            handleSeat("D", item)
                                        }
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatD.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"
                                    })}>
                                    {item.seat}
                                </Button>

                            </div>
                        ))
                    }
                    D
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListE.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                                    disabled={item.isHas}
                                    onClick={() => {
                                        if (item?.isHas) {
                                            return
                                        } else {
                                            handleSeat("E", item)
                                        }
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatE.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"

                                    })}>
                                    {item.seat}
                                </Button>

                            </div>
                        ))
                    }
                    E
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 pb-7">
                    {
                        allSeatListF.map((item: any, index: number) => (
                            <div key={index} className="relative" >
                                <Button
                                    disabled={item?.isHas}
                                    onClick={() => {
                                        if (item?.isHas) {
                                            return
                                        } else {
                                            handleSeat("F", item)
                                        }
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                    }} className={button({
                                        color: seatF.some((seat: any) => seat?.seat == item?.seat) ? "primary" : "secondary",
                                        variant: "shadow",
                                        radius: "full",
                                        size: "sm",
                                        className: "disabled:opacity-70"

                                    })}>
                                    {item?.seat}
                                </Button>

                            </div>
                        ))
                    }
                    F
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={() => navigate(`/payment${location.search}`, {
                        state: location.state
                    })}
                    className={button({
                        color: "primary",
                        variant: "shadow",
                        radius: "lg",

                    })}>
                    Book
                </Button>
            </div>
        </DefaultLayout>

    )

}

export default ChooseSeat

import DefaultLayout from "@/layouts/default"
import { useDetails } from "@/machine/useDetails"
import { Button } from "@heroui/button";
import { button } from "@heroui/theme";
import { useRequest, useSafeState, } from "ahooks"
import { useElementDimensions } from "@/hooks/useElemetDimession";
import BackButton from "@/components/backButton";
import { useLocation, useNavigate } from "react-router-dom";
import { movieDetails } from "@/services/api";


const MovieDetails = () => {
    const { details } = useDetails(s => s);
    const datedata = ["1 March 2025", "2 March 2025", "3 March 2025", "4 March 2025", "5 March 2025", "6 March 2025", "7 March 2025"]
    const { elementRefs, elementDimensions } = useElementDimensions();
    const [activeIndex, setActiveIndex] = useSafeState<any>();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location?.state, "I am state")

    const { data, } = useRequest(() => movieDetails(location.state), {
        cacheKey: `movie_details${location.state}`
    });
    console.log("movie details", data)
    
    return (
        !data?.name ? (
            <div className="relative h-screen flex items-center justify-center w-full">
                <img src="/images/Background.png" className="h-screen absolute top-0 left-0 object-cover w-full" alt="" />
                <img src="/images/cinema.png" width={150} height={150} className="relative z-20" alt="" />
            </div>
        ) : (
            <DefaultLayout>
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-2xl font-bold">About Movie</h1>
                    <BackButton />
                </div>
                <div className="inline-flex gap-3 ">
                    <img src={data?.image} className="rounded-lg max-w-[300px] block w-auto h-auto max-h-[300px] object-cover" alt="" />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold ">{data?.name}</h1>
                        <p className="">{data?.description}</p>
                        {/* <p className="">Release Date : {details.releaseDate}</p> */}
                        <p className="text-white ">{data?.genres?.map((teg: any, chind: any) => <span key={teg}>{teg}{data?.genres?.length - 1 !== chind && " ,"}{" "}</span>)}</p>
                        <p className="">Duration : {data?.duration} minute</p>

                        <p>{details?.storyline}</p>
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Choose Date</h1>

                            <div className="flex flex-wrap gap-5 pb-32">
                                {
                                    datedata.map((item: any, index) => (
                                        <div ref={(el) => el && elementRefs.current.set(index, el)} key={index} className="relative" >
                                            <Button
                                                onClick={() => navigate("/choose-seat", {
                                                    state: location.state
                                                })}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                onMouseLeave={() => setActiveIndex(undefined)}
                                                style={{
                                                    cursor: "pointer",
                                                    position: "relative",

                                                }} className={button({
                                                    color: "secondary",
                                                    variant: "shadow",
                                                    radius: "lg",
                                                })}>
                                                {item}
                                            </Button>
                                            <Button style={{
                                                width: elementDimensions.get(index)?.width,
                                                cursor: "pointer",
                                                position: "absolute"
                                            }}
                                                className={
                                                    button({
                                                        color: "secondary",
                                                        variant: "shadow",
                                                        radius: "lg",
                                                        className: `absolute  z-20 left-0 transition-all duration-500 ease-in-out -bottom-12  ${activeIndex === index ? " opacity-1 translate-y-0" : "opacity-0 translate-y-10"}`
                                                    })
                                                }
                                            >
                                                4:00 PM
                                            </Button>                                                                                                                                                                               
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    )
}

export default MovieDetails

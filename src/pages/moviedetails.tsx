import DefaultLayout from "@/layouts/default";
import { useDetails } from "@/machine/useDetails";
import { Button } from "@heroui/button";
import { button } from "@heroui/theme";
import { useRequest, useSafeState, useUpdateEffect } from "ahooks";
import { useElementDimensions } from "@/hooks/useElemetDimession";
import BackButton from "@/components/backButton";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { listselect, movieDetails } from "@/services/api";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

const MovieDetails = () => {
  const { details } = useDetails((s) => s);
  const datedata = [
    "1 March 2025",
    "2 March 2025",
    "3 March 2025",
    "4 March 2025",
    "5 March 2025",
    "6 March 2025",
    "7 March 2025",
  ];
  const { elementRefs, elementDimensions } = useElementDimensions();
  const [activeIndex, setActiveIndex] = useSafeState<any>();
  const [movieDateId, setMovieDateId] = useSafeState()
  const [movieTime, setMovieTime] = useSafeState<string>()
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state, "I am state return");

  const { data } = useRequest(() => movieDetails(location.state), {
    cacheKey: `movie_details${location.state}`,
  });
  const [bookId] = useQueryState('booking_id', {
    defaultValue: ''
  })

  const { runAsync: BookTime, data: BookSeatTime } = useRequest(() => listselect(bookId), {
    manual: true
  })

  useEffect(() => {
    BookTime()
  }, [
    bookId
  ])

  console.log(BookSeatTime, "Its time")

  return !data?.name ? (
    <div className="relative h-screen flex items-center justify-center w-full">
      <img
        src="/images/Background.png"
        className="h-screen absolute top-0 left-0 object-cover w-full"
        alt=""
      />
      <img
        src="/images/cinema.png"
        width={150}
        height={150}
        className="relative z-20"
        alt=""
      />
    </div>
  ) : (
    <DefaultLayout>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">About Movie</h1>
        <BackButton />
      </div>
      <div className="inline-flex gap-3 ">
        <img
          src={data?.image}
          className="rounded-lg max-w-[300px] block w-auto h-auto max-h-[300px] object-cover"
          alt=""
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold ">{data?.name}</h1>
          <p className="">{data?.description}</p>
          {/* <p className="">Release Date : {details.releaseDate}</p> */}
          <p className="text-white ">
            {data?.genres?.map((teg: any, chind: any) => (
              <span key={teg}>
                {teg}
                {data?.genres?.length - 1 !== chind && " ,"}{" "}
              </span>
            ))}
          </p>
          <p className="">Duration : {data?.duration} minute</p>

          <p>{details?.storyline}</p>
          <div>
            <h1 className="text-2xl font-bold mb-4">Choose Date</h1>

            <div className="flex flex-wrap gap-5 pb-10">
              {data?.movie_dates?.map((item: any, index) => (
                <div
                  ref={(el) => el && elementRefs.current.set(index, el)}
                  key={index}
                  className="relative"
                >
                  <Button
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: activeIndex === moment(item?.date).format("DD MMMM YYYY") ? "#fd8a3a" : "transparent",
                    }}
                    className={button({
                      color: "secondary",
                      variant: "shadow",
                      radius: "lg",
                    })}
                    onClick={() => {
                      setActiveIndex(moment(item?.date).format("DD MMMM YYYY"))
                      setMovieDateId(item?.id)
                    }}
                  >
                    {moment(item?.date).format("DD MMMM YYYY")}
                  </Button>
                </div>
              ))}
            </div>
            <div>
              {activeIndex !== undefined && ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"].map(
                (item: string, index) => (
                  <Button
                    style={{
                      width: elementDimensions.get(index)?.width,
                      cursor: "pointer"
                    }}
                    className={button({
                      color: "secondary",
                      variant: "shadow",
                      radius: "lg",
                      className: `mr-4`,
                    })}
                    key={index}
                    onClick={() => {
                      setMovieTime(() => item)
                      navigate(`/choose-seat?movieDateId=${movieDateId}&movieTime=${item}&movieImage=${data.image}&movieName=${data?.name}&booking_id=${bookId}`, {
                        state: location.state,
                      })
                    }
                    }
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MovieDetails;

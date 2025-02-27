import DefaultLayout from "@/layouts/default";
import { useDetails } from "@/machine/useDetails";
import { Button } from "@heroui/button";
import { button } from "@heroui/theme";
import { useRequest, useSafeState, useUpdateEffect } from "ahooks";
import { useElementDimensions } from "@/hooks/useElemetDimession";
import BackButton from "@/components/backButton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { upcomingMovieDetail } from "@/services/api";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";

const MovieDetails = () => {
  const [movie, setMovie] = useState("")
  const location = useLocation();

  const id = location.pathname.split("/upcoming-details/")[1]

  useEffect(() => {
    const fetchData = async () => {
      const response = await upcomingMovieDetail(id)
      setMovie(response)
    }
    fetchData();
  }, [id])


  return movie ? <DefaultLayout>
  <div className="flex justify-between items-center mb-3">
    <h1 className="text-2xl font-bold">About Movie</h1>
    <BackButton />
  </div>
  
  <div className="inline-flex gap-3 ">
    <img
      src={movie?.image}
      className="rounded-lg max-w-[300px] block w-auto h-auto max-h-[300px] object-cover"
      alt=""
    />
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold ">{movie?.name}</h1>
      <p className="">{movie?.description}</p>
      {/* <p className="">Release Date : {details.releaseDate}</p> */}
      <p className="text-white ">
        {movie?.genres?.map((teg: any, chind: any) => (
          <span key={teg}>
            {teg}
            {movie?.genres?.length - 1 !== chind && " ,"}{" "}
          </span>
        ))}
      </p>
      <p className="">Duration : {movie?.duration} minute</p>
      <p>Upcoming show date : {moment(movie?.date).format("DD MMM YYYY")} </p>
    </div>
    </div>
</DefaultLayout> : <></>
};

export default MovieDetails;

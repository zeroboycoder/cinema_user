import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";
import { useDetails } from "@/machine/useDetails";
import { useNavigate } from "react-router-dom";
import { useRequest, useSafeState } from "ahooks";
import { movielist } from "@/services/api";

export default function IndexPage() {
  const [search,setSearch] = useSafeState('');
  const {data:movieList} = useRequest(()=>movielist({order:"DESC",page:1,pageSize:10,search}),{
    cacheKey:`movielist${1},${10},${search}`,
    refreshDeps:[search],
  });
  console.log(movieList?.data,"movielist")

  const data=[
    {
      rate: 8.1,
      title: "The Batman",
      image: "/images/batman.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline:"For the first time in the cinematic history of Spider"
    },
    {
      rate: 8.1,
      title: "Uncharted",
      image: "/images/human.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline: "For the first time in the cinematic history of Spider"
    },
    {
      rate: 8.1,
      title: "The Exorcism of God",
      image: "/images/god.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline: "For the first time in the cinematic history of Spider"
    },
    {
      rate: 8.1,
      title: "Turning Red",
      image: "/images/red-con.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline: "For the first time in the cinematic history of Spider"
    },
    {
      rate: 8.1,
      title: "Spider-Man",
      image: "/images/spider.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline: "For the first time in the cinematic history of Spider"   
    },
    {
      rate: 8.1,
      title: "Morbius",
      image: "/images/human.png",
      type: "Action, Crime, Drama",
      duration: "2h 55min",
      releaseDate: "4 March 2022",
      description: "When the Riddler, a sadistic serial killer, begins murdering key",
      storyline: "Dr. Michael Morbius, a biochemist suffering from a rare blood disease, attempts to cure himself to disastrous results. When he tries to cure himself, he inadvertently infects himself with a form of vampirism instead."
    },
  ]


  const {handleDetails} = useDetails(s=>s);
  const navigate = useNavigate();
   

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center  gap-4 py-8 md:py-10">
           <Input placeholder="Now in cinemas" onChange={(e)=>setSearch(e.target.value)} classNames={{
             inputWrapper: " shadow-none text-2xl  h-[50px] bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
              input: "bg-transparent text-2xl",
           }} endContent={<><SearchIcon color="#999999"  /></>}/>

          {
             movieList?.data?.length > 0 && (
              <div className="grid  grid-cols-1 place-content-center gap-5  justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {
                 movieList?.data?.map((item:any ,index:number)=>(
                     <div  key={index} onClick={()=> {
                      navigate('/details',{
                        state:item?.id
                      })
                      handleDetails(item)
                     }} className="flex flex-col items-start cursor-pointer hover:scale-[1.05] transition-all duration-200 ease-linear">
                         <img src={item.image} alt={item.image} height={225}  className="object-contain rounded-lg" />
                          <div className="">
                          <p className="text-lg"> {item.name}</p>
                          <p className="text-base text-secondary-500">{item?.genres?.map((teg:any,chind:any)=><span key={teg}>{teg}{item?.genres?.length -1 !== chind &&" ,"}{" "}</span>)}</p>

                          </div>
                     </div>
                 ))
              }
           </div>
             )
          }
          {
            movieList?.data?.length == 1 && (
               <h1 className="text-3xl font-bold">There is no movie</h1>
            )
          }
      </section>
    </DefaultLayout>
  );
}

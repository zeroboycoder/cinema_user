import { Button } from "@heroui/button"
import { button } from "@heroui/theme"
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <div className=" ">
         
            <Button
           onClick={()=>{
            navigate(-1)
           }}
           className={
             button({
                 color:"primary",
                 radius:"lg",
                 variant:"shadow"
             })
           }>
               Back
           </Button>
            </div>
  )
}

export default BackButton

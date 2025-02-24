import lazyToast from "@/components/alert";
import EyeOff from "@/icons/eyeoff";
import Eye from "@/icons/eyes";
import { loginServie, registerService } from "@/services/api";
import { errorMessageResolver } from "@/utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input"
import { button } from "@heroui/theme";
import { useRequest, useSafeState } from "ahooks"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const { loading, runAsync: registerApi } = useRequest(registerService, {
        manual: true,
    });

    const [email, setUserName] = useSafeState('');
    const [password, setPassword] = useSafeState('');
    const [isToggle,setIsToggle] = useSafeState(true)
    const navigate = useNavigate()

    return (
        <div className="h-screen flex items-center justify-center w-full">
            <div className="py-7  w-[430px] bg-secondary px-5 border-secondary border-2 rounded-lg">
                <div className="flex justify-center flex-col items-center">
                    <img src="/images/cinema.png" width={50} height={50} alt="" />
                    <h1 className="text-3xl font-bold">Create</h1>
                </div>
                <Input onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="mt-4" size="lg" />
                <Input type={
                     isToggle ? "text" : "password"
                } onChange={(e) => setPassword(e.target.value)} endContent={<span  className="cursor-pointer">{isToggle ? <span onClick={()=>setIsToggle(false)}><EyeOff/></span> : <span onClick={()=>setIsToggle(true)}><Eye/></span> }</span>} placeholder="Password" className="mt-4" size="lg" />
                <p className="mt-4 text-white text-sm text-center">Already exist Account ? <span className="text-primary cursor-pointer" onClick={()=>navigate('/login')}>Login</span></p>
                <div className="mt-4">
                    <Button isLoading={loading} className={button({ color: "primary", variant: "shadow", radius: "lg", className: "w-full" })} onClick={() => lazyToast(registerApi({ email, password }), {
                        loading: "Register",
                        error: (err) => errorMessageResolver(err),
                        success: (res) => {
                            navigate('/login')
                            return "Register Success"
                        }
                    })}>
                        Create
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Register

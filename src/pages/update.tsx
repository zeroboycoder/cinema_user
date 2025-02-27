import lazyToast from "@/components/alert";
import EyeOff from "@/icons/eyeoff";
import Eye from "@/icons/eyes";
import DefaultLayout from "@/layouts/default";
import { loginServie, updateProfileService } from "@/services/api";
import { errorMessageResolver } from "@/utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input"
import { button } from "@heroui/theme";
import { useRequest, useSafeState } from "ahooks"
import { useNavigate } from "react-router-dom";

const Update = () => {

    const { loading, runAsync: updateApi } = useRequest(updateProfileService, {
        manual: true,
    });
    const [email, setUserName] = useSafeState('');
    const [name, setName] = useSafeState('');
    const [oldPassword, setOld] = useSafeState('');
    const [newPassword, setPassword] = useSafeState('');
    const [isToggle, setIsToggle] = useSafeState(true);
    const [isToggleOld, setIsToggleOld] = useSafeState(true);
    const navigate = useNavigate();

    const isHas = !(name && email && oldPassword && newPassword)

    return (
        <DefaultLayout>
            <div className="h-[calc(100vh-120px)] flex items-center justify-center w-full">
                <div className="py-7  w-[430px] bg-secondary px-5 border-secondary border-2 rounded-lg">
                    <div className="flex justify-center flex-col items-center">
                        <img src="/images/cinema.png" width={50} height={50} alt="" />
                        <h1 className="text-3xl font-bold">Update</h1>
                    </div>
                    <Input onChange={(e) => setName(e.target.value)} placeholder="User name" className="mt-4" size="lg" />

                    <Input onChange={(e) => setUserName(e.target.value)} placeholder="Email" className="mt-4" size="lg" />

                    <Input type={
                        isToggle ? "text" : "password"
                    } onChange={(e) => setOld(e.target.value)} endContent={<span className="cursor-pointer">{isToggleOld ? <span onClick={() => setIsToggleOld(false)}><EyeOff /></span> : <span onClick={() => setIsToggleOld(true)}><Eye /></span>}</span>} placeholder="Old Password" className="mt-4" size="lg" />

                    <Input type={
                        isToggle ? "text" : "password"
                    } onChange={(e) => setPassword(e.target.value)} endContent={<span className="cursor-pointer">{isToggle ? <span onClick={() => setIsToggle(false)}><EyeOff /></span> : <span onClick={() => setIsToggle(true)}><Eye /></span>}</span>} placeholder="Password" className="mt-4" size="lg" />
                    <div className="mt-4 flex justify-end gap-2">
                        <Button isLoading={loading} className={button({ color: "primary", variant: "shadow", radius: "lg", className: "disabled:opacity-50" })} onClick={() => lazyToast(updateApi({ email, newPassword, oldPassword, name }, localStorage.getItem('userId') || 1), {
                            loading: "Updating",
                            error: (err) => errorMessageResolver(err),
                            success: (res) => {
                                navigate("/profile")
                                return "Update Profile Success"
                            }
                        })}>
                            Update
                        </Button>
                        <Button onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Update

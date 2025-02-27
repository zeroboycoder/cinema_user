import EmUserIcon from '@/icons/emuserIcon'
import DefaultLayout from '@/layouts/default'
import { userProfileService } from '@/services/api';
import { Button } from '@heroui/button';
import { button } from '@heroui/theme';
import { useRequest, useSafeState } from 'ahooks';
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const userId = localStorage.getItem('userId')
    // const { data, runAsync } = useRequest(userProfileService(userId), {
    //     cacheKey: "user-profile_item",
    //     staleTime: -1,
    //     manual: true
    // });
    // console.log({data})
    const [data, setData] = useSafeState()
    useEffect(() => {
        const fetchData = async () => {
            const data = await userProfileService(userId)
            setData(data)
        }
        fetchData()
    }, [userId])
    const navigate = useNavigate();
    return (
        <DefaultLayout >
            <div className=' h-[calc(100vh-150px)] flex justify-center items-center'>
                <div className='p-4 bg-secondary rounded-lg w-[400px]  '>
                    <div className='flex justify-between items-start'>
                    <div className='flex gap-5 items-center' >
                        <EmUserIcon />
                        <div className='flex flex-col gap-1'>
                            <p>{data?.name}</p>
                            <p>{data?.email}</p>

                        </div>

                    </div>
                    <button onClick={() => navigate("/update")}>
                        <span className='text-primary underline'>Edit</span>
                    </button>
                    </div>
                    <div className='flex gap-2 justify-end'>
                        <Button onClick={() => {
                            navigate('/login')
                            localStorage.removeItem('token')
                        }} className={button({
                            variant: "shadow",
                            color: "primary",

                        })}>
                            Logout
                        </Button>
                        <Button className={button({
                            variant: "shadow",


                        })}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Profile

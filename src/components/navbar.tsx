import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@heroui/theme";
import { useMount, useRequest } from "ahooks";
import { userProfileService } from "@/services/api";
import User from "@/icons/user";



export const Navbar = () => {
 
  const token = localStorage.getItem("token") || ""

  const {data,runAsync} = useRequest(userProfileService,{
    cacheKey:"user-profile",
    staleTime:-1,
    manual:true
  });

  useMount(()=>{
      if(token){
        runAsync()
      }
  })


  return (
    <div className="bg-[#1D273A]">
         <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="start"
      >
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <img src="/images/cinema.png" alt="" className="w-[60px] h-[60px] object-contain" />
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarBrand className="gap-3 max-w-fit">
          
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start items-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          {
            !token ? (
              <NavbarItem>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/login"
              >
                Login
              </Link>
            </NavbarItem>
            ) : (
              <NavbarItem>
              <Link
                className={buttonStyles({ color: "secondary", variant: "shadow", radius: "lg",className:"flex items-center text-base" })}
                color="foreground"
                href="/profile"
              >
                <span><User/></span> <span>{data?.name}</span>
              </Link>
            </NavbarItem>
            )
          }

        </div>
      </NavbarContent>
      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
    </div>
  );
};

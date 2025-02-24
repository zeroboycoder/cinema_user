import { Routes, Route } from "react-router-dom";
import React, { ElementType, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register";


function App() {

  const Loadable = (Component: ElementType) => (props: any) =>
    (
      <Suspense
        fallback={
          <div className="relative h-screen flex items-center justify-center w-full">
          <img src="/images/Background.png"  className="h-screen absolute top-0 left-0 object-cover w-full" alt="" />
            <img src="/images/cinema.png" width={150} height={150} className="relative z-20" alt="" />
        </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  
  const lazy: typeof React.lazy = (importer) => {
    const retryImport = async () => {
      try {
        return await importer();
      } catch (error: any) {
        for (let i = 0; i < 5; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
  
          const url = new URL(
            error.message
              .replace("Failed to fetch dynamically imported module: ", "")
              .trim()
          );
          url.searchParams.set("t", `${+new Date()}`);
  
          try {
            return await import(/* @vite-ignore */ url.href);
          } catch (e) {
            console.log("retrying import");
          }
        }
        throw error;
      }
    };
    return React.lazy(retryImport);
  };
  const MainPage = Loadable(lazy(() => import("./pages")));
  const DetailsPage = Loadable(lazy(() => import("./pages/moviedetails")));
  const ChooseSeatPage = Loadable(lazy(() => import("./pages/chooseSeat")));
  const ContainuePayment = Loadable(lazy(() => import("./pages/containuePayment")));
  const History = Loadable(lazy(() => import("./pages/history")));
  const Login = Loadable(lazy(() => import("./pages/login")));
  return (
   <>
    <Toaster
            
          />
      <div className="dark text-foreground bg-background">
      <Routes>
      <Route element={<MainPage/>} path="/" />
      <Route element={<DetailsPage/>} path="/details"/>
      <Route element={<ChooseSeatPage/>} path="/choose-seat" />
      <Route element={<ContainuePayment/>} path="/payment" />
      <Route element={<History/>} path="/history" />
      <Route element={<History/>} path="/profile" />
      <Route element={<Login/>} path="/login" />
      <Route element={<Register/>} path='/register' />
    </Routes>
      </div>

   </>
  );
}

export default App;

import { Login } from "@/app/ui/login/logInForm"

export default function LogIn(){
    return(
        <main className= "flex justify-center items-center min-h-screen p-4 bg-customCream">
            <div className= "flex items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white p-6 rounded-lg shadow-md ">
                <Login/>
            </div>
        </main>
    );
}
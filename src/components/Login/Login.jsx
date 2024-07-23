const Login =()=>{
    return(
        <div>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white font-bold text-center mb-6 ">Login</h1>
                <form action="">
                    <div className=" relative my-4">
                        <input className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" type="email" placeholder=""/>
                        <label htmlFor="" className="absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3  -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "> Your email </label>
                    </div>
                    <div className=" relative my-4">
                        <input className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" type="password" placeholder="" />
                        <label htmlFor="" className="absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3  -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "> Your password </label>
                    </div>
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-teal-200 hover:text-black py-2 transition-colors duration-300" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login
import { Link } from "react-router";
// import Hero from "./components/Hero";
import { useAuthStore } from "./store/authStore";
import { useState } from "react";

const App = () => {
  const { login, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: HTMLInputElement) {
    if (e.value.trim()) {
      setFormData((prev) => {
        return { ...prev, [e.name]: e.value };
      });
    }
  }

  async function handleSubmit() {
    try {
      await login(formData.email, formData.password)
      
    } catch (err) {
       setError("An error occured")
    }
  }

  return (
    <div className="flex items-center h-dvh overflow-hidden">
      <div className="h-full w-full sm:w-1/2 flex flex-col items-center justify-between p-4 sm:p-9">
        <img src="/assets/logo.png" className="w-14.5 h-14.5" alt="" />
        <form className="flex flex-col gap-8 w-3/4" onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}>
          <h3 className="text-5 font-semibold">Sign in to continue</h3>
          {
            error ? <div className="p-4 border-l-3 border-red-700">{error}</div> : null
          }
          <div className="relative w-full">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={e => handleChange(e.target)}
              placeholder="Email Address"
              className="border w-full py-3 pl-4"
            />
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={e => handleChange(e.target)}
              placeholder="Password"
              className="border w-full py-3 pl-4"
            />
            <button type="button" className="absolute top-3 right-4 uppercase font-semibold" onClick={()=> setShowPassword(prev => !prev)}>
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="remember" className="flex items-center gap-2">
              <input type="checkbox" name="remember" id="remember" />
              <span>Remember Me</span>
            </label>
            <Link to="/" className="font-bold text-blue-600">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" disabled={loading} className="disabled:bg-blue-600/50 disabled:cursor-not-allowed bg-blue-600 text-white p-3 text-5 font-semibold">
            Login
          </button>
        </form>
        <footer className="flex items-center gap-2">
          <p>Powered by</p>
          <img
            src="/assets/footerlogo.png"
            className="w-30"
            alt="co-creation hub logo"
          />
        </footer>
      </div>
      <div className="h-full relative z-0 text-white hidden sm:flex flex-col p-6 pb-11.5 items-center flex-1">
        <img
          src="/assets/hero.png"
          alt="hero"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        {/* <div className="absolute top-0 left-0 w-full h-full flex items-stretch justify-stretch -z-10 bg-green-500">
            <Hero className="w-[120%] h-full" />
        </div> */}
        <h3 className="text-[28px] font-extrabold mt-auto w-3/4 bg-gray-700/70 px-4">
          Serving Patients During a Pandemic
        </h3>
        <p className="w-3/4 bg-gray-700/70 px-4 pb-4">
          Delivering essential medication to NIMR patients with adherence to
          quality of service, care and confidentiality.
        </p>
      </div>
    </div>
  );
};

export default App;

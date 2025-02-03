import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { path } from "../port";
import  Header  from "../components/Header";
import  Input  from "../components/Input";
import  Button  from "../components/Button";
export const Signin = () => {
  type SigninBody = {
    email: string;
    password: string;
  };
  const [input, setInput] = useState<SigninBody>({
    email: "",
    password: "", 
  });

  const navigate = useNavigate();

  const handleSignin = async () => {
    const res = await axios.post(`${path}user/signin`, 
    {
    email: input.email,
    password: input.password,
    },
    {
        headers:{
            Authorization: `${localStorage.getItem("token")}`
        }
    });
    if (res.data.success) {
      navigate("/dash");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <Header heading="Login" />
        <p className="text-gray-500 mt-2">
          Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Register</span>
        </p>
        <div className="w-full max-w-sm mt-6">
          <Input label="Email" placeholder="m@example.com" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })}></Input>
          <Input label="Password" type="password" placeholder="Enter your password" value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })}></Input>
          
          <Button buttonName="Sign In" onClick={handleSignin}></Button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100 p-10">
        <div className="max-w-md text-center">
          <p className="text-xl font-bold">
            “The customer service I received was exceptional. The support team went above and beyond to address my concerns.”
          </p>
          <p className="mt-4 font-bold">Jules Winnfield</p>
          <p className="text-gray-500">CEO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
};

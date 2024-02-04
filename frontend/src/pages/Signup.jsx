import  axios  from "axios";
import { useState } from "react";
import BottomWarning from "../component/BottomWarning";
import Button from "../component/Button";
import Heading from "../component/Heading";
import InputBox from "../component/InputBox";
import SubHeading from "../component/SubHeading";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <section className="bg-slate-400 h-screen flex justify-center items-center ">
      <div className="bg-white h-max w-80 text-center p-2 px-4 rounded-lg">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox
          onChange={(e)=>{setFirstName(e.target.value)}}
          label="First Name"
          placeholder="john"
        />
        <InputBox
          onChange={(e)=>{setLastName(e.target.value)}}
          label="Last Name"
          placeholder="Doe"
        />
        <InputBox
          onChange={(e)=>{setUsername(e.target.value)}}
          label="Email"
          placeholder="dinesh@gmail.com"
        />
        <InputBox
          onChange={(e)=>{setPassword(e.target.value)}}
          label="Password"
          placeholder="123456"
        />
        <div className="pt-4">
          <Button
          onClick={async()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
          }} 
          label="Sign up" />
        </div>
        <BottomWarning
          label="Already have an account?"
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </section>
  );
};

export default Signup;

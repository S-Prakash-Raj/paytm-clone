import { Heading } from "../components/Cards/Heading/Heading";
import { SubHeading } from "../components/Cards/SubHeading/SubHeading";
import { Button } from "../components/Cards/Button/Button";
import { ButtonWarning } from "../components/Cards/ButtonWarning/ButtonWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { InputBoxChange, InputBoxRef } from "../components/Cards/InputBox/InputBox";
export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [passWord, setpassWord] = useState("");
    const navigation = useNavigate();

    return <div className="bg-slate-250 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading subheading={"Enter your infromation to create an account"} />
                <InputBoxChange placeholder="John" label={"First Name"} onChange={e => { setFirstName(e.target.value) }} />
                <InputBoxChange placeholder="Doe" label={"Last Name"} onChange={e => { setLastName(e.target.value) }} />
                <InputBoxChange placeholder="harkirat@gmail.com" label={"Email"} onChange={e => { setuserName(e.target.value) }} />
                <InputBoxChange placeholder="123456" label={"Password"} onChange={e => { setpassWord(e.target.value) }} />
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:8000/api/v1/user/signup", {
                                username: userName,
                                password: passWord,
                                firstname: firstName,
                                lastname: lastName
                            });
                            localStorage.setItem("token", response.data.token);
                            navigation("/dashboard");
                        } catch (error) {
                            console.error("Signup error:", error);
                        }
                    }} />
                </div>
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}
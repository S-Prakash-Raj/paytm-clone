import { Heading } from "../components/Cards/Heading/Heading";
import { SubHeading } from "../components/Cards/SubHeading/SubHeading";
import { Button } from "../components/Cards/Button/Button";
import { ButtonWarning } from "../components/Cards/ButtonWarning/ButtonWarning";
import { InputBoxChange, InputBoxRef } from "../components/Cards/InputBox/InputBox";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [userName, setEmail] = useState("");
    const [passWord, setPassword] = useState("");
    const navigation = useNavigate();
    return <div className="bg-slate-250 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading subheading={"Enter your infromation to signin"} />
                <InputBoxChange placeholder="harkirat@gmail.com" label={"Email"} onChange={(e) => { setEmail(e.target.value) }} />
                <InputBoxChange placeholder="123456" label={"Password"} onChange={(e) => { setPassword(e.target.value) }} />
                <div className="pt-4">
                    <Button label={"Sign in"}
                        onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:8000/api/v1/user/signin", {
                                    username: userName,
                                    password: passWord,
                                });
                                localStorage.setItem("token", response.data.token);

                                navigation("/dashboard");
                            }
                            catch (error) {
                                console.error("Signin error:", error);

                            }
                        }} />
                </div>
                <ButtonWarning label={"Create account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}
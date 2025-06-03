"use client"

import { useAuth } from "@/stores/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";
import { LoginAreaStepSignup } from "./login-area-step-signup";
import { getCookie } from "cookies-next/client";

type Steps = "EMAIL" | "SIGUP" | "SIGNIN";

export const LoginAreaDialog = () => {

    const auth = useAuth();

    const [step, setStep] = useState<Steps>("EMAIL");
    const [emailFild, setEmailField] = useState('');

    useEffect(() => {
        const token = getCookie('token');
        if(token) auth.setToken(token);
    }, []);

    const handleStepEmail = (hasEmail: boolean, email: string) => {
        setEmailField(email);
        if(hasEmail) {
            setStep('SIGNIN');
        } else {
            setStep("SIGUP");
        }
    }

    return (
        <Dialog
            open={auth.open}
            onOpenChange={open => auth.setOpen(open)}
        >
            <DialogContent className="sm:max-[425px] rounded-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">

                        {step !== 'EMAIL' &&
                            <Button
                                variant={"ghost"}
                                size="icon"
                                onClick={() => setStep('EMAIL')}
                            >
                                <ArrowLeft className="size-4" />
                            </Button>
                        }

                        {step === 'EMAIL' && "Login / Cadastro"}
                        {step === 'SIGUP' && "Cadastro"}
                        {step === 'SIGNIN' && "Login"}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {step === "EMAIL" &&
                        <div>
                            <LoginAreaStepEmail 
                                onValidate={handleStepEmail}
                            />
                        </div>
                    }
                    {step === "SIGNIN" &&
                        <div>
                            login
                        </div>
                    }

                    {step === "SIGUP" &&
                        <LoginAreaStepSignup 
                            email={emailFild}
                        />
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}
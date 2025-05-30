"use client"

import { useAuth } from "@/stores/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

type Steps = "EMAIL" | "SIGUP" | "SIGNIN";

export const LoginAreaDialog = () => {

    const auth = useAuth();

    const [step, setStep] = useState<Steps>("EMAIL");

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
                            email
                        </div>
                    }
                    {step === "SIGNIN" &&
                        <div>
                            login
                        </div>
                    }

                    {step === "SIGUP" &&
                        <div>
                            Cadastro
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}
"use client"

import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";

type Props = {
    onValidate: (hasEmail: boolean, email: string) => void;
}

export const LoginAreaStepEmail = ({ onValidate }: Props) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);

    const [emailFild, setEmailField] = useState("");

    const handleButton = () => {

    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                <p className="mb-2">Digite seu e-mail</p>
                <CustomInput
                    name="email"
                    errors={errors}
                    disabled={loading}
                    type="email"
                    value={emailFild}
                    onChange={e => setEmailField(e.target.value)}
                />
            </div>

            <Button 
                disabled={loading}
                onClick={handleButton}
            >Continuar</Button>
        </div>
    );
}
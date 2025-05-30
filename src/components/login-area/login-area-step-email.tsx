"use client"

import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import z from "zod";
import { api } from "@/lib/axios";

type Props = {
    onValidate: (hasEmail: boolean, email: string) => void;
}

const schema = z.object({
    email: z.string().email('E-mail inválido!')
});

export const LoginAreaStepEmail = ({ onValidate }: Props) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);
    const [emailField, setEmailField] = useState('');

    const handleButton = async () => {
        setErrors(null);
        const validData = schema.safeParse({
            email: emailField
        });
        if (!validData.success) {
            setErrors(validData.error.flatten().fieldErrors);
            return false;
        }

        try {
            setLoading(true);
            const emailReq = await api.post('/auth/validate_email', {
                email: validData.data.email
            });
            setLoading(false);
            onValidate(
                emailReq.data.exists ? true : false,
                validData.data.email
            );
        } catch (error: any) {
            setLoading(false);
        }
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
                    value={emailField}
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
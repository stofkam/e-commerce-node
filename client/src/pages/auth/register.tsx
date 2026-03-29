import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner"

const initialState = {
    name: "",
    email: "",
    password: "",
}
type RegisterFormData = typeof initialState



const AuthRegister = () => {

    const [formData, setFormData] = useState<RegisterFormData>(initialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message)
                navigate("/auth/login")
            } else {
                toast.error(data?.payload?.message)
            }
        })
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                isBtnDisabled={false}
            />
        </div>
    )
}

export default AuthRegister
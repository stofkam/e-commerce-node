import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type InputType = {
    id?: string | number | undefined,
    name: string,
    label: string,
    placeholder: string,
    componentType: string,
    type: string
    options?: { id: string, label: string }[]
}

type FormDatas = {
    name?: string;
    email: string;
    password: string;
}
type FormDataType = {
    name: string,
    email: string,
    password: string
}

interface CommonFormProps {
    // formControls: InputType[],
    formControls: any,
    formData: FormDataType,
    setFormData: (data: { name: string, email: string, password: string }) => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    buttonText: string,
    isBtnDisabled?: boolean
}
const CommonForm = ({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled,
}: CommonFormProps) => {
    function renderInputsByComponentType(getControlItem: InputType) {
        let element = null;
        const value = formData[getControlItem.name as keyof FormDatas] || "";

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

                break;
            case "select":
                element = (
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value,
                            })
                        }
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );

                break;
            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
        }

        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem: any) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
                {buttonText || "Submit"}
            </Button>
        </form>
    )
}

export default CommonForm
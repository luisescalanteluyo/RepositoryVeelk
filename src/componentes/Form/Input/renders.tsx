import InputComponent from "."
import InputDateComponent from "../Date"
import SelectComponent from "../Select"
import SelectMultipleComponent from "../SelectMultiple"


export const renderInput = (id: string, title: string, type: string, placeholder: string, describedby: string, icon: string, leftText: string | boolean, bottomText: string | boolean, event: Function, value: string | number) => (
    <InputComponent
        id={id}
        title={title}
        type={type}
        placeholder={placeholder}
        describedby={describedby}
        icon={icon}
        leftText={leftText}
        bottomText={bottomText}
        change={event}
        value={value}
    />
)

export const renderInputDate = (id: string, title: string, type: string, placeholder: string, describedby: string, icon: string, leftText: string | boolean, bottomText: string | boolean, event: Function, value: string | number) => (
    <InputDateComponent
        id={id}
        title={title}
        type={type}
        placeholder={placeholder}
        describedby={describedby}
        icon={icon}
        leftText={leftText}
        bottomText={bottomText}
        change={event}
        value={value}
    />
)

export const renderSelect = (id: string, title: string, placeholder: string, icon: string, options: Array<{ k: string, v: string }>, event: Function, value: string, width: number) => (
    <SelectComponent
        id={id}
        title={title}
        placeholder={placeholder}
        icon={icon}
        options={options}
        change={event}
        value={value}
        width={width}
    />
)

export const renderSelectMultiple = (id: string, title: string, placeholder: string, icon: string, options: Array<{ k: string, v: string }>, event: Function, value: string[]) => (
    <SelectMultipleComponent
        id={id}
        title={title}
        placeholder={placeholder}
        icon={icon}
        options={options}
        change={event}
        value={value}
    />
)
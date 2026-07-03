import type {JSX, MouseEventHandler} from "react";

interface ButtonProps {
    type?: "submit" | "reset" | "button";
    label?: string
    onclick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    rounded?: number
    color?: string
    textColor?: string
    colorHover?: string
    textHoverColor?: string
}

export default function Button(
    {
        type,
        label,
        onclick,
        disabled,
        rounded = 2,
        color = "primary",
        textColor = "base-color",
        colorHover = "blue-800",
        textHoverColor
    }: ButtonProps): JSX.Element {

    const void_func = (): void => {}

    return (
        <button
            type = {type ? type : "submit"}
            disabled={disabled ? disabled : false}
            onClick={onclick ? onclick : void_func}
            className= {` rounded-${rounded}xl bg-${color}  px-6 py-2.5 text-sm font-semibold text-${textColor} transition-opacity hover:bg-${colorHover} hover:text-${textHoverColor ? textHoverColor : textColor} disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer`}
        >
            {label && label}
        </button>
    )
}
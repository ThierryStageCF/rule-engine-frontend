import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export type InputFieldProps = {
    id: string;
    name?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    required?: boolean;
    toggleVisibility?: boolean;
    register?: UseFormRegisterReturn;
    error?: string;
};



export default function InputField({id, name, label, placeholder, type = "text", icon, required = false, toggleVisibility = false, register, error}: InputFieldProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputType = toggleVisibility ? (showPassword ? "text" : "password") : type;

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    className={`${icon ? 'pl-10' : 'pl-3'}  ${toggleVisibility ? "pr-10" : ""} w-full px-4 py-3 border ${error ? "border-error" : "border-input"} rounded-lg focus:outline-none focus:ring-2 ${error ? "focus:ring-error" : "focus:ring-blue-500"}`}
                    required={required}
                    {...register}
                />
                {toggleVisibility && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                    </button>
                )}
            </div>
            {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
    );
}
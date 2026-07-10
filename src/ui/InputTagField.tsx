import { useState } from "react";
import { X } from "lucide-react";
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";


export type TagInputFieldProps<T extends FieldValues> = {
    id: string;
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
};


export default function TagInputField<T extends FieldValues>(
    {
        id,
        name,
        control,
        label,
        placeholder = "Ajouter une valeur...",
        disabled = false,
        required = false,
    }: TagInputFieldProps<T>
) {

    const [inputValue, setInputValue] = useState<string>("");

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {

                const values: string[] = field.value ?? [];
                const addTag = () => {
                    const value = inputValue.trim();
                    if (!value) return;
                    if (values.includes(value)) {
                        setInputValue("");
                        return;
                    }
                    field.onChange([
                        ...values,
                        value,
                    ]);
                    setInputValue("");
                };
                const removeTag = (tag: string) => {
                    field.onChange(
                        values.filter((item: string) => item !== tag)
                    );
                };
                return (
                    <div>
                        {label && (
                            <label
                                htmlFor={id}
                                className="mb-2 block text-sm font-medium text-primary"
                            >
                                {label}
                            </label>
                        )}
                        <div
                            className={`
                                flex min-h-12 flex-wrap items-center gap-2 rounded-lg border px-3 py-2 
                                ${fieldState.error
                                ? "border-error"
                                : "border-border"
                            }
                                ${disabled
                                ? "cursor-not-allowed bg-muted"
                                : "bg-base-color"
                            }
                            `}
                        >
                            {values.map((tag: string) => (
                                <span
                                    key={tag}
                                    className=" inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                                >
                                    {tag}
                                    {!disabled && (
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-danger"
                                            aria-label={`Supprimer ${tag}`}
                                        >
                                            <X className="size-3" />
                                        </button>
                                    )}
                                </span>
                            ))}
                            <input
                                id={id}
                                disabled={disabled}
                                required={required}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                                placeholder={values.length === 0 ? placeholder : ""}
                                className="min-w-32 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />

                        </div>
                        {fieldState.error && (
                            <p className="mt-1 text-xs text-error">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
}
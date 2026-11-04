import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const FormField = forwardRef(function FormField(
    {
        label,
        name,
        type = "text",
        placeholder,
        icon: Icon,
        options = [],
        required = false,
        error,
        rows = 4,
        ...props
    },
    ref
) {
    const commonClasses = `
    w-full rounded-xl border bg-[#0b1222]/80 px-4 py-3.5
    text-sm text-white outline-none transition-all duration-200
    placeholder:text-slate-600
    focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/10
    ${error ? "border-red-400/50" : "border-white/10"}
  `;

    return (
        <div className="min-w-0">
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-slate-300"
            >
                {label}
                {required && <span className="ml-1 text-blue-400">*</span>}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500"
                    />
                )}

                {type === "textarea" ? (
                    <textarea
                        ref={ref}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                        className={`${commonClasses} resize-none`}
                        {...props}
                    />
                ) : type === "select" ? (
                    <select
                        ref={ref}
                        id={name}
                        name={name}
                        required={required}
                        value={props.value ?? ""}
                        className={`${commonClasses} appearance-none ${Icon ? "pl-11" : ""}`}
                        {...props}
                    >
                        <option value="" disabled>
                            {placeholder || "Select an option"}
                        </option>

                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#101a2e] text-white"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        ref={ref}
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        className={`${commonClasses} ${Icon ? "pl-11" : ""}`}
                        {...props}
                    />
                )}
            </div>

            {error && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={13} />
                    {error}
                </p>
            )}
        </div>
    );
});

export default FormField;
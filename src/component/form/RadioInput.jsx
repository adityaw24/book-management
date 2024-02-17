import { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

function RadioInput(
    {
        name,
        label = "",
        helper = "",
        error = "",
        value = "",
        inputClass = "",
        className = "",
        options = [],
        ...restProps
    },
    ref
) {
    return (
        <>
            <label
                className={mergeClass(
                    "form-control max-w-full w-full",
                    className
                )}
            >
                {!!label && (
                    <div className="label">
                        <span className="label-text">{label}</span>
                        <span className="label-text-alt">{helper}</span>
                    </div>
                )}

                <section className="grid gap-3 mt-2">
                    {options.map((optionItem) => (
                        <label
                            key={optionItem.value}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <input
                                ref={ref}
                                name={name}
                                type="radio"
                                className={mergeClass(
                                    "radio checked:radio-primary",
                                    inputClass,
                                    !!error && "radio-error"
                                )}
                                value={optionItem.value}
                                checked={
                                    value === optionItem.value
                                        ? true
                                        : undefined
                                }
                                {...restProps}
                            />

                            <span className="label-text">
                                {optionItem.label}
                            </span>
                        </label>
                    ))}
                </section>

                {!!error && (
                    <div className="label">
                        <span className="label-text-alt text-error">
                            {error}
                        </span>
                    </div>
                )}
            </label>
        </>
    );
}

const refForwardedRadioInput = forwardRef(RadioInput);

export default refForwardedRadioInput;

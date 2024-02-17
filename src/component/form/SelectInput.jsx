import { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

function SelectInput(
    {
        label = "",
        helper = "",
        placeholder = "",
        error = "",
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

                <select
                    ref={ref}
                    className={mergeClass(
                        "select select-bordered w-full",
                        inputClass,
                        !!error && "select-error"
                    )}
                    {...restProps}
                >
                    {!!placeholder && <option value="">{placeholder}</option>}

                    {options.map((optionItem) => (
                        <option key={optionItem.value} value={optionItem.value}>
                            {optionItem.label}
                        </option>
                    ))}
                </select>

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

const refForwardedSelectInput = forwardRef(SelectInput);

export default refForwardedSelectInput;

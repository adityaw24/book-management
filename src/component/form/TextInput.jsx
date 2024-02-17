import { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

function TextInput(
    {
        label = "",
        helper = "",
        error = "",
        inputClass = "",
        className = "",
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
                {label && (
                    <div className="label">
                        <span className="label-text">{label}</span>
                    </div>
                )}

                <input
                    ref={ref}
                    className={mergeClass(
                        "input input-bordered w-full",
                        inputClass,
                        error && "input-error"
                    )}
                    {...restProps}
                />

                {helper && (
                    <div className="label">
                        <span className="label-text-alt">{helper}</span>
                    </div>
                )}

                {error && (
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

const refForwardedTextInput = forwardRef(TextInput);

export default refForwardedTextInput;

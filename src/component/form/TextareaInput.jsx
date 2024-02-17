import { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

function TextareaInput(
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
        <label
            className={mergeClass("form-control max-w-full w-full", className)}
        >
            {!!label && (
                <div className="label">
                    <span className="label-text">{label}</span>
                    <span className="label-text-alt">{helper}</span>
                </div>
            )}

            <textarea
                ref={ref}
                className={mergeClass(
                    "textarea textarea-bordered w-full",
                    inputClass,
                    !!error && "textarea-error"
                )}
                {...restProps}
            />

            {!!error && (
                <div className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </div>
            )}
        </label>
    );
}

const refForwardedTextareaInput = forwardRef(TextareaInput);

export default refForwardedTextareaInput;

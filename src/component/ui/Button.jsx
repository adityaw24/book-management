import Link from "next/link";
import iconConf from "~/libs/iconConf";
import mergeClass from "~/libs/mergeClass";

function Button({
    title = "",
    className = "",
    to = "",
    loading = false,
    disabled = false,
    Icon = null,
    ...restProps
}) {
    const Tag = !to ? "button" : Link;

    return (
        <>
            <Tag
                disabled={disabled || loading ? true : undefined}
                className={mergeClass("btn", className)}
                href={to || undefined}
                {...restProps}
            >
                {loading ? (
                    <span className="loading loading-spinner" />
                ) : (
                    !!Icon && <Icon {...iconConf} />
                )}

                {title}
            </Tag>
        </>
    );
}

export default Button;

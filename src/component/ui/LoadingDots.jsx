function LoadingDots({ label = "", isLoading = true }) {
    return isLoading ? (
        <section className="flex items-center gap-2">
            <span className="loading loading-dots loading-md"></span>
            {label}
        </section>
    ) : null;
}

export default LoadingDots;

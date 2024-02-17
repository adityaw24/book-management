import { Toaster } from "react-hot-toast";
import { BookPage } from "~/view/pages";

export default function Home() {
    // const router = useRouter();

    // useRemoteRefresh({
    //     shouldRefresh: (path) => path.includes(router.query.slug),
    // });

    return (
        <>
            <BookPage />
            <Toaster
                position="top-center"
                toastOptions={{
                    className:
                        "ring ring-base-300 !bg-base-100/40 !backdrop-blur !text-base-content",
                }}
            />
        </>
    );
}

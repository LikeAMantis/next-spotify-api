import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const login = ({ providers }) => {
    const router = useRouter();

    useEffect(() => {
        // Prefetch the index page
        router.prefetch("/");
    }, []);

    return (
        <div className="grid h-screen place-items-center bg-black">
            <div className="flex flex-col items-center gap-5">
                <img
                    className="w-52"
                    src="https://links.papareact.com/9xl"
                ></img>
                {Object.values(providers).map((provider) => (
                    <button
                        className="border-2 border-gray-700 p-3 text-white shadow-sm shadow-black hover:shadow-gray-400"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: "/" })
                        }
                    >
                        {"Login with " + provider.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

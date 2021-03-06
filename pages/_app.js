import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>{`Spotify NEXT`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RecoilRoot>
                <SessionProvider session={session}>
                    {getLayout(<Component {...pageProps} />)}
                </SessionProvider>
            </RecoilRoot>
        </>
    );
}

export default MyApp;

import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'



function MyApp({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps
) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>Spotify NEXT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SessionProvider session={session}>
                {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
        </>
    )
}

export default MyApp
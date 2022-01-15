import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"


function MyApp({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps
) {
    return (
        <>
            <Head>
                <title>Spotify 2</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default MyApp
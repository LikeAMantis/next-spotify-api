import Layout from "../components/Layout"

export default function Home() {
    return (

        <div className="text-white background">
            Hello David, this is Home!
        </div>
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
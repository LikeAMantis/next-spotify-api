import { useRouter } from "next/router"
import { useEffect } from "react";

const index = ({ post }) => {
    const router = useRouter();


    useEffect() {
        console.log(router);
        console.log(router.query);
    }

    return (
        <div className="text-white">
            {post.title}
        </div>
    )
}

export default index

export async function getStaticPaths() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json();


    return {
        paths: posts.map(post => ({ params: { id: post.id.toString() } })), // See the "paths" section belo,
        fallback: false // See the "fallback" section below
    };
}

export async function getStaticProps(context) {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + context.params.id)
    const post = await res.json();

    return {
        props: { post }
    }
}

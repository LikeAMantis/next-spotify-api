const test = ({ posts }) => {
    return (
        <div data-title="hey" className="test bg-blue-400">
            {posts.map(post => <li>{post.title}</li>)}
        </div>
    )
}

export default test


export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
    const posts = await res.json();

    return {
        props: { posts }
    }
}
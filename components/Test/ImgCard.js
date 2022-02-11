import Card from "./Card";

const ImgCard = ({ src, ...props }) => {
    return (
        <Card {...props}
            top={<img className="w-64 mb-6" src={src}></img>}
        >
            {/* <img className="w-64 mb-6" src={src}>
            </img> */}
        </Card>
    )
};

export default ImgCard;
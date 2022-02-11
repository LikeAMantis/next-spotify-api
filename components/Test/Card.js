const Card = ({ title, subtitle, top, bottom }) => {
    return (
        <div className="bg-gray-700 shadow-md shadow-black p-5 text-white w-fit rounded-md">
            {top}
            <h1 className="text-lg">{title}</h1>
            <h2 className="text-base text-secondary">{subtitle}</h2>
            {bottom}
        </div>
    )
};

export default Card;
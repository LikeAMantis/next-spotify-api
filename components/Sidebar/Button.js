export const Button = ({ text, icon, onClick, className }) => {
    return (
        <button
            className={"flex items-center hover:text-white space-x-2 cursor-pointer truncate" + className}
            onClick={(e) => onClick && onClick(e)}
        >
            {icon}
            <p>{text}</p>
        </button>
    )
}
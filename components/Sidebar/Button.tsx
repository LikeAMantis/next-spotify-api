interface Props {
    text: string
    icon?: JSX.Element,
    onClick?: () => {},
    className?: string,
}

export const Button = ({ text, icon, onClick, className }: Props) => {
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
interface IProps {
    size?: number
}

const Space = ({size}: IProps) => {
    return (
        <>
            <div></div>
            <style jsx>{`
                div {
                    height: ${size ? size : 1}rem;
                }
            `}</style>
        </>
    )
}

export default Space;
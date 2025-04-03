interface HeadlineProps {
    headline: string;
};

const Header = (props: HeadlineProps) => {

    return (
        <div>
            <h1>{props.headline}</h1>
        </div>
    )
};

export default Header;
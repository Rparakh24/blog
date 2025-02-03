interface headerProps{
    heading:string
}
const Header:React.FC<headerProps> = ({heading}) =>{
    return (
        <h2 className="text-3xl font-bold">{heading}</h2>
    );
}

export default Header;
interface buttonProps{
    buttonName:string,
    onClick:()=>void
}

const Button:React.FC<buttonProps> = ({buttonName,onClick})=>{
    return (
        <button
            className="w-full bg-black text-white py-2 rounded-3xl mt-6"
            onClick={onClick}
          >
            {buttonName}
          </button>
    )
}

export default Button;

interface inputProps{
    label:string,
    placeholder?:string,
    type?:string,
    value:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
const Input:React.FC<inputProps> = ({label,placeholder,type,value,onChange})=>{
    return (
        <div className="w-full max-w-sm mt-6">
          <label className="block text-gray-700">{label}</label>
          <input
            type={type}
            className="w-full p-2 border rounded mt-1"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
        </div>
    )
}
export default Input;
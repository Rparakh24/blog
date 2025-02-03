import React from "react";
import { Bell, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface AppBarProps {
  title: string;
  onClick?: () => void;
  buttonName: string;
  username: string;
  needPencil?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ title, onClick,buttonName, username,needPencil }) => {
    const nav = useNavigate();
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b">
      <h1 onClick={()=>nav('/dash')} className="text-3xl font-serif font-bold">{title}</h1>

      <div className="flex items-center gap-6">
        {needPencil?(
            <button className="flex items-center gap-2 text-gray-700" onClick={onClick}>
            <Pencil size={18} />
            <span className="text-sm">{buttonName}</span>
          </button>
        ):(<></>)}
        

        <Bell size={20} className="text-gray-600" />

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 text-white font-semibold">
          {username.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default AppBar;

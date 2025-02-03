import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // Medium-like theme
import axios from "axios";
import { path } from "../port";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [username,setUsername] = useState<string>("");
    const navigate = useNavigate();
    useEffect(()=>{
        handleClick();
    },[username])
    const handleClick = async() => {
        const res = await axios.get(`${path}blog/me`,{
            headers:{
                Authorization: `${localStorage.getItem("token")}`
            }
        })
        console.log(res.data);
        setUsername(res.data.username);
    }
    const handleInput = async () => {
        const res = await axios.post(`${path}blog/add`, {
            title: title,
            content: content
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        });
        navigate(`/read?id=${res.data.id}`);
    };

    return (
        <>
        <AppBar title="Medium" username={username} buttonName="" ></AppBar>
        <div className="max-w-4xl mx-auto pt-10">
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-medium text-gray-800">Add Blog</h1>
                <button 
                    onClick={handleInput} 
                    className="bg-gray-800 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition"
                >
                    Publish
                </button>
            </div>

            <input 
                type="text" 
                placeholder="Title" 
                className="w-full mt-6 text-5xl font-bold border-none outline-none focus:ring-0 placeholder-gray-400"
                onChange={(e) => setTitle(e.target.value)} 
            />

            <ReactQuill 
                value={content} 
                onChange={setContent} 
                theme="bubble"  
                placeholder="Tell your story..."
                className="mt-6 text-xl"
            />
        </div>
        </>
    );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar"
import axios from "axios";
import { path } from "../port";
import Blog from "../components/Blog";
import Loader from "../components/Loader";
export const Dash = () => {
    type authorType = {
        name :string
    }
    type allType = {
        id: number,
        title: string,
        content: string,
        date: string,
        author : authorType
    }
    const [username,setUsername] = useState<string>("");
    const [all,setAll] = useState<allType[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        handleClick();
        handleAll();
    },[])
    const handleClick = async() => {
        const res = await axios.get(`${path}blog/me`,{
            headers:{
                Authorization: `${localStorage.getItem("token")}`
            }
        })
        setUsername(res.data.username);
    }
    const handleAll = async()=>{
        const res = await axios.get(`${path}blog/all`,
            {
                headers:{
                    Authorization: `${localStorage.getItem("token")}`
                }   
            }
        )
        setAll([...res.data.all]);
    }
    const handleBlog = async(id:number) => {
        navigate(`/read?id=${id}`);
    }

    return (
        <div>
            <AppBar title="Medium" needPencil={true} buttonName="Create" onClick={()=>{navigate('/create')}} username={username}></AppBar>
            {all.length>0?(all.map((b)=>{
                return(
                    <Blog onClick={()=>handleBlog(b.id)}key={b.id} title={b.title} content={b.content} author={b.author.name} date={b.date}></Blog>
                )
            })):(<div><Loader></Loader></div>)}
        </div>
    )
}
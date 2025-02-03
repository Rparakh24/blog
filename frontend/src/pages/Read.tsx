import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { path } from "../port";
import AppBar from "../components/AppBar";
import parse from "html-react-parser";
import  Lines  from "../components/Lines";
export const Read = () => {
    type BlogType = {
        id: number;
        title: string;
        content: string;
        published: boolean;
        date: string;
        author: string;
    };

    const [blog, setBlog] = useState<BlogType | null>(null);
    const [searchParams] = useSearchParams();
    const [username,setUsername] = useState<string>("");
    const id  = searchParams.get("id");
    const navigate = useNavigate();
    useEffect(() => {
        handleGet();
        handleClick();
    }, []);
    const handleClick = async() => {
        const res = await axios.get(`${path}blog/me`,{
            headers:{
                Authorization: `${localStorage.getItem("token")}`
            }
        })
        console.log(res.data);
        setUsername(res.data.username);
    }
    const handleGet = async () => {
        try {
            const res = await axios.get(`${path}blog/get?id=${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            setBlog(res.data.blog);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };
    const content = parse(blog?.content|| "");
    return (
        <>
            <AppBar title="Medium"  needPencil={true} buttonName="Create" onClick={()=>{navigate('/create')}} username={username}></AppBar>
            <div className="max-w-3xl mx-auto p-6 mt-10">
            {blog ? (
                <div>
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <p className="text-gray-600 text-sm mt-2">{blog.date.slice(0,10)} · {blog.author}</p>
                    <div className="border-t border-gray-300 my-4"></div>
                    <p className="text-lg leading-relaxed">{content}</p>
                </div>
            ) : (
                <div className="text-center text-xl">
                    <Lines></Lines>
                    <div className="my-5"/>
                    <Lines></Lines>
                    <div className="my-5"/>
                    <Lines></Lines>
                    <div className="my-5"/>
                    <Lines></Lines>
                </div>
            )}
        </div>
        </>);
};

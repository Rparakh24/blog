import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'jsonwebtoken';
import { blogBody,updateBlogBody } from '../../types/zod';
export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string
		JWT_Secret: string
	},
    Variables: {
        userId : string
    }
}>();

blogRouter.use("/*",async(c,next)=>{
	try{
        const header = c.req.header('authorization') || "";
    const decoded =  verify(header,c.env.JWT_Secret);
    if(decoded && typeof decoded === "object" && "id" in decoded){
        c.set("userId",decoded.id);
        await next();
    }else{
        c.status(403);
        return c.text("You are not authorized");
    }
    }catch(e){
        c.status(403);
        return c.text("Unauthorized");
    }

})

blogRouter.get('/me',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = Number(c.get("userId"));
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
    })
    return c.json({"username":user?.name});
})
blogRouter.post('/add', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body = await c.req.json();
        const {success} = blogBody.safeParse(body);
        if(!success){
            c.status(403);
            return c.json({msg:"Your input type is incorrect"});
        }
        const post = await prisma.post.create({
            data:{
                title: body.title,
                content : body.content,
                authorId: Number(c.get("userId"))
            }
        })
        c.status(200);
        return c.json({id:post.id,msg:"Blog Created sucessfully"})
        }
        catch(e){
        c.status(411);
        return c.json({msg:"An error occures"});
    }})

blogRouter.get("/get",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const id = c.req.query("id");
        const blog = await prisma.post.findFirst({
            where:{
                id: Number(id)
            }
        })
        return c.json({blog});
    }catch(e){
        c.status(411);
        return c.json({msg:"An error occured while fetching"});
    }
})    


blogRouter.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const all = await prisma.post.findMany({
            select:{
                id: true,
                title : true,
                content : true,
                date : true,
                author: {select: {name: true}}
            }
        });
        return c.json({ all: all });
    }catch(e){
        c.status(411);
        return c.json({msg: "An error occured"})
    }
})


blogRouter.put('/edit', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body = await c.req.json();
        const {success} = updateBlogBody.safeParse(body);
        if(!success){
            c.status(403);
            return c.json({msg:"Your input type is incorrect"});
        }
        const post = await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title: body.title,
                content : body.content, 
            }
        })
        c.status(200);
        return c.json({msg:"Blog Updated sucessfully"})
        }
        catch(e){
        c.status(411);
        return c.json({msg:"An error occures"});
    }
})
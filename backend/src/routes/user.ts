import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {signupBody, singinBody} from '../../types/zod'
export const userRouter = new Hono<
{
    Bindings: {
		DATABASE_URL: string
		JWT_Secret: string
	}
}
>();

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    
    try {
        const body = await c.req.json();
        const {success} = signupBody.safeParse(body);
        if(!success){
            c.status(403);
            return c.json({msg:"Input type is not correct"});
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name:body.name,
                password: body.password
            }
        });
        const token = await sign({id:user.id},c.env.JWT_Secret);
        return c.json({success: true,token : token});
    } catch(e) {
        return c.status(403);
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
    const body = await c.req.json();
    const {success} = singinBody.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({msg:"Input type is not correct"});
    }
    const user = await prisma.user.findFirst({
        where: {
            email : body.email,
            password : body.password
        }
    })
    if(!user){
        c.status(403);
        return c.json({msg:"Unauthorised"});
    }
    const token = await sign({id:user.id},c.env.JWT_Secret);
    return c.json({success:true,token:token});
}catch(e){
    c.status(411);
    return c.json({msg : "An error occured"});
}
})
import z from 'zod';

const signupBody = z.object({
    email: z.string(),
    password: z.string().min(6),
    name : z.string().optional()
})
export type signupType = z.infer<typeof signupBody>

const singinBody = z.object({
    email: z.string(),
    password : z.string().optional()
})
export type signinType = z.infer<typeof singinBody>

const blogBody = z.object({
    email: z.string(),
    password : z.string().optional()
})
export type blogType = z.infer<typeof blogBody>

const updateBlogBody = z.object({
    email: z.string(),
    password : z.string().optional()
})
export type updateBlogType = z.infer<typeof updateBlogBody>

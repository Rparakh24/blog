import z from 'zod';

export const signupBody = z.object({
    email: z.string(),
    password: z.string().min(6),
    name : z.string().optional()
})
export type signupType = z.infer<typeof signupBody>

export const singinBody = z.object({
    email: z.string(),
    password : z.string().optional()
})
export type signinType = z.infer<typeof singinBody>

export const blogBody = z.object({
    title: z.string(),
    content : z.string().optional()
})
export type blogType = z.infer<typeof blogBody>

export const updateBlogBody = z.object({
    title: z.string(),
    content : z.string().optional()
})
export type updateBlogType = z.infer<typeof updateBlogBody>

import { NextResponse } from "next/server";
import connection from "../../../database/index";
import Joi from "joi";
import User from "@/models/user";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export async function POST(request: any) {
    await connection();
    const { email, password } = await request.json();
    const { error } = schema.validate({ email, password });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        const UserPresent = await User.findOne({ email });
        if (!UserPresent) {
            return NextResponse.json({
                success: false,
                message: "User Account with this email does not exists."
            })
        }
        else {
            const Password_Present = await compare(password, UserPresent.password);
            if (!Password_Present) {
                return NextResponse.json({
                    success: false,
                    message: "Incorrect Password!"
                })
            }
            else {
                const token = jwt.sign({
                    id: UserPresent._id, email: UserPresent?.email, role: UserPresent?.role
                }, "default_secret_key", { expiresIn: "1d" });

                const userData = {
                    token, user: {
                        email: UserPresent.email, username: UserPresent.username, _id: UserPresent._id, role: UserPresent.role
                    }
                }
                
                return NextResponse.json({
                    success: true,
                    message: "User Login Successfully!",
                    userData
                })
            }
        }

    } catch (error) {
        console.log("Error in user login.");
        return NextResponse.json({
            success: false,
            message: `Error in User Signin ${error}`,
        })
    }
}
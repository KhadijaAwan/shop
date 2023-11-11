import { NextResponse } from "next/server";
import connection from "../../../database/index";
import Joi from "joi";
import { hash } from "bcrypt";
import User from "@/models/user";

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
})

export async function POST(request: any) {
    await connection();
    const { username, email, password, role } = await request.json();
    const { error } = schema.validate({ username, email, password, role });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        })
    }

    else {
        try {
            const UserPresent = await User.findOne({ email });
            if (UserPresent) {
                return NextResponse.json({
                    success: false,
                    message: "User Account Already present with this email."
                })
            }
            else {
                const password_hashing = await hash(password, 12);
                const newUser = await User.create({
                    username,
                    email,
                    password: password_hashing,
                    role: "user",
                });

                if (newUser) {
                    return NextResponse.json({
                        success: true,
                        message: "User Registered Successfully",
                    });
                }
            }

        } catch (error) {
            console.log("Error in registering new user.");
            return NextResponse.json({
                success: false,
                message: "Error in User Registration",
            })
        }
    }
}
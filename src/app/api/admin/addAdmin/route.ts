import { NextResponse } from "next/server";
import connection from "@/database/index";
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
            const AdminPresent = await User.findOne({ email });
            if (AdminPresent) {
                return NextResponse.json({
                    success: false,
                    message: "Admin Already present with this email."
                })
            }
            else {
                const password_hashing = await hash(password, 12);
                const newAdmin = await User.create({
                    username,
                    email,
                    password: password_hashing,
                    role: "admin",
                });

                if (newAdmin) {
                    return NextResponse.json({
                        success: true,
                        message: "New Admin created Successfully",
                    });
                }
            }

        } catch (error) {
            console.log("Error in creating new admin.");
            return NextResponse.json({
                success: false,
                message: "Error in Admin creation.",
            })
        }
    }
}
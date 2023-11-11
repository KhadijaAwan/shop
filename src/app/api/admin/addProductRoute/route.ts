import { NextResponse } from "next/server";
import Joi from "joi";
import connection from "@/database";
import Product from "@/models/product";
import AuthenticatedUser from "@/middleware/authentication";

const newProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    delivery: Joi.string().required(),
    onSale: Joi.string().required(),
    imageUrl: Joi.string().required(),
    discount: Joi.number().required(),
})


export async function POST(request: any) {
    try {
        await connection();

        const authenticated = await AuthenticatedUser(request) as any;
        console.log("Authentication", authenticated?.role);

        if (authenticated?.role === "admin") {
            const getData = await request.json();
            const { name, description, price, category, sizes, delivery, onSale, imageUrl, discount } = getData;
            const { error } = newProductSchema.validate({ name, description, price, category, sizes, delivery, onSale, imageUrl, discount });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            else {
                const createProduct = await Product.create(getData);
                if (createProduct) {
                    return NextResponse.json({
                        success: true,
                        message: "Product added successfully",
                    });
                } else {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to add the product ! please try again",
                    });
                }
            }
        }

        else {
            return NextResponse.json({
                success: false,
                message: "Sorry! you are not allowed.",
            })
        }

    } catch (error) {
        console.log("Error in adding new product", error);
        return NextResponse.json({
            success: false,
            message: "New Product is not added.",
        })
    }
}

import { NextResponse } from "next/server";
import connection from "@/database";
import Joi from "joi";
import AuthenticatedUser from "@/middleware/authentication";
import Cart from "@/models/cart";

const addToCart = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
})

export async function POST(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const getData = await request.json();
            const { userId, productId } = getData;
            const { error } = addToCart.validate({ userId, productId });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            else {
                const existingCartItem = await Cart.findOne({
                    productId: productId,
                    userId: userId,
                });

                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                    await existingCartItem.save();
                    return NextResponse.json({
                        success: true,
                        message: "Product quantity updated in cart!",
                    });
                }

                else {
                    const addProductToCart = await Cart.create(getData);
                    console.log(addProductToCart);

                    if (addProductToCart) {
                        return NextResponse.json({
                            success: true,
                            message: "Product is added to cart",
                        });
                    } else {
                        return NextResponse.json({
                            success: false,
                            message: "Product addition to cart failed.",
                        });
                    }
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
        console.log("Error in adding product to cart", error);
        return NextResponse.json({
            success: false,
            message: "Product addition in Cart failed.",
        })
    }
}
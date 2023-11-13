import { NextResponse } from "next/server";
import connection from "@/database";
import Joi from "joi";
import AuthenticatedUser from "@/middleware/authentication";
import Cart from "@/models/cart";
export const revalidate = 0;
const updateToCart = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
})

export async function PUT(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const getData = await request.json();
            const { userId, productId } = getData;
            const { error } = updateToCart.validate({ userId, productId });

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
                    existingCartItem.quantity -= 1;
                    await existingCartItem.save();
                    return NextResponse.json({
                        success: true,
                        message: "Product quantity updated in cart!",
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
        console.log("Error in updating product to cart", error);
        return NextResponse.json({
            success: false,
            message: "Product updation in Cart failed.",
        })
    }
}

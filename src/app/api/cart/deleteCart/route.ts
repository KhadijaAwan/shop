import connection from "@/database";
import { NextResponse } from "next/server";
import AuthenticatedUser from "@/middleware/authentication";
import Cart from "@/models/cart";

export async function DELETE(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const { searchParams } = new URL(request.url);
            const id = searchParams.get("id");

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Deleting Cart Product Id is Needed.",
                })
            }

            else {
                const deletedCartProduct = await Cart.findByIdAndDelete(id);
                if (deletedCartProduct) {
                    return NextResponse.json({
                        success: true,
                        message: "Product deleted successfully",
                    });
                }
                else {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to delete the cart product",
                    });
                }
            }
        }

        else {
            return NextResponse.json({
                success: false,
                message: "Please Login to Continue.",
            })
        }
    }
    catch (error) {
        console.log("Error in deleting cart product", error);
        return NextResponse.json({
            success: false,
            message: "Deleting Cart Product Failed.",
        })
    }
}
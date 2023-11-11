import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const { searchParams } = new URL(request.url);
            const id = searchParams.get("id");

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Please Login to continue.",
                })
            }

            else {
                const getProducts = await Cart.find({ userId: id }).populate("productId");

                if (getProducts) {
                    return NextResponse.json({
                        success: true,
                        data: getProducts,
                    })
                }
                else {
                    return NextResponse.json({
                        success: false,
                        status: 204,
                        message: "No cart products found",
                    })
                }
            }
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Please Login to continue Shopping",
            })
        }
    }
    catch (error) {
        console.log("Error in receiving cart products", error);
        return NextResponse.json({
            success: false,
            message: "Reading all cart products failed.",
        })
    }
}
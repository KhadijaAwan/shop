import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Order from "@/models/orders";
export const revalidate = 0;

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
                const getOrderData = await Order.findById(id).populate("orderProducts.product");

                if (getOrderData) {
                    return NextResponse.json({
                        success: true,
                        data: getOrderData,
                    })
                }
                else {
                    return NextResponse.json({
                        success: false,
                        status: 204,
                        message: "Failed to get order details.",
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

    } catch (error) {
        console.log("Error in receiving order details", error);
        return NextResponse.json({
            success: false,
            message: "Reading order details failed.",
        })
    }
}

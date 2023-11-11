import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Order from "@/models/orders";

export async function GET(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const { searchParams } = new URL(request.url);
            const id = searchParams.get("id");

            const getAllOrders = await Order.find({ user: id }).populate("orderProducts.product");

            if (getAllOrders) {
                return NextResponse.json({
                    success: true,
                    data: getAllOrders,
                })
            }
            else {
                return NextResponse.json({
                    success: false,
                    status: 204,
                    message: "No orders found",
                })
            }
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Please Login to continue Shopping",
            })
        }

    } catch (error) {
        console.log("Error in receiving all orders", error);
        return NextResponse.json({
            success: false,
            message: "Reading all orders failed.",
        })
    }
}
import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Order from "@/models/orders";
import Cart from "@/models/cart";

export async function POST(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const getData = await request.json();
            const { user } = getData;

            const createOrder = await Order.create(getData);
            if (createOrder) {
                await Cart.deleteMany({ userId: user });

                return NextResponse.json({
                    success: true,
                    message: "Order added successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the order ! please try again",
                });
            }
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Sorry! you are not allowed.",
            })
        }
    } catch (error) {
        console.log("Error in adding order", error);
        return NextResponse.json({
            success: false,
            message: "New Order is not added.",
        })
    }
}
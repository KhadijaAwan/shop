import connection from "@/database";
import { NextResponse } from "next/server";
import AuthenticatedUser from "@/middleware/authentication";
import Order from "@/models/orders";
import Product from "@/models/product";
import User from "@/models/user";

export const revalidate = 0;

export async function GET(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request) as any;

        if (authenticated?.role === "admin") {
            const getAllOrders = await Order.find({}).populate("orderProducts.product").populate("user");

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
                message: "Sorry! you are not allowed.",
            })
        }
    }
    catch (error) {
        console.log("Error in receiving all users orders", error);
        return NextResponse.json({
            success: false,
            message: "Reading all users orders failed.",
        })
    }
}

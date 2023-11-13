import connection from "@/database";
import { NextResponse } from "next/server";
import AuthenticatedUser from "@/middleware/authentication";
import Order from "@/models/orders";
export const revalidate = 0;
export async function PUT(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request) as any;

        if (authenticated?.role === "admin") {
            const getData = await request.json();
            const { _id, isPaid, paidAt, isProcessing, orderProducts, shippingAddress, paymentMethod } = getData;

            const updateProduct = await Order.findOneAndUpdate({ _id: _id }, { isPaid, paidAt, isProcessing, orderProducts, shippingAddress, paymentMethod }, { new: true })

            if (updateProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Order updated successfully",
                });
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update the order! please try again",
                });
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
        console.log("Error in updating users orders", error);
        return NextResponse.json({
            success: false,
            message: "Updating users orders failed.",
        })
    }
}

import connection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import AuthenticatedUser from "@/middleware/authentication";

export async function PUT(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request) as any;

        if (authenticated?.role === "admin") {
            const getData = await request.json();
            const { _id, name, description, price, category, sizes, delivery, onSale, imageUrl, discount } = getData;

            const updateProduct = await Product.findOneAndUpdate({ _id: _id }, { name, description, price, category, sizes, delivery, onSale, imageUrl, discount }, { new: true })

            if (updateProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product updated successfully",
                });
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update the product ! please try again",
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
        console.log("Error in updating product", error);
        return NextResponse.json({
            success: false,
            message: "Updating Product Failed.",
        })
    }
}
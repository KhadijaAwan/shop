import connection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import AuthenticatedUser from "@/middleware/authentication";

export async function DELETE(request: any) {
    try {
        await connection();
        const authenticated = await AuthenticatedUser(request) as any;

        if (authenticated?.role === "admin") {
            const { searchParams } = new URL(request.url);
            const id = searchParams.get("id");

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Deleting Product Id is Needed.",
                })
            }

            const deletedProduct = await Product.findByIdAndDelete(id);
            if (deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product deleted successfully",
                });
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to delete the product ! please try again",
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
        console.log("Error in deleting product", error);
        return NextResponse.json({
            success: false,
            message: "Deleting Product Failed.",
        })
    }
}
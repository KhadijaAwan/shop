import connection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    try {
        await connection();
        const { searchParams } = new URL(request.url);
        const getId = searchParams.get("id");

        if (!getId) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Product id is required",
            })
        }

        const productData = await Product.find({ _id: getId });

        if (productData && productData.length) {
            return NextResponse.json({
                success: true,
                data: productData[0],
            })
        }
        else {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "No product found",
            })
        }

    } catch (error) {
        console.log("Error in receiving product id", error);
        return NextResponse.json({
            success: false,
            message: "Reading product id failed.",
        })
    }
}
import connection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    try {
        await connection();
        const getProducts = await Product.find({});

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
                message: "No products found",
            })
        }
    } catch (error) {
        console.log("Error in receiving all products", error);
        return NextResponse.json({
            success: false,
            message: "Reading all products failed.",
        })
    }
}
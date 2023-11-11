import connection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    try {
        await connection();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        console.log(id);
        const getData = await Product.find({ category: id });
        console.log(getData);
        if (getData && getData.length > 0) {
            return NextResponse.json({
                success: true,
                data: getData,
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
        console.log("Error in receiving products category", error);
        return NextResponse.json({
            success: false,
            message: "Reading all category failed.",
        })
    }
}
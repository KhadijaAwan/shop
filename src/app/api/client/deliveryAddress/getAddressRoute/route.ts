import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Address from "@/models/deliveryAddress";

export const revalidate = 0;

export async function GET(request: any) {
    try {
        await connection();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Please Login to Continue",
            })
        }
        else {
            const authenticated = await AuthenticatedUser(request);
            if (authenticated) {
                const get_address = await Address.find({ userId: id });

                if (get_address) {
                    return NextResponse.json({
                        success: true,
                        data: get_address,
                    })
                }
                else {
                    return NextResponse.json({
                        success: false,
                        status: 204,
                        message: "Address Retreivel failed.",
                    })
                }
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Sorry! you are not allowed, Please Login.",
                })
            }
        }

    }
    catch (error) {
        console.log("Error in getting Delivery Address", error);
        return NextResponse.json({
            success: false,
            message: "Delivery Address retrievel failed.",
        })
    }
}

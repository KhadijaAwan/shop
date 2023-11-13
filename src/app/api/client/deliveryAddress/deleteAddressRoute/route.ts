import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Address from "@/models/deliveryAddress";

export const revalidate = 0;

export async function DELETE(request: any) {
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
                const deletedAddress = await Address.findByIdAndDelete(id);
                if (deletedAddress) {
                    return NextResponse.json({
                        success: true,
                        message: "Address deleted successfully",
                    });
                }
                else {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to delete the address!",
                    });
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
        console.log("Error in removing Delivery Address", error);
        return NextResponse.json({
            success: false,
            message: "Delivery Address is not removed.",
        })
    }
}

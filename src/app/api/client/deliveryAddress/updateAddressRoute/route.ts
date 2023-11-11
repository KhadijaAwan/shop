import { NextResponse } from "next/server";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Address from "@/models/deliveryAddress";

export async function PUT(request: any) {
    try {
        await connection();

        const authenticated = await AuthenticatedUser(request);
        if (authenticated) {
            const getData = await request.json();
            const { _id, clientName, country, city, address, postalCode } = getData;

            const updateProduct = await Address.findOneAndUpdate({ _id: _id }, { clientName, country, city, address, postalCode }, { new: true })

            if (updateProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Address updated successfully",
                });
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update the address!",
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
    catch (error) {
        console.log("Error in updating Delivery Address", error);
        return NextResponse.json({
            success: false,
            message: "Delivery Address is not updated.",
        })
    }
}
import { NextResponse } from "next/server";
import Joi from "joi";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";
import Address from "@/models/deliveryAddress";

const addAddressSchema = Joi.object({
    clientName: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    postalCode: Joi.string().required(),
    userId: Joi.string().required(),
})

export async function POST(request: any) {
    try {
        await connection();

        const authenticated = await AuthenticatedUser(request);
        if (authenticated) {
            const getData = await request.json();
            const { clientName, country, city, address, postalCode, userId } = getData;

            const { error } = addAddressSchema.validate({ clientName, country, city, address, postalCode, userId });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            else {
                const createAddress = await Address.create(getData);
                if (createAddress) {
                    return NextResponse.json({
                        success: true,
                        message: "Delivery Address added successfully",
                    });
                } else {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to add the delivery address",
                    });
                }
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
        console.log("Error in adding Delivery Address", error);
        return NextResponse.json({
            success: false,
            message: "Delivery Address is not added.",
        })
    }
}
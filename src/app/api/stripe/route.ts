import { NextResponse } from "next/server";
import Joi from "joi";
import connection from "@/database";
import AuthenticatedUser from "@/middleware/authentication";

const stripe = require('stripe')('sk_test_51O4pMoFTRXL8S9JE4q39SjW5SMOstP5xF3LHHguHNn45I5C4Yqsqu0Y9uofFcKz47b8cDGS5wR0152tBbz4y6N9r00q21q205l');

export async function POST(request: any) {
    try {

        const authenticated = await AuthenticatedUser(request);

        if (authenticated) {
            const response = await request.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: response,
                mode: "payment",
                success_url: "http://localhost:3000/pages/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/pages/checkout" + "?status=cancel",
            })

            return NextResponse.json({
                success: true,
                id: session.id,
            })
        }

        else {
            return NextResponse.json({
                success: false,
                message: "Sorry! you are not allowed.",
            })
        }
    }

    catch (error) {
        console.log("Error in stripe configuration", error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Stripe configuration failed.",
        })
    }
}
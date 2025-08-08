import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Membership from "@/models/membership.model";

// Use your actual Stripe API version or omit to use account default
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error";
            console.error("❌ Webhook signature verification failed:", errorMessage);

            return NextResponse.json(
                { error: { message: `Webhook Error: ${errorMessage}` } },
                { status: 400 }
            );
        }

        console.log("✅ Success:", event.id);

        if (event.type === "customer.subscription.created") {
            const subscription = event.data.object as Stripe.Subscription;
            const itemId = subscription.items.data[0].price.product;

            const product = await stripe.products.retrieve(itemId as string);
            const planName = product.name;

            const membership = await Membership.findOne({
                stripeCustomerId: subscription.customer,
            });

            if (membership) {
                await Membership.updateOne(
                    { stripeCustomerId: subscription.customer },
                    { $set: { plan: planName } }
                );
            }
        } else if (event.type === "customer.subscription.deleted") {

            console.log("Subscription deleted:", event.data.object.id);
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Unexpected webhook error:", err);
        return new NextResponse(
            JSON.stringify({ error: { message: "Method Not Allowed" } }),
            {
                status: 405,
                headers: { Allow: "POST" },
            }
        );
    }
}

// In Next.js App Router, to get raw body for Stripe
export const config = {
    api: {
        bodyParser: false,
    },
};

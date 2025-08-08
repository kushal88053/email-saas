"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const addStripe = async () => {
  try {
    await connectDb();

    const user = await currentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    const existingMembership = await Membership.findOne({ userId: user.id });
    if (existingMembership) {
      return; 
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    });

    const customer = await stripe.customers.create({
      email: user.emailAddresses?.[0]?.emailAddress || undefined,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    });

    await Membership.create({
      userId: user.id,
      stripeCustomerId: customer.id,
      plan: "LAUNCH",
    });

  } catch (error) {
    console.error("Error adding Stripe customer:", error);
  }
};

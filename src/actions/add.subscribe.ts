"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";
import { validateEmail } from "@/shared/utils/ZerobounceApi";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Optional: Define a type for a successful subscription result
type SubscriberData = {
    _id: string;
    email: string;
    newsLetterOwnerId: string;
    source: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

// Optional: Define a type for the function's return value
type SubscriptionResponse = {
    data: SubscriberData;
} | {
    error: string;
};

export const subscribe = async ({
    email,
    username,
}: {
    email: string;
    username: string;
}): Promise<SubscriptionResponse> => {
    try {
        await connectDb();
        const validUser = await (await clerkClient()).users.getUserList({
            username: [username],
        });

        const newsletterOwner = validUser.totalCount;

        if (!newsletterOwner) {
            throw new Error("Username is not valid!");
        }

        const data = validUser.data[0];


        const isSubscriberExist = await Subscriber.findOne({
            email,
            newsLetterOwnerId: data.id,
        });

        if (isSubscriberExist) {
            return { error: "Email already exists!" };
        }

        const validationResponse = await validateEmail({ email });
        if (validationResponse.status === "invalid") {
            return { error: "Email not valid!" };
        }

        const subscriber = await Subscriber.create({
            email,
            newsLetterOwnerId: data?.id,
            source: "By E-mailer website",
            status: "Subscribed",
        });

        revalidatePath("/dashboard/subscribers");
        let result = JSON.parse(JSON.stringify(subscriber));

        return { data: result };

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "An unexpected error occurred while subscribing." };
    }
};
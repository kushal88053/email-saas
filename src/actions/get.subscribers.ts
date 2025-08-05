"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";

export const getSubscribers = async ({
    newsLetterOwnerId,
}: {
    newsLetterOwnerId: string;
}) => {
    try {
        await connectDb();

        const subscribers = await Subscriber.find({
            newsLetterOwnerId,
        });

        let result = JSON.parse(JSON.stringify(subscribers));

        return result;
    } catch (error) {
        console.log(error);
    }
};
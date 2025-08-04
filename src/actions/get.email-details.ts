"use server";

import Email from "@/models/email.model";
import { connectDb } from "@/shared/libs/db";
type EmailType = {
  _id: string;
  title: string;
  content: string;
  newsLetterOwnerId: string;
  createdAt?: string;
  updatedAt?: string;
};

export const GetEmailDetails = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}): Promise<EmailType[]> => {
  try {
    await connectDb();

    const emails = await Email.find({ newsLetterOwnerId }).lean();

    const cleaned: EmailType[] = emails.map((email: any) => ({
      _id: email._id.toString(),
      title: email.title,
      content: email.content,
      newsLetterOwnerId: email.newsLetterOwnerId?.toString?.(),
      createdAt: email.createdAt?.toISOString?.(),
      updatedAt: email.updatedAt?.toISOString?.(),
    }));

    return cleaned;
  } catch (error) {
    console.error(error);
    return [];
  }
};

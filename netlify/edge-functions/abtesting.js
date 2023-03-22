import { PostHog } from "posthog-node";

export default async (request, context) => {

    console.log(context.cookies.get('sid'))
  
    context.cookies.set({
        name: "abtesting",
        value: 1,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
    });
  
    return context.next();

};
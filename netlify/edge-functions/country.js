export default async (request, context) => {
    const countryCode = context.geo?.country?.code || "UNKNOWN";

    return new Response(countryCode, {
        headers: { "content-type": "text/plain" },
    });
};

export const config = {
    path: "/country",
};
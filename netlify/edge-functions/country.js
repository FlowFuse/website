export default async (request, context) => {
    const countryCode = context.geo?.country?.code || "UNKNOWN";
    const subdivisionCode = context.geo?.subdivision?.code;

    // Return country-subdivision for US states with their own privacy laws (e.g. California CCPA)
    // so the consent system can apply state-level rules via the ffPrivacyCountries list.
    if (countryCode === "US" && subdivisionCode === "CA") {
        return new Response("US-CA", {
            headers: { "content-type": "text/plain" },
        });
    }

    return new Response(countryCode, {
        headers: { "content-type": "text/plain" },
    });
};

export const config = {
    path: "/country",
};
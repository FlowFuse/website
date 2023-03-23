function setCookie(context, name, value) {
    context.cookies.set({
        name,
        value,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
    });
}

export default async (request, context) => {    
    const flag = {"flagA": "optionB"}
    const strFlag = encodeURIComponent(JSON.stringify(flag))
    setCookie(context, "feats", strFlag, 1);    
    return context.next();
};
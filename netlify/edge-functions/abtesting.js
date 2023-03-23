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
    setCookie(context, "feat", "optionA");    
    return context.next();
};
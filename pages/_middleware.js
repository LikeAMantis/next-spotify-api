import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    console.log("token", token);
    console.log("secret", process.env.JWT_SECRET);
    console.log("req", req);
    console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);

    const { pathname } = req.nextUrl


    if (pathname.includes("/api/auth") || token) {
        console.log("middleware next");
        return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
        console.log("middleware redirect");
        return NextResponse.redirect("/login");
    }
}
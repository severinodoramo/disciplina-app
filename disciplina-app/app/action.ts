"use server";

import { cookies } from "next/headers";

export async function setCookieSessionId(sessionId: string) {
  cookies().set({
    name: "sessionid",
    value: sessionId,
    path: "/",
  });
}

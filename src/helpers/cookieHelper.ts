// cookieUtils.ts
import {cookies} from "next/headers";

// Function to check if a specific cookie exists
export const hasCookie = (cookieName: string): boolean => {
    const cookiesList = cookies();
    return cookiesList.has(cookieName);
};

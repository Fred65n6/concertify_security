import {parseCookies} from "nookies";

export function useCookiePresence() {
    const cookies = parseCookies();

    // Check if any cookies exist
    const hasCookies = Object.keys(cookies).length > 0;

    return hasCookies;
}

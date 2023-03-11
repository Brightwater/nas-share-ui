import { LoginData, isRefreshTokenExpired, AuthData } from '$lib/models/LoginData';
import { writable, type Writable } from "svelte/store";
import { browser } from '$app/environment';

let stored: AuthData = new AuthData(new LoginData());
if (browser) {
    const temp = localStorage.getItem("loginDataStore");
    if (temp != null) {
        stored = JSON.parse(temp);
    }
}

export const authDataStore: Writable<AuthData> =
                        ((browser) 
                        && (stored.loginData.username != null 
                        && !isRefreshTokenExpired(stored.loginData))) ? writable(stored) : writable(new AuthData(new LoginData()));

if (browser) {
    authDataStore.subscribe((value) => {
        localStorage.setItem('loginDataStore', JSON.stringify(value));
    });
}




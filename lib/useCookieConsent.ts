"use client";

import { useSyncExternalStore } from "react";

export const COOKIE_CONSENT_KEY = "aquafix-cookie-consent";
export const COOKIE_CONSENT_EVENT = "aquafix-cookie-consent-changed";

export type ConsentValue = "all" | "necessary" | null;

function subscribe(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ConsentValue {
  return window.localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentValue;
}

function getServerSnapshot(): ConsentValue {
  return null;
}

export function useCookieConsent(): ConsentValue {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setCookieConsent(value: "all" | "necessary") {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT));
}

// src/data/datasources/AuthRemoteDataSource.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
import { createLogger } from "@/core/logger";
import { API_URLS } from '@/core/config'

const log = createLogger("AuthRemoteDataSource");
export default class AuthRemoteDataSource {
  async signup({ username, email, password, password2 }) {
    // console.log("request ${username} ${email} ${password} ${password2}");
    log.debug("request ${username} ${email} ${password} ${password2}");
    const res = await fetch(API_URLS.auth.signup, {//${BASE_URL}/api/auth/signup/
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, password2 }),
    });

    const data = await res.json().catch(() => ({}));
    // console.log("response " + JSON.stringify(data));
    log.debug("response " + JSON.stringify(data));

    if (!res.ok) {
      // DRF returns field errors like {"username": ["This field is required."]}
      const message =
        data.detail || Object.values(data).flat().join(" ") || "Signup failed";
      throw new Error(message);
    }

    return data; // e.g. { user: {...}, access: "...", refresh: "..." }
  }

  async login({ username, password }) {
    // console.log("request ${username} ${password} ");
    log.debug("request ${username} ${password} ");

    const res = await fetch(API_URLS.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    // console.log("response " + JSON.stringify(data));
    log.debug("request ${username} ${password} ");

    if (!res.ok) {
      throw new Error(data.detail || "Login failed");
    }
    return data;
  }
}

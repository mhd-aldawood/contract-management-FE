// src/core/config/apiUrls.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_URLS = {
  base: API_BASE_URL,

  auth: {
    login: `${API_BASE_URL}/api/auth/login/`,
    signup: `${API_BASE_URL}/api/auth/signup/`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
  },

  agreements: {
    list: `${API_BASE_URL}/agreements`,
    create: `${API_BASE_URL}/agreements`,
    byId: (id) => `${API_BASE_URL}/agreements/${id}`,
    export: `${API_BASE_URL}/agreements/export`,
    filter: `${API_BASE_URL}/agreements/filter`,
    costs: `${API_BASE_URL}/agreements/costs`,
  },

  educationalContents: {
    list: `${API_BASE_URL}/educational-contents`,
    create: `${API_BASE_URL}/api/educational-contents`,
    byId: (id) => `${API_BASE_URL}/educational-contents/${id}`,
    save: `${API_BASE_URL}/educational-contents/save`,
  },
  nafathCenter: {
    create: `${API_BASE_URL}/api/nafath-center/create`,
  },

  users: {
    profile: `${API_BASE_URL}/users/profile`,
    settings: `${API_BASE_URL}/users/settings`,
  },
};

export default API_URLS;

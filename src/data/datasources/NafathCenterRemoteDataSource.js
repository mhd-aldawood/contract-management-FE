const STORAGE_KEY = "nafath_agreement";
import { createLogger } from "@/core/logger";
import { API_URLS } from "@/core/config/apiUrls";
import { toApiPayload } from "../mappers/NafathCenterMapper";
const logger = createLogger("NafathCenterRemoteDataSource");
export default class NafathCenterRemoteDataSource {
  async _request(url, options = {}) {
    const isFormData = options.body instanceof FormData;

    const res = await fetch(url, {
      method: "POST",
      ...options, // ✅ spread options first
      headers: {
        // ✅ default JSON only when NOT sending FormData
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      let message = "حدث خطأ أثناء الاتصال بالخادم";
      try {
        const body = await res.json();
        message = body.message || body.error || message;
      } catch {
        /* not JSON */
      }
      throw new Error(message);
    }

    if (res.status === 204) return null;
    return res.json();
  }

  // ---------------- SAVE → POST /save ----------------
  async save(form) {
    logger.debug("NafathCenterRemoteDataSource save", form);
    const tempPayload = toApiPayload(form);
    logger.debug(tempPayload);

    const fileObject = tempPayload.file; // ← the File you just stored
    console.log("save fileObject:", fileObject, fileObject instanceof File);

    const payload =
      typeof tempPayload?.toJSON === "function"
        ? tempPayload.toJSON()
        : { ...tempPayload };

    const fd = new FormData();

    for (const [key, value] of Object.entries(payload)) {
      if (key === "file" || key === "paymentSchedule" || key === "id") continue;
      if (value === null || value === undefined) continue;
      fd.append(key, typeof value === "boolean" ? String(value) : value);
    }

    if (Array.isArray(payload.paymentSchedule)) {
      fd.append("paymentSchedule", JSON.stringify(payload.paymentSchedule));
    }

    if (fileObject instanceof File || fileObject instanceof Blob) {
      fd.append("fileName", fileObject.name);
      fd.append("file", fileObject, fileObject.name);
    } else {
      console.warn("No File on agreement — upload will skip the file");
    }

    const token = localStorage.getItem("access_token");

    const saved = await this._request(API_URLS.nafathCenter.create, {
      method: "POST",
      body: fd,
      headers: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    return saved;
  }

  async saveNafathCenterPayload(payload) {
    return payload;
  }
}

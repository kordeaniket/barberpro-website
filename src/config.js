import contact from "./contact.json";

// All contact details come from src/contact.json (edit that file).
// .env values are only used as a fallback if the JSON value is empty.
export const siteConfig = {
  brand: "BarberPro",
  shopName: contact.shopName || "BarberPro",
  ownerName: contact.ownerName || "",
  whatsappNumber: contact.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "",
  phoneNumber: contact.phoneNumber || import.meta.env.VITE_CONTACT_PHONE || "",
  phoneDisplay: contact.phoneDisplay || "",
  email: contact.email || import.meta.env.VITE_CONTACT_EMAIL || "",
  city: contact.city || import.meta.env.VITE_BUSINESS_CITY || "महाराष्ट्र",
  address: contact.address || "",
  workingHours: contact.workingHours || "",
  whatsappDefaultMessage: contact.whatsappDefaultMessage || "नमस्कार! मला BarberPro बद्दल अधिक माहिती हवी आहे.",
  demoRequestIntro: contact.demoRequestIntro || "नमस्कार! मला BarberPro डेमो हवा आहे."
};

export const digits = (v) => String(v || "").replace(/\D/g, "");

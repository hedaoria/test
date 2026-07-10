export interface ServiceArea {
  city: string;
  province: { nl: string; en: string };
  responseTime: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  { city: "Utrecht", province: { nl: "Utrecht", en: "Utrecht" }, responseTime: "30 min" },
  { city: "Amsterdam", province: { nl: "Noord-Holland", en: "North Holland" }, responseTime: "35 min" },
  { city: "Rotterdam", province: { nl: "Zuid-Holland", en: "South Holland" }, responseTime: "40 min" },
  { city: "Den Haag", province: { nl: "Zuid-Holland", en: "South Holland" }, responseTime: "40 min" },
  { city: "Eindhoven", province: { nl: "Noord-Brabant", en: "North Brabant" }, responseTime: "45 min" },
  { city: "Almere", province: { nl: "Flevoland", en: "Flevoland" }, responseTime: "35 min" },
  { city: "Amersfoort", province: { nl: "Utrecht", en: "Utrecht" }, responseTime: "25 min" },
  { city: "Arnhem", province: { nl: "Gelderland", en: "Gelderland" }, responseTime: "45 min" },
  { city: "Zwolle", province: { nl: "Overijssel", en: "Overijssel" }, responseTime: "50 min" },
  { city: "Breda", province: { nl: "Noord-Brabant", en: "North Brabant" }, responseTime: "50 min" },
  { city: "Nijmegen", province: { nl: "Gelderland", en: "Gelderland" }, responseTime: "45 min" },
  { city: "Haarlem", province: { nl: "Noord-Holland", en: "North Holland" }, responseTime: "40 min" },
];

const WIB_TIMEZONE = "Asia/Jakarta";

export function formatTanggalWIB(isoString: string, includeTime = false): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;

  const options: Intl.DateTimeFormatOptions = {
    timeZone: WIB_TIMEZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(includeTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  };

  const formatted = new Intl.DateTimeFormat("id-ID", options).format(date);
  return includeTime ? `${formatted} WIB` : formatted;
}

export function formatTanggalSingkat(dateStr: string): string {
  const date = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: WIB_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function isPastDate(isoString: string | null): boolean {
  if (!isoString) return false;
  return new Date(isoString).getTime() < Date.now();
}

export function toWIBDateKey(isoOrDate: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoOrDate)) return isoOrDate;
  const date = new Date(isoOrDate);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: WIB_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((p) => p.type === "year")?.value ?? "2026";
  const month = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

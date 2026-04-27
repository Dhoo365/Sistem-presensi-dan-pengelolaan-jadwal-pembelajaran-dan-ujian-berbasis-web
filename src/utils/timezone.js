export const TZ = "Asia/Makassar";

export const todayManado = (dateValue = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(dateValue));

export const timeManado = (dateValue = new Date()) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(dateValue));

export const dayNameManado = (dateValue = new Date()) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    weekday: "long"
  }).format(new Date(dateValue));

export const monthManado = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    month: "2-digit"
  }).format(new Date());

export const dateTimeManado = (dateValue = new Date()) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(dateValue));

export const formatDateManado = (dateValue = new Date()) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(dateValue));

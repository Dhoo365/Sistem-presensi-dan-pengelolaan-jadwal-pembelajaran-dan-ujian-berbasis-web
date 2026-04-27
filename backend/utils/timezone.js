const TZ = "Asia/Makassar";

/* ===============================
   DATE OBJECT SEKARANG (lokal server)
================================= */
function nowManado() {
  return new Date();
}

/* ===============================
   YYYY-MM-DD zona Manado
================================= */
function todayManado(dateValue = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(dateValue));
}

/* ===============================
   HH:mm zona Manado
================================= */
function timeManado(dateValue = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(dateValue));
}

/* ===============================
   FULL DATETIME zona Manado
================================= */
function dateTimeManado(dateValue = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    dateStyle: "full",
    timeStyle: "medium"
  }).format(new Date(dateValue));
}

/* ===============================
   Nama Hari zona Manado
================================= */
function dayNameManado(dateValue = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: TZ,
    weekday: "long"
  }).format(new Date(dateValue));
}

/* ===============================
   Tambah hari lalu ambil tanggal
================================= */
function addDaysManado(days = 0) {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return todayManado(now);
}

module.exports = {
  TZ,
  nowManado,
  todayManado,
  timeManado,
  dateTimeManado,
  dayNameManado,
  addDaysManado
};

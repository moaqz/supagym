const dateFormater = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export function formatDatetime(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return dateFormater.format(date);
}

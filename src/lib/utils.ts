export function formatDateTime(time: string) {
  const date = new Date(time);

  const dayName = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("id-ID", { day: "numeric" }).format(date);
  const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(
    date
  );

  return `${dayName}, ${day} ${monthName} ${year}`;
}

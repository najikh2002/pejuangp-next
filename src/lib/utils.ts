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

export const processMarkdownImages = (markdown: string) => {
  // Regex untuk mencari semua gambar dalam markdown ![alt](url)
  return markdown.replace(
    /!\[(.*?)\]\((https:\/\/.*?\.(?:png|jpe?g|gif))\)/g,
    (match, alt, url) => {
      // Ganti URL gambar dengan URL proxy atau CDN
      const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;
      return `![${alt}](${proxyUrl})`;
    }
  );
};

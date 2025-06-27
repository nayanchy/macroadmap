export function getButtonStyles(status: string) {
  const statusMap: Record<string, string> = {
    pending: "bg-yellow-500 text-white",
    "in-progress": "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
    "on-hold": "bg-gray-500 text-white",
  };

  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "-");
  return statusMap[normalizedStatus] || "bg-primary-500 text-gray-50";
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

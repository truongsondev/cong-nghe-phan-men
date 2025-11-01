export function getVideoDuration(file: File | string): Promise<number> {
  if (typeof file === "string") {
    return new Promise((resolve) => {
      resolve(0);
    });
  }
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = () => reject("Invalid video file");
    video.src = URL.createObjectURL(file);
  });
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "00:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  } else {
    return [m, s].map((v) => String(v).padStart(2, "0")).join(":");
  }
}
export function passStringToJson(valueString: string) {
  if (!valueString || valueString.trim() === "") {
    return null;
  }

  try {
    return JSON.parse(valueString);
  } catch (err) {
    console.error(" Invalid JSON string:", valueString);
    return null;
  }
}

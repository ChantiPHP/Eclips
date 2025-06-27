const imageMap = new Map<string, string>();

export function saveImage(id: string, url: string) {
  imageMap.set(id, url);
}

export function getImage(id: string): string | undefined {
  return imageMap.get(id);
}

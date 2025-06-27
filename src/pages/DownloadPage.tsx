import { useParams } from "react-router-dom";
import { getImage } from "@/lib/imageStore";
import { Button } from "@/components/ui/button";

export default function DownloadPage() {
  const { id } = useParams();
  const imageUrl = id ? getImage(id) : undefined;

  if (!imageUrl) {
    return <p className="p-4 text-center">Image not found or expired.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <img src={imageUrl} alt="Captured" className="max-w-md border rounded" />
      <a href={imageUrl} download="photo.png">
        <Button className="mt-2">Download This Picture</Button>
      </a>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoModal from "@/components/PhotoModal";
import { saveImage } from "@/lib/imageStore";

type FilterType = "none" | "oldman" | "cute" | "vivid" | "bw" | "warm" | "cool" | "cartoon";

const filters = [
  { type: "none", label: "None", preview: "/filter-none.png" },
  { type: "oldman", label: "Old Man", preview: "/filter-old.png" },
  { type: "cute", label: "Cute", preview: "/filter-cute.png" },
  { type: "vivid", label: "Vivid", preview: "/filter-vivid.png" },
  { type: "bw", label: "B&W", preview: "/filter-bw.png" },
  { type: "warm", label: "Warm", preview: "/filter-warm.png" },
  { type: "cool", label: "Cool", preview: "/filter-cool.png" },
  { type: "cartoon", label: "Cartoon", preview: "/filter-cartoon.png" }
];

export default function PhotoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filter, setFilter] = useState<FilterType>("none");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [qrLink, setQrLink] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  };

  const applyFilter = (): string => {
    switch (filter) {
      case "oldman":
        return "sepia(90%) contrast(130%) brightness(90%)";
      case "cute":
        return "saturate(150%) brightness(110%) hue-rotate(30deg)";
      case "vivid":
        return "saturate(200%) contrast(150%)";
      case "bw":
        return "grayscale(100%)";
      case "warm":
        return "brightness(110%) sepia(30%)";
      case "cool":
        return "brightness(90%) hue-rotate(180deg)";
      case "cartoon":
        return "contrast(200%) brightness(120%)";
      default:
        return "none";
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.filter = applyFilter();
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        const id = Math.random().toString(36).substr(2, 9);
        saveImage(id, url);
        setQrLink(`${window.location.origin}/download/${id}`);
        setShowModal(true);
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow p-4 w-full max-w-md">
        <div className="rounded overflow-hidden relative shadow-lg">
          <video
            ref={videoRef}
            className="w-full rounded"
            style={{ filter: applyFilter() }}
          />
        </div>

        <div className="w-full mt-2 overflow-x-auto flex gap-2 p-1">
          {filters.map((f) => (
            <button
              key={f.type}
              onClick={() => setFilter(f.type as FilterType)}
              className={`flex-shrink-0 border rounded p-1 ${
                filter === f.type ? "ring-2 ring-pink-500" : ""
              }`}
            >
              <img
                src={f.preview}
                alt={f.label}
                className="w-16 h-16 object-cover rounded"
              />
              <p className="text-xs text-center">{f.label}</p>
            </button>
          ))}
        </div>

        <Button className="mt-2 w-full" onClick={takePhoto}>
          Take Photo
        </Button>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {showModal && imageUrl && qrLink && (
        <PhotoModal
          imageUrl={imageUrl}
          qrLink={qrLink}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

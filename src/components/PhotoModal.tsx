import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

export default function PhotoModal({
  imageUrl,
  qrLink,
  onClose
}: {
  imageUrl: string;
  qrLink: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow p-4 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <img src={imageUrl} alt="Captured" className="w-full rounded border" />
        <a href={imageUrl} download="photo.png">
          <Button className="mt-2 w-full">Download Image</Button>
        </a>
        <div className="bg-white p-2 mt-2 rounded flex flex-col items-center">
          <QRCode value={qrLink} />
          <p className="text-xs text-center">Scan to download</p>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoPage from "@/pages/PhotoPage";
import DownloadPage from "@/pages/DownloadPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoPage />} />
        <Route path="/download/:id" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
}

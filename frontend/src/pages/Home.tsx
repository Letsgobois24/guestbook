import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, User, Building2, Phone, Users, FileText } from 'lucide-react';
import Header from '../components/Header';
import Success from './Success';
import Footer from '../components/Footer';
import { ComboboxDemo } from '@/components/comboBox';

function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();
    return () => stream?.getTracks().forEach(track => track.stop());
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      setPhoto(canvas.toDataURL("image/png"));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setPhoto(null);
    setIsSubmitted(false);
  };
  
  if (isSubmitted) return <Success onReset={resetForm} />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Guest Book</h1>
            <p className="mt-2 text-gray-600">Please fill in your visit details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "Institution Name", icon: <Building2 className="w-4 h-4 mr-2" />, type: "text" },
              { label: "PIC Name", icon: <User className="w-4 h-4 mr-2" />, type: "text" },
              { label: "Phone Number", icon: <Phone className="w-4 h-4 mr-2" />, type: "tel", pattern: "[0-9]*" }
            ].map(({ label, icon, type, pattern }, index) => (
              <div key={index}>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  {icon} {label}
                </label>
                <input
                  type={type}
                  required
                  pattern={pattern}
                  onInput={pattern ? (e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '') : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 mr-2" /> Meeting With
              </label>
              <ComboboxDemo />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 mr-2" /> Agenda Details
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Camera className="w-4 h-4 mr-2" /> Identity Photo
              </label>
              <div className="mt-2 border rounded-lg p-4">
                {photo ? (
                  <>
                    <img src={photo} alt="Captured identity" className="w-full rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="w-full mt-2 py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
                    >
                      Retake Photo
                    </button>
                  </>
                ) : (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                    <canvas ref={canvasRef} className="hidden" />
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-full mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      Capture Photo
                    </button>
                  </>
                )}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex justify-center items-center">
              <Save className="w-4 h-4 mr-2" /> Save
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

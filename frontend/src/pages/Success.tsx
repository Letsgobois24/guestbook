// success.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SuccessProps {
  onReset: () => void;
}

function Success({ onReset }: SuccessProps) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 bg-gray-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Terima Kasih!</h2>
            <p className="text-xl text-gray-600">
              Data anda sudah berhasil disimpan.
            </p>
            <p className="text-xl text-gray-600 mt-2">
              Dimohon dapat menunggu di ruang yang sudah disediakan.
            </p>
            <button
              onClick={onReset}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Formulir
            </button>
          </div>
        </div>
        <div className='mb-5'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Success;

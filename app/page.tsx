"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function Home() {
  const [showModal, setShowModal] = useState(true); // Untuk kontrol modal
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Pastikan video berhenti saat halaman dimuat
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false); // Tutup modal
    if (videoRef.current) {
      videoRef.current.play(); // Putar video
    }
    setIsPlaying(true); // Set status menjadi playing
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle status
    }
  };

  return (
    <>
      {/* Modal Fullscreen */}
      {showModal && (
        <div className="fixed h-full w-full bg-black bg-opacity-70 z-10 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h1 className="text-xl font-bold mb-4">Selamat Datang!</h1>
            <p className="text-gray-600 mb-4">Tekan tombol untuk membuka undangan.</p>
            <button
              onClick={handleModalClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className="relative flex h-fit w-full justify-center px-1 py-1">
        <video
          ref={videoRef}
          loop
          playsInline
          className="z-0 w-full max-w-3xl"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <button
          onClick={togglePlayPause}
          className="absolute bottom-4 right-4 z-10 bg-gray-800 text-white rounded-full p-3 shadow-lg"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className="flex flex-col px-1 my-5">
        <div>
          <label htmlFor="name" className="mb-5">Nama Undangan</label>
          <input type="text" name="name" className="w-full py-2 px-2 focus:outline-rose-400 rounded text-gray-800 border border-gray-300" />
        </div>
        <div className="mt-5">
          <label htmlFor="kehadiran" className="mb-5">Kehadiran</label>
          <select name="kehadiran" id="kehadiran" className="w-full py-2 px-2 focus:outline-rose-400 rounded text-gray-800 border border-gray-300">
            <option selected disabled>- Pilih Kehadiran -</option>
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
          </select>
        </div>
        <div className="mt-5">
          <label htmlFor="ucapan">Ucapan untuk yang berbahagia</label>
          <textarea name="ucapan" id="ucapan" className="w-full py-2 px-2 focus:outline-rose-400 rounded text-gray-800 border border-gray-300"></textarea>
        </div>
        <div className="mt-5">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded">Kirim</button>
        </div>
      </div>
    </>
  );
}

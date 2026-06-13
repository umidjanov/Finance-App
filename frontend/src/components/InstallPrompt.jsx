import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBtn(true);
    });

    window.addEventListener("appinstalled", () => {
      setShowBtn(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBtn(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBtn) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-[#1a2a4a] border border-[#FCA311] rounded-2xl p-4 shadow-2xl z-50">
      <div className="flex items-start gap-3">
        <span className="text-3xl">💰</span>
        <div className="flex-1">
          <p className="text-[#FCA311] font-bold text-sm mb-1">
            Ilovani o'rnating!
          </p>
          <p className="text-[#E5E5E5] text-xs opacity-70 mb-3">
            Finance App ni telefoningizga o'rnating — tezroq va qulay!
          </p>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 bg-[#FCA311] text-[#14213D] rounded-lg font-bold text-xs border-none cursor-pointer"
              onClick={handleInstall}
            >
              📲 O'rnatish
            </button>
            <button
              className="py-2 px-3 bg-transparent text-[#E5E5E5] border border-[#ffffff30] rounded-lg text-xs cursor-pointer"
              onClick={() => setShowBtn(false)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

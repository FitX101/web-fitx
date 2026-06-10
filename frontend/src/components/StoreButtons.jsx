import { FaApple, FaGooglePlay } from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

export const StoreButtons = ({ variant = "default", source = "default" }) => {
  const base =
    "group inline-flex items-center gap-3 rounded-md border transition-all duration-200";
  const sizes =
    variant === "sm"
      ? "px-4 py-2.5 text-sm"
      : "px-5 py-3.5 text-base";

  return (
    <div className="flex flex-col sm:flex-row gap-3" data-testid={`store-buttons-${source}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`download-app-store-${source}`}
        className={`${base} ${sizes} bg-white text-black border-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]`}
      >
        <FaApple className="text-2xl" />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-widest opacity-70">Download on the</span>
          <span className="font-display text-lg font-bold tracking-tight">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`download-play-store-${source}`}
        className={`${base} ${sizes} bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-[#B8941F] hover:border-[#B8941F]`}
      >
        <FaGooglePlay className="text-2xl" />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-widest opacity-80">Get it on</span>
          <span className="font-display text-lg font-bold tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
};

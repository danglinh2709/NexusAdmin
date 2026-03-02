import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

type Props = {
  open: boolean;
  text?: string;
  className?: string;
};

export const LoadingOverlay = ({
  open,
  text = "Loading data...",
  className,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className={[
        "absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        className="w-40 h-40"
      />
      <p className="text-sm text-gray-500 mt-2">{text}</p>
    </div>
  );
};

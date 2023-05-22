import * as React from "react";

import { useLocalSync } from "@/utils/";
import { Language } from "./LanguageSwitcher";

export const ReadAloud: React.FC<{ language: Language }> = ({ language }) => {
  const [enabled, setEnabled] = useLocalSync("enabledReadAloud", true);
  const [active, setActive] = React.useState(false);

  const handleResponse = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => !speechSynthesis.speaking && setActive(false);
    setActive((active) => (!active ? true : active));
    speechSynthesis.speak(utterance);
  };

  // React.useEffect(() => {
  //     if (enabled) {
  //         MessagesObserver.initialize({ onResponse: handleResponse })
  //         return () => {
  //             MessagesObserver.terminate()
  //             setActive(false)
  //             if (speechSynthesis.speaking) speechSynthesis.cancel()
  //         }
  //     }
  // }, [enabled])

  return (
    <div
      title={`Turn ${enabled ? "off" : "on"} read aloud`}
      onClick={() => setEnabled(!enabled)}
      className={`cursor-pointer absolute z-10 rounded-md border border-gray-200 dark:border-white/10 w-6 h-6 flex items-center justify-center top-[-40px] right-0 ${
        active
          ? "bg-sky-500 text-white"
          : "bg-gray-50 text-gray-600 dark:bg-white/10 dark:text-gray-200"
      }`}
    >
      {enabled ? "播放" : "不播放"}
    </div>
  );
};

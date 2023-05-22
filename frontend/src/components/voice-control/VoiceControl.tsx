import * as React from "react";
import { useLocalSync } from "@/utils/";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ReadAloud } from "./ReadAloud";
import { VoiceMessaging } from "./VoiceMessaging";

import "../../assets/styles/tailwind.css";

export const VoiceControl: React.FC = () => {
  const [language, setLanguage] = useLocalSync(
    "language",
    navigator.language || "en-US"
  );

  return (
    <>
      发送
      <div className="inline group">
        <LanguageSwitcher
          language={language}
          onLanguageChange={(language) => setLanguage(language)}
        />
        <ReadAloud language={language} />
        <VoiceMessaging language={language} />
      </div>
    </>
  );
};

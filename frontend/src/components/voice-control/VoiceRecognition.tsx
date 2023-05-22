import * as React from "react";
import { Language } from "./LanguageSwitcher";

export interface VoiceRecognitionResults {
  value: string;
  isFinal: boolean;
}

let voiceRecognition: any;

export const VoiceRecognition: React.FC<{
  onRecognize: ({ value, isFinal }: VoiceRecognitionResults) => void;
  onEnd?: () => void;
  language?: Language;
}> = ({ onRecognize, onEnd, language = "en-US" }) => {
  React.useEffect(() => {
    if (voiceRecognition?.lang !== language)
      voiceRecognition = new (window as any).webkitSpeechRecognition();
    voiceRecognition.lang = language;
    voiceRecognition.continuous = true;
    voiceRecognition.interimResults = true;

    voiceRecognition.onresult = (event: any) => {
      const results = event.results[event.resultIndex];
      onRecognize &&
        onRecognize({ value: results[0].transcript, isFinal: results.isFinal });
    };
    voiceRecognition.onend = () => (onEnd ? onEnd() : voiceRecognition.start());
    voiceRecognition.start();

    return () => {
      voiceRecognition.onresult = null;
      voiceRecognition.onend = null;
      voiceRecognition.stop();
    };
  }, [language]);

  return <></>;
};

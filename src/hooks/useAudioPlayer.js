import { useEffect, useRef } from "react";

const useAudioPlayer = (audioFile) => {
  const audioPlayer = useRef(null);
  const containerId = "audio-player-container";

  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container) {
      const newContainer = document.createElement("div");
      newContainer.setAttribute("id", containerId);
      document.body.appendChild(newContainer);

      const audioElement = document.createElement("audio");
      audioElement.src = audioFile;
      audioElement.preload = "auto";
      newContainer.appendChild(audioElement);

      // Assign the audio element directly to audioPlayer.current
      audioPlayer.current = audioElement;
    }
  }, [audioFile]);

  const playAudio = () => {
    audioPlayer.current?.play();
  };

  const pauseAudio = () => {
    audioPlayer.current.pause();
  };

  const resetAudio = () => {
    audioPlayer.current.currentTime = 0;
  };

  return { playAudio, pauseAudio, resetAudio };
};

export default useAudioPlayer;

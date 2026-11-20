import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import poster from "../../../assets/images/studio-current-wash.webp";
import loop from "../../../assets/videos/studio-current-wash.mp4";
import { createStudioCurrent } from "./studioCurrent";
import "./studio-backdrop.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const prefersStill = () => window.matchMedia(reducedMotionQuery).matches;
const serverStill = () => true;

function subscribeMotion(update: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

export default function StudioBackdrop() {
  const stage = useRef<HTMLDivElement>(null);
  const field = useRef<ReturnType<typeof createStudioCurrent>>(null);
  const player = useRef<HTMLVideoElement>(null);
  const visible = useInView(stage);
  const pageVisible = usePageVisibility();
  const reduced = useSyncExternalStore(subscribeMotion, prefersStill, serverStill);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<"canvas" | "video" | "still">("canvas");
  const still = reduced || mode === "still";
  const running = visible && pageVisible && !paused && !still;

  const mountCanvas = useCallback((element: HTMLCanvasElement | null) => {
    if (!element) return;
    const renderer = createStudioCurrent(element);
    if (!renderer) {
      setMode("video");
      return;
    }
    field.current = renderer;
    const useVideo = () => setMode("video");
    element.addEventListener("webglcontextlost", useVideo);
    return () => {
      element.removeEventListener("webglcontextlost", useVideo);
      renderer.dispose();
      field.current = null;
    };
  }, []);

  useEffect(() => {
    field.current?.setRunning(running);
    const video = player.current;
    if (!video) return;
    let current = true;
    if (running) {
      video.play()?.catch((error: DOMException) => {
        if (current && error.name !== "AbortError") setPaused(true);
      });
    } else {
      video.pause();
    }
    return () => { current = false; };
  }, [running, mode, still]);

  return (
    <div ref={stage} className="studio-backdrop">
      <div className="studio-backdrop__film" aria-hidden="true">
        {mode === "canvas" ? (
          <canvas ref={mountCanvas} />
        ) : still ? (
          <img src={poster} alt="" width={3456} height={2304} />
        ) : (
          <video
            ref={player}
            src={loop}
            poster={poster}
            width={2304}
            height={1536}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            onError={() => setMode("still")}
          />
        )}
      </div>
      {!still && (
        <button
          type="button"
          className="studio-backdrop__control"
          aria-label={paused ? "Play background animation" : "Pause background animation"}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

import { useEffect } from "react";
import Timer from "./Timer";

export function App() {
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 1200000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="wrapper">
      <Timer />
    </div>
  );
}

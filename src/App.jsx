import { Timer } from "./TImer";
import Kaban from "./assets/Kaban.gif";

export function App() {
  return (
    <div className="wrapper">
      <img src={Kaban} className="kaban" />
      <Timer />
    </div>
  );
}

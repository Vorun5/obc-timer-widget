import { Timer } from "./TImer";
import Kaban from "./assets/Kaban.gif";
import Sniper from "./assets/Sniper.png";
import Bullet from "./assets/Bullet.png";
import Svin from "./assets/Svin.gif";
import Boom from "./assets/boom.gif";
import SvinDead from "./assets/SvinDead.png";
import peepoHappy from "./assets/peepoHappy.png";
import peepoSad from "./assets/peepoSad.png";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 1260000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="wrapper">
      <img src={Kaban} className="kaban" />
      <img src={Sniper} className="sniper" />
      <img src={Bullet} className="bullet" />
      <img src={Svin} className="svin" />
      <img src={SvinDead} className="svindead" />
      <img src={Boom} className="boom" />
      <img src={peepoHappy} className="peepoHappy" />
      <img src={peepoSad} className="peepoSad" />
      <Timer />
    </div>
  );
}

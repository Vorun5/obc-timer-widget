import B from "./assets/B.png";

function formatDonation(num) {
  return num
    .toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0, // Указываем, что не нужно показывать копейки
    })
    .replace(/₽/g, "РУБ");
}

export function App() {
  const date = new Date("09.28.2023").getTime();
  const distance = new Date().getTime() - date;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const topDonation = {
    nickname: "дядя смурф не откажите, попу покажите",
    value: 1000000,
  };

  const lastDonation = {
    nickname: "дядя смурф",
    value: 1000000,
  };

  return (
    <div className="wrapper">
      <div className="timer">
        <img className="timer-bg" src="./bg1.png" />
        <img className="timer-emote" src={B} />
        <div className="timer-info">
          <span className="timer-info-price">
            {formatDonation(9999)} = 9999 мин
          </span>
          <span className="timer-info-time">
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
            <span>{seconds}</span>
          </span>
        </div>
      </div>
      <div className="donation">
        <img className="donation-bg" src="./bg2.png" />
        <div className="donation-item">
          <div className="donation-nickname-container">
            <span className="donation-nickname">{topDonation.nickname}</span>
          </div>
          <span className="donation-value">
            {formatDonation(topDonation.value)}
          </span>
        </div>
        <div className="donation-item">
          <div className="donation-nickname-container">
            <span className="donation-nickname">{lastDonation.nickname}</span>
          </div>
          <span className="donation-value">
            {formatDonation(lastDonation.value)}
          </span>
        </div>
      </div>
    </div>
  );
}

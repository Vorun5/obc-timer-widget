import { useState } from "react";
import { useEffect } from "react";

function formatDonation(num) {
  return num
    .toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0, // Указываем, что не нужно показывать копейки
    })
    .replace(/₽/g, "РУБ");
}

function formatTime(time) {
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor((time % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  const formattedTime = `${days}:${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedTime;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength).trim() + "...";
  }
  return text.trim();
}

export default function Timer() {
  const [data, setData] = useState({
    status: "idle",
    countDownTime: 0,
    time: 0,
    stopped: false,
    last: {
      nick: "Vorun5",
      amount: 123123,
    },
    top: {
      nick: "Urbinholt",
      amount: 123123,
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch("https://bho.lt/etc/timer/timer");
      const newData = await response.json();
      setData({
        ...newData,
        time: newData.time - new Date().getTime(),
        countDownTime: newData.time,
        status: "success",
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  useEffect(() => {
    const stopwatchInterval = setInterval(() => {
      if (!data.stopped) {
        setData({
          ...data,
          time: data.countDownTime - new Date().getTime(),
        });
      }
    }, 1000);

    return () => {
      clearInterval(stopwatchInterval);
    };
  }, [data]);

  const first = data.top.nick ?? "";
  const last = data.last.nick ?? "";
  const viewFirst = truncateText(first, 13);
  const viewLast = truncateText(last, 13);

  return (
    <>
      {data.status === "idle" ? (
        <></>
      ) : (
        <>
          <div className="timer">
            <img className="smurf" src="./smurf.gif" />
            <img className="timer-bg" src="./bg.png" />
            <div className="donation">
              <div className="donation-first">
                <span className="donation-first-name">{viewFirst}</span>
                <span className="donation-dots donation-dots-first">
                  &nbsp;
                  {/* &nbsp;{"-"}&nbsp; */}
                </span>
                <span className="donation-first-value">
                  {/* 000 000 РУБ */}
                  {formatDonation(data.top.amount)}
                </span>
              </div>
              <div className="donation-last">
                <span className="donation-last-name">{viewLast}</span>
                <span className="donation-dots">
                  &nbsp;
                  {/* &nbsp;{"-"}&nbsp; */}
                </span>
                <span className="donation-last-value">
                  {/* 000 000 РУБ */}
                  {formatDonation(data.last.amount)}
                </span>
              </div>
            </div>
            <div className="timer-info-container">
              <div className="timer-info">
                <span className="timer-info-time">
                  {data.time < 0
                    ? "The End!"
                    : formatTime(data.time)
                        .split("")
                        .map((char, index) => (
                          <span
                            key={index}
                            className={char == ":" ? "char2" : "char"}
                          >
                            {char}
                          </span>
                        ))}
                </span>
                <span className="timer-info-price">
                  <span>25 РУБ</span> <span>=</span> <span>1 мин</span>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

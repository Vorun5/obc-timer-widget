import { useState, memo } from "react";
import B from "./assets/B.png";
import peepoPopcorn from "./assets/peepoPopcorn.gif";
import { useEffect } from "react";
import { STREAM_START_DATE } from "./const";

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
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedTime;
}

const StreamUptime = memo(function StreamUptime() {
  const [streamUptime, setStreamUptime] = useState(
    new Date().getTime() - STREAM_START_DATE
  );

  useEffect(() => {
    const streamUptimeInterval = setInterval(() => {
      const now = new Date().getTime();
      setStreamUptime(now - STREAM_START_DATE);
    }, 1000);

    return () => {
      clearInterval(streamUptimeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="timer-stream-uptime">
      Стрим идет: <span>{formatTime(streamUptime)}</span>
    </span>
  );
});

export function Timer() {
  const [data, setData] = useState({
    status: "idle",
    countDownTime: 0,
    time: 0,
    stopped: false,
    last: {
      nick: "Chlen",
      amount: 50,
    },
    top: {
      nick: "Chlen",
      amount: 50,
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch("https://old.bho.lt/etc/timer/timer");
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

  return (
    <>
      {data.status === "idle" ? (
        <></>
      ) : (
        <>
          <div className="timer">
            <StreamUptime />
            <img className="timer-bg" src="./bg1.png" />
            <div className="timer-info-container">
              <img
                className="timer-emote"
                src={data.time < 3600 ? B : peepoPopcorn}
              />
              <div className="timer-info">
                <span className="timer-info-price">
                  {formatDonation(1000)} = 1 час
                </span>
                <span className="timer-info-time">
                  {data.time < 0 ? "the end" : formatTime(data.time)}
                </span>
              </div>
            </div>
          </div>
          <div className="donation">
            <img className="donation-bg" src="./bg2.png" />
            <div className="donation-item">
              <div className="donation-nickname-container">
                <span className="donation-nickname">{data.top.nick}</span>
              </div>
              - &nbsp;
              <span className="donation-value">
                {formatDonation(data.top.amount)}
              </span>
            </div>
            <div className="donation-item">
              <div className="donation-nickname-container">
                <span className="donation-nickname">{data.last.nick}</span>
              </div>
              - &nbsp;
              <span className="donation-value">
                {formatDonation(data.last.amount)}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

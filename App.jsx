import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [fromZone, setFromZone] = useState("Asia/Tokyo");
  const [toZone, setToZone] = useState("America/New_York");
  const [inputDateTime, setInputDateTime] = useState("");
  const [convertedDateTime, setConvertedDateTime] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const texts = {
    calculator: "電卓",
    notepad: "メモ帳",
    timer: "タイマー",
    timezone: "時間帯変換", // 修正: キーを'timezone'に変更
    clear: "クリア",
    start: "開始",
    stop: "停止",
    reset: "リセット",
    convert: "変換",
    placeholder: "ここにメモを入力してください...",
    from: "変換元",
    to: "変換先",
    setTimer: "タイマーをセット",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
  };

  const timeZones = [
    { value: "Asia/Tokyo", label: "東京 (JST)", utc: "UTC+9" },
    {
      value: "America/New_York",
      label: "ニューヨーク (EST/EDT)",
      utc: "UTC-5/-4",
    },
    { value: "Europe/London", label: "ロンドン (GMT/BST)", utc: "UTC+0/+1" },
    {
      value: "Australia/Sydney",
      label: "シドニー (AEST/AEDT)",
      utc: "UTC+10/+11",
    },
    { value: "Europe/Paris", label: "パリ (CET/CEST)", utc: "UTC+1/+2" },
    { value: "Asia/Singapore", label: "シンガポール (SGT)", utc: "UTC+8" },
    {
      value: "America/Los_Angeles",
      label: "ロサンゼルス (PST/PDT)",
      utc: "UTC-8/-7",
    },
    { value: "Asia/Dubai", label: "ドバイ (GST)", utc: "UTC+4" },
  ];

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleClick = (value) => {
    setDisplay((prev) => (prev === "0" ? value : prev + value));
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSetTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimer(totalSeconds);
  };

  const handleConvert = () => {
    const fromDate = new Date(inputDateTime);
    const toDate = new Date(
      fromDate.toLocaleString("en-US", { timeZone: toZone })
    );
    const offset = toDate.getTime() - fromDate.getTime();
    const convertedDate = new Date(fromDate.getTime() + offset);
    setConvertedDateTime(
      convertedDate.toLocaleString("ja-JP", { timeZone: toZone })
    );
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-[400px] bg-white bg-opacity-10 backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-center">
            {getCurrentDate()}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          {" "}
          {/* 修正: 高さを固定 */}
          <Tabs defaultValue="calculator" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              {["calculator", "notepad", "timer", "timezone"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-black bg-white bg-opacity-20 hover:bg-opacity-30 data-[state=active]:bg-opacity-40 data-[state=active]:text-white"
                >
                  {texts[tab]}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="calculator" className="h-full overflow-auto">
              <Input
                type="text"
                value={display}
                readOnly
                className="w-full text-right p-2 text-2xl bg-transparent border-b-2 border-white text-white mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                {["7", "8", "9", "/"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    variant="secondary"
                    className="text-white bg-white bg-opacity-20 hover:bg-opacity-30"
                  >
                    {btn}
                  </Button>
                ))}
                {["4", "5", "6", "*"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    variant="secondary"
                    className="text-white bg-white bg-opacity-20 hover:bg-opacity-30"
                  >
                    {btn}
                  </Button>
                ))}
                {["1", "2", "3", "-"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    variant="secondary"
                    className="text-white bg-white bg-opacity-20 hover:bg-opacity-30"
                  >
                    {btn}
                  </Button>
                ))}
                {["0", ".", "=", "+"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={
                      btn === "=" ? handleCalculate : () => handleClick(btn)
                    }
                    variant="secondary"
                    className="text-white bg-white bg-opacity-20 hover:bg-opacity-30"
                  >
                    {btn}
                  </Button>
                ))}
                <Button
                  onClick={handleClear}
                  variant="secondary"
                  className="col-span-4 text-white bg-white bg-opacity-20 hover:bg-opacity-30"
                >
                  {texts.clear}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="notepad" className="h-full overflow-auto">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={texts.placeholder}
                className="w-full h-full p-2 text-white bg-transparent border-2 border-white rounded"
              />
            </TabsContent>
            <TabsContent value="timer" className="h-full overflow-auto">
              <div className="text-center space-y-4">
                <div className="text-4xl text-white mb-4">
                  {formatTime(timer)}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-white mb-1">
                      {texts.hours}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      className="w-full text-white bg-transparent border-2 border-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-1">
                      {texts.minutes}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) =>
                        setMinutes(parseInt(e.target.value) || 0)
                      }
                      className="w-full text-white bg-transparent border-2 border-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-1">
                      {texts.seconds}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) =>
                        setSeconds(parseInt(e.target.value) || 0)
                      }
                      className="w-full text-white bg-transparent border-2 border-white rounded"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSetTimer}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {texts.setTimer}
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || timer === 0}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {texts.start}
                  </Button>
                  <Button
                    onClick={() => setIsRunning(false)}
                    disabled={!isRunning}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {texts.stop}
                  </Button>
                  <Button
                    onClick={() => {
                      setTimer(0);
                      setIsRunning(false);
                      setHours(0);
                      setMinutes(0);
                      setSeconds(0);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    {texts.reset}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="timezone" className="h-full overflow-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-1">{texts.from}</label>
                  <Select onValueChange={setFromZone} defaultValue={fromZone}>
                    <SelectTrigger className="w-full text-white bg-white bg-opacity-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((zone) => (
                        <SelectItem key={zone.value} value={zone.value}>
                          {zone.label} ({zone.utc})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white mb-1">{texts.to}</label>
                  <Select onValueChange={setToZone} defaultValue={toZone}>
                    <SelectTrigger className="w-full text-white bg-white bg-opacity-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((zone) => (
                        <SelectItem key={zone.value} value={zone.value}>
                          {zone.label} ({zone.utc})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  type="datetime-local"
                  value={inputDateTime}
                  onChange={(e) => setInputDateTime(e.target.value)}
                  className="w-full text-white bg-transparent border-2 border-white rounded"
                />
                <Button
                  onClick={handleConvert}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {texts.convert}
                </Button>
                {convertedDateTime && (
                  <div className="text-white text-center mt-4">
                    変換結果: {convertedDateTime}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

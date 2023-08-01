//file을 

const express = require("express");
const exifr = require("exifr"); //exifr 파싱 모듈
const fileRoute = express.Router();
const fs = require("fs");

fileRoute.post("/json", (req, res) => {
  const path = "." + req.body.path + ".json";
  
  if (!path) {
    return res.status(400).json({ error: "파일 경로가 제공되지 않았습니다." });
  }

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "파일을 읽어올 수 없습니다." });
    }

    // 읽은 JSON 파일의 내용을 클라이언트로 보내줍니다.
    res.json(JSON.parse(data));
  });
});

fileRoute.post("/xml", (req, res) => {
  const path = "." + req.body.path + ".xml";
  
  if (!path) {
    return res.status(400).json({ error: "파일 경로가 제공되지 않았습니다." });
  }

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "파일을 읽어올 수 없습니다." });
    }

    // 읽은 xml 파일의 내용을 클라이언트로 보내줍니다.
    res.send(data);
  });
});

fileRoute.post("/csv", (req, res) => {
  const path = "." + req.body.path + ".csv";
  
  if (!path) {
    return res.status(400).json({ error: "파일 경로가 제공되지 않았습니다." });
  }

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "파일을 읽어올 수 없습니다." });
    }

    // 읽은 csv 파일의 내용을 클라이언트로 보내줍니다.
    res.send(data);
  });
});

fileRoute.post("/Yaml", (req, res) => {
  const path = "." + req.body.path + ".yaml";
  if (!path) {
    return res.status(400).json({ error: "파일 경로가 제공되지 않았습니다." });
  }

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "파일을 읽어올 수 없습니다." });
    }

    // 읽은 yaml 파일의 내용을 클라이언트로 보내줍니다.
    res.send(data);
  });
});

fileRoute.post("/exif", async (req, res) => {
  const path = "." + req.body.path; // 클라이언트에서 보낸 파일 경로
  
  if (!path) {  //오류 처리
    return res.status(400).json({ error: "파일 경로가 제공되지 않았습니다." });
  }
  try {
    const metadata = await exifr.parse(path, { tiff: true }); //tiff형식도 파싱

    // 필요한 정보 추출
    const make = metadata.Make;
    const latitude = metadata.latitude;
    const longitude = metadata.longitude;

    // JSON 형식으로 응답
    res.json({ make, latitude, longitude });
  } catch (error) {  //오류 처리
    console.log(err);
    res.status(500)
      .json({ error: "메타 데이터를 파싱하는 중에 오류가 발생했습니다." });
  }
});

module.exports = fileRoute;

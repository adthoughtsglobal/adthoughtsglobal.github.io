import {verifyUpLoader, formatNames } from "./util.mjs";
import { FFmpeg } from "./assets/ffmpeg/package/dist/esm/index.js";
import { fetchFile } from "./assets/util/package/dist/esm/index.js";
const ffmpegInstances = {};

const instantiateFFmpeg = async (isMT) => {
  if (!ffmpegInstances[isMT]) {
    const compressBar = document.getElementById("compress-task-bar");
    compressBar.classList.add("progress-bar-animated");
    const ffmpegInstance = new FFmpeg();
    ffmpegInstance.on("log", ({ message }) => {
      console.log(message);
    });
    ffmpegInstance.on("progress", ({ progress }) => {
      const value = `${Number.parseFloat(progress * 100).toFixed(2)} %`;
      compressBar.style.width = `${Number.parseFloat(progress * 100).toFixed(
        0
      )}%`;
      compressBar.innerHTML = value;
    });

    const coreURL = isMT
      ? "/assets/core-mt/package/dist/esm/ffmpeg-core.js"
      : "/assets/core/package/dist/esm/ffmpeg-core.js";

    compressBar.style.width = "75%";
    compressBar.innerHTML = "正在加载 FFmpeg 核心依赖...";
    await ffmpegInstance.load({ coreURL });
    compressBar.style.width = "100%";
    compressBar.innerHTML = "FFmpeg 核心依赖完成";
    ffmpegInstances[isMT] = ffmpegInstance;
  }
  return ffmpegInstances[isMT];
};

const getCompressConfig = () => {
  const radioGroup = document.querySelectorAll(
    'input[name="inlineRadioOptions"]'
  );
  let selectedValue;
  radioGroup.forEach(function (radio) {
    if (radio.checked) {
      selectedValue = radio.value;
    }
  });
  return selectedValue;
};

const compress = async () => {
  document.getElementById("qualityselector").close()
  const { files } = document.getElementById("uploader");
  const compressConfig = getCompressConfig();
  const outputTips = document.getElementById("output-tips");
  const compressButton = document.getElementById("compress-button");
  const downloadButton = document.getElementById("download-button");
  const compressBar = document.getElementById("compress-task-bar");
  const taskSpinner = document.getElementById("task-spinner");
  compressButton.hidden = true;
  taskSpinner.hidden = null;
  const ffmpegInstance = await instantiateFFmpeg(false);
  const { name } = files[0];
  const { outputName, fileExt } = formatNames(name);
  await ffmpegInstance.writeFile(name, await fetchFile(files[0]));
  await ffmpegInstance.exec(["-i", name, "-s", compressConfig, outputName]);
  compressBar.classList.remove("progress-bar-animated");
  const data = await ffmpegInstance.readFile(outputName);
  const video = document.getElementById("output-video");
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: `video/${fileExt}` })
  );
  taskSpinner.hidden = true;
  video.hidden = null;
  outputTips.hidden = null;
  downloadButton.hidden = null;
};

function handleUploader(event) {
  const files = event.target.files;
  const isVerify = verifyUpLoader(files);
  if (isVerify) {
    document.getElementById("uploaderplus").close();
    document.getElementById("qualityselector").showModal();
    const file = files[0];
    const compressTask = document.getElementById("compress-task");
    const videoName = document.getElementById("video-name");
    compressTask.hidden = null;
    videoName.innerHTML = file.name;
    videoName.title = file.name;
    document.getElementById("download-button").hidden = true;
    document.getElementById("compress-button").hidden = null;
  }
  return;
}

async function downloadVideo() {
  const isMT = false;
  const ffmpegInstance = await instantiateFFmpeg(isMT);
  if (ffmpegInstance !== null) {
    const { files } = document.getElementById("uploader");
    const { name } = files[0];
    const { outputName, fileExt } = formatNames(name);
    const outputData = await ffmpegInstance.readFile(outputName);
    const blob = new Blob([outputData.buffer], {
      type: `video/${fileExt}`,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;
    a.click();
    URL.revokeObjectURL(url);
  }
}

document.getElementById("uploader-btn").addEventListener("click", function () {
  document.getElementById("uploader").click();
});
const uploader = document.getElementById("uploader");
uploader.addEventListener("change", handleUploader);
const compressButton = document.getElementById("compress-button");
compressButton.addEventListener("click", compress);
const downloadButton = document.getElementById("download-button");
downloadButton.addEventListener("click", downloadVideo);

document.getElementById("uploaderplus").showModal();
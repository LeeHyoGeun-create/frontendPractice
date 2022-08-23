const getBase64 = async (url) => {
  try {
    let image = await axios.get(url, { responseType: "arraybuffer" });
    let raw = Buffer.from(image.data).toString("base64");
    return "data:" + image.headers["content-type"] + ";base64," + raw;
  } catch (error) {
    console.log(error);
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url) {
    var image = new Image();
    image.src = getBase64(request.url);

    sendResponse({ result: request.url });
  }
});

export const getChessPattern = (Canvas, canvasSize) => {
  const canvas = new Canvas(canvasSize, canvasSize);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";

  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = "black";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((i + j) % 2) {
        ctx.fillRect(i * 20, j * 20, 20, 20);
      }
    }
  }

  const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
  
  return imageData.data;
};

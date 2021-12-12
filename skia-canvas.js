import { Canvas } from "skia-canvas";
import { writeFile } from "node:fs/promises";
import { getChessPattern } from "./pattern.js";

export const canvasSize = 200;
const canvas = new Canvas(canvasSize, canvasSize);
const ctx = canvas.getContext("2d");

const chunkSize = 25;
const chunk = ctx.createImageData(canvasSize, chunkSize);

const partialChunkHeight = canvasSize % chunkSize;
const fullChunks = (canvasSize - partialChunkHeight) / chunkSize;
const iterations = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;

const source = getChessPattern(Canvas, canvasSize);

let sourcePos = 0;

for (let i = 0; i < iterations; i++) {
  const elementsInChunk =
    i >= fullChunks ? canvasSize * partialChunkHeight : canvasSize * chunkSize;
  let destPos = 0;

  for (let j = elementsInChunk; j--; ) {
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
  }

  ctx.putImageData(chunk, 0, i * chunkSize);
}

await writeFile("skia-canvas.png", await canvas.toBuffer("png"));

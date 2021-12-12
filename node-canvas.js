import { Canvas } from "canvas";
import { writeFile } from "node:fs/promises";
import { getChessPattern } from "./pattern.js";

const canvasSize = 200;
const canvas = new Canvas(canvasSize, canvasSize);
const ctx = canvas.getContext("2d");

const chunkSize = 20;
const chunk = ctx.createImageData(canvasSize, chunkSize);
const iterations = Math.round(canvasSize / chunkSize);

const source = getChessPattern(Canvas, canvasSize);
const elementsInChunk = canvasSize * chunkSize;
let sourcePos = 0;

for (let i = 0; i < iterations; i++) {
  let destPos = 0;
  for (let j = 0; j < elementsInChunk; j++) {
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
    chunk.data[destPos++] = source[sourcePos++];
  }

  ctx.putImageData(chunk, 0, i * chunk.height);
}

await writeFile("node-canvas.png", canvas.toBuffer());

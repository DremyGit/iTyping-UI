import React from 'react';

function getMaxLineValue(maxNum, value) {
  return (Math.floor(maxNum / value) + 1) * value;
}

function getTranslateCoord(value, max, origin, end) {
  const result = [];
  const xScale = value[0] / max[0];
  const yScale = value[1] / max[1];
  result.push((end[0] - origin[0]) * xScale + origin[0]);
  result.push((end[1] - origin[1]) * yScale + origin[1]);
  return result;
}

function repeat(fn, n) {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(fn(i));
  }
  return arr;
}

const origin = [50, 200];
const end = [350, 50];
const nY = 3;
const scaleY = 30;

function ExerciseGraph({ weight, height, data }) {
  const maxY = getMaxLineValue(Math.max.apply(this, data.map(d => d[1])), scaleY);
  const deltaY = (origin[1] - end[1]) / nY;
  const yLines = repeat(i => (i + 1) * deltaY, nY);

  const nX = data.length;
  const maxX = Math.max.apply(this, data.map(d => d[0]));
  const deltaX = (end[0] - origin[0]) / nX;
  const xLines = repeat(i => (i + 1) * deltaX + origin[0], nX);
  const dataCoords = data.map(d => getTranslateCoord(d, [maxX, maxY], origin, end));
  const path = `M${origin[0]} ${origin[1]} ${dataCoords.map(([x, y], i) => {
    const prev = i === 0 ? origin : dataCoords[i - 1];
    return `C ${prev[0] + deltaX / 2} ${prev[1]}, ${x - deltaX / 2} ${y}, ${x} ${y}`;
  }).join(' ')}`;
  return (
    <svg version="1.1" style={{ weight, height }} xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
      <g>
        {yLines.map(y => <line key={y} x1={origin[0]} y1={y} x2={end[0]} y2={y} stroke="#ccc" />)}
        <line x1={origin[0]} y1={origin[1]} x2={end[0]} y2={origin[1]} stroke="#aaa" />
        <line x1={origin[0]} y1={origin[1]} x2={origin[0]} y2={end[1] - 30} stroke="#aaa" />
      </g>
      <g>
        {yLines.map((y, i) => <text key={y} x={origin[0] - 10} y={y + 5} textAnchor="end" fontSize="12">{maxY * (nY - i) / nY}</text>)}
        <text x={origin[0] - 10} y={origin[1] + 5} textAnchor="end" fontSize="12">0</text>
      </g>
      <g>
        {xLines.filter((v, i) => i % 2 === 1).map((x, i) => <text key={x} x={x} y={origin[1] + 20} textAnchor="middle" fontSize="12">{(i + 1) * 2 / nX * maxX}</text>)}
      </g>
      <g>
        <path d={path} stroke="rgba(255,0,0,0.3)" fill="none" strokeWidth="4" />
      </g>
    </svg>
  );
}

export default ExerciseGraph;

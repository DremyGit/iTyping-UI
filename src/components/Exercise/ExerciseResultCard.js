import React from 'react';
import ExerciseGraph from './ExerciseGraph';
import styles from './ExerciseResultCard.scss';

function formatTime(time) {
  const t = new Date(time);
  const y = t.getFullYear();
  const M = t.getMonth() + 1;
  const d = t.getDate();
  const h = t.getHours();
  const m = t.getMinutes();
  const s = t.getSeconds();
  const mm = m < 10 ? `0${m}` : m;
  const ss = s < 10 ? `0${s}` : s;
  return `${y}-${M}-${d} ${h}:${mm}:${ss}`;
}

function ExerciseResultCard({
  className, title, time, speed, lang,
  infoList, height, instantSpeeds,
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.textPanel} style={{ height }}>
        <h2>{title}</h2>
        <small>{formatTime(time)}</small>
        <div className={styles.primary}>
          <strong>{speed}</strong>
          <span>{lang === 1 ? '字/分' : '词/分'}</span>
        </div>
        <ul className={styles.info}>
          {infoList.map((info, i) =>
            <li key={i}>
              <span>{info.title}</span>
              <strong className={info.className}>{info.value}</strong>
              <span>{info.unit}</span>
            </li>,
          )}
        </ul>
      </div>
      <div className={styles.graphPanel}>
        <ExerciseGraph data={instantSpeeds.map(s => [s.t, s.s])} />
      </div>
    </div>
  );
}

export default ExerciseResultCard;

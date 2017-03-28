import request from '../utils/request';

export async function fetchWords({ lang }) {
  return request(`/api/exercise/words/random?lang=${lang}`);
}

export async function sendRecord(record) {
  return request('/api/exercise/records', {
    method: 'POST',
    body: JSON.stringify({
      lang: record.lang,
      average_speed: record.averageSpeed,
      correct_count: record.correctCount,
      error_count: record.errorCount,
      key_count: record.keyCount,
      backspace_count: record.backspaceCount,
      time_limit: record.timeLimit,
    }),
  });
}


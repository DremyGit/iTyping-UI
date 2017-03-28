import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import * as exerciseService from '../services/exercise';

export default {
  namespace: 'exercise',
  state: {
    finished: false,
    lang: 1,
    words: [],
    record: {},
  },
  reducers: {
    setLang(state, { payload: { lang = 1 } }) {
      return {
        ...state,
        lang,
      };
    },
    setWords(state, { payload: { words } }) {
      return {
        ...state,
        words: words.map(word => ({ value: word, status: 0 })),
      };
    },
    record(state, { payload }) {
      return {
        ...state,
        finished: true,
        record: {
          ...state.record,
          ...payload.record,
        },
      };
    },
  },
  effects: {
    *fetch(action, { call, put, select }) {
      const lang = yield select(state => state.exercise.lang);
      const { data } = yield call(exerciseService.fetchWords, { lang });
      yield put({
        type: 'setWords',
        payload: {
          words: data.words,
        },
      });
    },
    *finish({ payload: { record } }, { call, put, select }) {
      const words = yield select(state => state.exercise.words);
      const lang = yield select(state => state.exercise.lang);
      /* eslint-disable no-param-reassign */
      record = {
        ...record,
        lang,
        correctCount: words.filter(word => word.status === 2).length,
        errorCount: words.filter(word => word.status === 3).length,
        averageSpeed: words
          .filter(word => word.status === 2)
          .reduce((prev, next) => prev + next.value.length, 0) * 60 / record.timeLimit,
        time: Date.now(),
      };
      yield put({ type: 'record', payload: { record } });
      yield put(routerRedux.replace(`${location.pathname}/result`));
      yield call(exerciseService.sendRecord, record);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/exercise/:lang?').exec(pathname);
        const langMap = {
          english: 0,
          chinese: 1,
        };
        if (match) {
          const lang = langMap[match[1]];
          dispatch({ type: 'setLang', payload: { lang } });
          dispatch({ type: 'fetch' });
        }
      });
    },
    refresh({ history }) {
      const onF5Press = window.addEventListener('keyup', (e) => {
        if (e.keyCode === 116) {
          const match = pathToRegexp('/exercise/:lang/:res?').exec(location.pathname);
          if (match) {
            const lang = match[1];
            history.replace(`/exercise/${lang}`);
          }
        }
      });
      return () => window.removeEventListener('keyup', onF5Press);
    },
  },
};

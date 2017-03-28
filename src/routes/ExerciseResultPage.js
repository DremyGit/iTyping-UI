import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ExerciseResultCard from '../components/Exercise/ExerciseResultCard';
import styles from './ExerciseResultPage.scss';
import refresh from '../assets/refreshing-icon.svg';

function ExerciseResultPage({ record, lang, dispatch }) {
  return (
    <div className={styles.result} key="2">
      <ExerciseResultCard
        className={`${styles.resultCard} col-center`}
        height={180}
        title={`${lang === 1 ? '中文' : '英文'}词组测试`}
        time={record.time}
        speed={record.averageSpeed}
        instantSpeeds={record.instantSpeeds}
        lang={1}
        infoList={[
          { title: '按键数', value: record.keyCount, unit: '次' },
          { title: '退格数', value: record.backspaceCount, unit: '次', className: 'red' },
          { title: '正确词数', value: record.correctCount, unit: '词' },
          { title: '错误词数', value: record.errorCount, unit: '词', className: 'red' },
        ]}
      />
      <a onClick={() => dispatch(routerRedux.replace(`/exercise/${lang === 0 ? 'english' : 'chinese'}`))} className={styles.refresh}><img alt="refresh" src={refresh} /></a>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    lang: state.exercise.lang,
    record: state.exercise.record,
  };
}

export default connect(mapStateToProps)(ExerciseResultPage);

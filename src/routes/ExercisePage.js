import React from 'react';
import { connect } from 'dva';
import Exercise from '../components/Exercise/Exercise';
import styles from './ExercisePage.scss';

function ExercisePage({ words, loading, dispatch }) {
  return (
    <Exercise
      words={words}
      className={styles.exercise}
      onFinish={record => dispatch({ type: 'exercise/finish', payload: { record } })}
      onRefresh={() => dispatch({ type: 'exercise/fetch' })}
      isLoading={loading}
    />
  );
}

function mapStateToProps(state) {
  return {
    words: state.exercise.words,
    loading: state.loading.models.exercise,
  };
}

export default connect(mapStateToProps)(ExercisePage);

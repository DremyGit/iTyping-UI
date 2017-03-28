import React, { Component } from 'react';
import styles from './WordArea.scss';

const STATUS_WORD_SUCCESS = 2;
const STATUS_WORD_ERROR = 3;

class WordArea extends Component {
  getOffsetLeft(index) {
    if (!this.ul) {
      return 0;
    }
    const li = this.ul.querySelector(`li:nth-child(${index + 1})`);
    if (!li) {
      return 0;
    }
    const position = (this.div.offsetWidth - li.offsetWidth) / 2;
    if (li.offsetLeft < position) {
      return 0;
    }
    return position - li.offsetLeft;
  }

  getWordClassName(word, i) {
    const { index } = this.props;
    if (i === index) {
      return styles.active;
    }
    if (word.status === STATUS_WORD_SUCCESS) {
      return styles.success;
    }
    if (word.status === STATUS_WORD_ERROR) {
      return styles.error;
    }
    return '';
  }
  render() {
    const { words, index, isLoading } = this.props;
    return (
      <div
        className={styles.wordArea}
        ref={(div) => { this.div = div; }}
      >
        {!isLoading &&
          <ul
            key={(words[0] && words[0].value) || 'null'}
            ref={(ul) => { this.ul = ul; }}
            style={{ transform: `translate3d(${this.getOffsetLeft(index)}px,0,0)` }}
          >
            {words.map((word, i) =>
              <li key={i} className={this.getWordClassName(word, i)}>{word.value}</li>,
          )}
          </ul>
        }
      </div>
    );
  }
}

export default WordArea;

import React, { Component } from 'react';
import WordArea from './WordArea';
import styles from './Exercise.scss';
import refresh from '../../assets/refreshing-icon.svg';

const STATUS_WORD_ACTIVE = 1;
const STATUS_WORD_SUCCESS = 2;
const STATUS_WORD_ERROR = 3;

const STATUS_GAME_READY = 0;
const STATUS_GAME_ING = 1;
const STATUS_GAME_END = 2;

const KEY_SPACE = 32;
const KEY_BACKSPACE = 8;

const TOTAL_TIME = 10;

class Exercise extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.lang = 1;
  }

  componentWillMount() {
    this.init();
  }

  componentDidMount() {
    this.input.focus();
    this.refresh = window.addEventListener('keyup', (e) => {
      if (e.keyCode === 116) {
        this.init();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keyup', this.refresh);
  }

  getInstantSpeed() {
    let lastTime = 0;
    let lastIndex = 0;
    return () => {
      const currentTime = this.state.time;
      const length = this.props.words
        .slice(lastIndex, this.state.currentIndex)
        .filter(word => word.status === 2)
        .reduce((prev, next) => prev + next.value.length, 0);
      const speed = length / (currentTime - lastTime) * 60;
      lastTime = currentTime;
      lastIndex = this.state.currentIndex;
      return { t: currentTime, s: speed };
    };
  }

  init = () => {
    clearInterval(this.timer);
    const { onRefresh } = this.props;
    onRefresh();
    this.instantSpeedCount = this.getInstantSpeed();
    this.setState({
      currentIndex: 0,
      gameStatus: STATUS_GAME_READY,
      keyCount: 0,
      backspaceCount: 0,
      inputValue: '',
      instantSpeeds: [],
      time: 0,
    });
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInput(e) {
    const { isLoading } = this.props;
    if (isLoading) {
      return;
    }
    if (this.state.gameStatus === 0) {
      this.setState({
        gameStatus: STATUS_GAME_ING,
      });
      this.timer = setInterval(() => {
        this.increseTime();
      }, 1000);
    }

    if (this.state.gameStatus === 2) {
      return;
    }

    this.setState({
      keyCount: this.state.keyCount + 1,
    });
    let currentIndex;
    let currentWord;
    switch (e.keyCode) {
      case KEY_BACKSPACE:
        this.setState({
          backspaceCount: this.state.backspaceCount + 1,
        });
        break;

      case KEY_SPACE:

        if (e.target.value.trim() === '') {
          this.input.value = '';
          return;
        }

        currentIndex = this.state.currentIndex;
        currentWord = this.props.words[currentIndex];
        if (e.target.value.trim() === currentWord.value) {
          currentWord.status = STATUS_WORD_SUCCESS;
        } else {
          currentWord.status = STATUS_WORD_ERROR;
        }
        this.props.words[currentIndex + 1].status = STATUS_WORD_ACTIVE;
        this.input.value = '';
        this.setState({
          currentIndex: currentIndex + 1,
          inputValue: '',
        });
        break;

      default:
        break;
    }
  }

  increseTime() {
    const nextTime = this.state.time + 1;
    this.setState({
      time: nextTime,
    });
    if (nextTime % 5 === 0) {
      const instantSpeed = this.instantSpeedCount();
      this.state.instantSpeeds.push(instantSpeed);
    }
    if (nextTime === TOTAL_TIME) {
      clearInterval(this.timer);
      this.setState({
        gameStatus: STATUS_GAME_END,
      });
      const { onFinish } = this.props;
      onFinish({
        keyCount: this.state.keyCount,
        backspaceCount: this.state.backspaceCount,
        instantSpeeds: this.state.instantSpeeds,
        timeLimit: TOTAL_TIME,
      });
    }
  }

  formatTime() {
    const time = TOTAL_TIME - this.state.time;
    const m = Math.floor(time / 60);
    const s = time % 60;
    const ss = s < 10 ? `0${s}` : s;
    return `${m}:${ss}`;
  }

  render() {
    const { className, words, isLoading } = this.props;
    return (
      <div className={`${styles.exercise} ${className}`}>
        <WordArea words={words} index={this.state.currentIndex} isLoading={isLoading} />
        <div className={styles.control}>
          <span className={styles.time}>{this.formatTime()}</span>
          <input
            className={styles.input}
            value={this.state.inputValue}
            onChange={e => this.handleChange(e)}
            onKeyUp={e => this.handleInput(e)}
            ref={(input) => { this.input = input; }}
          />
          <a onClick={this.init}><img src={refresh} className={styles.refresh} alt="refresh" /></a>
        </div>
      </div>
    );
  }
}

export default Exercise;

import { createApp } from "https://esm.sh/petite-vue";

createApp({
  questions: [],
  isFinished: false,
  onMount() {
    const questions = [];
    for (const item of data) {
      questions.push({
        text: item.text,
        options: item.options,
        answer: item.answer,
        selected: 0,
      });
    }

    this.questions = questions;
  },
  restart() {
    for (const item of this.questions) {
      item.selected = 0;
    }
    this.isFinished = false;
  },
  get correctCount() {
    let count = 0;
    for (const item of this.questions) {
      if (item.selected === item.answer) {
        count += 1;
      }
    }

    return count;
  },
}).mount();

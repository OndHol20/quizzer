import { createIcons, icons } from "https://esm.sh/lucide";
import { createApp } from "https://esm.sh/petite-vue";
import axios from "https://esm.sh/axios";

// Load icons
createIcons({ icons });

// Create Vue app
createApp({
  questions: [],
  addQuestion() {
    this.questions.push({
      text: "",
      options: ["", "", "", ""],
      answer: 0,
    });
  },
  async createQuiz() {
    try {
      const res = await axios.post("/api/quiz", this.questions);
      location.href = `/q/${res.data.id}`;
      res.data.id;
    } catch (err) {
      alert(err.response.data);
    }
  },
}).mount();

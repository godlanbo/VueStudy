<template>
  <div class="detail-wrapper">
    <div class="detail-body">
      <div class="detail-body-title">
        <div class="rotating-text">
          <p v-html="rotatingText"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Introduction',
  data() {
    return {
      rotatingText: `
        <span class="word alizarin">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word wisteria">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word peter-river">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word emerald">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word sun-flower">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>`
    }
  },
  mounted() {
    let words = document.querySelectorAll(".word");
    words.forEach(word => {
      let letters = word.textContent.split("");
      word.textContent = "";
      letters.forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let rotateText = () => {
      let currentWord = words[currentWordIndex];
      let nextWord =
        currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
      // rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = "letter out";
        }, i * 80);
      });
      // reveal and rotate in letters of next word
      nextWord.style.opacity = "1";
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
          letter.className = "letter in";
        }, 340 + i * 80);
      });
      currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };
    rotateText();
    setInterval(rotateText, 4000);
  }
}
</script>
<style lang="scss" scoped>

.detail-wrapper {
  position: relative;
  text-align: center;
  height: 740px;
  min-height: 500px;
  overflow: hidden;
  .logo-img {
    width: 50%;
  }
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
  }
  .detail-body {
    height: 752px;
    background-color: #ffffff;
    text-align: center;
    top: 0;
    margin: 0 auto;
    width: 80%;
    .detail-body-title {
      position: relative;
      display: flex;
      top: 15%;
      .preStr {
        position: relative;
        width: 70%;
        font-size: 100px;
        margin-left: 50px;
        font-weight: bold;
        font-family: Lato, sans-serif;
        text-decoration: none;
        justify-content: center;
        color: #322e23;
      }
    }
  }
}
</style>
<style>
.rotating-text {
  width: 100%;
  font-family: Lato, sans-serif;
  font-size: 100px;
  font-weight: bold;
  color: white;
  /* transform: translateX(-80px); */
}
.rotating-text p {
  display: inline-flex;
  justify-content: center;
  margin: 0;
  vertical-align: top;
}
.rotating-text p .word {
  position: absolute;
  display: flex;
  opacity: 0;
}
.rotating-text p .word .letter {
  transform-origin: center center 25px;
}
.rotating-text p .word .letter.out {
  transform: rotateX(90deg);
  transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
}
.rotating-text p .word .letter.in {
  transition: 0.38s ease;
}
.rotating-text p .word .letter.behind {
  transform: rotateX(-90deg);
}
.alizarin {
  color: #e74c3c;
}
.wisteria {
  color: #8e44ad;
}
.peter-river {
  color: #3498db;
}
.emerald {
  color: #2ecc71;
}
.sun-flower {
  color: #f1c40f;
}
</style>
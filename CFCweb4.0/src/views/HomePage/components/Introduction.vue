<template>
  <div class="detail-wrapper">
    <div class="detail-body">
      <div class="detail-body-title">
        <div class="rotating-text">
          <p v-html="rotatingText"></p>
        </div>
      </div>
      <div class="detail-content">
        <p>
          <span style="color: #322e23">C</span>
          <span style="color: #9cb198">F</span>
          <span style="color: #88857d">C</span>
           is a creative studio. Freedom, passion, and practice are the 
          symbols of this place. We are committed to creating more and more
          interesting things.
        </p>
      </div>
      <div class="detail-floor">
        <div class="toBehind-pointer">
          <svg
            t="1578933789254"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="774"
            width="60"
            height="60">
              <path
                d="M957.463608 326.608639 541.393447 753.98224l0 0-29.720905 30.527271-29.718859-30.527271 0 0L65.883523 326.608639l29.718859-30.525224 416.07016 427.370531 416.07016-427.370531L957.463608 326.608639z"
                p-id="775">
              </path>
            </svg>
        </div>
      </div>
    </div>
    <divide-line isTop></divide-line>
  </div>
</template>
<script>
import DivideLine from '@/components/DivideLine'
export default {
  name: 'Introduction',
  components: {
    DivideLine
  },
  data() {
    return {
      rotatingText: `
        <span class="word alizarin">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word wisteria">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word peter-river">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word emerald">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        <span class="word sun-flower">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
        `,
        // <span class="word sun-flower">Crazy&nbsp;For&nbsp;Code&nbsp;Studio</span>
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
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
@keyframes pointer {
  0% {
    
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(30px);
    opacity: 0;
  }
}
.detail-wrapper {
  position: relative;
  text-align: center;
  padding-top: 110px;
  // height: 700px;
  min-height: 500px;
  // background-color: #322e23;
  // background-image: url('http://localhost:8089/img/1.jpg');
  // background-position: center;
  // background-size: cover;
  // background-repeat: no-repeat;
  // opacity: .4;
  background-color: white;
  overflow: hidden;
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
    height: 610px;
    // background-color: #ffffff;
    text-align: center;
    top: 0;
    margin: 0 auto;
    width: 80%;
    .detail-body-title {
      // position: relative;
      // display: flex;
      // top: 15%;
      padding: {
        left: 5px;
        right: 5px;
      }
    }
    .detail-content {
      margin-top: 50px;
      p {
        color: black;
        padding: 10px 20%;
        font: {
          size: 42px;
          weight: 200;
          family: "Open Sans script=all rev=1", "Adobe Blank";
        }
      }
    }
    .detail-floor {
      margin-top: 20px;
      .toBehind-pointer .icon {
        opacity: 0;
        animation: pointer infinite 2s ease;
      }
      // border-top: 70px solid #322e23;
      // background-color: aquamarine;
    }
  }
}
</style>
<style>
@import url(https://fonts.googleapis.com/css?family=Seymour+One&display=swap);
.rotating-text {
  width: 100%;
  /* font-family: Lato, sans-serif; */
  font-family: 'Seymour One', sans-serif;
  font-size: 80px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
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
  /* color: #4285f4; */
}
.wisteria {
  color: #8e44ad;
  /* color: #ea4335; */
}
.peter-river {
  color: #3498db;
  /* color: #f9ab00; */
}
.emerald {
  color: #2ecc71;
  /* color: #34a853; */
}
.sun-flower {
  color: #f1c40f;
}
</style>
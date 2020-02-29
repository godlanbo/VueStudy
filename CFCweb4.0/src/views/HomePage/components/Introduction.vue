<template>
  <div class="detail-wrapper">
    <div class="detail-body">
      <div class="detail-body-title">
        Crazy&nbsp;For&nbsp;Code
      </div>
      <div class="detail-content">
        <p>
          CFC is a creative studio. Freedom, passion, and practice are the symbols of this place. We are committed to creating more and more interesting things.
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
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
@import url('https://fonts.googleapis.com/css?family=Open+Sans:800&display=swap');
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
  min-height: 500px;
  background-image: url(/images/back.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
    position: relative;
    height: 620px;
    text-align: center;
    top: 0;
    margin: 0 auto;
    width: 90%;
    .detail-body-title {
      position: absolute;
      left: 10px;
      top: 0;
      color: #153344;
      font-family: 'Open Sans', sans-serif;
      font-size: 80px;
      font-weight: 800;
      -webkit-font-smoothing: antialiased;
    }
    .detail-content {
      position: absolute;
      top: 30%;
      p {
        color: #153344;
        padding: 10px 30%;
        font: {
          size: 36px;
          weight: 300;
          family: "Open Sans script=all rev=1", "Adobe Blank";
        }
      }
    }
    .detail-floor {
      position: absolute;
      bottom: 17%;
      left: 49%;
      .toBehind-pointer .icon {
        opacity: 0;
        animation: pointer infinite 2s ease;
      }
    }
  }
}
</style>
<template>
  <div id="container">
    <div class="stick"></div>
    <div class="stick"></div>
    <div class="stick"></div>
    <div class="stick"></div>
    <div class="stick"></div>
    <div class="stick"></div>

    <h1>Loading...</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:100,300,700);

h1 {
  font-family: "Lato";
  color: white;
  text-transform: uppercase;
  font-size: 1em;
  letter-spacing: 1.5px;
  text-align: center;
  width: 155px;
  margin-top: 20px;
  -webkit-animation: fade 2s infinite;
  -moz-animation: fade 2s infinite;
}

#container {
  width: 180px;
  padding-top: 180px;
  margin: auto;
  vertical-align: middle;
}

.stick {
  width: 30px;
  height: 3px;
  background: white;
  display: inline-block;
  margin-left: -8px;
}

.stick:nth-child(n) {
  transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  -webkit-animation: fall 2s infinite;
  -moz-animation: fall 2s infinite;
}

.stick:nth-child(2n) {
  transform: rotate(-30deg);
  -ms-transform: rotate(-30deg);
  -webkit-animation: rise 2s infinite;
  -moz-animation: rise 2s infinite;
}

@-webkit-keyframes rise {
  50% {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
  }
}
@-moz-keyframes rise {
  50% {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    /* IE 9 */
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }
}
@-o-keyframes rise {
  50% {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    /* IE 9 */
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }
}
@keyframes rise {
  50% {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    /* IE 9 */
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }
}
@-webkit-keyframes fall {
  50% {
    transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    /* IE 9 */
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(30deg);
  }
}
@-moz-keyframes fall {
  50% {
    transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    /* IE 9 */
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(-30deg);
  }
}
@-o-keyframes fall {
  50% {
    transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    /* IE 9 */
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(30deg);
  }
}
@keyframes fall {
  50% {
    transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    /* IE 9 */
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(30deg);
  }
}
@-webkit-keyframes fade {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fade {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes fade {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <div class="ml-2 flex cursor-pointer items-center" @click="backHome">
    <img src="~/assets/images/logo.png" class="logo-icon" alt="" />
    <div class="logo_name" data-shadow="Online Editor">Online Editor</div>
  </div>
</template>

<script setup lang="ts">
function backHome() {
  navigateTo("/");
}
</script>

<style scoped>
.logo-icon {
  width: 64px;
  height: 64px;
}

.logo_name {
  display: inline-block;
  color: #f57c1f;
  font-family: "Righteous", serif;
  font-weight: 600;
  font-size: 28px;
  text-shadow: 0.03em 0.03em 0 hsla(230, 40%, 50%, 1);
}
.logo_name:after {
  content: attr(data-shadow);
  position: absolute;
  top: -0.1em;
  left: -0.06em;
  z-index: -1;
  text-shadow: none;
  background-image: linear-gradient(
    145deg,
    transparent 45%,
    hsla(48, 20%, 90%, 1) 45%,
    hsla(48, 20%, 90%, 1) 55%,
    transparent 0
  );
  background-size: 0.05em 0.05em;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shad-anim 15s linear infinite;
}

@keyframes shad-anim {
  0% {
    background-position: 0 0;
  }
  0% {
    background-position: 100% -100%;
  }
}
</style>

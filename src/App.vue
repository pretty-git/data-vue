<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.left-icon {
  height: 28px;
  width: 4px;
  background-color: #00deff;
  margin-right: 12px;
}

.main {
  background: url(./assets/img/bj.jpg);
  background-size: 100% 100%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;

}
</style>

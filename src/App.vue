<template>
  <div id="app">
    <Carousel />
  </div>
</template>

<script>
import Carousel from "./components/carousel";

export default {
  name: "App",
  components: {
    Carousel
  }
};
</script>

<style>
/* Some globals */
@import url("https://fonts.googleapis.com/css?family=Ropa+Sans&display=swap");
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: "Ropa Sans", Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin-top: 60px;
}
</style>

<template>
  <div class="carousel-item-container">
    <div class="carousel-img-container">
      <img :src="item.largeImageURL" />
    </div>
    <div class="carousel-item-text">
      <p>{{ item.tags }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselItem",
  props: ["item"]
};
</script>

<style scoped lang="scss">
.carousel-img-container {
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="carousel-item-container">
    <div class="carousel-img-container">
      <img src="https://placehold.it/200x200" />
    </div>
    <div class="carousel-item-text">
      <p>{{ item.name }}</p>
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
  img {
    width: 100%;
  }
}
</style>

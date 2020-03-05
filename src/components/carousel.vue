<template>
  <div class="wrap">
    <div class="header-text-container">
      <h1>Carousel Test</h1>
    </div>
    <div class="carousel-wrap">
      <ul
        class="carousel-container"
        ref="carouselContainer"
        :style="{ transform: 'translateX(' + carousel.containerXOffSet + '%)' }"
      >
        <li
          class="carousel-item"
          v-for="(item, index) in items"
          :key="index"
          ref="carouselItem"
        >
          <CarouselItem :item="item" />
        </li>
      </ul>
      <!--  
        TODO: We could have a nav component for small / larger screen estates,
        have created CarouselItem as sub-component for demo purposes
       -->
      <div v-show="!isStart" class="mobile-nav prev" @click="navCarousel(0)">
        <img src="../assets/arrow.svg" />
      </div>
      <div v-show="!isEnd" class="mobile-nav next" @click="navCarousel(1)">
        <img src="../assets/arrow.svg" />
      </div>
    </div>
    <div class="lg-screen-nav-container">
      <button @click="navCarousel(0)" :disabled="isStart">Prev</button>
      <button @click="navCarousel(1)" :disabled="isEnd">Next</button>
    </div>
  </div>
</template>

<script>
import CarouselItem from "./carousel-item";
import axios from "axios";
export default {
  name: "Carousel",
  components: {
    CarouselItem
  },
  data() {
    return {
      // Helps in the updated lifecycle to run once
      nonce: false,
      // Holds carousel state info
      carousel: {
        containerWidth: null,
        itemWidth: null,
        showingColumns: null,
        containerXOffSet: 100,
        itemXOffSet: 100,
        startX: 100,
        endX: 100
      },
      // Holds carousel items/cards
      items: []
    };
  },
  mounted() {
    this.fetchData();
    // Registering once mounted
    this.$nextTick(function() {
      window.addEventListener("resize", this.resizeWin);
    });
  },
  updated() {
    // Only do on the inital render
    if (!this.nonce) {
      this.updateDOMInfo();
      this.nonce = true;
    }
  },
  destroyed() {
    // Remove listener
    window.removeEventListener("resize", this.resizeWin);
  },
  methods: {
    async fetchData() {
      // OK we could have a loader flag to await before render,
      // same for ane error. Experimental, not worth the time
      try {
        const { data } = await axios.get(
          "https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo"
        );
        // Grab 6 from response
        this.items = data.hits.length > 6 ? data.hits.slice(0, 6) : data.hits;
        this.error = false;
      } catch (e) {
        // Pump out the error
        console.log(e);
      }
    },
    navCarousel(direction) {
      // direction = 1 then next otherwise prev
      this.carousel.containerXOffSet =
        direction === 1
          ? this.carousel.containerXOffSet - this.carousel.itemXOffSet
          : this.carousel.containerXOffSet + this.carousel.itemXOffSet;
    },
    updateDOMInfo() {
      // Could have done the stuff below when change of container width and the rest on Computed / Watcher properties. Anyhow, no time of this.

      // Providing carousel container has fully rendered then do some calc
      // update carousel state info, needed to maintain responsive behavoiour
      if (this.$refs.carouselContainer.clientWidth) {
        // Get carousel width
        this.carousel.containerWidth = this.$refs.carouselContainer.clientWidth;
        // Get width of first item width - the rest of the items will be the same, too
        this.carousel.itemWidth = this.$refs.carouselContainer.children[0].clientWidth;
        // Works out how many items are showing i.e number of columns
        this.carousel.showingColumns = Math.round(
          this.carousel.containerWidth / this.carousel.itemWidth
        );
        // Calculates x position to offset based on the number of columns
        this.carousel.itemXOffSet = 100 / this.carousel.showingColumns;
        // Calculates how much to x position of container when clicked on nav
        this.carousel.containerXOffSet = this.carousel.itemXOffSet;
        // Gets start x positions, helps to enable/disable prev buttons
        this.carousel.startX = this.carousel.itemXOffSet;
        // Gets start x positions, helps to enable/disable next buttons
        this.carousel.endX = -Math.abs(
          this.carousel.itemXOffSet * this.items.length -
            (this.carousel.showingColumns + 1) * this.carousel.itemXOffSet
        );
      }
    },
    resizeWin() {
      // Update Carousel state info
      this.updateDOMInfo();
    }
  },
  computed: {
    // Update Start X position - helps enable/disable prev button
    isStart() {
      return this.carousel.startX === this.carousel.containerXOffSet;
    },
    // Update Start X position - helps enable/disable next button
    isEnd() {
      return this.carousel.endX === this.carousel.containerXOffSet;
    }
  }
};
</script>

<style scoped lang="scss">
/* Didn't use any UI framework just thrashed with custom CSS */
// Some colors
$bg-color1: #e9eee6;
$btn-bg-color1: #00679b;
$header-text-color: #00679b;
$scaleArrow: 1.5;
// Halt on fluidity below 480px;
$min-mobile-width: 480px;

/* Mobile first - 1 col - the rest and updated selectors are in the media queries */
.wrap {
  max-width: 1024px;
  margin: 0 auto;
  .header-text-container,
  .lg-screen-nav-container {
    background-color: $bg-color1;
    padding: 15px;
    margin: 20px 0px;
    h1 {
      color: $header-text-color;
    }
  }
  .lg-screen-nav-container {
    display: none;
  }
  .carousel-wrap {
    overflow: hidden;
    min-width: $min-mobile-width;
    position: relative;
    .carousel-container {
      display: flex;
      left: -100%;
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;
      transition: transform 300ms ease-in;
      transform: translateX(100%);
      .carousel-item {
        flex: 1 0 100%;
      }
    }
  }
  .mobile-nav {
    position: absolute;
    top: 36.5%;
    background-color: #fff;
    height: 100px;
    width: 50px;
    cursor: pointer;
    z-index: 9;
    opacity: 0.5;
    img {
      top: 35%;
      position: absolute;
      height: 30%;
      transform: scale($scaleArrow);
    }
    &:hover {
      opacity: 0.8;
    }
    &.prev {
      left: 0;
      right: auto;
      border-radius: 0 100px 100px 0;
      img {
        left: 10px;
        transform: rotate(180deg) scale($scaleArrow);
      }
    }
    &.next {
      left: auto;
      right: 0;
      border-radius: 100px 0px 0px 100px;
      img {
        right: 10px;
      }
    }
  }
}

/* 576 - 2 cols */
@media (min-width: 36rem) {
  .wrap {
    .carousel-wrap {
      .carousel-container {
        left: -50%;
        transform: translateX(50%);
        .carousel-item {
          flex-basis: 50%;
          padding: 5px;
        }
      }
    }
    .mobile-nav {
      display: none;
    }
    .lg-screen-nav-container {
      text-align: center;
      display: block;
      button {
        background-color: $btn-bg-color1;
        padding: 5px;
        color: #eee;
        padding: 5px 15px;
        margin: 0px 5px;
        font-weight: 600;
        border-radius: 3px;
        font-size: 16px;
        border: 0;
        cursor: pointer;
        &:disabled {
          background-color: #ccc;
          cursor: default;
        }
      }
    }
  }
}

/* 768 - 4 cols */
@media (min-width: 48rem) {
  .wrap {
    .carousel-wrap {
      .carousel-container {
        left: -25%;
        transform: translateX(25%);
        .carousel-item {
          flex-basis: 25%;
        }
      }
    }
  }
}

/* 962 - 5 cols */
@media (min-width: 62rem) {
  .wrap {
    .carousel-wrap {
      .carousel-container {
        left: -20%;
        transform: translateX(20%);
        .carousel-item {
          flex-basis: 20%;
        }
      }
    }
  }
}
</style>

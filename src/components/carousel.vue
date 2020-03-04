<template>
  <div class="wrap">
    <div class="header-text-container">
      <h1>Carousel Test {{ items.length }}</h1>
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
        <div class="mobile-nav prev" @click="navCarousel(-1)">
          <img src="../assets/arrow.svg" />
        </div>
        <div class="mobile-nav next" @click="navCarousel(1)">
          <img src="../assets/arrow.svg" />
        </div>      
    </div>
    <div class="lg-screen-nav-container">
      <button @click="navCarousel(-1)" :disabled="isStart">Prev</button>
      <button @click="navCarousel(1)" :disabled="isEnd">Next</button>
    </div>
    {{ carousel }}
  </div>
</template>

<script>
import CarouselItem from "./carousel-item";
export default {
  name: "Carousel",
  components: {
    CarouselItem
  },
  data() {
    return {
      nonce: false,
      carousel: {
        containerWidth: null,
        itemWidth: null,
        showingColumns: null,
        containerXOffSet: 100,
        itemXOffSet: 100,
        startX: 100,
        endX: 100
      },
      items: []
    };
  },
  created() {
    fetch(
      "https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo"
    )
      .then(response => response.json())
      .then(
        data =>
          (this.items =
            data.hits.length > 6 ? data.hits.slice(0, 6) : data.hits)
      );
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.resizeWin);
    });
  },
  updated() {
    if (!this.nonce) {
      this.updateDOMInfo();
      this.nonce = true;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    navCarousel(d) {
      console.log(d);
      this.carousel.containerXOffSet =
        d === 1
          ? this.carousel.containerXOffSet - this.carousel.itemXOffSet
          : this.carousel.containerXOffSet + this.carousel.itemXOffSet;
    },
    updateDOMInfo() {
      if (this.$refs.carouselContainer.clientWidth) {
        this.carousel.containerWidth = this.$refs.carouselContainer.clientWidth;
        this.carousel.itemWidth = this.$refs.carouselContainer.children[0].clientWidth;
        this.carousel.showingColumns = Math.round(
          this.carousel.containerWidth / this.carousel.itemWidth
        );
        this.carousel.itemXOffSet = 100 / this.carousel.showingColumns;
        this.carousel.containerXOffSet = this.carousel.itemXOffSet;
        this.carousel.startX = this.carousel.itemXOffSet;
        this.carousel.endX = -Math.abs(
          this.carousel.itemXOffSet * this.items.length -
            (this.carousel.showingColumns + 1) * this.carousel.itemXOffSet
        );
      }
    },
    resizeWin() {
      this.updateDOMInfo();
    }
  },
  computed: {
    isStart() {
      return this.carousel.startX === this.carousel.containerXOffSet;
    },
    isEnd() {
      return this.carousel.endX === this.carousel.containerXOffSet;
    }
  }
};
</script>

<style scoped lang="scss">
$bg-color1: #e9eee6;
$btn-bg-color1: #00679b;
$header-text-color: #00679b;
$min-mobile-width: 480px;

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
}

.mobile-nav {
  position: absolute;
  top: 38.5%;
  color: #fff;
  background: #999;
  height: 100px;
  width: 50px;
  cursor: pointer;
  z-index: 9;
  opacity: 0.5;

  img {
    top: 35%;
    position: absolute;
    height: 30%;
  }

  &.prev {
    left: 0;
    right: auto;
    border-radius: 0 100px 100px 0;
    img {
      left: 10px;
      transform: rotate(180deg);
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

/* 576 */
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

/* 768 */
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

/* 962 */
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

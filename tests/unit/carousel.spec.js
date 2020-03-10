import { mount, shallowMount } from "@vue/test-utils";
import Carousel from "@/components/carousel";

describe("Carousel", () => {
  describe("Carousel mount and unmount", () => {
    it("should mount", () => {
      const wrapper = mount(Carousel);
      expect(wrapper.vm._isMounted).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it("should unmount", () => {
      const wrapper = mount(Carousel);
      const carouselInstance = wrapper.vm;
      carouselInstance.$destroy();
      expect(carouselInstance._isDestroyed).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});

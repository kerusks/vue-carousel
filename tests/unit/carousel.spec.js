import { mount, shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Carousel from "@/components/carousel";
import axios from "axios";
import { mockData } from "../mock/pixabay";
import jsdom from "jsdom";

let wrapper;
const endPoint =
  "https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo";

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: mockData }))
  };
});

const { JSDOM } = jsdom;
// Was about to carried to manip DOM for responsiveness, not worth the time at this stage

describe("Carousel", () => {
  describe("Carousel mount and API", () => {
    it("should mount", async () => {
      // Was going to test responsiveness - with setting window height but too time consuming
      window.innerWidth = 900;
      wrapper = mount(Carousel, {
        attachToDocument: true
      });

      axios.get.mockImplementationOnce(() => Promise.resolve());
      await flushPromises();
      expect(wrapper.vm._isMounted).toBeTruthy();
    });
  });

  describe("Render DOM elements", () => {
    it("should render carousel container", () => {
      expect(wrapper.find(".carousel-container").exists()).toBe(true);
    });

    it("should render 6 slides", () => {
      // Not conclusive but for testing that we should have at least 6
      const carouselItems = wrapper.findAll(".carousel-item");
      expect(carouselItems.length).toEqual(6);
    });
  });

  describe("Snapshot", () => {
    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

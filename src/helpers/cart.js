import { bus } from "../main";

export default {
  methods: {
    addToCart(el) {
      const storageItems = JSON.parse(localStorage.getItem("cart")) || [];
      storageItems.push(el);
      localStorage.setItem("cart", JSON.stringify(storageItems));
      bus.$emit("changeCart");
    },
  },
};

import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

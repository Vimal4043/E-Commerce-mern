import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional (use "auto" if you don’t want animation)
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
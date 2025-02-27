//
import { useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "./redux/cartSlice";
import CartItem from "./components/CartItem";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";

const App = () => {
  const dispatch = useDispatch();
  const { carts, loading, hasMore, page } = useSelector((state) => state.cart);
  const observerRef = useRef(null);

  // Function to fetch more carts when needed
  const fetchMoreCarts = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchCarts(page));
    }
  }, [dispatch, page, hasMore, loading]);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreCarts();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.disconnect();
    };
  }, [fetchMoreCarts]);

  // MEMO to filter total items is more than 4
  const filteredCarts = useMemo(
    () => carts.filter((cart) => cart.totalProducts > 4),
    [carts]
  );

  return (
    <div style={styles.app}>
      <motion.h2
        style={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Infinite Scroll - DummyJSON Carts
      </motion.h2>


      <div style={styles.container}>
        {carts.map((cart, index) => (         // Use "filteredCarts" instead of "carts" to use filter data 
          <CartItem key={cart.id} cart={cart} index={index} />
        ))}
      </div>

      {loading && (
        <div style={styles.loaderContainer}>
          <CircleLoader size={50} color="#4CAF50" />
        </div>
      )}
      <div ref={observerRef} style={{ height: "10px" }} />
    </div>
  );
};

const styles = {
  app: { textAlign: "center", padding: "20px", background: "linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255))" },
  title: { marginBottom: "20px" },
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
  },
};

export default App;
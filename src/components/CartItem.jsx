import { motion } from "framer-motion"; // Import motion for animation

const CartItem = ({ cart, index }) => {
  console.log("<<<<<CARTS>>>>>" + JSON.stringify(cart))

  // Array of gradient colors
  const gradientColors = [
    "#ff9a9e", "#a18cd1", "#fad0c4", "#ffecd2", "#a1c4fd",
    "#d4fc79", "#84fab0", "#ff9a9e", "#cfd9df", "#fbc2eb"
  ];

  // Assign gradient background based on index
  const rowGradient = gradientColors[index % gradientColors.length];

  return (
    <motion.div
      style={{ ...styles.cart, background: `linear-gradient(to top, ${rowGradient}, transparent 5%)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated Cart ID */}
      <motion.h3
        style={styles.cartId}
        animate={{ scale: [1, 1.2, 1] }} // Scale effect
        transition={{ duration: 1, repeat: 2, repeatType: "reverse", ease: "easeInOut" }}
      >
        Cart ID: {cart.id}
      </motion.h3>

      <p><strong>Total Items:</strong> {cart.totalProducts}</p>
      <p><strong>Total Price:</strong> ${cart.total}</p>
      <div style={styles.products}>
        {cart.products.map((product) => (
          <div key={product.id} style={styles.product}>
            <img src={product.thumbnail} alt={product.title} style={styles.image} />
            <p>{product.title} (${product.price})</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const styles = {
  cart: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    width: "80%",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adding shadow for better visualization
    boxSizing: "border-box", // Ensures padding/border don't affect width
  },
  products: {
    display: "flex",
    gap: "50px",
    marginTop: "10px",
    overflowX: "auto",
  },
  product: {
    textAlign: "center",
    minWidth: "120px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

export default CartItem;

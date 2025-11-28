import { useEffect } from "react";
import { FaLock, FaCreditCard } from "react-icons/fa";
import toast from 'react-hot-toast'
export default function PayPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("order_id");

    if (!orderId) {
      alert("Invalid payment link.");
      return;
    }

    const options = {
      key: "rzp_test_RP3xBKiZ2HDyGc",
      order_id: orderId,
      name: "Brickfields India",
      description: "Property Inspection Payment",
      theme: {
        color: "#0C2340",
      },
    handler: function (response) {
        toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "https://brickfieldsindia.com";
        }, 1500);
      },
    };

    const razorpay = new window.Razorpay(options);

    setTimeout(() => {
      razorpay.open();
    }, 1500);
  }, []);

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <FaCreditCard size={28} color="#0C2340" />
        </div>

        <h2 style={styles.title}>Redirecting to Secure Payment</h2>

        <div style={styles.loader}></div>

        <p style={styles.subtitle}>
          <FaLock size={12} /> Your transaction is encrypted & secure.
        </p>

        <p style={styles.info}>
          You will be taken to Razorpay’s secure checkout.  
          Please wait…
        </p>

        <p style={styles.footer}>
          Brickfields India © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

// 🎨 Modern Beautiful Styling
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #102A43, #1D4C89)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    width: "90%",
    maxWidth: "400px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "40px 30px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    textAlign: "center",
    color: "#fff",
    animation: "fadeInUp 0.7s ease-out",
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    background: "#fff",
    borderRadius: "50%",
    margin: "0 auto 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginTop: "10px",
    marginBottom: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  loader: {
    width: "55px",
    height: "55px",
    border: "6px solid rgba(255,255,255,0.3)",
    borderTopColor: "#FFF",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  subtitle: {
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  },
  info: {
    fontSize: "13px",
    opacity: 0.8,
    lineHeight: "20px",
  },
  footer: {
    marginTop: "25px",
    fontSize: "12px",
    opacity: 0.7,
  },
};

const button = document.getElementById("pay-button");

const BACKEND_URL = "https://oc-foundry-server.vercel.app";

function getCharacter() {
  return JSON.parse(localStorage.getItem("ocFoundryCharacter") || "null");
}

function renderCharacter() {
  const savedCharacter = getCharacter();

  if (!savedCharacter) {
    button.disabled = true;
    button.textContent = "Generate a character first";
    return null;
  }

  document.getElementById("checkout-name").textContent = savedCharacter.name;

  document.getElementById("checkout-archetype").textContent =
    `${savedCharacter.archetype} · ${savedCharacter.age}`;

  document.getElementById("checkout-hook").textContent = savedCharacter.hook;

  document
    .querySelector(".mini-sheet")
    .style.setProperty("--sheet-accent", savedCharacter.palette?.[0] || "#999");

  button.disabled = false;
  button.textContent = "Continue to secure payment →";

  return savedCharacter;
}

renderCharacter();

button.addEventListener("click", async () => {
  const savedCharacter = getCharacter();
  if (!savedCharacter) return;

  button.textContent = "Preparing payment…";
  button.disabled = true;

  try {
    // 1. Create Razorpay order on backend
    const orderRes = await fetch(`${BACKEND_URL}/api/create-razorpay-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.orderId) {
      throw new Error(orderData.error || "Could not create order");
    }

    // 2. Configure Razorpay Checkout options
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "OC Foundry",
      description: `Character Bible: ${savedCharacter.name}`,
      order_id: orderData.orderId,
      image: "https://memanasi123.github.io/oc-foundry/favicon.ico",
      theme: {
        color: "#9380c5"
      },
      handler: async function (response) {
        // Payment successful - verify with backend
        button.textContent = "Verifying payment…";

        try {
          const verifyRes = await fetch(`${BACKEND_URL}/api/verify-razorpay-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
  // Mark character as legitimately paid
  localStorage.setItem("ocFoundryPaidToken", response.razorpay_payment_id);
  localStorage.setItem("ocFoundryPurchasedCharacter", JSON.stringify(savedCharacter));
  
  // Redirect to success page
  window.location.href = `success.html?payment_id=${response.razorpay_payment_id}`;
} else {
            throw new Error("Payment verification failed");
          }

        } catch (err) {
          console.error("Verification error:", err);
          alert("Payment succeeded but verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
          button.disabled = false;
          button.textContent = "Continue to secure payment →";
        }
      },
      modal: {
        ondismiss: function() {
          button.disabled = false;
          button.textContent = "Continue to secure payment →";
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      }
    };

    // 3. Open Razorpay Checkout modal
    const rzp = new Razorpay(options);

    rzp.on('payment.failed', function (response) {
      console.error('Payment failed:', response.error);
      alert(`Payment failed: ${response.error.description}`);
      button.disabled = false;
      button.textContent = "Continue to secure payment →";
    });

    rzp.open();

  } catch (error) {
    console.error("Checkout error:", error);
    button.textContent = "Something went wrong 💔";
    setTimeout(() => {
      button.disabled = false;
      button.textContent = "Continue to secure payment →";
    }, 2500);
  }
});

const BACKEND_URL = "https://oc-foundry-server.vercel.app";
const PRICE_EACH = 60; // INR

function getCart() {
  return JSON.parse(localStorage.getItem("ocFoundryCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("ocFoundryCart", JSON.stringify(cart));
}

function renderBucket() {
  const cart = getCart();
  const empty = document.getElementById("bucket-empty");
  const content = document.getElementById("bucket-content");
  const list = document.getElementById("bucket-list");

  if (!cart.length) {
    empty.hidden = false;
    content.hidden = true;
    return;
  }

  empty.hidden = true;
  content.hidden = false;

  list.innerHTML = cart.map(item => `
    <article class="bucket-item" data-id="${item.cartId}">
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="meta">${escapeHtml(item.archetype)} · ${escapeHtml(item.age)}</p>
        <p class="hook">“${escapeHtml(item.hook)}”</p>
        <button class="remove-item" data-remove="${item.cartId}" type="button">Remove</button>
      </div>
      <div class="price">₹${PRICE_EACH}</div>
    </article>
  `).join("");

  document.getElementById("bucket-total").textContent = `₹${cart.length * PRICE_EACH}`;
  document.getElementById("bucket-count-label").textContent =
    `${cart.length} sheet${cart.length === 1 ? "" : "s"}`;

  // remove buttons
  document.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-remove");
      const next = getCart().filter(item => item.cartId !== id);
      saveCart(next);
      renderBucket();
    });
  });
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

document.getElementById("bucket-checkout").addEventListener("click", async () => {
  const cart = getCart();
  if (!cart.length) return;

  const button = document.getElementById("bucket-checkout");
  button.disabled = true;
  button.textContent = "Preparing payment…";

  try {
    const orderRes = await fetch(`${BACKEND_URL}/api/create-razorpay-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: cart.length })
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.orderId) {
      throw new Error(orderData.error || "Could not create order");
    }

    // Save cart for success page fulfillment
    localStorage.setItem("ocFoundryPendingCart", JSON.stringify(cart));

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "OC Foundry",
      description: `${cart.length} Character Bible${cart.length > 1 ? "s" : ""}`,
      order_id: orderData.orderId,
      theme: { color: "#9380c5" },
      handler: async function (response) {
        button.textContent = "Verifying payment…";

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
  // Mark cart as legitimately paid
  localStorage.setItem("ocFoundryPaidToken", response.razorpay_payment_id);
  localStorage.setItem("ocFoundryPurchasedCart", JSON.stringify(cart));
  localStorage.removeItem("ocFoundryCart");
  localStorage.removeItem("ocFoundryPendingCart");

  window.location.href = `success.html?payment_id=${response.razorpay_payment_id}&qty=${cart.length}`;
}
      modal: {
        ondismiss: function () {
          button.disabled = false;
          button.textContent = "Buy all sheets →";
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function () {
      button.disabled = false;
      button.textContent = "Buy all sheets →";
      alert("Payment failed. Please try again.");
    });
    rzp.open();

  } catch (err) {
    console.error(err);
    button.disabled = false;
    button.textContent = "Buy all sheets →";
    alert("Something went wrong starting checkout.");
  }
});

renderBucket();

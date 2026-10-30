/* Razorpay checkout — put your key in RAZORPAY_KEY_ID and it goes live.
   Empty key = demo mode (order is placed locally, nothing is charged). */
export const RAZORPAY_KEY_ID = '' // e.g. 'rzp_test_XXXXXXXXXXXX'

export const isLivePayment = () => Boolean(RAZORPAY_KEY_ID)

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = reject
    document.head.appendChild(s)
  })
}

/**
 * Returns { ok, paymentId } — resolves after the customer pays (or demo-approves).
 */
export async function payWithRazorpay({ amount, name, email, phone, orderId }) {
  if (!isLivePayment()) {
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, paymentId: `demo_${Date.now()}`, demo: true }
  }

  await loadScript()
  return new Promise((resolve) => {
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      name: 'Nira',
      description: `Order ${orderId}`,
      prefill: { name, email, contact: phone },
      theme: { color: '#0f2a4a' },
      handler: (res) => resolve({ ok: true, paymentId: res.razorpay_payment_id }),
      modal: { ondismiss: () => resolve({ ok: false }) }
    })
    rzp.on('payment.failed', () => resolve({ ok: false }))
    rzp.open()
  })
}

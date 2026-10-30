import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../ui'

const PAGES = {
  '/faq': {
    title: 'Questions, answered',
    kicker: 'Help',
    intro: 'Everything people ask us before their first order.',
    sections: [
      ['Is everything made in India?', 'Yes. The lab is in Bengaluru, handloom comes from two co-ops in Bhagalpur, leather from Kanpur. Nothing is imported and rebranded.'],
      ['How long does delivery take?', '2–6 working days depending on the pincode. Free above ₹1,499, otherwise ₹79.'],
      ['Can I return a product?', 'Skincare must be unopened for hygiene. Bags, heels and apparel can be tried on — 14 days from delivery.'],
      ['Do you repair bags?', 'Free stitching and hardware repairs for two years. Send it back, we return it within ten days.'],
      ['How do I pick a shade?', 'Every product page has real swatches shot on Indian skin tones. If it is wrong, the first exchange is free.'],
      ['Do you ship outside India?', 'Not yet. India only for now.']
    ]
  },
  '/shipping': {
    title: 'Shipping & returns',
    kicker: 'Policy',
    intro: 'The short version: free above ₹1,499, 2–6 days, 14-day returns.',
    sections: [
      ['Dispatch', 'Orders placed before 2pm IST ship the same day. Everything else goes out the next working day.'],
      ['Charges', 'Free delivery above ₹1,499. Below that, a flat ₹79 anywhere in India.'],
      ['Tracking', 'A tracking link is emailed the moment the parcel is picked up. You can also see it under Account → Order history.'],
      ['Returns', '14 days from delivery, unopened and unused. Raise it from Account or write to care@nira.example.'],
      ['Refunds', 'Processed to the original payment method within 5–7 working days of the parcel reaching us.'],
      ['Exchanges', 'One free size or shade exchange per order. The return pickup is on us.']
    ]
  },
  '/privacy': {
    title: 'Privacy',
    kicker: 'Policy',
    intro: 'We collect the minimum needed to send you an order.',
    sections: [
      ['What we store', 'Name, address, phone and email — for delivery and support. This demo storefront keeps cart, wishlist and orders in your browser only.'],
      ['What we never do', 'We do not sell data, and we do not run third-party ad trackers on this site.'],
      ['Cookies', 'Only functional storage: your cart, wishlist, theme preferences and cookie choice.'],
      ['Your rights', 'Ask us to delete everything we hold on you and we will, within seven days.'],
      ['Contact', 'care@nira.example for any privacy request.']
    ]
  },
  '/terms': {
    title: 'Terms of use',
    kicker: 'Policy',
    intro: 'Plain language, no traps.',
    sections: [
      ['Using this site', 'You may browse, buy and share links. Do not scrape it or resell our photography.'],
      ['Pricing', 'All prices are in INR and include GST. We can correct a pricing error before dispatch and refund you in full.'],
      ['Product images', 'Photography is shot in our studio. Handloom and leather vary slightly piece to piece — that is the material, not a defect.'],
      ['Liability', 'We are responsible for the product reaching you as described. We are not liable for allergic reactions — check the ingredient list first.'],
      ['Governing law', 'Indian law, jurisdiction Bengaluru.']
    ]
  }
}

export default function Policy() {
  const { pathname } = useLocation()
  const page = PAGES[pathname] || PAGES['/faq']

  return (
    <div className="container policy">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><span>{page.kicker}</span>
      </nav>

      <header className="policy__head">
        <p className="label label--maroon">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </header>

      <div className="policy__body">
        {page.sections.map(([q, a]) => (
          <section key={q}>
            <h2>{q}</h2>
            <p>{a}</p>
          </section>
        ))}
      </div>

      <div className="policy__cta">
        <p>Still stuck?</p>
        <Link className="btn" to="/contact"><span>Talk to us</span><Icon.arrow /></Link>
      </div>
    </div>
  )
}

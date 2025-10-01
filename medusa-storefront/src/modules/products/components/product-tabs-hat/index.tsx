"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    /*{
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },*/
    {
      label: "Instant download & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>We recoomend natural yarns to knit with. </p>
            <p>Our patterns are interactive, so you will be able to provide that yarn tension that you will use to knit this item with and the pattern will be calculated for you.  </p>
            <p>You can also choose between sizes, or why not knit all of them. We have the description in all the common sizes, S, M, L </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <div>
            <span className="font-semibold">Our products</span>
            <p className="max-w-sm">
              Our patterns and charts are digital products that usually are sent you directly after purchase. In some cases we need to prepare the files, so it can take up to 2 days. You will receive an email with the download link as soon as the payment is confirmed. 
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">

          <FastDelivery />
          <div>
            <span className="font-semibold">Instant or Fast delivery</span>
            <p className="max-w-sm">
              Our patterns are either created already and they will be sent to you instantly as payment reached us, or we will send it to you in between 2 days from purchase. Ready patterns are marked with green. The ones in need for description are marked with orange.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - reach out to us, and we will try to help you. 
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy refunds</span>
            <p className="max-w-sm">
              The hat images are AI generated and it is not always possible to knit the exact variant. In such cases we return your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

"use client";


import { Button } from "./components/button";
import { Card, CardContent } from "./components/card";
import { useState } from "react";
import { createHash } from "crypto"; // if client-only, just use a UUID
import { addLineItem } from '../../lib/medusa/cart-client'

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL ?? "http://70.34.196.51:9000" //"http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY! // required in v2


const HAT_MODELS = [
  { name: "simpleHat", tagline: "simpleHatTagline", image: "/Img/EnkelSvartvitBeanieIllustration.png" },
  { name: "classicHat", tagline: "classicHatTagline", image: "/Img/SimpleHat.png" },
  { name: "tamBeret", tagline: "tamBeretTagline", image: "/Img/TamHat.png" },
  { name: "beanieSlouchy", tagline: "beanieSlouchyTagline", image: "/Img/Beanie.png" },
  { name: "pompomHat", tagline: "pompomHatTagline", image: "/Img/PompomHat.png" },
  { name: "santaHat", tagline: "santaHatTagline", image: "/Img/TomteHat.png" },
  { name: "newsboyHat", tagline: "newsboyHatTagline", image: "/Img/NewsboyHat.png" },
  { name: "cityPomHat", tagline: "cityPomHatTagline", image: "/Img/BucketHat.png" },
  { name: "balaclava", tagline: "balaclavaTagline", image: "/Img/Balaclava.png" }
];

const WARMTH_LEVELS = [
  {name: "lightAutumn", tagline: "lightAutumnTagline", image: "/Img/lightWarm.png"},
  {name: "standardWinter", tagline: "standardWinterTagline", image: "/Img/standardWarm.png"},
  {name: "extremeCold", tagline: "extremeColdTagline", image: "/Img/extremeWarm.png"}
]

const COLORS = [
  { name: "white", tagline: "whiteTagline", image: "/Img/whiteAlpaka.png" },
  { name: "beige", tagline: "beigeTagline", image: "/Img/beigeAlpaka.png" },
  { name: "gray", tagline: "grayTagline", image: "/Img/grayAlpaka.png" },
  { name: "brown", tagline: "brownTagline", image: "/Img/brownAlpaka.png" },
  { name: "yellow", tagline: "yellowTagline", image: "/Img/yellowAlpaka.png" },
  { name: "red", tagline: "redTagline", image: "/Img/redAlpaka.png" },
  { name: "blue", tagline: "blueTagline", image: "/Img/lightBlueAlpaka.png" },
  { name: "black", tagline: "blackTagline", image: "/Img/blackAlpaka.png" },
  { name: "green", tagline: "greenTagline", image: "/Img/greenAlpaka.png" }
];

export default function HatConfigurator({
  t,
}: {
  lang: "sv" | "en";
  t: (key: string) => string;
}) {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const [warmth, setWarmth] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
 
  const toggleSelection = (value: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <VisualModelStep
            info={t("howToChooseModel")}
            title={t("chooseModel")}
            options={HAT_MODELS}
            selected={model}
            onSelect={setModel}
            t={t}
          />
        );
      case 1:
        return (
          <SelectionStep
            info={t("howToChooseWarmthLevel")}
            title={t("warmthLevel")}
            options={WARMTH_LEVELS}
            selected={warmth}
            onSelect={setWarmth}
            t={t}
          />
        );
      case 2:
        return (
          <MultiSelectStep
            info={t("howToChooseColor")}
            title={t("chooseColor")}
            options={COLORS}
            selected={selectedColors}
            onToggle={(val) => toggleSelection(val, selectedColors, setSelectedColors)}
            t={t}
          />
        );
      case 3:
        return (
          <SummaryStep
            info={t("summaryInfo")} 
            model={model}
            warmth={warmth}
            colors={selectedColors}
            t={t}          
          />
        );
      default:
      return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 px-4 py-8">
       <div className="text-center space-y-2 mb-4">
            <h1 className="text-3xl font-bold">🧶 {t("title")}</h1>
            <p className="text-gray-600">{t("subtitle")}</p>
       </div>
      <main className="min-h-screen text-gray-900 w-full max-w-4xl space-y-8 px-4 py-8 grid place-items-center bg-gray-100 stable" >
        
        <section className="max-w-3xl w-full min-h-[650px] space-y-8 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center">
            <Button onClick={prevStep} disabled={step === 0} >
              {t("back")}
            </Button>
            <div className="text-sm text-gray-500">{t("step")} {step + 1} / 4</div>
            <Button onClick={nextStep} disabled={step === 3}>
              {t("next")}
            </Button>
          </div>
         
          <div className="w-full max-w-3xl mx-auto">
            {renderStep()}
          </div>  
          
          <div className="border-t pt-4 text-sm text-gray-700">
            <p>{t("selected")}: <strong>{t(model)}</strong>, {t(warmth)}, {t("colors")}: {selectedColors.join(", ")}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function VisualModelStep({info, title, options, selected, onSelect, t }: { info: string, title: string, options: { name: string, tagline: string, image: string }[], selected: string, onSelect: (val: string) => void, t: any }) {
  return (
    <div className="space-y-4">
      <p>{info}</p>
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((opt) => (

          <Card key={opt.name} onClick={() => onSelect(opt.name)} 
          className={`cursor-pointer border rounded-xl  transition hover:shadow-lg  ${selected === opt.name ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"}`}>
            <CardContent className="p-4 space-y-2 text-center h-full flex flex-col justify-between">
              <div className="w-full flex justify-center">
                <img src={opt.image} alt={t(opt.name)} className="object-contain w-[160px] h-[160px] mx-auto" />
              </div>
              <h3 className="text-lg font-semibold">{t(opt.name)}</h3>
              <p className="text-sm text-gray-600">{t(opt.tagline)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SelectionStep({ info, title, options, selected, onSelect, t }: 
  { 
    info:string, 
    title: string, 
    options: { name: string; tagline: string; image: string }[], 
    selected: string, 
    onSelect: (val: string) => void , 
    t: any
  }) {
  return (
    <div className="space-y-4">
      <p>{info}</p>
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((opt) => (

          <Card key={opt.name} onClick={() => onSelect(opt.name)} 
          className={`cursor-pointer border rounded-xl  transition hover:shadow-lg  ${selected === opt.name ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"}`}>
            <CardContent className="p-4 space-y-2 text-center h-full flex flex-col justify-between">
              <div className="w-full flex justify-center">
                <img src={opt.image} alt={t(opt.name)} className="object-contain w-[160px] h-[160px] mx-auto" />
              </div>
              <h3 className="text-lg font-semibold">{t(opt.name)}</h3>
              <p className="text-sm text-gray-600">{t(opt.tagline)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MultiSelectStep({ info, title, options, selected, onToggle, t }: { info: string, title: string,   options: { name: string; tagline?: string; image?: string }[], selected: string[], onToggle: (val: string) => void, t: any }) {
  return (
    <div className="space-y-4">
      <p>{info}</p>
      <h2 className="text-2xl font-semibold  text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => (
                   <Card
                     key={opt.name}
                     onClick={() => onToggle(opt.name)}
                     className={`cursor-pointer border rounded-xl hover:shadow-lg transition 
                      ${selected.includes(opt.name) ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"
                     }`}
                   >
                     <CardContent className="p-4 space-y-2 text-center h-full flex flex-col justify-between">
                       <img
                         src={opt.image}
                         alt={t(opt.name)}
                         className="object-contain w-[140px] h-[140px] mx-auto"
                       />
                       <h3 className="text-lg font-semibold">{t(opt.name)}</h3>
                       <p className="text-sm text-gray-600">{t(opt.tagline)}</p>
                     </CardContent>
                   </Card>
                 ))}
           
         
      </div>
    </div>
  );
}

function SummaryStep({
  variantId,
  model,
  warmth,
  colors,
  url,
  t
}: {
  variantId: any;
  url:any; 
  info: string;
  model: string;
  warmth: string;
  colors: string[];
  t: (key: string) => string;
}) {

  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedForOrder, setSelectedForOrder] = useState<null | { type: "pattern" | "product"; image: string }>(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [selectedImageForPopup, setSelectedImageForPopup] = useState<string | null>(null);
 
  async function getOrCreateCartId() {
    let id = "cart_01K658VZKMZ6A885GXC80T66EK" //localStorage.getItem("cart_id")
    console.log("Current cart id:", id);
    if (id !== "undefined") return id
console.log("Creating new cart");
    const res = await fetch(`${MEDUSA_URL}/store/carts`, {
      method: "POST",
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}) // optionally include region_id / sales_channel_id
    })
    console.log("Create cart response:", res);
    const data = await res.json()
    id = data.cart.id
    localStorage.setItem("cart_id", id)
    return id
  }

  async function addToCart(variantId: string, qty = 1) {
    const cartId = await getOrCreateCartId()
console.log("Adding to cart:", { cartId, variantId, qty });
    const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
      method: "POST",
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ variant_id: variantId, quantity: qty })
    })
    if (!res.ok) throw new Error("Failed to add to cart")
    return res.json() // contains the updated cart
  }


  function makePatternId({ model, warmth, colors, imageUrl }: any) {
    // simple UUID is fine; a hash keeps it reproducible if you prefer
    const raw = JSON.stringify({ model, warmth, colors, imageUrl });
    // fallback to random if no crypto
    return "hat-" + Math.random().toString(16).slice(2);
  }
  
  const handleSendOrder = async () => {
    const payload = {
      type: selectedForOrder?.type,
      imageUrl: selectedForOrder?.image,
      message: orderMessage,
    };
    console.log("sending order"); 
    try {
        const response = await fetch("/send-order", {
      //const response = await fetch("http://localhost:3001/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server responded with error");
      }

      alert(t("thankYouOrderSent"));
      setSelectedForOrder(null);
      setOrderMessage("");
    } catch (err) {
      console.error("Error sending order:", err);
      alert(t("somethingWentWrong"));
    }
  };

    

  const handleGenerate = async () => {
      console.log("Generating images...");
      setLoading(true);

      const prompt = `High quality product photo of a ${model} knitted winter hat, suitable for ${warmth}, in the colors ${colors.join(", ")}, shown in a Scandinavian style studio setting.`;

      try {
        const response = ['http://70.34.196.51:8000/ExImages/Hat-tamBeret-standardWinter-red-yellow-Knitted-1758256186037-0.png-0.png',
             'http://70.34.196.51:8000/ExImages/Hat-tamBeret-standardWinter-red-yellow-Knitted-1758256186056-0.png-0.png',
             'http://70.34.196.51:8000/ExImages/Hat-tamBeret-standardWinter-yellow-Knitted-1758256186858-0.png-0.png'];
        /*await fetch("http://140.82.58.69:3001/generate-image", { // "http://localhost:3001/generate-image", {
        // const response = await fetch("http://localhost:3001/generate-image", { ez is comment
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            prompt,
            model,
            warmth,
            colors
          }),
        });

        const data = await response.json();
        console.log("response gotten:"); 
        console.log(data);
        setImageUrls(prev => [...data.images, ...prev]); */
        setImageUrls(prev => [...response, ...prev]);
        // after you receive generated images:
        const patternId = makePatternId({ model, warmth, colors, imageUrl: imageUrls[0] });
      } catch (err) {
        console.error("Image generation failed", err);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center space-y-6">

      <div className="space-y-6 text-center">
        <div className="space-y-4 text-left text-gray-800">
          <p className="text-lg font-semibold">{t("summaryIntro")}</p>
          <p>{t("summaryAI")}</p>
          <p className="italic">{t("summaryAction")}</p>
          <p className="whitespace-pre-line">{t("summaryOptions")}</p>
          <p className="whitespace-pre-line text-sm text-gray-600">{t("summaryPrices")}</p>
          <p className="font-semibold">{t("summaryClose")}</p>
        </div>
        <h2 className="text-2xl font-bold">{t("overview")}</h2>
        <p>{t("summaryModel")} : {model}</p>
        <p>{t("summaryWarmth")}: {warmth}</p>
        <p>{t("summaryColors")}: {colors.join(", ")}</p>
        <Button className="mt-4" onClick={handleGenerate} disabled={loading}>
          {loading ? t("Genererar...") : t("Generera design")}
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="h-full flex flex-col justify-between border rounded-lg overflow-hidden space-y-4 pb-4 bg-white shadow">
              <img 
                src={url}
                alt={t(`Generated hat ${idx + 1}`)} 
                className="w-full object-contain cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => setSelectedImageForPopup(url)}
              />

              <div className="px-4 space-y-2">
                <button
                  onClick={() => addToCart("variant_01K6E0D6Q364BMNM9CB6M1WYXD", 1)}
                  className="w-full bg-[#12725c] text-white text-sm font-medium py-2 px-3 rounded"
                >
                  {t("orderPattern")}
                </button>
               
              
                {/*<!--button
                  onClick={() => setSelectedForOrder({ type: 'product', image: url })}
                  className="w-full bg-[#12725c] text-white text-sm font-medium py-2 px-3 rounded"
                >
                  {t("orderReadyKnitted")}
                </button>*/}
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Image Popup Modal */}
      {selectedImageForPopup && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedImageForPopup(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImageForPopup(null)}
              className="absolute top-6 right-6 text-white text-3xl font-bold bg-black bg-opacity-60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition-opacity z-10"
            >
              ×
            </button>
            <img
              src={selectedImageForPopup}
              alt="Large view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {selectedForOrder && (
        <div className="mt-8 border p-4 rounded-xl bg-white shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-center">
            {selectedForOrder.type === "pattern"
              ? t("youChosePattern")
              : t("youChoseProduct")}
          </h3>
          <p className="text-center text-sm text-gray-600">{t("writeAddressAndMessage")}</p>
          <textarea
            rows={4}
            className="w-full border p-2 rounded"
            placeholder={t("enterYourMessage")}
            value={orderMessage}
            onChange={(e) => setOrderMessage(e.target.value)}
          />
          <button
            onClick={handleSendOrder}
            className="w-full bg-[#12725c] text-white py-2 rounded font-semibold"
          >
            {t("sendOrder")}
          </button>
          <i>Or send an email to info@knittedforyou.com. Please attach the image you liked. </i>
        </div>
      )}
    </div>
  )
}

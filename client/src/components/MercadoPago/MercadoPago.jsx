import React, { useEffect, useState } from "react";
import axios from "axios";
const FORM_ID = "payment-form";

export default function MercadoPago({ items, setLoading }) {
  const [preferenceId, setPreferenceId] = useState(null);
  useEffect(() => {
    axios
      .post("/payments", {
        items,
      })
      .then((order) => {
        setPreferenceId(order.data.preferenceId);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (preferenceId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
      setTimeout(() => {
        const button = document.querySelector(".mercadopago-button");
        button.innerHTML = "Buy (Mercado Pago)";
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceId]);
  return <form id={FORM_ID} method="GET" />;
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const FORM_ID = "payment-form";

export default function MercadoPago({ productID, title, items }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const { userProfile } = useSelector((state) => state.profile);
  useEffect(() => {
    if (false) {
      axios
        .post("/payment", {
          productID,
          items,
          userID: userProfile.ID,
        })
        .then((order) => {
          setPreferenceId(order.data.preferenceId);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID, title]);

  useEffect(() => {
    if (preferenceId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);
  return <form id={FORM_ID} method="GET" />;
}

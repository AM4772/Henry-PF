import React from "react";
import { Redirect, useLocation } from "react-router-dom";

function ValidateMP() {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  let status = query.get("status");
  return (
    <Redirect
      to={
        status === "approved"
          ? "/payment/success"
          : status === "rejected"
          ? "/payment/failure"
          : "/payment/pending"
      }
    />
  );
}

export default ValidateMP;

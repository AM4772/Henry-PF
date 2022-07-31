import React from "react";
import s from "./Payments.module.sass";

function SearchBarPayments({ value, onChange }) {
  return (
    <div className={s.searchDiv}>
      <input
        className={s.searchInput}
        type="text"
        value={value}
        placeholder="Search payment..."
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchBarPayments;

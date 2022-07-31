import React from "react";
import s from "./DashboardUsers.module.sass";

function SearchBarUser({ value, onChange }) {
  return (
    <div className={s.searchDiv}>
      <input
        className={s.searchInput}
        type="text"
        value={value}
        placeholder="Search user..."
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchBarUser;

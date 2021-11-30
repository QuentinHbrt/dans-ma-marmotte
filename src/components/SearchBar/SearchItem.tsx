import React, { FC, useState } from "react";
import { PRODUCTS } from "../../api/data";
import { Product } from "../../api/types";

type SearchItemProps = {
  products: Product[];
};

export const SearchItem: FC = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };

  return (
    <div>
      <input
        style={BarStyling}
        value={searchTerm}
        placeholder={"search"}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* {PRODUCTS.filter((value) => {
                if (searchTerm === "") {
                    return value
                } else if (value.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                    return value
                }
            }).map((value, key) => {
                return (
                    <div key={key}>
                        <p>{value.name}</p>
                    </div>
                );
            })} */}
    </div>
  );
};

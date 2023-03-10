import React from "react";
import { API } from "../../backend";

export default function ImageHelper({ product }) {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}

import React from "react";
import { AscSortIcon, DescSortIcon } from "./SvgIcons";

export default function Sort({ sortOrder, onSortChange }) {
  return (
    <div className="flex">
      {/* Show Descending button only if the current sort order is ascending */}
      {sortOrder === "asc" && (
        <button
          className="mr-2"
          onClick={() => onSortChange("desc")}
          aria-label="Sort Descending"
        >
          <DescSortIcon />
        </button>
      )}

      {/* Show Ascending button only if the current sort order is descending */}
      {sortOrder === "desc" && (
        <button onClick={() => onSortChange("asc")} aria-label="Sort Ascending">
          <AscSortIcon />
        </button>
      )}
    </div>
  );
}

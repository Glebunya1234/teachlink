import {
  Search,
  CircleOff,
  PencilOff,
  FileWarning,
  NotebookText,
} from "lucide-react";
import { FC } from "react";

import styles from "./EmptyPlaceholder.module.scss";

interface IEmptyPlaceholder {
  type?: "NotResults" | "Empty";
}

export const EmptyPlaceholder: FC<IEmptyPlaceholder> = ({ type }) => {
  const placeholder = {
    NotResults: "No results found",
    Empty: "It's empty here for now",
  };

  const iconsEmpt = [CircleOff, PencilOff, NotebookText];
  const iconsRes = [Search, CircleOff, FileWarning];
  const RandomIconEmpty =
    iconsEmpt[Math.floor(Math.random() * iconsEmpt.length)];
  const RandomIconResult =
    iconsRes[Math.floor(Math.random() * iconsRes.length)];

  return (
    <div className={styles.EmptyPlaceholder}>
      {type === "Empty" ? (
        <RandomIconEmpty size={100} />
      ) : (
        <RandomIconResult size={100} />
      )}

      <h2 className={styles.title}>
        {type === "Empty" ? placeholder.Empty : placeholder.NotResults}
      </h2>
    </div>
  );
};

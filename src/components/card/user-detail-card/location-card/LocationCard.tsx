import { Building2, Wifi, WifiOff } from "lucide-react";
import React, { FC } from "react";

import styles from "./LocationCard.module.scss";
interface Props {
  city?: string;
  online: boolean;
}

export const LocationCard: FC<Props> = ({ online, city }) => {
  return (
    <section className={styles.LocationsCard}>
      <h2>Locations and format lessons.</h2>
      <div className={styles.LocationsCard__Wrapper}>
        <span>
          City where a teacher can conduct classes at his or her own or a
          student's home:
        </span>
        <span>
          <Building2 size={14} color="#5c73e6" />
          {city}
        </span>
      </div>
      <div className={styles.LocationsCard__Wrapper}>
        <span>Learning format:</span>
        <span>
          {online ? (
            <>
              <Wifi size={14} color="#30a36c" />
              Online
            </>
          ) : (
            <>
              <WifiOff size={14} color="#f56553" />
              Offline
            </>
          )}
        </span>
      </div>
    </section>
  );
};

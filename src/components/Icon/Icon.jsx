import styles from "./Icon.module.scss";
import { ReactComponent as PlayIcon } from "./icons/play.svg";
import { ReactComponent as PauseIcon } from "./icons/pause.svg";
import { ReactComponent as ResetIcon } from "./icons/reset.svg";
import { ReactComponent as SkipIcon } from "./icons/skip.svg";

const IconComponent = ({ icon, className }) => {
  if (icon === "play") {
    return <PlayIcon className={className} />;
  } else if (icon === "pause") {
    return <PauseIcon className={className} />;
  } else if (icon === "reset") {
    return <ResetIcon className={className} />;
  } else if (icon === "skip") {
    return <SkipIcon className={className} />;
  }
  return <></>;
};

const Icon = ({ icon }) => {
  return (
    <div className={styles.container}>
      <IconComponent icon={icon} className={styles.icon} />
    </div>
  );
};

export default Icon;

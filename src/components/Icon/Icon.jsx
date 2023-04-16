import styles from "./Icon.module.scss";
import { ReactComponent as PlayIcon } from "./icons/play.svg";
import { ReactComponent as PauseIcon } from "./icons/pause.svg";
import { ReactComponent as ResetIcon } from "./icons/reset.svg";
import { ReactComponent as SkipIcon } from "./icons/skip.svg";
import { ReactComponent as LeftIcon } from "./icons/left.svg";
import { ReactComponent as RightIcon } from "./icons/right.svg";

const IconComponent = ({ icon, className }) => {
  const testId = `${icon}-icon`;

  if (icon === "play") {
    return <PlayIcon className={className} data-testid={testId}/>;
  } else if (icon === "pause") {
    return <PauseIcon className={className} data-testid={testId}/>;
  } else if (icon === "reset") {
    return <ResetIcon className={className} data-testid={testId}/>;
  } else if (icon === "skip") {
    return <SkipIcon className={className} data-testid={testId}/>;
  } else if (icon === "left") {
    return <LeftIcon className={className} data-testid={testId}/>;
  } else if (icon === "right") {
    return <RightIcon className={className} data-testid={testId}/>;
  }
  return <></>;
};

const Icon = ({ icon, className, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <IconComponent icon={icon} className={`${styles.icon} ${className}`} />
    </div>
  );
};

export default Icon;

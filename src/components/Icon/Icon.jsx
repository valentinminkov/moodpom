import styles from "./Icon.module.scss";
import { ReactComponent as PlayIcon } from "./icons/play.svg";
import { ReactComponent as PauseIcon } from "./icons/pause.svg";
import { ReactComponent as ResetIcon } from "./icons/reset.svg";
import { ReactComponent as SkipIcon } from "./icons/skip.svg";
import { ReactComponent as LeftIcon } from "./icons/left.svg";
import { ReactComponent as RightIcon } from "./icons/right.svg";

const ICONS = {
  play: PlayIcon,
  pause: PauseIcon,
  reset: ResetIcon,
  skip: SkipIcon,
  left: LeftIcon,
  right: RightIcon,
};

const IconComponent = ({ icon, className }) => {
  const Icon = ICONS[icon];

  if (Icon) {
    const testId = `${icon}-icon`;
    return <Icon className={className} data-testid={testId} />;
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

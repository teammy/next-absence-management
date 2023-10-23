import { ReactElement, ComponentType } from 'react';

interface IconProps {
  icon: ComponentType<{ className?: string }>;
  className?: string;
}

function Icon({ icon: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

export default Icon;
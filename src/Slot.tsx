import * as React from 'react';
import { LayoutContextContextConsumer, LayoutContextContextProps } from './LayoutContext';

interface SlotProps {
  name: string;
  component?: React.ComponentType<{ className?: string, style: Record<string, string> }>;
  wrapper?: React.ReactElement;
  className?: string;
  style?: Record<string, string>;
  children?: React.ReactNode;
}

class Slot extends React.Component<SlotProps> {
  renderSection = (context: LayoutContextContextProps): React.ReactNode => {
    const {
      className, style = {}, component = 'div', wrapper, name, children: slotChildren = null,
    } = this.props;
    const section = context.getSection(name);
    const children = section ? section.props.children : slotChildren;
    const props = { className, style };

    if (!children) {
      return false;
    }

    if (wrapper) {
      return React.cloneElement(wrapper, props, children);
    }

    return React.createElement(component, props, children);
  };

  render() {
    return <LayoutContextContextConsumer>{this.renderSection}</LayoutContextContextConsumer>;
  }
}

export default Slot;

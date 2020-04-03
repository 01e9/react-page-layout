import * as React from 'react';
import { SectionProps } from './Section';

export interface LayoutContextProps {
  sections: Record<string, React.Component<SectionProps>>;
  children: React.ReactNode;
}

export interface LayoutContextContextProps {
  getSection: (name: string) => (React.Component<SectionProps> | false);
}

const Context = React.createContext<LayoutContextContextProps>({
  getSection: () => false,
});

export const LayoutContextContextConsumer = Context.Consumer;

class LayoutContext extends React.PureComponent<LayoutContextProps> {
  getSection = (slot: string): ReturnType<LayoutContextContextProps['getSection']> => {
    const { sections } = this.props;
    return sections[slot] || false;
  };

  render() {
    const { children } = this.props;
    const { getSection } = this;
    const { Provider } = Context;

    return <Provider value={{ getSection }}>{React.Children.only(children)}</Provider>;
  }
}

export default LayoutContext;

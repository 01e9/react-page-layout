import * as React from 'react';

type LayoutType = Parameters<typeof React.createElement>[0];

export interface LayoutProviderProps {
  layouts: Record<string, LayoutType>;
  children: React.ReactNode;
}

export interface LayoutProviderContextProps {
  getLayout: (name: string) => LayoutType;
}

const Context = React.createContext<LayoutProviderContextProps>({
  getLayout: () => 'div',
});

export const LayoutProviderContextConsumer = Context.Consumer;

class LayoutProvider extends React.PureComponent<LayoutProviderProps> {
  getLayout = (name: string): LayoutType => {
    const { layouts } = this.props;
    return layouts[name];
  };

  render(): React.ReactNode {
    const { children } = this.props;
    const { getLayout } = this;
    const { Provider } = Context;

    return <Provider value={{ getLayout }}>{React.Children.only(children)}</Provider>;
  }
}

export default LayoutProvider;

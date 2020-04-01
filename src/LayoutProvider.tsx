import * as React from 'react';

export interface LayoutProviderProps {
  layouts: Record<string, React.Component>;
  children: React.ReactElement;
}

export interface LayoutProviderContextProps {
  getLayout: (name: string) => any;
}

const Context = React.createContext<LayoutProviderContextProps>({
  getLayout: () => null,
});

export const LayoutProviderContextConsumer = Context.Consumer;

class LayoutProvider extends React.PureComponent<LayoutProviderProps> {
  getLayout = (name: string): any => {
    const { layouts } = this.props;
    return layouts[name];
  };

  render() {
    const { children } = this.props;
    const { getLayout } = this;
    const { Provider } = Context;

    return <Provider value={{ getLayout }}>{React.Children.only(children)}</Provider>;
  }
}

export default LayoutProvider;

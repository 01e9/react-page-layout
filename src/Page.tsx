import * as React from 'react';
import isPlainObject from 'lodash.isplainobject';
import isArray from 'lodash.isarray';
import { LayoutProviderContextConsumer, LayoutProviderContextProps } from './LayoutProvider';
import LayoutContext from './LayoutContext';

// Not sure if this import is required
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Section from './Section';

export interface PageProps {
  layout: string;
  children: React.ReactNode;
}

class Page extends React.PureComponent<PageProps> {
  getSections(parent: any): Record<string, any> {
    if (isPlainObject(parent)) {
      // Check if the element is a section
      if (parent.type && parent.type.displayName === 'Section') {
        return { [parent.props.slot]: parent };
      }
      return {};
    }
    if (isArray(parent)) {
      const getSections = this.getSections.bind(this);

      return (parent as any[]).reduce((sections, section) => ({ ...sections, ...getSections(section) }), {});
    }
    return {};
  }

  getLayout(name: string, context: LayoutProviderContextProps) {
    const layout = context.getLayout(name);
    const { children } = this.props;
    const props = { ...this.props };
    delete props.layout;
    delete props.children;
    return React.createElement(layout, props, children);
  }

  renderContext = (context: LayoutProviderContextProps): React.ReactNode => {
    const { props } = this;
    const layout = this.getLayout(props.layout, context);
    const sections = this.getSections(props.children);

    if (!layout) {
      throw new Error(`No layout found named: '${props.layout}'`);
    }

    return <LayoutContext sections={sections}>{layout}</LayoutContext>;
  };

  render() {
    return <LayoutProviderContextConsumer>{this.renderContext}</LayoutProviderContextConsumer>;
  }
}

export default Page;

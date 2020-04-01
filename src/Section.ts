import * as React from 'react';

export interface SectionProps {
  slot: string;
  children?: React.ReactNode;
}

class Section extends React.PureComponent<SectionProps> {
  render() {
    throw new Error('You must only use <Section> inside a <Page>');
    // eslint-disable-next-line no-unreachable
    return null;
  }
}

// @ts-ignore
Section.displayName = 'Section';

export default Section;

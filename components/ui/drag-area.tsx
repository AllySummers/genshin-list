import * as React from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';

import 'react-indiana-drag-scroll/dist/style.css';

const DragArea = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollContainer>) => (
  <ScrollContainer className={className} {...props}>
    {children}
  </ScrollContainer>
);

export { DragArea };

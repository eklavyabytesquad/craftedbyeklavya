'use client';

import * as React from 'react';
import { motion } from 'motion/react';

export function Slot({ children, ...props }) {
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    ...props,
    ...child.props,
  });
}

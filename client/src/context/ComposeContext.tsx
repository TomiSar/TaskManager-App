import React, { FC, ReactNode } from 'react';

interface ComposeContextProps {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode | undefined;
}

export function ComposeContext({
  components = [],
  children,
}: ComposeContextProps) {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}

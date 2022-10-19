import React from 'react';
import { ThemeProvider } from 'styled-components';
import NiceModal from '@ebay/nice-modal-react';

const theme = {};

export async function getInitialState() {}

export function rootContainer(container: React.ReactElement) {
  return (
    <ThemeProvider theme={theme}>
      {React.createElement(NiceModal.Provider, null, container)}
    </ThemeProvider>
  );
}

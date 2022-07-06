import React from 'react';
import NiceModal from '@ebay/nice-modal-react';

export async function getInitialState() {}

export function rootContainer(container: React.ReactElement) {
  return React.createElement(NiceModal.Provider, null, container);
}

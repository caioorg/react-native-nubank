import React from 'react';

import Cards from '~/components/Cards';
import Header from '~/components/Header';
import Tabs from '~/components/Tabs';

import { Container } from './styles';

export default function Main() {
  return (
    <Container>
      <Header />
      <Cards />
      <Tabs />
    </Container>
  );
}

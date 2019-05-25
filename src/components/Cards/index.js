import React from 'react';

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '~/components/Menu';

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Annotation,
  Title,
  Description,
} from './styles';

export default function Cards() {
  let offset = 0;

  const translateY = new Animated.Value(0);

  const animatedEvent = new Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  onHandlerStateChanged = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let opened = false;
      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  };

  return (
    <Container>
      <Menu translateY={translateY} />
      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChanged}
      >
        <Card
          style={{
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 380],
                  outputRange: [-50, 0, 380],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <CardHeader>
            <Icon name="attach-money" size={28} color="#666" />
            <Icon name="visibility-off" size={28} color="#666" />
          </CardHeader>
          <CardContent>
            <Title>Saldo disponível</Title>
            <Description>R$ 100.000,00</Description>
          </CardContent>
          <CardFooter>
            <Annotation>
              Transferência de R4 100.000,00 recebida de Your Solution às 16:00 horas.
            </Annotation>
          </CardFooter>
        </Card>
      </PanGestureHandler>
    </Container>
  );
}

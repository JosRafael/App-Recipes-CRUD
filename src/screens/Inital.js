import React from 'react';
import {
  Text,
  StatusBar,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SPACING from '../../config/SPACING'
import Img from '../../assets/receita.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/index';

const Initial = ({ navigation }) => {
  return (
    <ImageBackground source={Img} defaultSource={Img} style={{ flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={{ flex: 1, backgroundColor: COLORS.black, opacity: 0.2 }} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          position: 'absolute',
          height: '100%',
          zIndex: 2,
          width: '100%',
          justifyContent: 'flex-end',
          paddingHorizontal: SPACING * 2,
          paddingBottom: SPACING * 5,
        }}>
        <View>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: '800',
              fontSize: SPACING * 4.5,
              textTransform: 'capitalize',
            }}>
            Suas receitas em tempo real
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: '600',
              fontSize: SPACING * 1.7,
            }}>
            Anote suas receitas para não esquecer!
          </Text>
          <TouchableOpacity
            style={{
              padding: SPACING * 2,
              backgroundColor: COLORS.white,
              borderRadius: SPACING * 2,
              alignItems: 'center',
              marginTop: SPACING * 3,
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SPACING * 2,
                fontWeight: '700',
              }}>
              Entrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: SPACING * 2,
              backgroundColor: COLORS.white,
              borderRadius: SPACING * 2,
              alignItems: 'center',
              marginTop: SPACING * 3,
            }}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SPACING * 2,
                fontWeight: '700',
              }}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Initial;
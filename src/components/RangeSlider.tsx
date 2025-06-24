import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface RangeSliderProps {
  min?: number;
  max?: number;
  initialMin?: number;
  initialMax?: number;
  step?: number;
  onValueChange?: (range: [number, number]) => void;
  trackColor?: string;
  activeTrackColor?: string;
  thumbColor?: string;
  labelColor?: string;
  labelBackgroundColor?: string;
  width?: number;
}

const RangeSlider = ({
  min = 0,
  max = 2000,
  initialMin = 100,
  initialMax = 1500,
  step = 10,
  onValueChange,
  trackColor = '#e5e7eb',
  activeTrackColor = '#a3e635',
  thumbColor = '#000000',
  labelColor = '#ffffff',
  labelBackgroundColor = '#000000',
  width = screenWidth - 40,
}: RangeSliderProps) => {
    
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  
  const minThumbX = useRef(new Animated.Value(((initialMin - min) / (max - min)) * width)).current;
  const maxThumbX = useRef(new Animated.Value(((initialMax - min) / (max - min)) * width)).current;
  
  const trackWidth = width;
  const thumbSize = 20;

  const snapToStep = useCallback((value: number) => {
    return Math.round(value / step) * step;
  }, [step]);

  const clampValue = useCallback((value: number, isMin = true) => {
    if (isMin) {
      return Math.max(min, Math.min(value, maxValue - step));
    } else {
      return Math.min(max, Math.max(value, minValue + step));
    }
  }, [min, max, minValue, maxValue, step]);

  const updateValue = useCallback((gestureX: number, isMin: boolean, animate = true) => {
    const percentage = Math.max(0, Math.min(1, gestureX / trackWidth));
    const rawValue = percentage * (max - min) + min;
    const steppedValue = snapToStep(rawValue);
    const clampedValue = clampValue(steppedValue, isMin);
    
    if (isMin) {
      setMinValue(clampedValue);
      const targetX = ((clampedValue - min) / (max - min)) * trackWidth;
      
      if (animate) {
        Animated.spring(minThumbX, {
          toValue: targetX,
          useNativeDriver: false,
          tension: 150,
          friction: 8,
        }).start();
      } else {
        minThumbX.setValue(targetX);
      }
    } else {
      setMaxValue(clampedValue);
      const targetX = ((clampedValue - min) / (max - min)) * trackWidth;
      
      if (animate) {
        Animated.spring(maxThumbX, {
          toValue: targetX,
          useNativeDriver: false,
          tension: 150,
          friction: 8,
        }).start();
      } else {
        maxThumbX.setValue(targetX);
      }
    }
    
    if (onValueChange) {
      onValueChange(isMin ? [clampedValue, maxValue] : [minValue, clampedValue]);
    }
  }, [min, max, minValue, maxValue, trackWidth, snapToStep, clampValue, onValueChange]);

  const getDistanceToThumb = (x: number, thumbX: Animated.Value) => {
    return Math.abs(x - (thumbX as any)._value);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (evt) => {
      const { locationX } = evt.nativeEvent;
      
      // Determine which thumb is closer
      const minDistance = getDistanceToThumb(locationX, minThumbX);
      const maxDistance = getDistanceToThumb(locationX, maxThumbX);
      
      setActiveThumb(minDistance < maxDistance ? 'min' : 'max');
    },
    
    onPanResponderMove: (evt) => {
      const { locationX } = evt.nativeEvent;
      
      if (activeThumb === 'min') {
        updateValue(locationX, true, false);
      } else if (activeThumb === 'max') {
        updateValue(locationX, false, false);
      }
    },
    
    onPanResponderRelease: (evt) => {
      const { locationX } = evt.nativeEvent;
      
      if (activeThumb === 'min') {
        updateValue(locationX, true, true);
      } else if (activeThumb === 'max') {
        updateValue(locationX, false, true);
      }
      
      setActiveThumb(null);
    },
  });

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;
  const activeWidth = maxPercentage - minPercentage;

  return (
    <View style={{ paddingVertical: 16 }}>
      {/* Value Labels */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16 
      }}>
        <View style={{
          backgroundColor: labelBackgroundColor,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 4,
        }}>
          <Text style={{ color: labelColor, fontWeight: '600' }}>
            ${minValue}
          </Text>
        </View>
        <View style={{
          backgroundColor: labelBackgroundColor,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 4,
        }}>
          <Text style={{ color: labelColor, fontWeight: '600' }}>
            ${maxValue}
          </Text>
        </View>
      </View>

      {/* Slider Track Container */}
      <View 
        style={{ 
          width: trackWidth, 
          height: thumbSize + 20,
          justifyContent: 'center',
          position: 'relative',
        }}
        {...panResponder.panHandlers}
      >
        {/* Background Track */}
        <View style={{
          height: 8,
          backgroundColor: trackColor,
          borderRadius: 4,
          width: '100%',
        }} />
        
        {/* Active Track */}
        <View style={{
          position: 'absolute',
          height: 8,
          backgroundColor: activeTrackColor,
          borderRadius: 4,
          left: `${minPercentage}%`,
          width: `${activeWidth}%`,
        }} />

        {/* Min Thumb */}
        <Animated.View style={{
          position: 'absolute',
          width: thumbSize,
          height: thumbSize,
          backgroundColor: thumbColor,
          borderRadius: thumbSize / 2,
          top: (thumbSize + 20 - thumbSize) / 2 - 3,
          left: minThumbX,
          marginLeft: -thumbSize / 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          transform: [
            { scale: activeThumb === 'min' ? 1.2 : 1 }
          ]
        }} />

        {/* Max Thumb */}
        <Animated.View style={{
          position: 'absolute',
          width: thumbSize,
          height: thumbSize,
          backgroundColor: thumbColor,
          borderRadius: thumbSize / 2,
          top: (thumbSize + 20 - thumbSize) / 2 - 3,
          left: maxThumbX,
          marginLeft: -thumbSize / 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          transform: [
            { scale: activeThumb === 'max' ? 1.2 : 1 }
          ]
        }} />
      </View>
    </View>
  );
};

// Usage Example Component
const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 1500]);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    console.log('Price range changed:', newRange);
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ 
        color: '#374151', 
        fontWeight: '500', 
        marginBottom: 12,
        fontSize: 16,
      }}>
        Price Range
      </Text>
      
      <RangeSlider
        min={0}
        max={2000}
        initialMin={priceRange[0]}
        initialMax={priceRange[1]}
        step={25}
        onValueChange={handlePriceChange}
        trackColor="#e5e7eb"
        activeTrackColor="#a3e635"
        thumbColor="#000000"
        labelColor="#ffffff"
        labelBackgroundColor="#000000"
      />
    </View>
  );
};

export default RangeSlider;
export { PriceRangeSlider };
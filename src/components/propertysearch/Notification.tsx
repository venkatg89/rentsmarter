import React, {useState, useEffect, useRef } from 'react';
import {
  Animated,

  StyleSheet,
 
} from 'react-native';

// equivalent of 'default static props' in classes
const Notification = ( props) => {

  let delay = 5000
  let onClose = () => {}
  let onOpen = () => {}

  let [height, setHeight] = useState(-1000)

  //observable object // componentwillmount
  const animatedValue = useRef(new Animated.Value(0)).current;

  let {autohide, message} = props;
  let x:boolean = autohide;
  let m:string = message;


  useEffect(() => {
    // console.log("useEffect")
    // componentDidMount
    startSlideIn(props);

  }, []);

  const getAnimation = (props) =>  {
    // console.log("getAnimation")
    const {value, autoHide} = props
     
    return   Animated.timing(animatedValue, 
      { toValue: animatedValue,
      duration: 500,
      delay: autoHide ? delay : 0,
    }).start();
    
  };

  const startSlideIn = (props) =>  {
    // console.log("startSlideIn")
    const { onOpen, autoHide } =  props;

    animatedValue.setValue(0);
    getAnimation(1)
      .start(() => {
        onOpen();
        if (autoHide){
           startSlideOut(props);
        }
      });
  }

  const startSlideOut = (props) => {
    // console.log("startSlideOut")
    const { autoHide, onClose } = props;

    this.animatedValue.setValue(1);
    this.getAnimation(0, autoHide)
      .start(() => onClose());
  }

  const onLayoutChange = (event) => {
    // console.log("onLayoutChange")
    const {layout: { height } } = event.nativeEvent;
    if (height === -1000) {
      setHeight(height)
    }
   }

};

export default Notification

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  text: {
    color: '#fff',
  },
});
 
// /* @flow */
// 'use strict';

// var React = require('react-native');
// var DynamicType = require('NativeModules').DynamicType;

// var {
//   StyleSheet,
//   View,
//   Text
// } = React;

// var DemoDynamicTypeView = React.createClass({

//     render: function() {
//         return (
//             <View style={styles.container}>
//                 <Text style={[styles.message, {fontSize: DynamicType.Headline}]}>Headline</Text>
//                 <Text style={[styles.message, {fontSize: DynamicType.Subheadline}]}>Sub</Text>
//                 <Text style={[styles.message, {fontSize: DynamicType.Body}]}>Body</Text>
//                 <Text style={[styles.message, {fontSize: DynamicType.Caption1}]}>Cap1</Text>
//                 <Text style={[styles.message, {fontSize: DynamicType.Caption2}]}>Cap2</Text>
//                 <Text style={[styles.message, {fontSize: DynamicType.Footnote}]}>Footnote</Text>
//             </View>
//         );
//     }
// });

// export default DemoDynamicTypeView;

// var styles = StyleSheet.create({

// 	container: {
// 		flex: 1,
// 		backgroundColor: 'red',
//         	justifyContent: 'center'
// 	},

//     message: {
//         textAlign: 'center'
//     }
// });
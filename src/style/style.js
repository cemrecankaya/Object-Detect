import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ECECEC',
        justifyContent:'center',
        alignItems:'center',
    },
    headerText:{
        textAlign: 'center',
        fontSize: 40,
        color:'#434343',
    },
    text:{
        textAlign: 'center',
        fontSize: 25,
        color:'#434343',
    },
    touchable:{
        borderColor:'grey',
        borderRadius:15,
        borderWidth:3,
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:10,
    },
});

export default styles;
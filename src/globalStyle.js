import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const globalStyle = StyleSheet.create({
    sectionBox: {
        padding: 20,
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '500',
        paddingBottom: 5,
        borderBottomColor: '#d5d5d5',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    mb5: {
        marginBottom: 5
    }
});

const MyContainer = styled.View`
    padding: 20px;
    margin-bottom: 15px;
    flex: 1;
`;

const MyTitle = styled.Text`
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;
    border-bottom-color: #d5d5d5;
    border-bottom-width: 1px;
    margin-bottom: 20px;
`;

const MyInput = styled.TextInput`
    height: 40px;
    margin: 5px 0;
    border-width: 1px;
    padding: 10px;
`;

export default globalStyle;

export {MyContainer, MyTitle, MyInput};
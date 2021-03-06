/*        STATELESS COMPONENT
*              Created By
*         Caio H. Silva Franco
* */
/* Core */
import React, {Component} from 'react';

/* Presentational */
import {
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator, Keyboard, Alert,
} from 'react-native';
import {Block, Text, Button, Input} from '../components';
import {theme} from '../constants';

const VALID_EMAIL = 'Teste';

export default class Forgot extends Component {
    state = {
        email: '',
        errors: [],
        loading: false,
    };

    handleForgot() {
        const {navigation} = this.props;
        const {email } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({loading: true});

        // Only for loading demonstration
        setTimeout(() => {
            //Check with backend API or with static data
            if (email !== VALID_EMAIL) {
                errors.push('email');
            }
            this.setState({errors, loading: false});

            if (!errors.length) {
                Alert.alert('Password sent!',
                    'Please check your email.',
                    [
                        {
                            text: 'Ok', onPress: () => {
                                navigation.navigate('Login');
                            },
                        },
                    ], { cancelable: false });
            } else {
                Alert.alert('Error!',
                    'Please check your email address.',
                    [
                        {
                            text: 'Try again',
                        },
                    ], { cancelable: false });
            }
        }, 1000);
    };

    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return (
            <KeyboardAvoidingView style={styles.forgot} behavior={'padding'}>
                    <Block padding={[0, theme.sizes.base * 2]}>
                        <Text h1 bold>Forgot</Text>
                        <Block middle>
                            <Input
                                label={'E-mail'}
                                error={hasErrors('email')}
                                style={[styles.input, hasErrors('email')]}
                                defaultValue={this.state.email}
                                onChangeText={text => this.setState({email: text})}
                            />
                            <Button gradient onPress={() => this.handleForgot()}>
                                {loading ? <ActivityIndicator size={'small'} color={'white'}/> :
                                    <Text bold white center>Forgot</Text>
                                }
                            </Button>
                            <Button onPress={() => {
                                navigation.goBack();
                            }}>
                                <Text gray caption center style={{textDecorationLine: 'underline'}}>Back to Login</Text>
                            </Button>
                        </Block>
                    </Block>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    },
});

import React from 'react';
import { Page } from '../../components/PageTitle';
import { StatusText } from '../../Styles';
import { useAuth } from '../../components/Auth/Auth';

type SigninAction = 'signin' | 'signin-callback';
interface Props {
  action: SigninAction;
}

export const SignInPage: React.FC<Props> = ({ action }) => {
  debugger;
  const { signIn } = useAuth();
  if (action === 'signin') {
    signIn();
  }
  return (
    <Page title="Sign In">
      <StatusText>Signing in ...</StatusText>
    </Page>
  );
};

import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import SvgIcon from 'soapbox/components/ui/icon/svg-icon';
import BundleContainer from 'soapbox/features/ui/containers/bundle_container';
import { NotificationsContainer } from 'soapbox/features/ui/util/async-components';
import { useAppSelector, useSoapboxConfig } from 'soapbox/hooks';

import { Card, CardBody } from '../../components/ui';
import LoginPage from '../auth_login/components/login_page';
import PasswordReset from '../auth_login/components/password_reset';
import PasswordResetConfirm from '../auth_login/components/password_reset_confirm';
// import EmailConfirmation from '../email_confirmation';
import Verification from '../verification';
import EmailPassthru from '../verification/email_passthru';

const AuthLayout = () => {
  const { logo } = useSoapboxConfig();
  const siteTitle = useAppSelector(state => state.instance.title);

  return (
    <div>
      <div className='fixed h-screen w-full bg-gradient-to-tr from-primary-50 via-white to-cyan-50' />

      <main className='relative flex flex-col h-screen'>
        <header className='pt-10 flex justify-center relative'>
          <Link to='/' className='cursor-pointer'>
            {logo ? (
              <img src={logo} alt={siteTitle} className='h-7' />
            ) : (
              <SvgIcon
                className='w-7 h-7'
                alt={siteTitle}
                src={require('@tabler/icons/icons/home.svg')}
              />
            )}
          </Link>
        </header>

        <div className='-mt-10 flex flex-col justify-center items-center h-full'>
          <div className='sm:mx-auto w-full sm:max-w-lg md:max-w-2xl'>
            <Card variant='rounded' size='xl'>
              <CardBody>
                <Switch>
                  <Route exact path='/auth/verify' component={Verification} />
                  <Route exact path='/auth/verify/email/:token' component={EmailPassthru} />
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/reset-password' component={PasswordReset} />
                  <Route exact path='/edit-password' component={PasswordResetConfirm} />
                  {/* <Route exact path='/auth/confirmation' component={EmailConfirmation} /> */}

                  <Redirect from='/auth/password/new' to='/reset-password' />
                  <Redirect from='/auth/password/edit' to='/edit-password' />
                </Switch>
              </CardBody>
            </Card>
          </div>
        </div>

      </main>

      <BundleContainer fetchComponent={NotificationsContainer}>
        {(Component) => <Component />}
      </BundleContainer>
    </div>
  );
};

export default AuthLayout;
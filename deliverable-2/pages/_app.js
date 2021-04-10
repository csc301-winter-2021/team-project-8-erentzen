import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import {store} from '../_helpers';
import {Provider} from 'react-redux';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <React.Fragment>
          <Head>
            <title>Sample App</title>
            <meta charSet="utf-8" />
          </Head>
          <AppProvider i18n={translations}>
            <Component {...pageProps} />
          </AppProvider>
        </React.Fragment>
      </Provider>
    );
  }
}

export default MyApp;
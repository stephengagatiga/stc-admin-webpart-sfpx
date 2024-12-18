import * as React from 'react';
import styles from '../scss/StcAdmin.module.scss';
import { IStcAdminProps } from './IStcAdminProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducer';
import {Provider} from 'react-redux';

import ComponentSwitch from './ComponentSwitch';

const store = createStore(reducer, applyMiddleware(thunk));

export default class StcAdmin extends React.Component<any, any> {
  public render(): React.ReactElement<any> {
    return (
      <Provider store={store}>
        <div className={ styles.stcAdmin }>
          <ComponentSwitch />
        </div>
      </Provider>
    );
  }
}

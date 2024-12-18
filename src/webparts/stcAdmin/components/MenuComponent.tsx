import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions';
import {VIEWS} from '../utis/constants';
import styles from '../scss/StcAdmin.module.scss';

class MenuComponent extends React.Component<any, any> {

  componentDidMount() {
    this.setState({
        view: this.props.reducer.view
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      view: nextProps.reducer.view,
    });
  }

  public render(): React.ReactElement<any> {

    return (
        <div>
          <h1>Main Menu</h1>
          <div className={styles.mainMenu}>
            <div onClick={e => { this.props.ChangeView(VIEWS.principalList) }}>
              Products
            </div>
            <div onClick={e => { this.props.ChangeView(VIEWS.groupList) }}>
              Groups
            </div>
            <div onClick={e => { this.props.ChangeView(VIEWS.roleList) }}>
              Roles
            </div>
            <div onClick={e => { this.props.ChangeView(VIEWS.userList) }}>
              Users
            </div>
          </div>
        </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    reducer: state
  };
}

function mapActionCreatorsToProps(dispatch) {
  let a : any = actions;
  return bindActionCreators(a,dispatch);
}

export default connect(mapStateToProps,mapActionCreatorsToProps)(MenuComponent);
import * as React from 'react';
import styles from './userproducts.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';

class UserProductsComponent extends React.Component<any, any> {

  state = {
    userProducts: this.props.reducer.userProducts,
    userProductsStatus: this.props.reducer.userProductsStatus,
  }


  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        userProducts: nextProps.reducer.userProducts,
        userProductsStatus: nextProps.reducer.userProductsStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {userProducts,userProductsStatus} = this.state;
    return (
      <div className={styles.userProductsModule}>
          <div className={styles2.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li>Users</li>
            </ul>
          </div>
          <div>
            <h1>Users</h1>
          </div>
          <div>
            {
              userProductsStatus == LOADING &&
              <div>
                <p>Please wait...</p>
              </div>
            }
            {
              userProductsStatus == SUCCESS &&
              <ul>
                {
                  userProducts.map(
                    user => <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
                  )
                }
              </ul>
            }
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(UserProductsComponent);
import * as React from 'react';
import styles from './user.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';

class UsersComponent extends React.Component<any, any> {

  state = {
    users: this.props.reducer.users,
    usersStatus: this.props.reducer.usersStatus,
  }

  onEditUserClick = (user) => {
    this.props.GetUserById(user,VIEWS.editUser);
  }

  onUserProductClick = (user) => {
    this.props.GetUserById(user,VIEWS.assignProduct);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        users: nextProps.reducer.users,
        usersStatus: nextProps.reducer.usersStatus
    });
  }

  public render(): React.ReactElement<{}> {    
    const {users,usersStatus} = this.state;
    return (
      <div className={styles.userModule}>
          <div className={styles2.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li>Users</li>
            </ul>
          </div>
          <div>
            <h1>Users</h1>
            <div>
              {
                usersStatus == SUCCESS &&
                <button onClick={e => { this.props.ChangeView(VIEWS.addUser) }}>New User</button>
              }
            </div>
          </div>
          <div>
            {
              usersStatus == LOADING &&
              <div>
                <p>Please wait...</p>
              </div>
            }
            {
              usersStatus == SUCCESS &&
              <ul>
                {
                  users.map(
                    user => <li key={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                    <div>
                      <span onClick={e => { this.onEditUserClick(user); }}>Edit</span>
                      <span onClick={e => { this.onUserProductClick(user); }}>Assign Product</span>
                    </div>
                     </li>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(UsersComponent);
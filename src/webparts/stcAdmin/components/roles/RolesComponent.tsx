import * as React from 'react';
import styles from './role.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';

class RolesComponent extends React.Component<any, any> {

  state = {
    roles: this.props.reducer.roles,
    rolesStatus: this.props.reducer.rolesStatus,
  }

  onEditRoleClick = (role) => {
    this.props.SetRoleValue(role);
    this.props.ChangeView(VIEWS.editRole);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        roles: nextProps.reducer.roles,
        rolesStatus: nextProps.reducer.rolesStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {roles,rolesStatus} = this.state;
    return (
      <div className={styles.roleModule}>
          <div className={styles2.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li>Roles</li>
            </ul>
          </div>
          <div>
            <h1>Roles</h1>
            <div>
              {
                rolesStatus == SUCCESS &&
                <button onClick={e => { this.props.ChangeView(VIEWS.addRole) }}>New Role</button>
              }
            </div>
          </div>
          <div>
            {
              rolesStatus == LOADING &&
              <div>
                <p>Please wait...</p>
              </div>
            }
            {
              rolesStatus == SUCCESS &&
              <ul>
                {
                  roles.map(
                    role => <li key={role.id}>
                    {role.name}
                    <div>
                      <span onClick={e => { this.onEditRoleClick(role); }}>Edit</span>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(RolesComponent);
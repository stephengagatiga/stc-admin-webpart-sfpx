import * as React from 'react';
import styles from './user.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import RoleFieldComponent from '../roles/RoleFieldComponent';
import SupervisorFieldComponent from '../users/SupervisorFieldComponent';
import { onFieldChange } from '../../utis/Utils';

class EditUserComponent extends React.Component<any, any> {

    searchUserTimeout = null;

    state = {
        users: this.props.reducer.users,
        roles: this.props.reducer.roles,
        editUserStatus: this.props.reducer.editUserStatus,
        user: this.props.reducer.user,
        roleId: this.props.reducer.user == null ? 0 : this.props.reducer.user.roleId,
        supervisorId: this.props.reducer.user == null ? 0 : this.props.reducer.user.supervisorId,
        active: this.props.reducer.user == null ? "" : (this.props.reducer.user.active ? "true" : "false"),
        getUserStatus: this.props.reducer.getUserStatus,
        role: null,
        supervisor: null,
    }

    onSaveUserClick = () => {
        let data = {
            view: VIEWS.userList,
            user: this.state.user,
            roleId: this.state.roleId,
            supervisorId: this.state.supervisorId,
            supervisor: this.state.supervisor,
            role: this.state.role,
            active: this.state.active,
        };
        if (this.state.roleId == null || this.state.supervisorId == null || this.state.active == "") {
            alert('Please fill up all fields');
        } else {
            this.props.SaveUser(data);
        }
    }
    
    onBreadcrumbsItemClick = (e) => {
        let view = Number(e.currentTarget.getAttribute('data-view'));
        this.props.ChangeView(view);
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.reducer.user;

        this.setState({
            users: nextProps.reducer.users,
            roles: nextProps.reducer.roles,
            editUserStatus: nextProps.reducer.editUserStatus,
            user: user,
            roleId: user == null ? 0 : user.roleId,
            supervisorId: user == null ? 0 : user.supervisorId,
            getUserStatus: nextProps.reducer.getUserStatus,
            active: (nextProps.reducer.user.active ? "true" : "false")
        });
    }

    public render(): React.ReactElement<{}> {    
        const {user,roleId,supervisorId,editUserStatus,getUserStatus,active} = this.state;
        return (
        <div className={styles.userModule}>
            <div className={styles2.menuBreadcrumbs}>
                <ul>
                <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
                <li data-view={VIEWS.userList} onClick={this.onBreadcrumbsItemClick}>Users</li>
                <li>Edit User</li>
                </ul>
            </div>
            <div>
                <h1>Edit User</h1>
            </div>
            {
                (editUserStatus == STATUS_QUO && getUserStatus == SUCCESS) &&
                    <div>
                        {
                            user != null &&
                            <div>
                                <p>First name: {user.firstName}</p>
                                <p>Last name: {user.lastName}</p>
                                <p>Email: {user.email}</p>
                                <RoleFieldComponent value={roleId} onChange={role => { this.setState({roleId: role.id, role: role}) }} />
                                <SupervisorFieldComponent value={supervisorId} onChange={user => { this.setState({supervisorId: user.id, supervisor: user}) }} />
                                <p>Active:
                                    <select name="active" value={active} onChange={e => { onFieldChange(e,this); }}>
                                        <option value=""></option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </p>
                                <div>
                                    <button onClick={e => { this.props.ChangeView(VIEWS.userList) }}>Cancel</button>
                                    <button onClick={this.onSaveUserClick}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
            }
            {
                (editUserStatus == LOADING || getUserStatus == LOADING) &&
                <div>
                    <p>Please wait...</p>
                </div>
            }
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(EditUserComponent);
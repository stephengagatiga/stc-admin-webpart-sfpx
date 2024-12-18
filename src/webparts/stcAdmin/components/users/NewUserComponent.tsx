import * as React from 'react';
import styles from './user.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http'; 
import {onFieldChange} from '../../utis/Utils';
import { sp } from "@pnp/sp";

class NewUserComponent extends React.Component<any, any> {

    searchUserTimeout = null;

  state = {
    users: this.props.reducer.users,
    roles: this.props.reducer.roles,
    addUserStatus: this.props.reducer.addUserStatus,
    name: '',
    userSearchResults: [],
    user: null,
    roleId: 0,
    supervisorId: 0,
  }

  onAddUserClick = () => {
    let newUser = {
        email: this.state.user.email,
        objectId: this.state.user.objectId,
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        roleId: this.state.roleId,
        supervisorId: this.state.supervisorId,
        view: VIEWS.userList,
        users: this.state.users
      };
    
      this.props.AddUser(newUser);
  }

  onSearchUserChange = (e) => {
    clearTimeout(this.searchUserTimeout);
    onFieldChange(e,this);
    this.searchUserTimeout = setTimeout(this.searchUser, 1200);
  }

  searchUser = () => {

     const body: string = JSON.stringify({
        queryParams: {
            AllowEmailAddresses: true,
            AllowMultipleEntities: true,
            AllUrlZones: false,
            MaximumEntitySuggestions: 10,
            PrincipalSource: 15,
            PrincipalType: 1,
            QueryString: this.state.name
        }
    });
    
    // const requestHeaders: Headers = new Headers();
    // requestHeaders.append('Content-type', 'application/json');
    // requestHeaders.append('Accept', 'application/json');

    // const httpClientOptions: ISPHttpClientOptions = {
    //     body: body,
    //     headers: requestHeaders,
    // };

    sp.web.siteUsers.filter(`Title eq ${this.state.name}`).get()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });

    // this.props.context.spHttpClient.post(
    //     `${this.props.context.pageContext.web.serverRelativeUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`.replace(/\/\//g, '/'),
    //     SPHttpClient.configurations.v1,
    //     httpClientOptions)
    //     .then(response => {
    //         return response.json();
    //   })
    //     .then(result => {
    //         this.setState({
    //             userSearchResults: JSON.parse(result.value) 
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })

  }

  onUserResultClick = (user) => {
    let searchEndpointUri  = `${this.props.context.pageContext.web.serverRelativeUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(user.Key)}'`;
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');

    const httpClientOptions: ISPHttpClientOptions = {
        headers: requestHeaders,
        method: 'GET'
    };

    this.props.context.spHttpClient.post(
        searchEndpointUri,
        SPHttpClient.configurations.v1,
        httpClientOptions)
        .then(response => {
            return response.json();
      })
        .then(result => {
            let userInfo = {
                email: result.Email,
                objectId: user.EntityData.ObjectId,
                firstName: "",
                lastName: "",
            }
            result.UserProfileProperties.forEach(prop => {
                if (prop.Key == "FirstName") {
                    userInfo.firstName = prop.Value;
                }
                if (prop.Key == "LastName") {
                    userInfo.lastName = prop.Value;
                }
            })
            this.setState({
                user: userInfo
            });
        })
        .catch(error => {
            console.log(error);
        })

  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        users: nextProps.reducer.users,
        roles: nextProps.reducer.roles,
        addUserStatus: nextProps.reducer.addUserStatus
    });
  }

  public render(): React.ReactElement<{}> {    
    const {users,userSearchResults,name,user,roleId,roles,supervisorId,addUserStatus} = this.state;
    return (
      <div className={styles.userModule}>
          <div className={styles2.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li data-view={VIEWS.userList} onClick={this.onBreadcrumbsItemClick}>Users</li>
              <li>New User</li>
            </ul>
          </div>
          <div>
            <h1>New User</h1>
          </div>
          {
              addUserStatus == STATUS_QUO &&
                <div>
                    <div>
                        <label>Search User</label>
                        <input type="text" value={name} name="name" onChange={this.onSearchUserChange} autoComplete="off" />
                    </div>
                    {
                        userSearchResults.length != 0 &&
                        <ul>
                            {
                                userSearchResults.map(user => <li key={user.Key} onClick={e => { this.onUserResultClick(user); }}>{user.DisplayText}</li>)
                            }
                        </ul>
                    }
                    {
                        user != null &&
                        <div>
                            <p>First name: {user.firstName}</p>
                            <p>Last name: {user.lastName}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: 
                                <select name="roleId" value={roleId} onChange={e => { onFieldChange(e,this); }}>
                                    <option value={0}></option>
                                    {
                                        roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)
                                    }
                                </select>
                            </p>
                            <p>Supervisor:
                                <select name="supervisorId" value={supervisorId} onChange={e => { onFieldChange(e,this); }}>
                                    <option value={0}></option>
                                    {
                                        users.map(user => <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)
                                    }
                                </select>
                            </p>
                            <div>
                                <button onClick={e => { this.props.ChangeView(VIEWS.userList) }}>Cancel</button>
                                <button onClick={this.onAddUserClick}>Add</button>
                            </div>
                        </div>
                    }
                </div>
          }
          {
              addUserStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(NewUserComponent);
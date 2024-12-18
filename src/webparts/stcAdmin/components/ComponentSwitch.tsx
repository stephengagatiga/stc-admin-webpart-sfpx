import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions';
import {VIEWS,STATUS_QUO} from '../utis/constants';

import PrincipalsComponent from './products/PrincipalsComponent';
import PrincipalComponent from './products/PrincipalComponent';
import AddProductComponent from './products/AddProductComponent';
import EditPrincipal from './products/EditPrincipal';
import NewPrincipal from './products/NewPrincipal';
import EditProductComponent from './products/EditProductComponent';
import ChangeProductStateComponent from './products/ChangeProductStateComponent';
import ChangePrincipalStateComponent from './products/ChangePrincipalStateComponent';

import GroupsComponent from './groups/GroupsComponent';
import NewGroupComponent from './groups/NewGroupComponent';
import EditGroupComponent from './groups/EditGroupComponent';
import ChangeGroupStateComponent from './groups/ChangeGroupStateComponent';

import RolesComponent from './roles/RolesComponent';
import NewRoleComponent from './roles/NewRoleComponent';
import EditRoleComponent from './roles/EditRoleComponent';

import UsersComponent from './users/UsersComponent';
import NewUserComponent from './users/NewUserComponent';
import EditUserComponent from './users/EditUserComponent';

import AssignUserProduct from './userproducts/AssignUserProduct';

import MenuComponent from './MenuComponent';

class ComponentSwitch extends React.Component<any, any> {

  state = {
    view: 0
  }

  componentDidMount() {
         
    this.setState({
        view: this.props.reducer.view
    });
    
    if (this.props.reducer.groupsStatus == STATUS_QUO) {
      this.props.GetAllGroups();
    }

    if (this.props.reducer.principalsStatus == STATUS_QUO) {
      this.props.GetAllPrincipals();
    }

    if (this.props.reducer.rolesStatus == STATUS_QUO) {
      this.props.GetAllRoles();
    }

    if (this.props.reducer.usersStatus == STATUS_QUO) {
      this.props.GetAllUsers();
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      view: nextProps.reducer.view,
    });
  }

  public render(): React.ReactElement<{}> {
    const {view} = this.state;

    switch(view) {
      case VIEWS.menu:
        return (<MenuComponent />);
      
      case VIEWS.principalList:
        return (<PrincipalsComponent context={this.props.context} />);
      case VIEWS.principalInfo:
        return (<PrincipalComponent context={this.props.context} />);
      case VIEWS.addProduct:
        return (<AddProductComponent context={this.props.context} />);
      case VIEWS.editPrincipal:
        return (<EditPrincipal context={this.props.context} />);
      case VIEWS.addPrincipal:
        return (<NewPrincipal context={this.props.context} />);
      case VIEWS.editProduct:
        return (<EditProductComponent context={this.props.context} />);
      case VIEWS.changeProductState:
        return (<ChangeProductStateComponent context={this.props.context} />);
      case VIEWS.deactivatePrincipal:
        return (<ChangePrincipalStateComponent context={this.props.context} />);

      case VIEWS.groupList:
        return (<GroupsComponent context={this.props.context} />);
      case VIEWS.newGroup:
        return (<NewGroupComponent context={this.props.context} />);
      case VIEWS.editGroup:
        return (<EditGroupComponent context={this.props.context} />);
      case VIEWS.changeGroupState:
        return (<ChangeGroupStateComponent context={this.props.context} />);

      case VIEWS.roleList:
        return (<RolesComponent context={this.props.context} />);
      case VIEWS.addRole:
        return (<NewRoleComponent context={this.props.context} />);
      case VIEWS.editRole:
        return (<EditRoleComponent context={this.props.context} />);

      case VIEWS.userList:
        return (<UsersComponent context={this.props.context} />);
      case VIEWS.addUser:
        return (<NewUserComponent context={this.props.context} />);
      case VIEWS.editUser:
        return (<EditUserComponent context={this.props.context} />);
        
      case VIEWS.assignProduct:
        return (<AssignUserProduct context={this.props.context} />);

      default:
        return (<MenuComponent />);
    }



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

export default connect(mapStateToProps,mapActionCreatorsToProps)(ComponentSwitch);
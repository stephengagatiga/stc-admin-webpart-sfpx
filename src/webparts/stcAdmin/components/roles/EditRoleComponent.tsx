import * as React from 'react';
import styles from './role.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class EditRoleComponent extends React.Component<any, any> {

  state = {
    role: this.props.reducer.role,
    editRoleStatus: this.props.reducer.editRoleStatus,
    name: this.props.reducer.role.name,
    active: this.props.reducer.role.active ? "true" : "false",
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onEditRole = () => {
    let data = {
        role: this.state.role,
        name: this.state.name,
        active: this.state.active,
        view: VIEWS.roleList,
    };
    this.props.EditRole(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.roleList);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        editRoleStatus: nextProps.reducer.editRoleStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {role,editRoleStatus,name,active} = this.state;

    let title = "Edit Role";

    if (role == null) {
        return (<div></div>)
    } else {
        return (
          <div className={styles.roleModule}>
                <div className={styles2.menuBreadcrumbs}>
                    <ul>
                        <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
                        <li data-view={VIEWS.roleList} onClick={this.onBreadcrumbsItemClick}>Roles</li>
                        <li>{title}</li>
                    </ul>
                </div>
                <div>
                    <h1>Edit Role</h1>
                </div>
                <div>
                    {
                        editRoleStatus == STATUS_QUO &&
                        <div>
                            <div>
                                <label>Name</label>
                                <input value={name} name="name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                                <label>Active</label>
                                <select value={active} name="active" onChange={e => { onFieldChange(e,this); }}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={this.onCancel}>Cancel</button>
                                <button onClick={this.onEditRole}>Save</button>
                            </div>
                        </div>
                    }
                    {
                        editRoleStatus == LOADING &&
                        <div>
                            <p>Please wait...</p>
                        </div>
                    }
                </div>
          </div>
        );
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(EditRoleComponent);
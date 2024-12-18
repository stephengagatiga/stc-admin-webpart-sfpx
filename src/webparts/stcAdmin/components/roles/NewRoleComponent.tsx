import * as React from 'react';
import styles from './role.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class NewRoleComponent extends React.Component<any, any> {

  state = {
    name: "",
    addRoleStatus: this.props.reducer.addRoleStatus
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.roleList);
  }

  onAddRole = () => {
    let data = {
        name: this.state.name,
        roles: this.props.reducer.roles,
        view: VIEWS.roleList,
    };
    this.props.AddRole(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.roleList);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        addRoleStatus: nextProps.reducer.addRoleStatus
      });
  }

  public render(): React.ReactElement<{}> {
    const {name,addRoleStatus} = this.state;

    let title = "Add User Role";

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
                <h1>{title}</h1>
            </div>
            <div>
                {
                    addRoleStatus == STATUS_QUO &&
                    <div>
                        <div>
                            <label>User Role Name</label>
                            <input value={name} name="name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                        </div>
                        <div>
                            <button onClick={this.onCancel}>Cancel</button>
                            <button onClick={this.onAddRole}>Add</button>
                        </div>
                    </div>
                }
                {
                    addRoleStatus == LOADING &&
                    <div>
                        <p>Please wait...</p>
                    </div>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(NewRoleComponent);
import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class EditPrincipalComponent extends React.Component<any, any> {

  state = {
    principal: this.props.reducer.principal,
    groupId: this.props.reducer.principal.groupId == null ? "" : this.props.reducer.principal.groupId,
    editPrincipalStatus: this.props.reducer.editPrincipalStatus,
    name: this.props.reducer.principal.name,
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onEditPrincipal = () => {
    let group = this.state.groupId == "" ? null : this.props.reducer.groups.filter(g => g.id == this.state.groupId)[0];
    let data = {
        principal: this.state.principal,
        name: this.state.name,
        group: group,
    };
    this.props.EditPrincipal(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.principalInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        editPrincipalStatus: nextProps.reducer.editPrincipalStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {principal,editPrincipalStatus,name,groupId} = this.state;

    let title = "Edit Principal";

    if (principal == null) {
        return (<div></div>)
    } else {
        return (
          <div className={styles.products}>
                <div className={styles2.menuBreadcrumbs}>
                    <ul>
                        <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
                        <li data-view={VIEWS.principalList} onClick={this.onBreadcrumbsItemClick}>Principal List</li>
                        <li data-view={VIEWS.principalInfo} onClick={this.onBreadcrumbsItemClick}>Principal Info</li>
                        <li>{title}</li>
                    </ul>
                </div>
                <div className={styles.productsHeader}>
                    <h1>Edit Principal</h1>
                </div>
                <div>
                    {
                        editPrincipalStatus == STATUS_QUO &&
                        <div>
                            <div>
                                <label>Principal Name</label>
                                <input value={name} name="name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                                <label>Group</label>
                                <select value={groupId} name="groupId" onChange={e => { onFieldChange(e,this); }}>
                                    <option value={""}></option>
                                    {
                                        this.props.reducer.groups.filter(g => g.active == true).map(g => <option key={g.id} value={g.id}>{g.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <button onClick={this.onCancel}>Cancel</button>
                                <button onClick={this.onEditPrincipal}>Save</button>
                            </div>
                        </div>
                    }
                    {
                        editPrincipalStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(EditPrincipalComponent);
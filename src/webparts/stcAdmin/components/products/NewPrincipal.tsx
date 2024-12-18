import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class NewPrincipal extends React.Component<any, any> {

  state = {
    name: "",
    groupId: "",
    addPrincipalStatus: this.props.reducer.addPrincipalStatus
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onAddPrincipal = () => {
    let data = {
        name: this.state.name,
        principals: this.props.reducer.principals,
        groupId: this.state.groupId,
    };
    this.props.AddPrincipal(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        addPrincipalStatus: nextProps.reducer.addPrincipalStatus
      });
  }

  public render(): React.ReactElement<{}> {
    const {name,addPrincipalStatus,groupId} = this.state;

    let title = "Add Principal";

    return (
        <div className={styles.products}>
            <div className={styles2.menuBreadcrumbs}>
                <ul>
                    <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
                    <li data-view={VIEWS.principalList} onClick={this.onBreadcrumbsItemClick}>Principal List</li>
                    <li>{title}</li>
                </ul>
            </div>
            <div className={styles.productsHeader}>
                <h1>{title}</h1>
            </div>
            <div>
                {
                    addPrincipalStatus == STATUS_QUO &&
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
                            <button onClick={this.onAddPrincipal}>Add</button>
                        </div>
                    </div>
                }
                {
                    addPrincipalStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(NewPrincipal);
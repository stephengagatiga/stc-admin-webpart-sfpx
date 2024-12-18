import * as React from 'react';
import styles from '../../scss/StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class EditGroupComponent extends React.Component<any, any> {

  state = {
    name: this.props.reducer.group.name,
    editGroupStatus: this.props.reducer.editGroupStatus,
    group: this.props.reducer.group,
    hasError: false,
    errorMessage: ""
  }

  onSaveGroupClick = () => {
    if (this.state.name.trim() == "") {
      this.setState({hasError: true, errorMessage: "Group name is required"});
    } else {
      let data = {
        name: this.state.name,
        group: this.state.group,
        view: VIEWS.groupList,
      };
      this.props.EditGroup(data);
    }
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        editGroupStatus: nextProps.reducer.editGroupStatus,
    });
  }

  public render(): React.ReactElement<{}> {
    const {name, editGroupStatus, hasError, errorMessage} = this.state;

    let title = "Edit Group";

    return (
      <div className={styles.stcAdmin}>
          <div className={styles.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li data-view={VIEWS.groupList} onClick={this.onBreadcrumbsItemClick}>Groups</li>
              <li>{title}</li>
            </ul>
          </div>
          <div>
            <h1>{title}</h1>
          </div>
          <div>
            {
              editGroupStatus == STATUS_QUO &&
              <div>
                <form>
                  <div className={styles.formGroup}>
                    <label>Group name</label>
                    <input value={name} name="name" placeholder="Input the group name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                  </div>
                </form>
                {
                  hasError &&
                  <div className={styles.messageError}>
                    <p>{errorMessage}</p>
                  </div> 
                }
                <div className={styles.rowRight}>
                  <div onClick={e => { this.props.ChangeView(VIEWS.groupList); }}className={`${styles.stcButtonSecondary} ${styles.mr5}`}>Cancel</div>
                  <div onClick={this.onSaveGroupClick} className={`${styles.stcButtonPrimary}`}>Save</div>
                </div>
              </div>
            }
            {
              editGroupStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(EditGroupComponent);
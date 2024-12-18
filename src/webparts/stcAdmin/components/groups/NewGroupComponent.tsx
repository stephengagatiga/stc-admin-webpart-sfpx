import * as React from 'react';
import styles from '../../scss/StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class NewGroupComponent extends React.Component<any, any> {

  state = {
    name: "",
    addGroupStatus: this.props.reducer.addGroupStatus,
    groups: this.props.reducer.groups,
    hasError: false,
    errorMessage: "",
  }

  onAddGroupClick = () => {
    if (this.state.name.trim() == "") {
      this.setState({hasError: true, errorMessage: "Group name is required"});
    } else {
      let data = {
        name: this.state.name.trim(),
        groups: this.state.groups,
        view: VIEWS.groupList,
      };
      this.props.AddGroup(data);
    }
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      addGroupStatus: nextProps.reducer.addGroupStatus,
    });
  }

  public render(): React.ReactElement<{}> {
    const {name, addGroupStatus, hasError, errorMessage} = this.state;

    let title = "Add Group";

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
              addGroupStatus == STATUS_QUO &&
              <div>
                <form>
                  <div className={styles.formGroup}>
                    <label>Group name</label>
                    <input value={name} name="name" placeholder="Input the new group name" type="text" onChange={e => { onFieldChange(e,this); }}/>
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
                  <div onClick={this.onAddGroupClick} className={`${styles.stcButtonPrimary}`}>Add</div>
                </div>
              </div>
            }
            {
              addGroupStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(NewGroupComponent);
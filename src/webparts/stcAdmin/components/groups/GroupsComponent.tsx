import * as React from 'react';
import styles from '../../scss/StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';

class GroupsComponent extends React.Component<any, any> {

  state = {
    groups: this.props.reducer.groups,
    groupsStatus: this.props.reducer.groupsStatus,
  }

  onEditGroupClick = (group) => {
    this.props.SetGroup(group);
    this.props.ChangeView(VIEWS.editGroup);
  }

  onChangeGroupActiveStateClick = (group) => {
    this.props.SetGroup(group);
    this.props.ChangeView(VIEWS.changeGroupState);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
        groups: nextProps.reducer.groups,
      groupsStatus: nextProps.reducer.groupsStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {groups,groupsStatus} = this.state;
    return (
      <div className={styles.stcAdmin}>
          <div className={styles.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li>Groups</li>
            </ul>
          </div>
          <div>
            <div className={styles.row}>
              <h1>Groups</h1>
              {
                groupsStatus == SUCCESS &&
                <div onClick={e => { this.props.ChangeView(VIEWS.newGroup) }} className={`${styles.stcButtonPrimary} ${styles.leftAuto}`}>New Group</div>
              }
            </div>
          </div>
          <div>
            {
              groupsStatus == LOADING &&
              <div>
                <p>Please wait...</p>
              </div>
            }
            {
              groupsStatus == SUCCESS &&
              <ul className={`${styles.listWithOptions}`}>
                {
                  groups.map(
                    group => <li key={group.id}>
                    <p className={group.active ? `` : `${styles.subtleText}`}>
                      {group.name}
                    </p>
                    <div>
                      <a href="#" onClick={e => { this.onEditGroupClick(group); }}>Edit</a>
                      {` `}
                      <a href="#" onClick={e => { this.onChangeGroupActiveStateClick(group); }}>{group.active ? 'Deactivate' : 'Activate'}</a>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(GroupsComponent);
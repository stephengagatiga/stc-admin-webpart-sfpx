import * as React from 'react';
import styles from '../../scss/StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class ChangeGroupStateComponent extends React.Component<any, any> {

  state = {
    groupStateStatus: this.props.reducer.groupStateStatus,
    group: this.props.reducer.group,
  }

  onYes = () => {
    let data = {
        group: this.state.group,
        active: this.state.group.active ? false : true,
        view: VIEWS.groupList,
    };
    this.props.ChangeGroupActivetState(data);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        groupStateStatus: nextProps.reducer.groupStateStatus,
    });
  }

  public render(): React.ReactElement<{}> {
    const {group, groupStateStatus} = this.state;

    let title = group.active ? 'Deactivate Group' : 'Activate Group';

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
              groupStateStatus == STATUS_QUO &&
              <div>
                    <p>Are you sure you want to {group.active ? 'deactivate' : 'activate'} {group.name}?</p>
                    <div className={styles.rowRight}>
                      <div onClick={e => { this.props.ChangeView(VIEWS.groupList); }}className={`${styles.stcButtonSecondary} ${styles.mr5}`}>Cancel</div>
                      <div onClick={this.onYes} className={`${styles.stcButtonPrimary}`}>Yes</div>
                    </div>
                </div>
            }
            {
              groupStateStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(ChangeGroupStateComponent);
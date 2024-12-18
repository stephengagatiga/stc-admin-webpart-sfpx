import * as React from 'react';
import styles from '../../scss/StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';

class PrincipalsComponent extends React.Component<any, any> {

  state = {
    principals: this.props.reducer.principals,
    principalsStatus: this.props.reducer.principalsStatus,
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onPrincipalClick = (principal) => {
    this.props.SetPrincipalValue(principal);
    this.props.ChangeView(VIEWS.principalInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      principals: nextProps.reducer.principals,
      principalsStatus: nextProps.reducer.principalsStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {principals,principalsStatus} = this.state;
    return (
      <div className={styles.stcAdmin}>
          <div className={styles.menuBreadcrumbs}>
            <ul>
              <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
              <li>Principal List</li>
            </ul>
          </div>
          <div className={`${styles.row}`}>
            <h1>Principals</h1>
            
            <div>
              {
                principalsStatus == SUCCESS &&
                <div onClick={e => { this.props.ChangeView(VIEWS.addPrincipal) }} className={`${styles.stcButtonPrimary} ${styles.leftAuto}`}>New Principal</div>
              }
            </div>
          </div>
          <div>
            {
              principalsStatus == LOADING &&
              <div>
                <p>Please wait...</p>
              </div>
            }
            {
              principalsStatus == SUCCESS &&
              <ul>
                {
                  principals.map(
                    principal => <li key={principal.id} className={`${styles.pointer}`} onClick={e => { this.onPrincipalClick(principal) }}>{principal.name} { principal.active == false && <span>Deactivated</span>} </li>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(PrincipalsComponent);
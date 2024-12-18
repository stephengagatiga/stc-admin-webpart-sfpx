import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class ChangePrincipalStateComponent extends React.Component<any, any> {

  state = {
    principal: this.props.reducer.principal,
    principaStatelStatus: this.props.reducer.principaStatelStatus
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onYes = () => {
    let data = {
        principal: this.state.principal,
        state: this.state.principal.active ? false : true,
    };
    this.props.ChangePrincipalState(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.principalInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        principaStatelStatus: nextProps.reducer.principaStatelStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {principaStatelStatus,principal} = this.state;

    let title = principal.active ? 'Deactivate Principal': 'Activate Principal';

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
                    <h1>{title}</h1>
                </div>
                <div>
                    {
                        principaStatelStatus == STATUS_QUO &&
                        <div>
                            <p>Are you sure you want to {principal.active ? 'deactivate': 'activate' } {principal.name}?</p>
                            <div>
                                <button onClick={this.onCancel}>Cancel</button>
                                <button onClick={this.onYes}>Yes</button>
                            </div>
                        </div>
                    }
                    {
                        principaStatelStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(ChangePrincipalStateComponent);
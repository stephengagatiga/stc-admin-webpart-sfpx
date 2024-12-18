import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class EditProductComponent extends React.Component<any, any> {

  state = {
    principal: this.props.reducer.principal,
    product: this.props.reducer.product,
    editProductStatus: this.props.reducer.editPrincipalStatus,
    name: this.props.reducer.product.name,
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.principalInfo);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onEditProduct = () => {
    let data = {
        principal: this.state.principal,
        product: this.state.product,
        name: this.state.name
    };
    this.props.EditProduct(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        editProductStatus: nextProps.reducer.editProductStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {principal,editProductStatus,name} = this.state;

    let title = "Edit Product";

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
                    <h1>Edit Product</h1>
                </div>
                <div>
                    {
                        editProductStatus == STATUS_QUO &&
                        <div>
                            <div>
                                <label>Principal Name</label>
                                <input value={name} name="name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                            </div>
                            <div>
                                <button onClick={this.onCancel}>Cancel</button>
                                <button onClick={this.onEditProduct}>Save</button>
                            </div>
                        </div>
                    }
                    {
                        editProductStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(EditProductComponent);
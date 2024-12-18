import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS,VIEWS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class AddProductComponent extends React.Component<any, any> {

  state = {
    principal: this.props.reducer.principal,
    addProductStatus: this.props.reducer.addProductStatus,
    name: '',
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onAddProduct = () => {
    let data = {
        principal: this.state.principal,
        name: this.state.name
    };
    this.props.AddProduct(data);
  }

  onCancel = () => {
    this.props.ChangeView(VIEWS.principalInfo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        addProductStatus: nextProps.reducer.addProductStatus
    });
  }

  public render(): React.ReactElement<{}> {
    const {principal,addProductStatus,name} = this.state;

    let title = "Add Product";

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
                    <h1>{principal.name}</h1>
                </div>
                <div>
                    {
                        addProductStatus == STATUS_QUO &&
                        <div>
                            <div>
                                <label>Add New Product</label>
                                <input value={name} name="name" type="text" onChange={e => { onFieldChange(e,this); }}/>
                            </div>
                            <div>
                                <button onClick={this.onCancel}>Cancel</button>
                                <button onClick={this.onAddProduct}>Add</button>
                            </div>
                        </div>
                    }
                    {
                        addProductStatus == LOADING &&
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(AddProductComponent);
import * as React from 'react';
import styles from './product.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {VIEWS} from '../../utis/constants';

class PrincipalComponent extends React.Component<any, any> {

  state = {
    principal: this.props.reducer.principal,
  }

  onPrincipalListClick = () => {
    this.props.ChangeView(VIEWS.principalList);
  }

  onBreadcrumbsItemClick = (e) => {
    let view = Number(e.currentTarget.getAttribute('data-view'));
    this.props.ChangeView(view);
  }

  onAddProductClick = () => {
    this.props.ChangeView(VIEWS.addProduct);
  }

  onEditPrincipalClick = () => {
    this.props.ChangeView(VIEWS.editPrincipal);
  }

  onDeactivatePrincipalClick = () => {
    this.props.ChangeView(VIEWS.deactivatePrincipal);
  }

  onEditProductClick = (product) => {
    this.props.SetProductValue(product);
    this.props.ChangeView(VIEWS.editProduct);
  }

  onDeactivateProductClick = (product) => {
    this.props.SetProductValue(product);
    this.props.ChangeView(VIEWS.changeProductState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        principal: nextProps.reducer.principal
      });
  }

  public render(): React.ReactElement<{}> {
    const {principal} = this.state;

    let title = "Principal Info";

    if (principal == null) {
        return (<div></div>)
    } else {

        let products = principal['products'] == null ? [] : principal.products;

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
                <h1>{principal.name}</h1>
                <br/>
                <h3>{principal.group == null ? "No Group" : principal.group.name}</h3>
                <div>
                  <button onClick={this.onEditPrincipalClick}>Edit Principal</button>
                  {
                    principal.active ?
                    <button onClick={this.onDeactivatePrincipalClick}>Deactivate Principal</button>
                    :
                    <button onClick={this.onDeactivatePrincipalClick}>Activate Principal</button>
                  }
                  <button onClick={this.onAddProductClick}>Add Product</button>
                </div>
              </div>
              <div>
                <ul>
                    {
                        products.map(product => <li key={product.id}>
                          <span>{product.name}</span>
                          <div>
                            <span onClick={e => {this.onEditProductClick(product)}}>Edit</span>
                            {
                              product.active == true ?
                              <span onClick={e => {this.onDeactivateProductClick(product)}}>Deactivate</span>
                              :
                              <span onClick={e => {this.onDeactivateProductClick(product)}}>Activate</span>
                            }
                          </div>
                          </li>)
                    }
                </ul>
                {
                    products.length == 0 &&
                    <p>No product to show.</p>
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(PrincipalComponent);
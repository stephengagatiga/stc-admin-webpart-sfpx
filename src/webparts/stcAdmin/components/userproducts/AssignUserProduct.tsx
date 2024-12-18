import * as React from 'react';
import styles from './userproducts.module.scss';
import styles2 from '../StcAdmin.module.scss';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS, VIEWS} from '../../utis/constants';
import RoleFieldComponent from '../roles/RoleFieldComponent';
import SupervisorFieldComponent from '../users/SupervisorFieldComponent';
import { onFieldChange } from '../../utis/Utils';

class AssignUserProduct extends React.Component<any, any> {

    searchUserTimeout = null;

    state = {
        user: this.props.reducer.user,
        getUserStatus: this.props.reducer.getUserStatus,
        editUserStatus: this.props.reducer.editUserStatus,
        updateUserProductStatus: this.props.reducer.updateUserProductStatus,
        principals: this.props.reducer.principals,
        principalId: '',
        productId: '',
    }

    onBreadcrumbsItemClick = (e) => {
        let view = Number(e.currentTarget.getAttribute('data-view'));
        this.props.ChangeView(view);
    }

    onAddUserProductClick = () => {
        let data = {
            user: this.state.user,
            productId: this.state.productId,
        }
        this.props.AssignUserProduct(data);
    }

    onRemoveProduct = (productAssignemt) => {
        let data = {
            productAssignemt: productAssignemt,
            user: this.state.user
        };
        this.props.RemoveUserProduct(data);
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.reducer.user;

        this.setState({
            editUserStatus: nextProps.reducer.editUserStatus,
            getUserStatus: nextProps.reducer.getUserStatus,
            updateUserProductStatus: nextProps.reducer.updateUserProductStatus,
            user: user,
        });

    }

    public render(): React.ReactElement<{}> {    
        const {user,getUserStatus,editUserStatus,principalId,productId,principals,updateUserProductStatus} = this.state;
        return (
        <div className={styles.userProductsModule}>
            <div className={styles2.menuBreadcrumbs}>
                <ul>
                    <li data-view={VIEWS.menu} onClick={this.onBreadcrumbsItemClick}>Menu</li>
                    <li data-view={VIEWS.userList} onClick={this.onBreadcrumbsItemClick}>Users</li>
                    <li>Assign Product</li>
                </ul>
            </div>
            {
                (editUserStatus == STATUS_QUO && getUserStatus == SUCCESS && user != null) &&
                <div>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                </div>
            }
            {
                (editUserStatus == STATUS_QUO && getUserStatus == SUCCESS && user != null) ?
                    <div>
                        {
                            updateUserProductStatus == STATUS_QUO &&
                            <div>
                                <label>Principal</label>
                                <select name="principalId" value={principalId} onChange={e => { onFieldChange(e,this); }}>
                                    <option value=""></option>
                                    {
                                        principals.map(principal => <option key={principal.id} value={principal.id}>{principal.name}</option>)
                                    }
                                </select>
                                <label>Product</label>
                                <select name="productId" value={productId} onChange={e => { onFieldChange(e,this); }}>
                                    <option value=""></option>
                                    {
                                        principals.filter(p => p.id == principalId).length != 0 &&
                                        principals.filter(p => p.id == principalId)[0].products.map(product => 
                                        {
                                            if (user.products.filter(pa => pa.productId == product.id).length == 0) {
                                                return(<option key={product.id} value={product.id}>{product.name}</option>)
                                            }
                                        })
                                    }
                                </select>
                                <button onClick={this.onAddUserProductClick}>Add</button>
                            </div>
                        }
                        {
                            updateUserProductStatus == LOADING &&
                            <p>Please wait...</p>
                        }
                        {
                            user.products.length == 0 ?
                            <p>No product assgined</p>
                            :
                            <div>
                                {
                                    user.products.map(pa => <li key={pa.id}>{pa.product.name}
                                        <div>
                                            <span onClick={e => { this.onRemoveProduct(pa); }}>Remove</span>
                                        </div>
                                    </li>)
                                }
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <p>Please wait...</p>
                    </div>
            }
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(AssignUserProduct);
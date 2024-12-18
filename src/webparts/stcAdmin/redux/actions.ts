import * as types from './actionTypes';
import {SERVER, LOADING, SUCCESS, INTERNAL_ERROR, STATUS_QUO, VIEWS} from '../utis/constants';

export function ChangeView(view) {
    return async dispatch => {
        dispatch({ type: types.CHANGE_VIEW, value: view });
    }
}

//#region Product

export function GetAllPrincipals()  {
     return async dispatch => {
        dispatch({ type: types.SET_GET_ALL_PRINCIPALS_STATUS, status: LOADING });

        fetch(`${SERVER}/principals/all`,{method: 'GET'})
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } 
                throw response.statusText;
            })
            .then(result => {
                dispatch({ type: types.SET_GET_ALL_PRINCIPALS_VALUE, value: result });
                dispatch({ type: types.SET_GET_ALL_PRINCIPALS_STATUS, status: SUCCESS });
            })
            .catch(error => {
                dispatch({ type: types.SET_GET_ALL_PRINCIPALS_STATUS, status: INTERNAL_ERROR });
            })
     }
}

export function SetPrincipalValue(principal) {
    return async dispatch => {
        dispatch({ type: types.SET_PRINCIPAL_VALUE, value: principal });
    }
}

export function AddProduct(data) {
    return async dispatch => {
        dispatch({ type: types.SET_ADD_PRODUCT_STATUS, status: LOADING });

        let body = {
            name: data.name
        }

        fetch(`${SERVER}/principals/${data.principal.id}/products`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } 
                throw response.statusText;
            })
            .then(result => {
                data.principal.products.push(result);
                dispatch({ type: types.SET_PRINCIPAL_VALUE, value: data.principal });
                dispatch({ type: types.SET_ADD_PRODUCT_STATUS, status: STATUS_QUO });
                dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalInfo });
            })
            .catch(error => {
                dispatch({ type: types.SET_ADD_PRODUCT_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function EditPrincipal(data) {
    return async dispatch => {
        dispatch({ type: types.SET_EDIT_PRINCIPAL_STATUS, status: LOADING });
        let groupId = data.group == null ? null : data.group.id;
        let body = {
            name: data.name,
            groupId: groupId,
        }

        fetch(`${SERVER}/principals/${data.principal.id}`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 204) {
                    data.principal.name = data.name;
                    if (groupId == null) {
                        data.principal.groupId = null;
                        data.principal.group = null;
                    } else {
                        data.principal.groupId = groupId;
                        data.principal.group = data.group;
                    }
                    dispatch({ type: types.SET_PRINCIPAL_VALUE, value: data.principal });
                    dispatch({ type: types.SET_EDIT_PRINCIPAL_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalInfo });
                } else {
                    throw response.statusText;
                }
            })
            .catch(error => {
                dispatch({ type: types.SET_EDIT_PRINCIPAL_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function AddPrincipal(data) {
    return async dispatch => {
        dispatch({ type: types.SET_ADD_PRINCIPAL_STATUS, status: LOADING });

        let body = {
            name: data.name,
            groupId: data.groupId == "" ? null : data.groupId
        }

        fetch(`${SERVER}/principals/`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } 
                throw response.statusText;
            })
            .then(result => {
                data.principals.push(result);
                dispatch({ type: types.SET_GET_ALL_PRINCIPALS_VALUE, value: data.principals });
                dispatch({ type: types.SET_ADD_PRINCIPAL_STATUS, status: STATUS_QUO });
                dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalList });
            })
            .catch(error => {
                dispatch({ type: types.SET_ADD_PRINCIPAL_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function EditProduct(data) {
    return async dispatch => {
        dispatch({ type: types.SET_EDIT_PRODUCT_STATUS, status: LOADING });

        let body = {
            name: data.name
        }

        fetch(`${SERVER}/principals/${data.principal.id}/products/${data.product.id}`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 204) {
                    data.product.name = data.name;
                    dispatch({ type: types.SET_PRODUCT_VALUE, value: data.product });
                    dispatch({ type: types.SET_EDIT_PRODUCT_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalInfo});
                } else {
                    throw response.statusText;
                } 
            })
            .catch(error => {
                dispatch({ type: types.SET_EDIT_PRODUCT_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function ChangeProductState(data) {
    return async dispatch => {
        dispatch({ type: types.SET_PRODUCT_STATE_STATUS, status: LOADING });

        let body = {
            active: data.state
        };

        fetch(`${SERVER}/principals/${data.principal.id}/products/${data.product.id}/active`,{method: 'POST', body: JSON.stringify(body),  headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 204) {
                    data.principal.products.forEach(product => {
                        if (product.id == data.product.id) {
                            product.active = data.state;
                        }
                    });
                    dispatch({ type: types.SET_PRINCIPAL_VALUE, value: data.principal });
                    dispatch({ type: types.SET_PRODUCT_STATE_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalInfo});
                } else {
                    throw response.statusText;
                } 
            })
            .catch(error => {
                dispatch({ type: types.SET_PRODUCT_STATE_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function ChangePrincipalState(data) {
    return async dispatch => {
        dispatch({ type: types.SET_PRINCIPAL_STATE_STATUS, status: LOADING });

        let body = {
            active: data.state
        }

        fetch(`${SERVER}/principals/${data.principal.id}/activate`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if (response.status == 204) {
                    data.principal.active = data.state;
                    dispatch({ type: types.SET_PRINCIPAL_VALUE, value: data.principal });
                    dispatch({ type: types.SET_PRINCIPAL_STATE_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: VIEWS.principalList});
                } else {
                    throw response.statusText;
                } 
            })
            .catch(error => {
                dispatch({ type: types.SET_PRINCIPAL_STATE_STATUS, status: INTERNAL_ERROR });
            })
    }
}

export function SetProductValue(product) {
    return async dispatch => {
        dispatch({ type: types.SET_PRODUCT_VALUE, value: product });
    }
}

//#endregion Product

//#region Group

export function GetAllGroups()  {
    return async dispatch => {
       dispatch({ type: types.SET_GET_GROUPS_STATUS, status: LOADING });

       fetch(`${SERVER}/groups/all`,{method: 'GET'})
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               dispatch({ type: types.SET_GET_GROUPS_VALUE, value: result });
               dispatch({ type: types.SET_GET_GROUPS_STATUS, status: SUCCESS });
           })
           .catch(error => {
               dispatch({ type: types.SET_GET_GROUPS_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function AddGroup(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_ADD_GROUP_STATUS, status: LOADING });

       let body = {
           name: data.name
       };

       fetch(`${SERVER}/groups`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'} })
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
                data.groups.push(result);
                dispatch({ type: types.SET_GET_GROUPS_VALUE, value: data.groups });
                dispatch({ type: types.SET_ADD_GROUP_STATUS, status: STATUS_QUO });
                dispatch({ type: types.CHANGE_VIEW, value: data.view });
           })
           .catch(error => {
               dispatch({ type: types.SET_ADD_GROUP_STATUS, status: INTERNAL_ERROR });
           })
    }
}


export function EditGroup(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_EDIT_GROUP_STATUS, status: LOADING });

       let body = {
           name: data.name
       };

       fetch(`${SERVER}/groups/${data.group.id}`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'} })
           .then(response => {
               if (response.status == 204) {
                    data.group.name = data.name;
                    dispatch({ type: types.SET_GROUP_VALUE, value: data.group });
                    dispatch({ type: types.SET_EDIT_GROUP_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: data.view });
               } else {
                   throw response.statusText;
               } 
           })
           .catch(error => {
               dispatch({ type: types.SET_EDIT_GROUP_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function SetGroup(group) {
    return async dispatch => {
        dispatch({ type: types.SET_GROUP_VALUE, value: group });
    }
}

export function ChangeGroupActivetState(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_GROUP_STATE_STATUS, status: LOADING });

       let body = {
           active: data.active
       };

       fetch(`${SERVER}/groups/${data.group.id}/active`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'} })
           .then(response => {
               if (response.status == 204) {
                    data.group.active = data.active;
                    dispatch({ type: types.SET_GROUP_VALUE, value: data.group });
                    dispatch({ type: types.SET_GROUP_STATE_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: data.view });
               } else {
                   throw response.statusText;
               } 
           })
           .catch(error => {
               dispatch({ type: types.SET_GROUP_STATE_STATUS, status: INTERNAL_ERROR });
           })
    }
}

//#endregion

//#region Roles


export function GetAllRoles()  {
    return async dispatch => {
       dispatch({ type: types.SET_GET_ROLES_STATUS, status: LOADING });

       fetch(`${SERVER}/userroles/all`,{method: 'GET'})
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               dispatch({ type: types.SET_GET_ROLES_VALUE, value: result });
               dispatch({ type: types.SET_GET_ROLES_STATUS, status: SUCCESS });
           })
           .catch(error => {
               dispatch({ type: types.SET_GET_ROLES_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function AddRole(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_ADD_ROLE_STATUS, status: LOADING });

       let body = {
           name: data.name
       };

       fetch(`${SERVER}/userroles`,{method: 'POST', body: JSON.stringify(body), headers: {"Content-Type": "application/json"} })
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               data.roles.push(result);
               dispatch({ type: types.SET_GET_ROLES_VALUE, value: data.roles });
               dispatch({ type: types.SET_ADD_ROLE_STATUS, status: STATUS_QUO });
                dispatch({ type: types.CHANGE_VIEW, value: data.view });
           })
           .catch(error => {
               dispatch({ type: types.SET_ADD_ROLE_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function SetRoleValue(role) {
    return async dispatch => {
        dispatch({ type: types.SET_ROLE_VALUE, value: role });
    }
}

export function EditRole(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_EDIT_ROLE_STATUS, status: LOADING });

       let body = {
           name: data.name,
           active: data.active == "true" ? true : false,
       };

       fetch(`${SERVER}/userroles/${data.role.id}`,{method: 'POST', body: JSON.stringify(body), headers: {"Content-Type": "application/json"} })
           .then(response => {
               if (response.status == 204) {
                    data.role.name = data.name;
                    data.role.active = data.active;
                    dispatch({ type: types.SET_ROLE_VALUE, value: data.role });
                    dispatch({ type: types.SET_EDIT_ROLE_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: data.view });
               } else {
                   throw response.statusText;
               }
           })
           .catch(error => {
               dispatch({ type: types.SET_EDIT_ROLE_STATUS, status: INTERNAL_ERROR });
           })
    }
}

//#endregion

//#region User

export function GetAllUsers()  {
    return async dispatch => {
       dispatch({ type: types.SET_GET_USERS_STATUS, status: LOADING });

       fetch(`${SERVER}/users/all`,{method: 'GET'})
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               dispatch({ type: types.SET_GET_USERS_VALUE, value: result });
               dispatch({ type: types.SET_GET_USERS_STATUS, status: SUCCESS });
           })
           .catch(error => {
               dispatch({ type: types.SET_GET_USERS_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function AddUser(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_ADD_USER_VALUE, status: LOADING });

        let body = {
            email: data.email,
            objectId: data.objectId,
            firstName: data.firstName,
            lastName: data.lastName,
            roleId: Number(data.roleId),
            supervisorId: Number(data.supervisorId),
        };

       fetch(`${SERVER}/users/`,{method: 'POST', body: JSON.stringify(body), headers: {"Accept": "application/json", "Content-Type": "application/json"} })
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               data.users.push(result);
               dispatch({ type: types.SET_GET_USERS_VALUE, value: data.users });
               dispatch({ type: types.SET_ADD_USER_VALUE, status: STATUS_QUO });
                dispatch({ type: types.CHANGE_VIEW, value: data.view });

           })
           .catch(error => {
               dispatch({ type: types.SET_ADD_USER_VALUE, status: INTERNAL_ERROR });
           })
    }
}

export function GetUserById(data, view)  {
    return async dispatch => {
        console.debug('click');

       dispatch({ type: types.SET_GET_USER_STATUS, status: LOADING });

       fetch(`${SERVER}/users/${Number(data.id)}`,{method: 'GET', headers: {"Accept": "application/json"} })
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
                dispatch({ type: types.SET_USER_VALUE, value: result });
                dispatch({ type: types.SET_GET_USER_STATUS, status: SUCCESS });
                console.debug(view);
                if (view != null && view != undefined) {
                    console.debug('change view');
                    dispatch({ type: types.CHANGE_VIEW, value: view });
                }

           })
           .catch(error => {
               dispatch({ type: types.SET_GET_USER_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function SaveUser(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_EDIT_USER_STATUS, status: LOADING });

       let body = {
           roleId: data.roleId,
           supervisorId: data.supervisorId,
           active: data.active == "true" ? true : false,
       }

       fetch(`${SERVER}/users/${data.user.id}`,{method: 'POST', body: JSON.stringify(body), headers: {"Content-Type": "application/json"} })
           .then(response => {
               if (response.status == 204) {

                    if (data.roleId == 0) {
                        data.user.roleId = null;
                        data.user.role = null;
                    } else {
                        data.user.roleId = data.roleId;
                        data.user.role = data.role;
                    } 
                    
                    if (data.supervisorId == 0) {
                        data.user.supervisorId = null;
                        data.user.supervisor = null;
                    } else {
                        data.user.supervisorId = data.supervisorId;
                        data.user.supervisor = data.supervisor;
                    } 

                    dispatch({ type: types.SET_USER_VALUE, value: data.user });
                    dispatch({ type: types.SET_EDIT_USER_STATUS, status: STATUS_QUO });
                    dispatch({ type: types.CHANGE_VIEW, value: data.view });
               } else {
                   throw response.statusText;
               }
           })
           .catch(error => {
               dispatch({ type: types.SET_EDIT_USER_STATUS, status: INTERNAL_ERROR });
           })
    }
}

//#endregion User

//#region User Products

export function AssignUserProduct(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: LOADING });

       let body = {
            userId: data.user.id,
            productId: data.productId
       }

       fetch(`${SERVER}/productassignment`,{method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }})
           .then(response => {
               if (response.status == 200) {
                   return response.json();
               } 
               throw response.statusText;
           })
           .then(result => {
               data.user.products.push(result);
               dispatch({ type: types.SET_USER_VALUE, value: data.user });
               dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: STATUS_QUO });
           })
           .catch(error => {
               dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: INTERNAL_ERROR });
           })
    }
}

export function RemoveUserProduct(data)  {
    return async dispatch => {
       dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: LOADING });

       fetch(`${SERVER}/productassignment/${data.productAssignemt.id}`,{method: 'DELETE'})
           .then(response => {
               if (response.status == 204) {
                   data.user.products = data.user.products.filter(p => p.id != data.productAssignemt.id);
                   dispatch({ type: types.SET_USER_VALUE, value: data.user });
                   dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: STATUS_QUO });
               } else {
                   throw response.statusText;
               }
           })
           .catch(error => {
               dispatch({ type: types.SET_UPDATE_USER_PRODUCT_STATUS, status: INTERNAL_ERROR });
           })
    }
}

//#endregion
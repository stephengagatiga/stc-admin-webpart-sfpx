import * as types from './actionTypes';
import {STATUS_QUO,VIEWS} from '../utis/constants';

const defautState = {
    principals: [],
    principalsStatus: STATUS_QUO,
    view: VIEWS.menu,
    principal: null,
    addProductStatus: STATUS_QUO,
    editPrincipalStatus: STATUS_QUO,
    addPrincipalStatus: STATUS_QUO,
    product: null,
    editProductStatus: STATUS_QUO,
    productStateStatus: STATUS_QUO,
    principaStatelStatus: STATUS_QUO,

    groupsStatus: STATUS_QUO,
    groups: [],
    addGroupStatus: STATUS_QUO,
    group: null,
    editGroupStatus: STATUS_QUO,
    groupStateStatus: STATUS_QUO,

    rolesStatus: STATUS_QUO,
    roles: [],
    addRoleStatus: STATUS_QUO,
    editRoleStatus: STATUS_QUO,
    role: null,

    usersStatus: STATUS_QUO,
    users: [],
    addUserStatus: STATUS_QUO,
    user: null,
    getUserStatus: STATUS_QUO,
    editUserStatus: STATUS_QUO,

    updateUserProductStatus: STATUS_QUO,

}

export default function reducer(state = defautState, action) {
    switch(action.type) {
        case types.CHANGE_VIEW:
            return {...state, view: action.value}

        case types.SET_GET_ALL_PRINCIPALS_STATUS:
            return {...state, principalsStatus: action.status}
        case types.SET_GET_ALL_PRINCIPALS_VALUE:
            return {...state, principals: action.value}
        case types.SET_PRINCIPAL_VALUE:
            return {...state, principal: action.value}
        case types.SET_ADD_PRODUCT_STATUS:
            return {...state, addProductStatus: action.status}
        case types.SET_EDIT_PRINCIPAL_STATUS:
            return {...state, editPrincipalStatus: action.status}
        case types.SET_ADD_PRINCIPAL_STATUS:
            return {...state, addPrincipalStatus: action.status}
        case types.SET_PRODUCT_VALUE:
            return {...state, product: action.value}
        case types.SET_EDIT_PRODUCT_STATUS:
            return {...state, editProductStatus: action.status}
        case types.SET_PRODUCT_STATE_STATUS:
            return {...state, productStateStatus: action.status}
        case types.SET_PRINCIPAL_STATE_STATUS:
            return {...state, principaStatelStatus: action.status}
        
        case types.SET_GET_GROUPS_STATUS:
            return {...state, groupsStatus: action.status}
        case types.SET_GET_GROUPS_VALUE:
            return {...state, groups: action.value}
        case types.SET_ADD_GROUP_STATUS:
            return {...state, addGroupStatus: action.status}
        case types.SET_GROUP_VALUE:
            return {...state, group: action.value}
        case types.SET_EDIT_GROUP_STATUS:
            return {...state, editGroupStatus: action.status}
        case types.SET_GROUP_STATE_STATUS:
            return {...state, groupStateStatus: action.status}

        case types.SET_GET_ROLES_STATUS:
            return {...state, rolesStatus: action.status}
        case types.SET_GET_ROLES_VALUE:
            return {...state, roles: action.value}
        case types.SET_ADD_ROLE_STATUS:
            return {...state, addRoleStatus: action.status}
        case types.SET_EDIT_ROLE_STATUS:
            return {...state, editRoleStatus: action.status}
        case types.SET_ROLE_VALUE:
            return {...state, role: action.value}

        case types.SET_GET_USERS_STATUS:
            return {...state, usersStatus: action.status}
        case types.SET_GET_USERS_VALUE:
            return {...state, users: action.value}
        case types.SET_ADD_USER_VALUE:
            return {...state, addUserStatus: action.status}
        case types.SET_GET_USER_STATUS:
            return {...state, getUserStatus: action.status}
        case types.SET_USER_VALUE:
            return {...state, user: action.value}
        case types.SET_EDIT_USER_STATUS:
            return {...state, editUserStatus: action.status}
        case types.SET_UPDATE_USER_PRODUCT_STATUS:
            return {...state, updateUserProductStatus: action.status}

        default:
            return state;
    }
}
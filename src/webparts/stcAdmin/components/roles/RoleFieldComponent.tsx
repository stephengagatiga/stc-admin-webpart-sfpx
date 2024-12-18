import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class RoleFieldComponent extends React.Component<any, any> {

    state = {
        roleId: 0,
        roles: this.props.reducer.roles,
        rolesStatus: this.props.reducer.rolesStatus,
    }

    componentDidMount() {
        let roleId = 0;
        if (this.props.value != null && this.props.value != undefined) {
            roleId = this.props.value;
        }

        this.setState({
            roleId: roleId
        });

    }

    onRoleSelectChange = (e) => {
        onFieldChange(e,this);
        let value = e.target.value;
        let role = null;

        if (value != 0) {
            role = this.state.roles.filter(r => r.id == value)[0];
        } else {
            role.id = 0;
        }

        if (this.props.onChange != undefined || this.props.onChange != null) {
            this.props.onChange(role); 
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            roles: nextProps.reducer.roles,
            rolesStatus: nextProps.reducer.rolesStatus
        });
    }

    public render(): React.ReactElement<{}> {
        const {roleId,roles,rolesStatus} = this.state;

        switch(rolesStatus) {
            case STATUS_QUO:            
            case LOADING:
                return (<div>Please wait...</div>);

            case SUCCESS:
                return (
                    <div>
                        Role:
                        <select name="roleId" value={roleId} onChange={this.onRoleSelectChange}>
                            <option value={0}></option>
                            {
                                roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)
                            }
                        </select>
                    </div>
                );   
            default:
                return (<div></div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        reducer: state
    };
}

function mapActionCreatorsToProps(dispatch) {
    let ab : any = actions;
    return bindActionCreators(ab,dispatch);
}

export default connect(mapStateToProps,mapActionCreatorsToProps)(RoleFieldComponent);
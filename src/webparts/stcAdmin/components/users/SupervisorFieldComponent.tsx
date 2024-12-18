import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/actions';
import {STATUS_QUO, LOADING, SUCCESS} from '../../utis/constants';
import {onFieldChange} from '../../utis/Utils';

class SupervisorFieldComponent extends React.Component<any, any> {

    state = {
        supervisorId: 0,
        users: this.props.reducer.users,
        usersStatus: this.props.reducer.usersStatus,
    }

    componentDidMount() {
        let supervisorId = 0;
        if (this.props.value != null && this.props.value != undefined) {
            supervisorId = this.props.value;
        }

        this.setState({
            supervisorId: supervisorId
        });

    }

    onSupervisorSelectChange = (e) => {
        onFieldChange(e,this);
        let value = e.target.value;
        let supervisor = null;

        if (value != 0) {
            supervisor = this.state.users.filter(r => r.id == value)[0];
        } else {
            supervisor.id = 0;
        }

        if (this.props.onChange != undefined || this.props.onChange != null) {
            this.props.onChange(supervisor); 
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: nextProps.reducer.users,
            usersStatus: nextProps.reducer.usersStatus
        });
    }

    public render(): React.ReactElement<{}> {
        const {supervisorId,users,usersStatus} = this.state;

        switch(usersStatus) {
            case STATUS_QUO:            
            case LOADING:
                return (<div>Please wait...</div>);

            case SUCCESS:
                return (
                    <div>
                        Supervisor:
                        <select name="supervisorId" value={supervisorId} onChange={this.onSupervisorSelectChange}>
                            <option value={0}></option>
                            {
                                users.map(user => <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>)
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

export default connect(mapStateToProps,mapActionCreatorsToProps)(SupervisorFieldComponent);
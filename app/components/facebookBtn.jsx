import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			 <FacebookLogin
			    appId={config.appId}
			    autoLoad={true}
			    fields="name,email,picture"
			    callback={this.props.callback} 
			    cssClass="facebook facebook-bg center-block square-btn"
			    />
    		</div>
		);
	}
}


FacebookBtn.propTypes = {
	callback: React.PropTypes.func
};

FacebookBtn.defaultProps = {
	callback: ()=>{}
};

export default FacebookBtn;
import React from 'react';

export default OriginalComponent => class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openItemId: null
        };
    }


    toggleOpenItem = openId => ref => {
        this.setState({
            openItemId: openId === this.state.openItemId ? null : openId
        });
    };

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleOpenItem={this.toggleOpenItem}/>;
    }
}
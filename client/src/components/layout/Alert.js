import React from "react";
// reactstrap components
import { UncontrolledAlert } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>

  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
       
      <UncontrolledAlert key={alert.id} color={`${alert.alertType}`} fade={false}>
          <span className="alert-inner--text">
            <strong>{alert.msg}</strong> 
          </span>
        </UncontrolledAlert>

  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
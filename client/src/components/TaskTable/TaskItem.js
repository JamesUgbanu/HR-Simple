
import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
// reactstrap components
import {
    Badge,
    Button
  } from "reactstrap";

const UserTaskItem = ({
    task: { id, due_date, created_on, completed_date, status },
    authUser
  }) => {
      
    return (
        <Fragment>
        <tbody>
        <tr key={id}>
        <td>{authUser.firstName+" " +authUser.lastname}</td>
        <td>Joseph Osinachi</td>
        <td><Moment format="MM/DD/YYYY">{created_on}</Moment></td>
        <td><Moment format="MM/DD/YYYY">{due_date}</Moment></td>
        <td>{completed_date ? <Moment format="MM/DD/YYYY">{completed_date}</Moment> : null}</td>
        <td>
            <Badge color="" className="badge-dot mr-4">
            <i className={status ==='open' ? 'bg-danger' : 'bg-success'} />
            {status}
            </Badge>
        </td>
        <td className="text-left">
        <Button href={`/tasks/me/${id}`} color="primary" type="button"> View</Button>
        </td>
        </tr>
        </tbody>
        </Fragment>
    );
  };

  UserTaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired
  };
  
  export default UserTaskItem;
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/auth";
import { createTask } from "../../actions/task";
import PropTypes from "prop-types";
import { Calendar } from 'react-date-range';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Container,
  Col
} from "reactstrap";
import Navbar from "../Navbar";
import UserHeader from "../UserHeader";
import Sidebar from "../Sidebar";
import Spinner from "../layout/Spinner";

const CreateTask = ({
  createTask,
  getUsers,
  auth: { users, user, dataLoading }
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

      const [formData, setFormData] = useState({
        taskName: "",
        description: "",
        dueDate: null
      });

      const {
        taskName,
        description
      } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  
   
  const onSubmit = async e => {
    e.preventDefault();
    createTask(formData);
  };
  
          const allUsers = users.filter(euser => euser.id !== user.id);
   if(dataLoading) {
            return <Spinner />
      } else {
    return (
      <>
       <Sidebar
          logo={{
            innerLink: "/",
            imgSrc: require("../../logo.svg"),
            imgAlt: "..."
          }}
        />
        <div className="main-content">
        <Navbar />
        <UserHeader />
        <Container className="mt--7" fluid>
        <Row className="justify-content-md-center">
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={e => onSubmit(e)}>
                <FormGroup>
                    <Input 
                    placeholder="Task Name" 
                    type="text"
                    name="taskName"
                    value={taskName}
                    onChange={e => onChange(e)}
                    required
                     />
                </FormGroup>
                <FormGroup>
                    <Input
                          className="form-control-alternative"
                          placeholder="Description"
                          name="description"
                          rows="4"
                          type="textarea"
                          value={description}
                          onChange={e => onChange(e)}
                          required
                        />
                </FormGroup>
                <FormGroup>
                <Calendar
                      minDate= {new Date()}
                      name="dueDate"
                      date={formData["dueDate"] ? new Date(formData["dueDate"]) : new Date()}
                      onChange={e => formData["dueDate"] = e.getTime()}
                    />
                </FormGroup>
                <FormGroup>
                <Input 
                type="select" 
                 id="exampleSelect"
                 name="assignee"
                 defaultValue=""
                 onChange={e => onChange(e)}
                   required>
                    <option value="" disabled>Choose Assigned to</option>
                    { allUsers.map(user => (
                        <option value={user.id} key={user.id}>{user.first_name+" "+user.last_name}</option>
                    ))}
                    
                  </Input>
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    New Task
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </Container>
        </div>
      </>
    );
  }
}
  CreateTask.propTypes = {
    createTask: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { getUsers, createTask }
  )(CreateTask);

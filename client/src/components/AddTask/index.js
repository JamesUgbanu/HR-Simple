import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/auth";
import PropTypes from "prop-types";


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

const AddTask = ({
  getUsers,
  isAuthenticated,
  auth: { users, user, loading, dataLoading }
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
          
          const allUsers = users.filter(euser => euser.id !== user.id);

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
              <Form role="form">
                <FormGroup>
                    <Input placeholder="Task Name" type="text" />
                </FormGroup>
                <FormGroup>
                    <Input
                          className="form-control-alternative"
                          placeholder="Description"
                          rows="4"
                          type="textarea"
                        />
                </FormGroup>
                <FormGroup>
                <Input type="select" name="select" defaultValue={'DEFAULT'} id="exampleSelect">
                    <option value="DEFAULT" disabled="disabled">Choose Assigned to</option>
                    { allUsers.map(user => (
                        <option key={user.id}>{user.first_name+" "+user.last_name}</option>
                    ))}
                    
                  </Input>
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button">
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

  AddTask.propTypes = {
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { getUsers }
  )(AddTask);

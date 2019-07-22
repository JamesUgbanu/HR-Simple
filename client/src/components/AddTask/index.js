import React from "react";

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

class Register extends React.Component {
  render() {
    return (
      <>
       <Sidebar
          logo={{
            innerLink: "/",
            imgSrc: require("../../logo.svg"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
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
                <Input type="select" name="select" id="exampleSelect">
                    <option selected disabled="disabled">Choose Assigned to</option>
                    <option>James</option>
                    <option>Issac</option>
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
}

export default Register;

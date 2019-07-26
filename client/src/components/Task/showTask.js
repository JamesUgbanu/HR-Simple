import React from "react";

// reactstrap components
import {
  Card,
  CardTitle,
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
              <CardTitle className="text-center">
                  <h3>Update Website</h3>
              </CardTitle>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                    <Input
                          className="form-control-alternative"
                          disabled
                          placeholder="Description"
                          rows="4"
                          type="textarea"
                        />
                </FormGroup>
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

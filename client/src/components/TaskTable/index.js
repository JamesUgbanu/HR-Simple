import React from "react";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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
          {/* Table */}
        <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Tasks</h3>
                  <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={e => e.preventDefault()}
                            >
                              All
                            </DropdownItem>
                            <DropdownItem
                              onClick={e => e.preventDefault()}
                            >
                              Open
                            </DropdownItem>
                            <DropdownItem
                              onClick={e => e.preventDefault()}
                            >
                              Ongoing
                            </DropdownItem>
                            <DropdownItem
                              onClick={e => e.preventDefault()}
                            >
                              Completed
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Task ID</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Assigned Date</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Completed Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>78348899-877898-67hj</td>
                      <td>James Ugbanu</td>
                      <td>Joseph Osinachi</td>
                      <td>22-08-2019</td>
                      <td>27-08-2019</td>
                      <td>29-08-2019</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td className="text-left">
                      <Button href="/task" color="primary" type="button"> View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>78348899-877898-67hj</td>
                      <td>James Ugbanu</td>
                      <td>Joseph Osinachi</td>
                      <td>22-08-2019</td>
                      <td>29-08-2019</td>
                      <td>30-08-2019</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          late
                        </Badge>
                      </td>
                      <td className="text-left">
                      <Button href="/task" color="primary" type="button"> View</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
        </div>
      </>
    );
  }
}

export default Register;

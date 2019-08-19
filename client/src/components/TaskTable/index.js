import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserTasks } from "../../actions/task";
//import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";
// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
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
import TaskItem from "./TaskItem";

const UserTask = ({
  getUserTasks,
  auth: { user, loading, dataLoading },
  tasks: { tasks }
}) => {
  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

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
                      <th scope="col">Assigned By</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Assigned Date</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Completed Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                    { tasks.length ? (
              tasks.map(task => (
                <TaskItem key={task.id} task={task} authUser={user} />
              ))
            ) : (
              <tbody>
              <tr style={{ textAlign: "right" }}><td>No Tasks Found!</td></tr>
              </tbody>
            )}
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

  UserTask.propTypes = {
    getUserTasks: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    tasks: PropTypes.object
  };
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    tasks: state.task
  });
  export default connect(
    mapStateToProps,
    { getUserTasks }
  )(UserTask);

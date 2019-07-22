import React from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Navbar from "../Navbar";
import Header from "../Header";
import Sidebar from "../Sidebar";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
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
          <Header />
          <Container fluid>
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;

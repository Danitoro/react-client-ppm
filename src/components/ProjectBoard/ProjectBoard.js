import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  //constructor to handler errors

  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }
  // estoy hay que cambiarlo porque en la versión de react nueva da problemas
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      debugger;
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (project_tasks) => {
      if (project_tasks.length < 1 || project_tasks.length == null) {
        if (project_tasks.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {project_tasks.projectNotFound}
            </div>
          );
          }else if (project_tasks.projectIdentifier) {
            return (
              <div className="alert alert-danger text-center" role="alert">
                {project_tasks.projectIdentifier}
              </div>
            );
        }else{
          return (
            <div className="alert alert-danger text-center" role="alert">
              No project Tasks on this board
            </div>
          );
        } 
      } else {
        return <Backlog project_tasks_prop={project_tasks} />;
      }
    };

    BoardContent = boardAlgorithm(project_tasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors,
});
// para conectar esto con el store modifico esto export default ProjectBoard; por esto:
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ExperimentCard from '../../shared/Card/Card';
import EditExperiment from '../ExperimentEdit/ExperimentEdit';
import {
  fetchExperiments,
  toggleModal,
  sortExperiments,
  toggleSortOrder,
  filterExperiments,
} from '../../../shared/actions';
import { Grid, Dropdown, Pagination, Search, Icon } from 'semantic-ui-react';
import { capitalize } from '../../../utils/commonFunctions';

import './ExperimentsList.css';

const sortParmetersEnums = {
  NAME: 'name',
  ID: 'id',
};

class ExperimentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      selectedExperiment: null,
      begin: 0,
      end: 20,
      activePage: 1,
      isFilterLoading: false,
      ascendingOrder: true,
    };
  }

  componentDidMount() {
    this.props.fetchExperiments();
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    const { filterExperiments } = this.props;

    this.setState({ isFilterLoading: true });
    filterExperiments(value);
    this.setState({ isFilterLoading: false });
  };

  handlePageClick = async (e, { activePage }) => {
    await this.setState((prevState) => {
      return {
        ...prevState,
        activePage: activePage,
        begin: activePage * 20 - 20,
        end: activePage * 20,
      };
    });
  };

  renderEditExperiment = () => {
    const { selectedExperiment } = this.state;
    const { isModalDisplayed } = this.props;

    return (
      <EditExperiment
        experiment={selectedExperiment}
        showEdit={isModalDisplayed}
        hideModal={toggleModal}
      />
    );
  };

  handleEditClicked = (experiment) => {
    const { toggleModal } = this.props;
    toggleModal(true);
    this.setState({
      selectedExperiment: experiment,
    });
  };

  handleDropdownChange = (e, { value }) => {
    const { sortExperiments } = this.props;
    sortExperiments(value);
  };

  renderList = () => {
    const { begin, end } = this.state;
    const experiments = this.props.experiments.slice(begin, end);
    const content = experiments.map((experiment) => {
      return (
        <Grid.Column key={experiment.id}>
          <ExperimentCard
            experiment={experiment}
            onEditClick={() => this.handleEditClicked(experiment)}
          />
        </Grid.Column>
      );
    });
    return <React.Fragment>{content}</React.Fragment>;
  };

  onSortOrder = () => {
    const { toggleSortOrder } = this.props;
    this.setState({
      ascendingOrder: !this.state.ascendingOrder,
    });
    toggleSortOrder();
  };

  renderSortIconClass = () => {
    const { ascendingOrder } = this.state;
    return `sort amount ${ascendingOrder ? 'down' : 'up'} big`;
  };

  render() {
    const { isFilterLoading, value, results } = this.state;
    const sortOrderClassname = this.renderSortIconClass();
    const dropdownOptions = Object.values(sortParmetersEnums).map((param) => {
      return {
        key: param,
        text: capitalize(param),
        value: param,
      };
    });
    return (
      <div className="wrapper">
        <h2>Available Experiments</h2>
        <div className="actions-wrapper">
          <Search
            placeholder="Search"
            loading={isFilterLoading}
            open={false}
            onSearchChange={this.handleSearchChange}
          />
          <div className="sort-wrapper">
            <Dropdown
              placeholder="Sort By"
              selection
              onChange={this.handleDropdownChange}
              options={dropdownOptions}
            ></Dropdown>

            <div className="sort-order-wrapper">
              <Icon
                className={sortOrderClassname}
                onClick={this.onSortOrder}
              ></Icon>
            </div>
          </div>
        </div>
        <Grid columns={4}>{this.renderList()}</Grid>
        {this.renderEditExperiment()}
        <div className="pagination-wrapper">
          <Pagination
            defaultActivePage={1}
            totalPages={Math.ceil(this.props.experiments.length / 20)}
            onPageChange={this.handlePageClick}
            ellipsisItem={null}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    experiments: state.experiments.displayedExperiments,
    isModalDisplayed: state.modal.isModalDisplayed,
  };
};

export default connect(mapStateToProps, {
  fetchExperiments,
  sortExperiments,
  filterExperiments,
  toggleModal,
  toggleSortOrder,
})(ExperimentsList);

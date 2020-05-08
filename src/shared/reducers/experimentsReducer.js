import _ from 'lodash';
import {
  FETCH_EXPERIMENTS,
  FETCH_EXPERIMENT,
  EDIT_EXPERIMENT,
  SORT_EXPERIMENTS,
  TOGGLE_SORT_ORDER,
  FILTER_EXPERIMENTS,
} from '../actions/types';

const initialState = {
  experiments: [],
  displayedExperiments: [],
  detailedExperiment: {},
  experimentToEdit: {},
};

const sortExperiments = (param, experiments) =>
  experiments.sort((a, b) => a[param].localeCompare(b[param]));

const orderSort = (experiments) => experiments.reverse();

const filterExperiments = (term, experiments) => {
  if (!term) {
    return experiments;
  }
  return experiments.filter(({ id }) => id === term);
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case FETCH_EXPERIMENTS:
      return {
        ...state,
        experiments: payload,
        displayedExperiments: payload,
      };

    case FETCH_EXPERIMENT:
      return {
        ...state,
        detailedExperiment: payload,
      };

    case EDIT_EXPERIMENT:
      const updatedExperiments = [...state.experiments].map((experiment) =>
        experiment.id === payload.id ? payload : experiment
      );

      return {
        ...state,
        experiments: updatedExperiments,
        displayedExperiments: updatedExperiments,
      };

    case SORT_EXPERIMENTS:
      const { displayedExperiments } = state;
      const sorted = sortExperiments(payload, displayedExperiments.slice());

      return {
        ...state,
        displayedExperiments: sorted,
      };

    case TOGGLE_SORT_ORDER:
      const ordered = orderSort(state.displayedExperiments.slice());

      return {
        ...state,
        displayedExperiments: ordered,
      };

    case FILTER_EXPERIMENTS:
      const filtered = filterExperiments(payload, state.experiments.slice());

      return {
        ...state,
        displayedExperiments: filtered,
      };
    default:
      return state;
  }
};

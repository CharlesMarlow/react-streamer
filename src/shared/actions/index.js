import experiments from '../apis/experiments';
import {
  FETCH_EXPERIMENTS,
  FETCH_EXPERIMENT,
  EDIT_EXPERIMENT,
  TOGGLE_MODAL,
  SORT_EXPERIMENTS,
  TOGGLE_SORT_ORDER,
  FILTER_EXPERIMENTS,
} from './types';

export const fetchExperiments = () => async (dispatch) => {
  const response = await experiments.get('/experiments');
  dispatch({
    type: FETCH_EXPERIMENTS,
    payload: response.data,
  });
};

export const fetchExperiment = (id) => async (dispatch) => {
  const response = await experiments.get(`/experiments/${id}`);
  dispatch({
    type: FETCH_EXPERIMENT,
    payload: response.data,
  });
};

export const editExperiment = (id, { experimentName }) => async (dispatch) => {
  const { data } = await experiments.patch(`/experiments/${id}`, {
    name: experimentName,
  });

  dispatch({
    type: EDIT_EXPERIMENT,
    payload: data,
  });
};

export const sortExperiments = (value) => async (dispatch) => {
  dispatch({
    type: SORT_EXPERIMENTS,
    payload: value,
  });
};

export const filterExperiments = (term) => async (dispatch) => {
  dispatch({
    type: FILTER_EXPERIMENTS,
    payload: term.toUpperCase(),
  });
};

export const toggleSortOrder = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_SORT_ORDER,
  });
};

export const toggleModal = (flag) => async (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: flag,
  });
};

import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setApplicationsRound1 as _setApplicationsRound1,
  toggleRound1 as _toggleRound1,
  toggleSelectAllRound1 as _toggleSelectAllRound1,
  toggleRound2 as _toggleRound2,
  setApplicationsRound2 as _setApplicationsRound2,
} from './applicationSlice';
import {Application} from './types';
import {useCallback} from 'react';

export const useSelectApplicants = () => {
  const dispatch = useAppDispatch();
  const applicationsStateRound1 = useAppSelector(
    state => state.applications.applicationsRound1,
  );
  const selectedApplicationsRound1 = useAppSelector(
    state => state.applications.applicationsSelectedRound1,
  );
  const notSelectedApplicationsRound1 = useAppSelector(
    state => state.applications.applicationsNotSelectedRound1,
  );
  const selectedAll = useAppSelector(
    state => state.applications.selectedAllRound1,
  );

  const setApplicationsRound1 = useCallback(
    (applications: Application[]) => {
      dispatch(_setApplicationsRound1(applications));
    },
    [dispatch],
  );

  const toggleRound1 = useCallback(
    (applicationId: number) => {
      dispatch(_toggleRound1(applicationId));
    },
    [dispatch],
  );

  const toggleSelectAllRound1 = useCallback(() => {
    dispatch(_toggleSelectAllRound1());
  }, [dispatch]);

  const applicationsStateRound2 = useAppSelector(
    state => state.applications.applicationsRound2,
  );
  const selectedApplicationsRound2 = useAppSelector(
    state => state.applications.applicationsSelectedRound2,
  );
  const notSelectedApplicationsRound2 = useAppSelector(
    state => state.applications.applicationsNotSelectedRound2,
  );
  const toggleRound2 = useCallback(
    (applicationId: number) => {
      dispatch(_toggleRound2(applicationId));
    },
    [dispatch],
  );

  const setApplicationsRound2 = useCallback(
    (applications: Application[]) => {
      dispatch(_setApplicationsRound2(applications));
    },
    [dispatch],
  );

  return {
    applicationsStateRound1,
    selectedApplicationsRound1,
    notSelectedApplicationsRound1,
    selectedAll,
    setApplicationsRound1,
    toggleRound1,
    toggleSelectAllRound1,
    applicationsStateRound2,
    selectedApplicationsRound2,
    notSelectedApplicationsRound2,
    toggleRound2,
    setApplicationsRound2,
  };
};

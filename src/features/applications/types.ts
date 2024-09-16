interface Application {
  id: number | null;
  advert_id: number | null;
  status: string | null;
  applicant_id: number | null;
}

interface ApplicationState {
  loading: boolean;
  applications: Application[];
}

export type {Application, ApplicationState};

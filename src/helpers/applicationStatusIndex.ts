export const applicationStatusIndex = (status: string) => {
  return ['active', 'closed', 'offered', 'deleted'].indexOf(status);
};

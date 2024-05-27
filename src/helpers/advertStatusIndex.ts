export const advertStatusIndex = (status: string) => {
  switch (status) {
    case 'open':
      return 0;
    case 'review':
      return 1;
    case 'viewing':
      return 2;
    case 'offered':
      return 3;
    default:
      return 0;
  }
};

export const currentApplicationStatus = (status: string) => {
  ['open', 'review', 'viewing', 'offered', 'closed'].indexOf(status ?? '');
};

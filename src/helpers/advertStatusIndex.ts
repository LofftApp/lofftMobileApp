

export const advertStatusIndex = (status: string) => {
  return ['open', 'review', 'viewing', 'offered', 'closed'].indexOf(
    status ?? '',
  );
};

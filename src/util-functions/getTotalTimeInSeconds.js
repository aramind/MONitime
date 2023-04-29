const getTotalTimeInSeconds = (record) => {
  return record.activities.reduce(
    (total, activity) => +total + +activity.seconds_spent,
    0
  );
};

export default getTotalTimeInSeconds;

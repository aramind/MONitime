// function getActivityPercentage(record, activityName) {
//   const activity = record.activities.find(
//     (activity) => activity.name === activityName
//   );
//   if (!activity) {
//     return 0;
//   }
//   const totalSecondsSpent = record.activities.reduce(
//     (total, activity) => total + parseInt(activity.seconds_spent),
//     0
//   );
//   const percentage = (activity.seconds_spent / totalSecondsSpent) * 100;
//   return percentage;
// }

function getActivityPercentage(record, activityName) {
  const activity = record.activities.find(
    (activity) => activity.name === activityName
  );

  if (!activity)
    return {
      name: activityName,
      seconds_spent: 0,
      percentage: 0,
    };
  const totalSecondsSpent = record.activities.reduce(
    (total, activity) => +total + +activity.seconds_spent,
    0
  );
  if (!activity) {
    return {
      name: activityName,
      seconds_spent: 0,
      percentage: "0%",
    };
  }
  const percentage = (
    (activity.seconds_spent / totalSecondsSpent) *
    100
  ).toFixed(2);
  return {
    name: activity.name,
    seconds_spent: activity.seconds_spent,
    percentage: isNaN(percentage) ? 0 : `${percentage}%`,
  };
}

export default getActivityPercentage;

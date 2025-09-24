// // components/insightsBar/metricsData.ts
// export const initialMetrics = [
//   { title: "Time to First Review" },
//   { title: "Average Merge Time" },
//   { title: "Most Active Member" },
// ];

// components/insightsBar/metricsRegistry.ts
import TimeToFirstReviewCard from "./cards/timeToFirstReviewCard" 
import AvgMergeTimeCard from "./cards/avgMergeTimeCard";
import MostActiveMemberCard from "./cards/mostActiveMemberCard";
import PRAuthorCard from "./cards/prAuthorCard";
import AssignedReviewersCard from "./cards/assignedReviewersCard";

// export const metricsRegistry = [
//   { id: "timeToFirstReview", title: "Time to First Review", component: TimeToFirstReviewCard },
//   { id: "avgMergeTime", title: "Average Merge Time", component: AvgMergeTimeCard },
//   { id: "mostActiveMember", title: "Most Active Member", component: MostActiveMemberCard },
// ];

export const metricsRegistry = [
  { id: "timeToFirstReview", title: "Time to First Review", component: TimeToFirstReviewCard },
  { id: "avgMergeTime", title: "Average Merge Time", component: AvgMergeTimeCard },
  { id: "prAuthor", title: "PR Author", component: PRAuthorCard },
  { id: "assignedReviewers", title: "Assigned Reviewers", component: AssignedReviewersCard },
  { id: "mostActiveMember", title: "Most Active Member", component: MostActiveMemberCard }
]

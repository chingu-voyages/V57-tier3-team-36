export type PRFilterState = {
  prStatus: 'open' | 'merged';
  involvesMe: boolean;
  reviewProgress: 'none' | 'approved' | 'changes_requested' | null;
};

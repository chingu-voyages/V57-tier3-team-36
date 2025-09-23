import { CommentIcon } from "@/components/icons/CommentIcon";

export const ReviewCommentsCounter = ({
  review_comments,
}: {
  review_comments?: number;
}) => {
  return (
    <div className="flex items-center gap-1 ml-auto">
      <CommentIcon />
      <p>{review_comments || 0}</p>
    </div>
  );
};

import Image from "next/image";
import DefaultAvatar from "/public/images/github/defaultAvatar.svg";
export const GitHubAvatar = ({ url }: { url: string }) => {
  return (
    <Image
      src={url || DefaultAvatar}
      alt="GitHub Avatar"
      width={40}
      height={40}
      className="rounded-full"
      placeholder="empty"
    />
  );
};

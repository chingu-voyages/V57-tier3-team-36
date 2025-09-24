import Image from "next/image";
export const GitHubAvatar = ({ url }: { url: string }) => {
  return (
    <Image
      src={url || "/images/github/defaultAvatar.svg"}
      alt="GitHub Avatar"
      width={40}
      height={40}
      className="rounded-full"
      placeholder="empty"
    />
  );
};

import Image from "next/image";
export const GitHubAvatar = ({ url }: { url: string }) => {
  if (!url) return null;
  return (
    <Image
      src={url}
      alt="GitHub Avatar"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
};

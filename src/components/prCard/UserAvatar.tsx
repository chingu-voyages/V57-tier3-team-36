import Image from "next/image";
export const UserAvatar = ({ url }: { url: string }) => {
  if (!url) return null;
  return (
    <Image
      src={url}
      alt="User Avatar"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
};

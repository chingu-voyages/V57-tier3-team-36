import { auth } from "@/lib/auth";
import { getUserId } from "@/lib/auth/getUserId";

export async function getBearerAccessToken() {
  try {
    const userId = await getUserId();
    if (!userId) return null;

    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: "github",
        userId,
      },
    });
    if (!accessToken) return null;

    return `Bearer ${accessToken}`;
  } catch (error) {
    console.error("Failed to get access token:\n", error);
    return null;
  }
}

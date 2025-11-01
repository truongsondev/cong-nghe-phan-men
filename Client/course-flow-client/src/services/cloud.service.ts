import ImageKit from "imagekit-javascript";
import authenService from "@/services/authen.service";
import { EndpointService } from "./endpoint.service";
import { endpoint } from "@/constants/shared.constant";
class CloudService {
  ik = new ImageKit({
    publicKey: "public_bMW1GgqTUywDdbi7kL18vJuEjQw=",
    urlEndpoint: "https://ik.imagekit.io/mox5qz4rl",
  });
  private static instanceCloudService: CloudService;
  public static getInstanceCloudService() {
    if (!CloudService.instanceCloudService) {
      CloudService.instanceCloudService = new CloudService();
    }
    return CloudService.instanceCloudService;
  }
  uploadFileToCloud = async (
    file: File | string | undefined,
    typeFile: string
  ) => {
    if (!file) return;

    const authToken = await authenService.getSignedUrl();

    const authData = authToken?.data.data;

    try {
      const result = await this.ik.upload({
        file,
        fileName: typeof file === "string" ? "file" : file.name,
        signature: authData.signature,
        expire: authData.expire,
        token: authData.token,
        folder: `/courses/${typeFile}`,
      });

      return result;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };
}
const cloudService = CloudService.getInstanceCloudService();
export default cloudService;

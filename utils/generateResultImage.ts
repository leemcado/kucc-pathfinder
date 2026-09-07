import { CAREER } from "@/app/constant";
import { asset } from "./basePath";

/**
 * @test 이 함수는 테스트용입니다. 실제로 사용하는 함수는 아닙니다.
 */
export const generateResultImage = (type: keyof typeof CAREER) => {
  const result = CAREER[type];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = 600;
  canvas.height = 1000;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.fillStyle = "#000000";

  const title = new Image();
  title.src = asset("/title.png"); // 437 x 213
  title.onload = () => {
    const titleWidth = 300;
    const titleHeight = (title.height * titleWidth) / title.width;
    ctx.drawImage(
      title,
      (canvas.width - titleWidth) / 2,
      0,
      titleWidth,
      titleHeight,
    );

    ctx.font = "32px pretendard";
    ctx.fillText(result.emoji, canvas.width / 2, 200 + 15);

    ctx.font = "bold 24px pretendard";
    ctx.fillStyle = "#c3201f";
    ctx.fillText(result.summary, canvas.width / 2, 240 + 15);

    ctx.font = "bold 64px HakgyoansimDunggeunmisoTTF-B";
    ctx.fillStyle = "#000000";
    ctx.fillText(result.title, canvas.width / 2, 310 + 15);

    ctx.font = "bold 28px pretendard";
    ctx.fillText(
      "고려대학교 중앙 컴퓨터 동아리 KUCC",
      canvas.width / 2,
      canvas.height - 32,
    );

    const img = new Image();
    img.onload = () => {
      const imgWidth = 512;
      const imgHeight = (img.height * imgWidth) / img.width;
      ctx.drawImage(
        img,
        (canvas.width - imgWidth) / 2,
        380,
        imgWidth,
        imgHeight,
      );

      const link = document.createElement("a");
      link.download = `${type}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = asset(result.image);
  };
};

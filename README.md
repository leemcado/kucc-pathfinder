# 나에게 맞는 IT 직군은?

> 2026 동아리박람회 홍보용 프로젝트

## 프로젝트 소개
| 홈  | 테스트 | 결과 |
| ------------- | ------------- | ------------- |
| <img src=https://github.com/user-attachments/assets/07b310ee-b31f-49ca-b887-740c026f00e6 width="200" />  |  <img src="https://github.com/user-attachments/assets/0445b82f-4733-431a-b625-b96320ddf054" width="200" />  | <img src="https://github.com/user-attachments/assets/36bc74bb-0e17-441f-a175-082fdcc40b34" width="200" />  |

MBTI를 기반으로 질문에 선택지를 제시하고, 그에 따라 IT 직군을 추천하는 (겸사겸사 KUCC 홍보용..) 프로젝트입니다.

## 기여자

- 기획: 김현채, 임창현
- 아트: 정유나
- 개발: 김현채

## 기타

- 프로젝트를 수정하거나 디벨롭하고 싶으시면 그냥 하시면 됩니다.
- 원본 배포는 [김현채](https://github.com/r-4bb1t) Vercel 계정으로 되어있습니다.
- 이 포크는 GitHub Pages로 배포됩니다: https://leemcado.github.io/kucc-pathfinder/
- 문의는 김현채에게 연락 주세요.

## 배포 (GitHub Pages)

`main`에 푸시하면 `.github/workflows/deploy.yml`이 Next.js 정적 export(`output: "export"`)를
빌드해 GitHub Pages에 배포합니다.

GitHub Pages는 `https://<user>.github.io/<repo>/` 하위 경로로 서비스되므로 빌드 시
`NEXT_PUBLIC_BASE_PATH`가 주입됩니다. `next/link`와 라우터는 `basePath`를 자동으로 처리하지만,
순수 `<img>` 태그와 `unoptimized`인 `next/image`는 그렇지 않으므로 `utils/basePath.ts`의
`asset()` 헬퍼로 경로를 감싸야 합니다.

```bash
# 로컬 개발 (basePath 없음)
pnpm dev

# 배포와 동일한 조건으로 정적 빌드
NEXT_PUBLIC_BASE_PATH=/kucc-pathfinder \
NEXT_PUBLIC_SITE_URL=https://leemcado.github.io/kucc-pathfinder \
pnpm build   # -> out/
```

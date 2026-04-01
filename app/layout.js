import './globals.css';

export const metadata = {
  title: '은하노트 - 사주로 읽는 나와 관계의 이야기',
  description: '사주를 바탕으로 사람과 관계를 더 잘 이해하게 도와주는 AI 마법 노트. 기본 사주, 신년운세, 궁합 분석, 관계 코치 AI.',
  keywords: '사주, 운세, 궁합, 관계, AI, 마법노트, 은하노트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1E0A3C" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

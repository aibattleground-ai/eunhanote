'use client';
import { useState } from 'react';
import StarsBg from '../components/StarsBg';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const QUARTERS = [
  { season: '봄', months: '1월 – 3월', icon: '🌸', color: '#F9A8D4', colorBg: 'rgba(249,168,212,0.1)',
    title: '새로운 시작의 에너지',
    text: '병오년 갑진월과의 상생으로 봄 에너지가 강하게 흐릅니다. 새로운 관계나 프로젝트를 시작하기 좋은 시기. 특히 2월 말~3월은 귀인을 만날 가능성이 높습니다. 금전적으로 소소한 횡재수가 있을 수 있으니 주변을 주의 깊게 살펴보세요.' },
  { season: '여름', months: '4월 – 6월', icon: '☀️', color: '#F59E0B', colorBg: 'rgba(245,158,11,0.1)',
    title: '열정과 성과의 시간',
    text: '일간 임수와 화(火) 기운의 충돌이 예상되지만, 이는 오히려 추진력을 높이는 긍정적 에너지로 작용합니다. 직업적 성과를 낼 수 있는 절호의 타이밍. 단 지나친 자신감은 인간관계에서 오해를 부를 수 있으니 소통에 신경 쓰세요.' },
  { season: '가을', months: '7월 – 9월', icon: '🍂', color: '#4ADE80', colorBg: 'rgba(74,222,128,0.1)',
    title: '내면의 성숙기',
    text: '결실의 계절처럼 상반기에 심은 씨앗이 구체적인 형태를 갖추기 시작합니다. 금(金) 기운의 도움으로 재물 흐름이 안정화됩니다. 연애 중이라면 관계가 한층 깊어지는 시기. 혼자인 분들은 9월을 주목해보세요.' },
  { season: '겨울', months: '10월 – 12월', icon: '❄️', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.1)',
    title: '정리와 준비의 계절',
    text: '임수 일간에게 겨울은 힘을 충전하는 season. 무리한 도전보다 내년을 위한 준비에 집중하세요. 건강에 특히 주의할 시기로, 수(水) 기운이 강해지는 11~12월엔 신장·방광 관리가 중요합니다. 가족과 따뜻한 시간을 보내는 것이 좋은 에너지를 만듭니다.' },
];

const KEYWORDS = ['귀인 만남', '직업적 성장', '관계 깊어짐'];

export default function NewYearPage() {
  const [showModal, setShowModal] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedQ, setExpandedQ] = useState(null);

  const handleStart = () => {
    setShowModal(false);
    setLoading(true);
    setTimeout(() => { setLoading(false); setAnalyzed(true); setExpandedQ(0); }, 2000);
  };

  return (
    <div className="page-container">
      <StarsBg count={40} />
      <TopBar title="신년운세" backHref="/home" />

      <div className="content-area">
        {/* Year header */}
        <div className={styles.yearHeader}>
          <div className={styles.yearDecor}>✦</div>
          <h2 className={styles.yearTitle}>2026년 병오년</h2>
          <div className={styles.yearDecor}>✦</div>
        </div>
        <p className={styles.yearDesc}>올 한 해 당신의 사주와 세운이 만나는<br />운세 흐름을 분기별로 알아보세요</p>

        {!analyzed && !loading && (
          <>
            <div className={styles.previewCards}>
              {QUARTERS.map((q) => (
                <div key={q.season} className={styles.previewChip} style={{ borderColor: `${q.color}44`, background: q.colorBg }}>
                  <span>{q.icon}</span>
                  <span style={{ color: q.color, fontWeight: 600 }}>{q.season}</span>
                </div>
              ))}
            </div>
            <button className={`btn-primary ${styles.analyzeBtn}`} onClick={() => setShowModal(true)}>
              ✦ 2026년 운세 펼치기 (구슬 1개)
            </button>
          </>
        )}

        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner}>
              <div className={styles.spinRing} /><span>✦</span>
            </div>
            <p>2026년 세운을 분석하는 중...</p>
          </div>
        )}

        {analyzed && (
          <div className={styles.results}>
            {/* Keywords */}
            <div className={styles.keywordsRow}>
              {KEYWORDS.map((k) => (
                <span key={k} className={styles.keywordTag}># {k}</span>
              ))}
            </div>

            {/* Summary */}
            <div className={styles.summaryCard}>
              <p className={styles.summaryText}>💫 올해는 <strong>임수 일간</strong>에 목(木) 대운이 맞물리며 성장과 확장의 한 해가 될 것입니다. 새로운 기회를 두려워하지 말고, 상반기의 기세를 잃지 않는 것이 핵심입니다.</p>
            </div>

            {/* Quarter cards */}
            {QUARTERS.map((q, i) => (
              <div
                key={q.season}
                className={styles.quarterCard}
                style={{ borderColor: `${q.color}35`, background: q.colorBg, animationDelay: `${i * 0.1}s` }}
                onClick={() => setExpandedQ(expandedQ === i ? null : i)}
              >
                <div className={styles.quarterHeader}>
                  <span className={styles.seasonIcon}>{q.icon}</span>
                  <div className={styles.seasonInfo}>
                    <span className={styles.seasonName} style={{ color: q.color }}>{q.season} · {q.months}</span>
                    <span className={styles.seasonTitle}>{q.title}</span>
                  </div>
                  <span className={styles.chevron} style={{ transform: expandedQ === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
                {expandedQ === i && (
                  <p className={styles.quarterText}>{q.text}</p>
                )}
              </div>
            ))}

            <button className="btn-secondary" style={{ width: '100%', marginTop: 8 }}>📄 이미지로 저장</button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className={styles.modalHandle} />
            <div style={{ textAlign: 'center', fontSize: 40, marginBottom: 12 }}>🔮</div>
            <h3 className={styles.modalTitle}>구슬 1개를 사용할까요?</h3>
            <p className={styles.modalDesc}>2026년 신년운세를 분기별로 분석해드립니다. 같은 해 결과는 무료로 다시 확인할 수 있어요.</p>
            <div className={styles.modalBalance}>현재 잔액 <strong>12구슬</strong></div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleStart}>확인 ✦</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

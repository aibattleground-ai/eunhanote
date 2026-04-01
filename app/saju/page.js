'use client';
import { useState } from 'react';
import Link from 'next/link';
import StarsBg from '../components/StarsBg';
import SakuraFalling from '../components/SakuraFalling';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const SECTIONS = [
  { key: 'personality', icon: '🌟', title: '핵심 성격', color: '#C084FC',
    text: '임수(壬水) 일간의 당신은 깊고 유연한 사고력을 가졌습니다. 표면적으로는 조용해 보이지만 내면에는 강한 의지와 지혜가 흐릅니다. 상황에 맞게 자신을 변화시키는 능력이 탁월하며, 직관이 매우 발달해 있어 사람의 마음을 빠르게 읽는 편입니다.' },
  { key: 'love', icon: '💜', title: '연애 스타일', color: '#F9A8D4',
    text: '감정을 쉽게 드러내지 않지만 한번 마음을 준 사람에게는 깊고 헌신적입니다. 상대에게 많은 걸 바라기보다 조용히 옆에서 지켜주는 스타일. 다만 감정 표현이 서툴러 오해를 살 수 있으니, 마음속 이야기를 조금 더 꺼내보세요.' },
  { key: 'career', icon: '💼', title: '직업 적성', color: '#60A5FA',
    text: '분석력과 통찰력이 뛰어나 연구직, 전략 기획, 컨설팅 분야에서 두각을 보입니다. 금(金) 기운과의 조화로 기술·IT 분야도 적합합니다. 혼자 깊게 파고드는 작업보다 팀과 협업하는 환경에서 더 빛을 발합니다.' },
  { key: 'health', icon: '🌿', title: '건강 포인트', color: '#4ADE80',
    text: '수(水) 기운이 강해 신장·방광 기능에 주의가 필요합니다. 물을 충분히 마시고 몸을 따뜻하게 유지하는 것이 중요합니다. 스트레스가 쌓이면 등이나 허리에 먼저 신호가 오니 정기적인 스트레칭을 권장합니다.' },
  { key: 'wealth', icon: '✨', title: '재물 운', color: '#F59E0B',
    text: '재물운은 꾸준한 편이며 갑작스러운 큰 투자보다 안정적인 저축·적립 방식이 잘 맞습니다. 목(木) 대운이 들어오는 올해는 새로운 수익원을 탐색하기 좋은 시기입니다. 충동적인 지출만 조심하면 서서히 자산이 쌓이는 해입니다.' },
];

export default function SajuPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setShowModal(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2200);
  };

  return (
    <div className="page-container">
      <SakuraFalling count={20} />
      <StarsBg count={40} />
      <TopBar title="기본 사주 분석" backHref="/home" />

      <div className="content-area">
        {/* Saju Pillars */}
        <div className={styles.sajuHeader}>
          <div className={styles.sajuPillars}>
            {[
              { pillar: '연주', sky: '丙', earth: '午', sky_kr: '병', earth_kr: '오', color: '#F87171' },
              { pillar: '월주', sky: '甲', earth: '辰', sky_kr: '갑', earth_kr: '진', color: '#4ADE80' },
              { pillar: '일주', sky: '壬', earth: '子', sky_kr: '임', earth_kr: '자', color: '#60A5FA', isMe: true },
              { pillar: '시주', sky: '庚', earth: '申', sky_kr: '경', earth_kr: '신', color: '#E5E7EB' },
            ].map((p) => (
              <div key={p.pillar} className={`${styles.pillarBox} ${p.isMe ? styles.pillarBoxMe : ''}`}>
                <span className={styles.pillarLabel}>{p.pillar}</span>
                <div className={styles.pillarSky} style={{ color: p.color }}>{p.sky}</div>
                <div className={styles.pillarSkyKr}>{p.sky_kr}</div>
                <div className={styles.dividerLine} />
                <div className={styles.pillarEarth} style={{ color: p.color, opacity: 0.8 }}>{p.earth}</div>
                <div className={styles.pillarEarthKr}>{p.earth_kr}</div>
              </div>
            ))}
          </div>
          <div className={styles.ilganBadge}>
            <span>일간 · 임수(壬水)</span>
            <span className={styles.waterDot}>💧</span>
          </div>
        </div>

        {/* Ohang Radar */}
        <div className={styles.ohangSection}>
          <div className={styles.ohangTitle}>오행 분포</div>
          <div className={styles.ohangBars}>
            {[
              { name: '목(木)', val: 35, color: '#4ADE80' },
              { name: '화(火)', val: 20, color: '#F87171' },
              { name: '토(土)', val: 15, color: '#FBBF24' },
              { name: '금(金)', val: 10, color: '#E5E7EB' },
              { name: '수(水)', val: 20, color: '#60A5FA' },
            ].map((o) => (
              <div key={o.name} className={styles.ohangRow}>
                <span className={styles.ohangName} style={{ color: o.color }}>{o.name}</span>
                <div className={styles.ohangTrack}>
                  <div className={styles.ohangFill} style={{ width: `${o.val}%`, background: `linear-gradient(90deg, ${o.color}88, ${o.color})` }} />
                </div>
                <span className={styles.ohangPct}>{o.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analyze button or results */}
        {!analyzed && !loading && (
          <button className={`btn-primary ${styles.analyzeBtn}`} onClick={() => setShowModal(true)}>
            ✦ AI 사주 분석 시작하기
          </button>
        )}

        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.magicSpinner}>
              <div className={styles.spinRing} />
              <span className={styles.spinStar}>✦</span>
            </div>
            <p className={styles.loadingText}>마법사가 사주를 읽는 중...</p>
            <p className={styles.loadingSubtext}>잠시만 기다려주세요</p>
          </div>
        )}

        {analyzed && (
          <div className={styles.resultArea}>
            <div className={styles.resultHeader}>
              <span>✦</span>
              <span>AI 사주 분석 결과</span>
              <span>✦</span>
            </div>
            {SECTIONS.map((s, i) => (
              <div
                key={s.key}
                className={styles.sectionCard}
                style={{ animationDelay: `${i * 0.12}s`, borderColor: `${s.color}33` }}
                onClick={() => setActiveSection(activeSection === s.key ? null : s.key)}
              >
                <div className={styles.sectionCardHeader}>
                  <div className={styles.sectionIconWrap} style={{ background: `${s.color}18` }}>
                    <span>{s.icon}</span>
                  </div>
                  <span className={styles.sectionCardTitle} style={{ color: s.color }}>{s.title}</span>
                  <span className={styles.arrowIcon} style={{ transform: activeSection === s.key ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
                {activeSection === s.key && (
                  <p className={styles.sectionCardText}>{s.text}</p>
                )}
              </div>
            ))}
            <button className={`btn-secondary ${styles.reanalBtn}`}>↺ 재분석하기 (구슬 1개)</button>
          </div>
        )}
      </div>

      {/* Marble confirm modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className={styles.modalHandle} />
            <div className={styles.modalIcon}>💎</div>
            <h3 className={styles.modalTitle}>구슬 1개를 사용할까요?</h3>
            <p className={styles.modalDesc}>기본 사주 분석을 받으면 구슬 1개가 차감됩니다. 한번 분석된 결과는 무료로 다시 볼 수 있어요.</p>
            <div className={styles.modalBalance}>현재 잔액 <strong>12구슬</strong></div>
            <div className={styles.modalBtns}>
              <button className="btn-ghost" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-primary" onClick={handleAnalyze}>확인, 분석해줘 ✦</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

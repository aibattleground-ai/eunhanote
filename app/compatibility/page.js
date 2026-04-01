'use client';
import { useState } from 'react';
import StarsBg from '../components/StarsBg';
import SakuraFalling from '../components/SakuraFalling';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const AXES = ['감성', '소통', '가치관', '에너지', '안정감'];

function RadarChart({ scores1, scores2 }) {
  const size = 160;
  const cx = size / 2, cy = size / 2;
  const r = 60;
  const n = AXES.length;
  const points = (scores) => scores.map((s, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const dist = (s / 100) * r;
    return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)];
  });
  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + 'Z';
  const axisPoints = AXES.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
  const gridRings = [0.25, 0.5, 0.75, 1.0];
  const p1 = points(scores1), p2 = points(scores2);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {gridRings.map(g => (
        <polygon key={g} points={AXES.map((_, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          return `${cx + g * r * Math.cos(angle)},${cy + g * r * Math.sin(angle)}`;
        }).join(' ')} fill="none" stroke="rgba(192,132,252,0.12)" strokeWidth="1" />
      ))}
      {/* Axes */}
      {axisPoints.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt[0]} y2={pt[1]} stroke="rgba(192,132,252,0.2)" strokeWidth="1" />
      ))}
      {/* Person 2 */}
      <path d={toPath(p2)} fill="rgba(249,168,212,0.15)" stroke="#F9A8D4" strokeWidth="1.5" />
      {/* Person 1 */}
      <path d={toPath(p1)} fill="rgba(96,165,250,0.15)" stroke="#60A5FA" strokeWidth="1.5" />
      {/* Labels */}
      {axisPoints.map((pt, i) => {
        const dx = pt[0] - cx, dy = pt[1] - cy;
        const len = Math.sqrt(dx*dx+dy*dy);
        const lx = cx + (len+14) * dx/len, ly = cy + (len+14) * dy/len;
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="rgba(243,232,255,0.45)" fontSize="9">{AXES[i]}</text>;
      })}
    </svg>
  );
}

export default function CompatibilityPage() {
  const [partner, setPartner] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const MOCK_PEOPLE = [
    { id: 1, name: '다은', relation: '연인', color: '#F87171' },
    { id: 2, name: 'Diane', relation: '친구', color: '#4ADE80' },
    { id: 3, name: 'Nathan', relation: '가족', color: '#FBBF24' },
  ];

  const handleSelectPartner = (p) => {
    setPartner(p);
    setShowSelect(false);
    setResult(null);
  };

  const handleAnalyze = () => {
    setShowModal(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        score: 78,
        scores1: [80, 65, 75, 90, 60],
        scores2: [70, 85, 65, 70, 80],
        strengths: ['서로의 부족한 오행을 채워주는 절묘한 상생 관계', '일간의 상생으로 자연스럽게 에너지가 통함', '서로 다른 성향이 오히려 흥미로운 긴장감을 만들어냄'],
        cautions: ['소통 방식의 차이 – 한 사람은 직접적, 다른 사람은 우회적', '결정 속도가 다를 수 있어 답답함을 느낄 수 있음'],
        role: '당신은 이 관계에서 안정감을 제공하는 닻 역할입니다. 상대방의 감성을 받아주는 그릇이 되어주세요.',
      });
    }, 2200);
  };

  return (
    <div className="page-container">
      <SakuraFalling count={25} />
      <StarsBg count={40} />
      <TopBar title="궁합 분석" backHref="/home" />

      <div className="content-area">
        {/* Me card */}
        <div className={styles.meCard}>
          <div className={styles.personPill} style={{ borderColor: 'rgba(96,165,250,0.4)', background: 'rgba(96,165,250,0.1)' }}>
            <div className={styles.avatarSmall} style={{ background: 'rgba(96,165,250,0.2)', borderColor: 'rgba(96,165,250,0.5)', color: '#60A5FA' }}>나</div>
            <div>
              <div className={styles.personPillName}>별이 (임수)</div>
              <div className={styles.personPillSub}>일간 · 수(水)</div>
            </div>
          </div>

          <div className={styles.vsIcon}>💜</div>

          {partner ? (
            <div className={styles.personPill} style={{ borderColor: `${partner.color}55`, background: `${partner.color}12`, cursor: 'pointer' }} onClick={() => setShowSelect(true)}>
              <div className={styles.avatarSmall} style={{ background: `${partner.color}22`, borderColor: `${partner.color}55`, color: partner.color }}>{partner.name[0]}</div>
              <div>
                <div className={styles.personPillName}>{partner.name}</div>
                <div className={styles.personPillSub}>{partner.relation}</div>
              </div>
            </div>
          ) : (
            <button className={styles.selectBtn} onClick={() => setShowSelect(true)}>상대 선택하기 →</button>
          )}
        </div>

        {/* Analyze button */}
        {partner && !result && !loading && (
          <button className={`btn-primary ${styles.analyzeBtn}`} onClick={() => setShowModal(true)}>
            ✦ {partner.name}님과 궁합 분석 (구슬 1개)
          </button>
        )}

        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner}><div className={styles.spinRing} /><span>💜</span></div>
            <p>두 사주의 상성을 분석하는 중...</p>
          </div>
        )}

        {result && (
          <div className={styles.resultArea}>
            {/* Score */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreLabel}>궁합 지수</div>
              <div className={styles.scoreCircle}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(107,63,160,0.3)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                    strokeDasharray={`${2*Math.PI*50*result.score/100} ${2*Math.PI*50*(1-result.score/100)}`}
                    strokeDashoffset={2*Math.PI*50*0.25} strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C084FC"/>
                      <stop offset="100%" stopColor="#F9A8D4"/>
                    </linearGradient>
                  </defs>
                  <text x="60" y="56" textAnchor="middle" fill="#F3E8FF" fontSize="28" fontWeight="700">{result.score}</text>
                  <text x="60" y="72" textAnchor="middle" fill="rgba(243,232,255,0.45)" fontSize="11">/ 100</text>
                </svg>
              </div>
            </div>

            {/* Radar */}
            <div className={styles.radarCard}>
              <div className={styles.radarTitle}>오행 상성 레이더</div>
              <div className={styles.radarWrap}>
                <RadarChart scores1={result.scores1} scores2={result.scores2} />
              </div>
              <div className={styles.radarLegend}>
                <span className={styles.legendDot} style={{ background: '#60A5FA' }} />나 (임수)
                <span className={styles.legendDot} style={{ background: '#F9A8D4', marginLeft: 12 }} />{partner.name}
              </div>
            </div>

            {/* Strengths */}
            <div className={styles.analysisCard} style={{ borderColor: 'rgba(74,222,128,0.3)' }}>
              <div className={styles.analysisHeader} style={{ color: '#4ADE80' }}>💚 강점</div>
              {result.strengths.map((s, i) => (
                <div key={i} className={styles.analysisItem}>
                  <span className={styles.bullet} style={{ color: '#4ADE80' }}>✦</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* Cautions */}
            <div className={styles.analysisCard} style={{ borderColor: 'rgba(251,191,36,0.3)' }}>
              <div className={styles.analysisHeader} style={{ color: '#FBBF24' }}>⚡ 주의점</div>
              {result.cautions.map((c, i) => (
                <div key={i} className={styles.analysisItem}>
                  <span className={styles.bullet} style={{ color: '#FBBF24' }}>✦</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            {/* My role */}
            <div className={styles.roleCard}>
              <div className={styles.roleLabel}>이 관계에서 나의 역할</div>
              <p className={styles.roleText}>{result.role}</p>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }}>📄 저장</button>
              <button className="btn-ghost" style={{ flex: 1 }}>↺ 재분석</button>
            </div>
          </div>
        )}
      </div>

      {/* Select person sheet */}
      {showSelect && (
        <div className="modal-overlay" onClick={() => setShowSelect(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className={styles.sheetHandle} />
            <h3 className={styles.sheetTitle}>상대방 선택</h3>
            {MOCK_PEOPLE.map(p => (
              <div key={p.id} className={styles.selectRow} onClick={() => handleSelectPartner(p)}>
                <div className={styles.avatarSmall} style={{ background: `${p.color}22`, borderColor: `${p.color}55`, color: p.color }}>{p.name[0]}</div>
                <span className={styles.selectName}>{p.name}</span>
                <span className={styles.selectRel}>{p.relation}</span>
              </div>
            ))}
            <button className="btn-secondary" style={{ width: '100%', marginTop: 8 }}>＋ 직접 입력</button>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className={styles.sheetHandle} />
            <div style={{ textAlign: 'center', fontSize: 40, marginBottom: 12 }}>💜</div>
            <h3 className={styles.modalTitle}>구슬 1개를 사용할까요?</h3>
            <p className={styles.modalDesc}>나와 <strong>{partner?.name}</strong>님의 사주 궁합을 분석합니다.</p>
            <div className={styles.modalBalance}>현재 잔액 <strong>12구슬</strong></div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleAnalyze}>확인 ✦</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

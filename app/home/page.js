'use client';
import Link from 'next/link';
import StarsBg from '../components/StarsBg';
import SakuraFalling from '../components/SakuraFalling';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const QUICK_MENU = [
  { href: '/saju', icon: '🌙', label: '기본 사주', desc: '나의 사주팔자 분석', color: '#8B5FC0', cost: '1구슬' },
  { href: '/newyear', icon: '✨', label: '신년운세', desc: '2026년 운세 흐름', color: '#C084FC', cost: '1구슬' },
  { href: '/compatibility', icon: '💜', label: '궁합 분석', desc: '두 사주의 상성', color: '#F9A8D4', cost: '1구슬' },
  { href: '/coach', icon: '💬', label: '관계 코치 AI', desc: '대화형 관계 상담', color: '#F59E0B', cost: '3문답=1구슬' },
];

const OHANG_DATA = [
  { name: '목', value: 35, color: '#4ADE80' },
  { name: '화', value: 20, color: '#F87171' },
  { name: '토', value: 15, color: '#FBBF24' },
  { name: '금', value: 10, color: '#E5E7EB' },
  { name: '수', value: 20, color: '#60A5FA' },
];

export default function HomePage() {
  return (
    <div className="page-container">
      <SakuraFalling count={30} />
      <StarsBg count={50} />
      <TopBar />
      <div className="content-area">

        {/* Welcome Banner */}
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeLeft}>
            <p className={styles.welcomeGreet}>안녕하세요, 별이님 🌙</p>
            <h2 className={styles.welcomeTitle}>오늘도 마법 노트를<br />펼쳐볼까요?</h2>
            <p className={styles.todayDate}>2026년 4월 1일 화요일 · 병오년</p>
          </div>
          <div className={styles.welcomeOrb}>
            <div className={styles.orbRing} />
            <span className={styles.orbStar}>✦</span>
          </div>
        </div>

        {/* Today's Tip */}
        <div className={styles.tipCard}>
          <div className={styles.tipHeader}>
            <span className={styles.tipIcon}>💫</span>
            <span className={styles.tipLabel}>오늘의 한마디</span>
          </div>
          <p className={styles.tipText}>오늘은 목(木) 기운이 강한 날, 새로운 시작에 좋은 에너지가 흐릅니다. 가까운 사람에게 먼저 연락을 건네보세요.</p>
        </div>

        {/* Saju Summary */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionLabel}>나의 사주팔자</h3>
          <Link href="/saju" className={styles.seeAll}>자세히 보기 →</Link>
        </div>
        <div className={styles.sajuCard}>
          <div className={styles.sajuGrid}>
            {[
              { pillar: '연주', sky: '丙', earth: '午', sky_kr: '병', earth_kr: '오', color: '#F87171' },
              { pillar: '월주', sky: '甲', earth: '辰', sky_kr: '갑', earth_kr: '진', color: '#4ADE80' },
              { pillar: '일주', sky: '壬', earth: '子', sky_kr: '임', earth_kr: '자', color: '#60A5FA', isMe: true },
              { pillar: '시주', sky: '庚', earth: '申', sky_kr: '경', earth_kr: '신', color: '#E5E7EB' },
            ].map((p) => (
              <div key={p.pillar} className={`${styles.pillarCell} ${p.isMe ? styles.pillarMe : ''}`}>
                <span className={styles.pillarLabel}>{p.pillar}</span>
                <div className={styles.pillarChar} style={{ color: p.color }}>{p.sky}</div>
                <div className={styles.pillarSub}>{p.sky_kr}</div>
                <div className={styles.pillarChar} style={{ color: p.color, opacity: 0.75 }}>{p.earth}</div>
                <div className={styles.pillarSub}>{p.earth_kr}</div>
              </div>
            ))}
          </div>
          {/* Ohang bar */}
          <div className={styles.ohangBar}>
            {OHANG_DATA.map((o) => (
              <div key={o.name} className={styles.ohangItem}>
                <div className={styles.ohangTrack}>
                  <div className={styles.ohangFill} style={{ width: `${o.value}%`, background: o.color }} />
                </div>
                <span className={styles.ohangName} style={{ color: o.color }}>{o.name}</span>
                <span className={styles.ohangVal}>{o.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Menu */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionLabel}>마법 메뉴</h3>
        </div>
        <div className={styles.quickMenu}>
          {QUICK_MENU.map((item) => (
            <Link key={item.href} href={item.href} className={styles.menuCard}>
              <div className={styles.menuIcon} style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                <span>{item.icon}</span>
              </div>
              <div className={styles.menuInfo}>
                <span className={styles.menuLabel}>{item.label}</span>
                <span className={styles.menuDesc}>{item.desc}</span>
              </div>
              <div className={styles.menuCost}>
                <span className={styles.marbleDot}>●</span>
                <span>{item.cost}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* People preview */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionLabel}>관계 노트</h3>
          <Link href="/people" className={styles.seeAll}>전체 보기 →</Link>
        </div>
        <div className={styles.peopleRow}>
          {[
            { name: '다은', rel: '연인', color: '#F9A8D4', ohang: '화' },
            { name: 'Diane', rel: '친구', color: 'var(--pink-mid)', ohang: '목' },
            { name: 'Nathan', rel: '동료', color: '#F59E0B', ohang: '토' },
          ].map((p) => (
            <Link key={p.name} href="/people" className={styles.personChip}>
              <div className={styles.personAvatar} style={{ background: `${p.color}22`, borderColor: `${p.color}55` }}>
                <span style={{ color: p.color }}>{p.name[0]}</span>
              </div>
              <span className={styles.personName}>{p.name}</span>
              <span className={styles.personRel}>{p.rel}</span>
            </Link>
          ))}
          <Link href="/people" className={styles.addPersonChip}>
            <div className={styles.addPersonIcon}>＋</div>
            <span className={styles.personName}>추가</span>
          </Link>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}

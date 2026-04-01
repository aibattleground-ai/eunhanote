'use client';
import { useState } from 'react';
import StarsBg from '../components/StarsBg';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const PACKAGES = [
  { id: 'basic', stars: 1, label: '✦ 기본', marbles: 5, bonus: 0, price: 3500, badge: null },
  { id: 'standard', stars: 2, label: '✦✦ 스탠다드', marbles: 12, bonus: 2, price: 7000, badge: '14.3% 할인' },
  { id: 'wizard', stars: 3, label: '✦✦✦ 마법사', marbles: 30, bonus: 9, price: 15000, badge: '30% 할인', popular: true },
  { id: 'grand', stars: 4, label: '✦✦✦✦ 그랜드', marbles: 70, bonus: 30, price: 30000, badge: '42% 할인' },
];

const PAY_METHODS = [
  { id: 'kakao', label: '카카오페이', emoji: '💛' },
  { id: 'naver', label: '네이버페이', emoji: '💚' },
  { id: 'card', label: '신용카드', emoji: '💳' },
];

const HISTORY = [
  { date: '2026.03.28', pkg: '✦✦ 스탠다드', price: '7,000원', marbles: 14, status: '완료' },
  { date: '2026.02.10', pkg: '✦ 기본', price: '3,500원', marbles: 5, status: '완료' },
];

export default function ChargePage() {
  const [selected, setSelected] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [balance, setBalance] = useState(12);
  const [tab, setTab] = useState('charge');

  const handlePay = () => {
    if (!selected || !payMethod) return;
    const pkg = PACKAGES.find(p => p.id === selected);
    const total = pkg.marbles + pkg.bonus;
    setBalance(b => b + total);
    setShowSuccess({ marbles: total, pkg: pkg.label });
    setTimeout(() => setShowSuccess(false), 3000);
    setSelected(null);
    setPayMethod(null);
  };

  const selPkg = PACKAGES.find(p => p.id === selected);

  return (
    <div className="page-container">
      <StarsBg count={40} />
      <TopBar title="구슬 충전" backHref="/home" />

      <div className="content-area">
        {/* Balance card */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceLeft}>
            <p className={styles.balanceLabel}>현재 구슬 잔액</p>
            <div className={styles.balanceCount}>
              <span className={styles.balanceMarble}>●</span>
              <span className={styles.balanceNum}>{balance}</span>
              <span className={styles.balanceUnit}>구슬</span>
            </div>
            <p className={styles.balanceRate}>구슬 1개 = 약 700원</p>
          </div>
          <div className={styles.balanceOrb}>
            <span>💎</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'charge' ? styles.tabActive : ''}`} onClick={() => setTab('charge')}>충전하기</button>
          <button className={`${styles.tab} ${tab === 'history' ? styles.tabActive : ''}`} onClick={() => setTab('history')}>충전 내역</button>
        </div>

        {tab === 'charge' && (
          <>
            {/* Packages */}
            <div className={styles.packagesSection}>
              <h3 className={styles.sectionTitle}>구슬 패키지 선택</h3>
              <div className={styles.packages}>
                {PACKAGES.map(pkg => (
                  <div
                    key={pkg.id}
                    className={`${styles.pkgCard} ${selected === pkg.id ? styles.pkgCardSelected : ''} ${pkg.popular ? styles.pkgCardPopular : ''}`}
                    onClick={() => setSelected(pkg.id)}
                  >
                    {pkg.popular && <div className={styles.popularBadge}>인기</div>}
                    <div className={styles.pkgTop}>
                      <span className={styles.pkgLabel}>{pkg.label}</span>
                      {pkg.badge && <span className={styles.pkgBadge}>{pkg.badge}</span>}
                    </div>
                    <div className={styles.pkgMarbles}>
                      <span className={styles.marbleEmoji}>●</span>
                      <span className={styles.marbleCount}>{pkg.marbles}</span>
                      {pkg.bonus > 0 && <span className={styles.bonusTag}>+{pkg.bonus} 보너스</span>}
                    </div>
                    <div className={styles.pkgPrice}>{pkg.price.toLocaleString()}원</div>
                    {pkg.bonus > 0 && (
                      <div className={styles.pkgTotal}>총 {pkg.marbles + pkg.bonus}구슬</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment method */}
            {selected && (
              <div className={styles.paySection}>
                <h3 className={styles.sectionTitle}>결제 수단</h3>
                <div className={styles.payMethods}>
                  {PAY_METHODS.map(m => (
                    <button
                      key={m.id}
                      className={`${styles.payBtn} ${payMethod === m.id ? styles.payBtnSelected : ''}`}
                      onClick={() => setPayMethod(m.id)}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay button */}
            {selected && payMethod && (
              <div className={styles.payConfirm}>
                <div className={styles.payConfirmRow}>
                  <span>선택 패키지</span>
                  <span className={styles.payConfirmVal}>{selPkg.label} ({selPkg.marbles + selPkg.bonus}구슬)</span>
                </div>
                <div className={styles.payConfirmRow}>
                  <span>결제 금액</span>
                  <strong className={styles.payConfirmPrice}>{selPkg.price.toLocaleString()}원</strong>
                </div>
                <button className={`btn-primary ${styles.payFinalBtn}`} onClick={handlePay}>
                  💎 지금 결제하기
                </button>
                <p className={styles.payNote}>결제 후 즉시 구슬이 충전됩니다. 단순 변심 환불은 불가합니다.</p>
              </div>
            )}
          </>
        )}

        {tab === 'history' && (
          <div className={styles.historySection}>
            {HISTORY.map((h, i) => (
              <div key={i} className={styles.historyRow}>
                <div className={styles.historyLeft}>
                  <span className={styles.historyDate}>{h.date}</span>
                  <span className={styles.historyPkg}>{h.pkg}</span>
                </div>
                <div className={styles.historyRight}>
                  <span className={styles.historyMarbles}>+{h.marbles} ●</span>
                  <span className={styles.historyPrice}>{h.price}</span>
                  <span className={styles.historyStatus}>{h.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success toast */}
      {showSuccess && (
        <div className={styles.successToast}>
          <span>✦</span>
          <span>구슬 {showSuccess.marbles}개가 충전되었어요!</span>
          <span>✦</span>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

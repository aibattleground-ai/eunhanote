'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarsBg from '../components/StarsBg';
import styles from './page.module.css';

const STEPS = ['social', 'name', 'birthday', 'time', 'gender', 'done'];

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('social');
  const [form, setForm] = useState({ name: '', birthDate: '', calType: 'solar', birthTime: '', birthTimeUnknown: false, gender: '' });
  const [particles, setParticles] = useState([]);

  const spawnParticles = () => {
    const p = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
    }));
    setParticles(p);
    setTimeout(() => setParticles([]), 1200);
  };

  const next = (nextStep) => {
    spawnParticles();
    setTimeout(() => setStep(nextStep), 100);
  };

  const handleSocial = (provider) => {
    next('name');
  };

  const handleDone = () => {
    spawnParticles();
    setTimeout(() => router.push('/home'), 800);
  };

  return (
    <div className={styles.page}>
      <StarsBg count={70} />

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} className={styles.particle} style={{ left: `${p.x}%`, top: `${p.y}%` }}>✦</div>
      ))}

      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <span className={styles.logoStar}>✦</span>
          </div>
          <h1 className={styles.logoTitle}>은하노트</h1>
          <p className={styles.logoDesc}>사주로 읽는 나와 관계의 이야기</p>
        </div>

        {/* Step: Social Login */}
        {step === 'social' && (
          <div className={`${styles.card} ${styles.slideUp}`}>
            <p className={styles.cardHint}>소셜 계정으로 시작하세요</p>
            <h2 className={styles.cardTitle}>마법 노트를<br />열어볼까요?</h2>
            <div className={styles.socialBtns}>
              <button className={styles.kakaoBtn} onClick={() => handleSocial('kakao')}>
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4C10.059 4 2 10.268 2 18.001c0 4.997 3.183 9.394 8.003 11.979L8.27 37.41a.75.75 0 001.124.818l9.207-6.14c.46.033.926.05 1.399.05 9.941 0 18-6.268 18-14 0-7.731-8.059-14-18-14z" fill="#3C1E1E"/>
                </svg>
                카카오로 시작하기
              </button>
              <button className={styles.appleBtn} onClick={() => handleSocial('apple')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple로 시작하기
              </button>
            </div>
            <p className={styles.terms}>시작하면 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 동의하게 됩니다</p>
          </div>
        )}

        {/* Step: Name */}
        {step === 'name' && (
          <div className={`${styles.card} ${styles.slideUp}`}>
            <div className={styles.stepBadge}>1 / 4</div>
            <h2 className={styles.cardTitle}>어떻게 불러드릴까요?</h2>
            <p className={styles.cardDesc}>이름 또는 닉네임을 입력해주세요</p>
            <input className="input-field" style={{ marginTop: 20 }} placeholder="예: 지은, 별이, 하늘" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={10} />
            <button className={`btn-primary ${styles.nextBtn}`} onClick={() => form.name && next('birthday')} style={{ opacity: form.name ? 1 : 0.5 }}>
              다음 ✦
            </button>
          </div>
        )}

        {/* Step: Birthday */}
        {step === 'birthday' && (
          <div className={`${styles.card} ${styles.slideUp}`}>
            <div className={styles.stepBadge}>2 / 4</div>
            <h2 className={styles.cardTitle}>생년월일을 알려주세요</h2>
            <p className={styles.cardDesc}>사주 계산에 사용됩니다</p>
            <div className={styles.calTypeTabs}>
              <button className={`${styles.calTab} ${form.calType === 'solar' ? styles.calTabActive : ''}`} onClick={() => setForm({ ...form, calType: 'solar' })}>양력</button>
              <button className={`${styles.calTab} ${form.calType === 'lunar' ? styles.calTabActive : ''}`} onClick={() => setForm({ ...form, calType: 'lunar' })}>음력</button>
            </div>
            <input className="input-field" type="date" style={{ marginTop: 12 }} value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} />
            <button className={`btn-primary ${styles.nextBtn}`} onClick={() => form.birthDate && next('time')} style={{ opacity: form.birthDate ? 1 : 0.5 }}>
              다음 ✦
            </button>
          </div>
        )}

        {/* Step: Birth time */}
        {step === 'time' && (
          <div className={`${styles.card} ${styles.slideUp}`}>
            <div className={styles.stepBadge}>3 / 4</div>
            <h2 className={styles.cardTitle}>태어난 시간을 알고 계신가요?</h2>
            <p className={styles.cardDesc}>모르셔도 괜찮아요</p>
            <div className={styles.timeUnknown}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={form.birthTimeUnknown} onChange={e => setForm({ ...form, birthTimeUnknown: e.target.checked, birthTime: '' })} />
                <span className={styles.checkCustom} />
                모르겠어요 (시주 제외 분석)
              </label>
            </div>
            {!form.birthTimeUnknown && (
              <input className="input-field" type="time" style={{ marginTop: 12 }} value={form.birthTime} onChange={e => setForm({ ...form, birthTime: e.target.value })} />
            )}
            <button className={`btn-primary ${styles.nextBtn}`} onClick={() => next('gender')}>
              다음 ✦
            </button>
          </div>
        )}

        {/* Step: Gender */}
        {step === 'gender' && (
          <div className={`${styles.card} ${styles.slideUp}`}>
            <div className={styles.stepBadge}>4 / 4</div>
            <h2 className={styles.cardTitle}>성별을 선택해주세요</h2>
            <p className={styles.cardDesc}>사주 분석의 정확도를 높여줍니다</p>
            <div className={styles.genderBtns}>
              {['여성', '남성', '선택 안 함'].map((g) => (
                <button
                  key={g}
                  className={`${styles.genderBtn} ${form.gender === g ? styles.genderBtnActive : ''}`}
                  onClick={() => setForm({ ...form, gender: g })}
                >
                  {g === '여성' ? '🌸' : g === '남성' ? '🌙' : '✨'} {g}
                </button>
              ))}
            </div>
            <button className={`btn-primary ${styles.nextBtn}`} onClick={() => form.gender && handleDone()} style={{ opacity: form.gender ? 1 : 0.5 }}>
              마법 노트 열기 ✦
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import StarsBg from '../components/StarsBg';
import SakuraFalling from '../components/SakuraFalling';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const RELATION_TAGS = ['연인', '가족', '친구', '직장', '기타'];

const MOCK_PEOPLE = [
  { id: 1, name: '다은', relation: '연인', ohang: '화', color: '#F87171', birth: '1992.08.17 08:30', memo: '소중한 사람' },
  { id: 2, name: 'Diane', relation: '친구', ohang: '목', color: '#4ADE80', birth: '1992.08.17 08:30', memo: '든든한 베프' },
  { id: 3, name: '유정하', relation: '가족', ohang: '토', color: '#FBBF24', birth: '1991.06.27 00:30', memo: '' },
  { id: 4, name: 'Nathan', relation: '동료', ohang: '금', color: '#60A5FA', birth: '1991.06.27 00:30', memo: '좋은 파트너' },
];

export default function PeoplePage() {
  const [people, setPeople] = useState(MOCK_PEOPLE);
  const [showSheet, setShowSheet] = useState(false);
  const [form, setForm] = useState({ name: '', birth: '', calType: 'solar', timeUnknown: true, gender: '', relation: '', memo: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const handleAdd = () => {
    if (!form.name || !form.birth || !form.relation) return;
    const ohangMap = { 연인: { ohang: '화', color: '#F87171' }, 가족: { ohang: '토', color: '#FBBF24' }, 친구: { ohang: '목', color: '#4ADE80' }, 직장: { ohang: '금', color: '#E5E7EB' }, 기타: { ohang: '수', color: '#60A5FA' } };
    const { ohang, color } = ohangMap[form.relation] || { ohang: '수', color: '#60A5FA' };
    setPeople([...people, { id: Date.now(), name: form.name, relation: form.relation, ohang, color, birth: form.birth, memo: form.memo }]);
    setForm({ name: '', birth: '', calType: 'solar', timeUnknown: true, gender: '', relation: '', memo: '' });
    setShowSheet(false);
  };

  const handleDelete = (id) => {
    setPeople(people.filter(p => p.id !== id));
    setShowDeleteModal(null);
  };

  const tagColor = { 연인: '#F9A8D4', 가족: '#F59E0B', 친구: '#4ADE80', 직장: '#60A5FA', 기타: '#C084FC' };

  return (
    <div className="page-container">
      <SakuraFalling count={25} />
      <StarsBg count={40} />
      <TopBar title="관계 노트" backHref="/home" />

      <div className="content-area">
        {/* Counter */}
        <div className={styles.counterRow}>
          <span className={styles.counterText}>등록된 인물</span>
          <span className={styles.counterBadge}>{people.length} / 20</span>
        </div>

        {/* Empty state */}
        {people.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🌸</div>
            <p className={styles.emptyTitle}>아직 등록된 인물이 없어요</p>
            <p className={styles.emptyDesc}>소중한 사람의 사주 정보를 등록하면<br />궁합 분석과 관계 코치를 이용할 수 있어요</p>
          </div>
        )}

        {/* People list */}
        <div className={styles.peopleList}>
          {people.map((p) => (
            <div key={p.id} className={styles.personCard}>
              <div className={styles.personAvatar} style={{ background: `${p.color}18`, borderColor: `${p.color}44` }}>
                <span style={{ color: p.color, fontSize: 20, fontWeight: 700 }}>{p.name[0]}</span>
              </div>
              <div className={styles.personInfo}>
                <div className={styles.personTop}>
                  <span className={styles.personName}>{p.name}</span>
                  <span className={styles.personTag} style={{ color: tagColor[p.relation], borderColor: `${tagColor[p.relation]}44`, background: `${tagColor[p.relation]}12` }}>{p.relation}</span>
                </div>
                <span className={styles.personBirth}>{p.birth} · {p.ohang}(火) 기운</span>
                {p.memo && <span className={styles.personMemo}>{p.memo}</span>}
              </div>
              <div className={styles.personActions}>
                <a href="/compatibility" className={styles.actionBtn} title="궁합 보기">💜</a>
                <button className={styles.actionBtn} title="삭제" onClick={() => setShowDeleteModal(p.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        {people.length < 20 && (
          <button className={`btn-primary ${styles.addBtn}`} onClick={() => setShowSheet(true)}>
            ＋ 인물 추가하기
          </button>
        )}
      </div>

      {/* Add sheet */}
      {showSheet && (
        <div className="modal-overlay" onClick={() => setShowSheet(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
            <div className={styles.sheetHandle} />
            <h3 className={styles.sheetTitle}>인물 추가</h3>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>이름 *</label>
              <input className="input-field" placeholder="이름 또는 닉네임" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={10} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>관계 *</label>
              <div className={styles.tagRow}>
                {RELATION_TAGS.map(t => (
                  <button key={t} className={`${styles.tagBtn} ${form.relation === t ? styles.tagBtnActive : ''}`} onClick={() => setForm({ ...form, relation: t })}>{t}</button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>생년월일 *</label>
              <div className={styles.calTypeTabs}>
                <button className={`${styles.calTab} ${form.calType === 'solar' ? styles.calTabActive : ''}`} onClick={() => setForm({ ...form, calType: 'solar' })}>양력</button>
                <button className={`${styles.calTab} ${form.calType === 'lunar' ? styles.calTabActive : ''}`} onClick={() => setForm({ ...form, calType: 'lunar' })}>음력</button>
              </div>
              <input className="input-field" type="date" style={{ marginTop: 8 }} value={form.birth} onChange={e => setForm({ ...form, birth: e.target.value })} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>성별</label>
              <div className={styles.genderRow}>
                {['여성', '남성', '선택 안 함'].map(g => (
                  <button key={g} className={`${styles.tagBtn} ${form.gender === g ? styles.tagBtnActive : ''}`} onClick={() => setForm({ ...form, gender: g })}>{g}</button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>메모 (선택)</label>
              <input className="input-field" placeholder="이 사람에 대해 한마디" value={form.memo} onChange={e => setForm({ ...form, memo: e.target.value })} maxLength={100} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowSheet(false)}>취소</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>저장 ✦</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(null)}>
          <div className="modal-center" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h3 className={styles.sheetTitle} style={{ textAlign: 'center' }}>인물을 삭제할까요?</h3>
            <p style={{ fontSize: 13, color: 'rgba(243,232,255,0.55)', textAlign: 'center', lineHeight: 1.7, marginBottom: 20 }}>이 인물의 관련 분석 기록도 함께 삭제됩니다</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowDeleteModal(null)}>취소</button>
              <button className="btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg,#9F1239,#BE123C)' }} onClick={() => handleDelete(showDeleteModal)}>삭제</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

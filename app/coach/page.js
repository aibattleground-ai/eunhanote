'use client';
import { useState, useRef, useEffect } from 'react';
import StarsBg from '../components/StarsBg';
import SakuraFalling from '../components/SakuraFalling';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const SUGGESTED = [
  '요즘 다은이랑 자꾸 어긋나는 것 같아. 왜 그럴까?',
  '다은이가 나에게 화가 난 것 같은데 어떻게 대화하면 좋을까?',
  '다은이가 어떤 방식으로 사랑을 표현하는 사람인지 알고 싶어',
];

const MOCK_AI_REPLIES = [
  '임수(壬水) 일간의 당신과 다은님의 화(火) 기운 사이에는 자연스러운 긴장감이 있어요. 수(水)는 화(火)를 극하려 하지만, 이 에너지가 잘 조율되면 서로에게 없는 부분을 채워주는 관계가 됩니다. 최근 어긋남은 두 사람의 에너지 흐름이 각자 다른 방향으로 강하게 뻗어나가는 시기이기 때문이에요. 조금 더 상대의 속도를 맞춰주는 연습이 필요해 보입니다 💜',
  '다은님은 화(火) 기운이 강해 감정을 내면에서 빠르게 처리하는 스타일이에요. 직접적인 대화보다 먼저 따뜻한 분위기를 만들어주는 것이 효과적입니다. "나 요즘 우리 사이가 걱정돼"처럼 자신의 마음을 먼저 열어 보세요. 상대가 방어적으로 굳어있을 때 먼저 손을 내미는 사람이 임수 일간의 강점입니다 🌙',
  '다은님은 행동으로 사랑을 표현하는 분이에요. 말보다 함께 무언가를 하거나, 작은 것을 챙겨주는 방식을 선호합니다. 당신이 힘들 때 말없이 옆에 앉아주는 것, 좋아하는 음식을 사다주는 것 — 이런 행동들이 그분의 사랑 언어예요. 말로 표현을 잘 안 한다고 마음이 없는 게 아니니 안심하세요 ✨',
];

const MOCK_PEOPLE = [
  { id: 1, name: '다은', relation: '연인', color: '#F9A8D4' },
  { id: 2, name: 'Diane', relation: '친구', color: 'var(--pink-mid)' },
  { id: 3, name: '유정하', relation: '가족', color: '#F59E0B' },
  { id: 4, name: 'Nathan', relation: '동료', color: '#60A5FA' },
];

export default function CoachPage() {
  const [partner, setPartner] = useState(null);
  const [showSheet, setShowSheet] = useState(true); // Partner selection on init
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [msgCount, setMsgCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const messagesEndRef = useRef(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectPartner = (p) => {
    setPartner(p);
    setShowSheet(false);
    setMessages([
      { role: 'ai', text: `안녕하세요! 저는 은하노트 관계 코치예요 ✦\n사주를 바탕으로 ${p ? p.name+'님과의' : '인간관계'} 고민을 함께 풀어드릴게요.\n어떤 고민이 있으신가요?` }
    ]);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const sendMsg = (text) => {
    if (!text.trim()) return;
    
    // Bad word filter
    if (text.includes('바보') || text.includes('짜증') || text.includes('씨발')) {
      showToast('조금 더 다정한 표현으로 질문해주세요 💜');
      return;
    }

    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const isTimeoutSimulation = text.includes('지연');

    if (isTimeoutSimulation) {
      setTimeout(() => {
        setIsTyping(false);
        showToast('지금은 마법사가 바빠요, 잠시 후 다시 시도해주세요 (구슬 반환)');
      }, 5000); // simulate timeout
      return;
    }

    setTimeout(() => {
      const reply = partner ? MOCK_AI_REPLIES[replyIndex.current % MOCK_AI_REPLIES.length] 
                           : '일반 관계 상담입니다. 당신의 사주 오행(수) 관점에서 볼 때 너무 서두르지 않는 것이 중요해요 ✨';
      replyIndex.current++;
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      
      setMsgCount(prev => {
        const next = prev + 1;
        if (next > 0 && next % 3 === 0) {
          showToast('구슬 1개 사용됨 ✦');
        }
        return next;
      });
    }, 1800);
  };

  const used = msgCount % 3;

  return (
    <div className="page-container">
      <SakuraFalling count={20} />
      <StarsBg count={30} />
      <TopBar title="관계 코치 AI" backHref="/home" />

      {toastMsg && (
        <div className={styles.toast}>
          {toastMsg}
        </div>
      )}

      <div className={styles.page}>
        {/* Context bar */}
        {partner && (
          <div className={styles.contextBar}>
            <div className={styles.contextLeft}>
              <span className={styles.contextIcon}>🔮</span>
              <div>
                <span className={styles.contextName}>{partner.name}</span>
                <span className={styles.contextRel}> · {partner.relation}</span>
              </div>
            </div>
            <div className={styles.questionCounter}>
              <span className={styles.counterDots}>
                {[0,1,2].map(i => <span key={i} className={`${styles.counterDot} ${i < used ? styles.counterDotFilled : ''}`} />)}
              </span>
              <span className={styles.counterLabel}>{used}/3 질문</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleAI}`}>
              {m.role === 'ai' && (
                <div className={styles.aiAvatar}>
                  <img src="https://api.dicebear.com/9.x/notionists/svg?seed=magic&backgroundColor=F472B6" alt="AI Coach" />
                </div>
              )}
              <div className={`${styles.bubbleText} ${m.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAI}`}>
                {m.text.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
              </div>
            </div>
          ))}

          {isTyping && (
             <div className={`${styles.bubble} ${styles.bubbleAI}`}>
              <div className={styles.aiAvatar}>
                  <img src="https://api.dicebear.com/9.x/notionists/svg?seed=magic&backgroundColor=F472B6" alt="AI Coach" />
              </div>
              <div className={`${styles.bubbleText} ${styles.bubbleTextAI}`}>
                <div className={styles.typingDots}>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested */}
        {messages.length <= 2 && partner && partner.name === '다은' && (
          <div className={styles.suggestedWrap}>
            <p className={styles.suggestedLabel}>추천 질문</p>
            <div className={styles.suggestedList}>
              {SUGGESTED.map((s, i) => (
                <button key={i} className={styles.suggestedBtn} onClick={() => sendMsg(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={styles.inputRow}>
          <textarea
            className={styles.inputBox}
            placeholder="궁금한 걸 물어보세요... (최대 200자)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input); } }}
            maxLength={200}
            rows={1}
            disabled={showSheet}
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMsg(input)}
            disabled={!input.trim() || isTyping || showSheet}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Select Partner Sheet */}
      {showSheet && (
        <div className="modal-overlay">
          <div className="modal-sheet">
            <div className={styles.sheetHandle} />
            <h3 className={styles.sheetTitle}>누구와의 관계를 고민하시나요?</h3>
            <p className={styles.sheetDesc}>상대방을 선택하면 사주 기반 맞춤 코칭이 시작됩니다.</p>
            
            <div className={styles.partnerList}>
              <div className={styles.partnerRow} onClick={() => handleSelectPartner(null)}>
                <div className={styles.partnerAvatar} style={{ background: 'var(--surface-3)' }}>🔮</div>
                <div className={styles.partnerInfo}>
                  <span className={styles.partnerName}>일간 운세 / 일반 상담</span>
                </div>
              </div>

              {MOCK_PEOPLE.map(p => (
                <div key={p.id} className={styles.partnerRow} onClick={() => handleSelectPartner(p)}>
                  <div className={styles.partnerAvatar} style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                    {p.name[0]}
                  </div>
                  <div className={styles.partnerInfo}>
                    <span className={styles.partnerName}>{p.name}</span>
                    <span className={styles.partnerRel}>{p.relation}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-secondary" style={{ width: '100%', marginTop: 24 }} onClick={() => setShowSheet(false)}>
              선택 취소
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

'use client';
import { useState, useRef, useEffect } from 'react';
import StarsBg from '../components/StarsBg';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import styles from './page.module.css';

const SUGGESTED = [
  '요즘 민준이랑 자꾸 어긋나는 것 같아. 왜 그럴까?',
  '민준이가 나에게 화가 난 것 같은데 어떻게 대화하면 좋을까?',
  '민준이가 어떤 방식으로 사랑을 표현하는 사람인지 알고 싶어',
];

const MOCK_AI_REPLIES = [
  '임수 일간의 당신과 민준님의 화(火) 기운 사이에는 자연스러운 긴장감이 있어요. 수(水)는 화(火)를 극하려 하지만, 이 에너지가 잘 조율되면 서로에게 없는 부분을 채워주는 관계가 됩니다. 최근 어긋남은 두 사람의 에너지 흐름이 각자 다른 방향으로 강하게 뻗어나가는 시기이기 때문이에요. 조금 더 상대의 속도를 맞춰주는 연습이 필요해 보입니다 💜',
  '민준님은 화(火) 기운이 강해 감정을 내면에서 빠르게 처리하는 스타일이에요. 직접적인 대화보다 먼저 따뜻한 분위기를 만들어주는 것이 효과적입니다. "나 요즘 우리 사이가 걱정돼"처럼 자신의 마음을 먼저 열어 보세요. 상대가 방어적으로 굳어있을 때 먼저 손을 내미는 사람이 임수 일간의 강점입니다 🌙',
  '민준님은 행동으로 사랑을 표현하는 분이에요. 말보다 함께 무언가를 하거나, 작은 것을 챙겨주는 방식을 선호합니다. 당신이 힘들 때 말없이 옆에 앉아주는 것, 좋아하는 음식을 사다주는 것 — 이런 행동들이 그분의 사랑 언어예요. 말로 표현을 잘 안 한다고 마음이 없는 게 아니니 안심하세요 ✨',
];

export default function CoachPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '안녕하세요! 저는 은하노트 관계 코치예요 ✦\n사주를 바탕으로 인간관계 고민을 함께 풀어드릴게요.\n어떤 관계에 대해 이야기해볼까요?' }
  ]);
  const [input, setInput] = useState('');
  const [partner, setPartner] = useState({ name: '민준', relation: '연인' });
  const [msgCount, setMsgCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showTimout, setShowTimeout] = useState(false);
  const messagesEndRef = useRef(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setMsgCount(c => c + 1);
    setIsTyping(true);

    setTimeout(() => {
      const reply = MOCK_AI_REPLIES[replyIndex.current % MOCK_AI_REPLIES.length];
      replyIndex.current++;
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1800);
  };

  const used = msgCount % 3;

  return (
    <div className="page-container">
      <StarsBg count={30} />
      <TopBar title="관계 코치 AI" backHref="/home" />

      <div className={styles.page}>
        {/* Context bar */}
        <div className={styles.contextBar}>
          <div className={styles.contextLeft}>
            <span className={styles.contextIcon}>💜</span>
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

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleAI}`}>
              {m.role === 'ai' && (
                <div className={styles.aiAvatar}>✦</div>
              )}
              <div className={`${styles.bubbleText} ${m.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAI}`}>
                {m.text.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.bubble} ${styles.bubbleAI}`}>
              <div className={styles.aiAvatar}>✦</div>
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
        {messages.length <= 2 && (
          <div className={styles.suggestedWrap}>
            <p className={styles.suggestedLabel}>추천 질문</p>
            <div className={styles.suggestedList}>
              {SUGGESTED.map((s, i) => (
                <button key={i} className={styles.suggestedBtn} onClick={() => sendMsg(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Marble notice */}
        {msgCount > 0 && msgCount % 3 === 0 && (
          <div className={styles.marbleNotice}>
            구슬 1개 사용됨 ✦
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
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMsg(input)}
            disabled={!input.trim() || isTyping}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

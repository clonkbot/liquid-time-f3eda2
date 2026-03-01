import { useState, useEffect, useCallback } from 'react';
import './styles.css';

interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  period: string;
  date: string;
  dayName: string;
  poeticTime: string;
  gradientColors: string[];
}

function getPoeticTime(hours: number): { label: string; colors: string[] } {
  if (hours >= 5 && hours < 7) {
    return {
      label: 'The Awakening Hour',
      colors: ['#1a1a2e', '#16213e', '#e94560', '#ff6b6b', '#ffa502']
    };
  }
  if (hours >= 7 && hours < 10) {
    return {
      label: 'Morning Light',
      colors: ['#ff9a9e', '#fecfef', '#ffecd2', '#fcb69f', '#ffeaa7']
    };
  }
  if (hours >= 10 && hours < 12) {
    return {
      label: 'The Bright Hours',
      colors: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#89f7fe']
    };
  }
  if (hours >= 12 && hours < 14) {
    return {
      label: 'High Noon',
      colors: ['#f5f7fa', '#c3cfe2', '#667eea', '#764ba2', '#ffecd2']
    };
  }
  if (hours >= 14 && hours < 17) {
    return {
      label: 'Afternoon Drift',
      colors: ['#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef', '#a18cd1']
    };
  }
  if (hours >= 17 && hours < 19) {
    return {
      label: 'The Golden Hour',
      colors: ['#fa709a', '#fee140', '#f7971e', '#ffd200', '#ff6b6b']
    };
  }
  if (hours >= 19 && hours < 21) {
    return {
      label: 'Twilight Descends',
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
    };
  }
  if (hours >= 21 && hours < 23) {
    return {
      label: 'Evening Calm',
      colors: ['#0c0c1e', '#1a1a3e', '#2d1b69', '#553c9a', '#667eea']
    };
  }
  return {
    label: 'Deep Night',
    colors: ['#0a0a0a', '#0c0c1e', '#1a1a2e', '#16213e', '#0f3460']
  };
}

function App() {
  const [time, setTime] = useState<TimeData | null>(null);
  const [pulse, setPulse] = useState(false);

  const updateTime = useCallback(() => {
    const now = new Date();
    const hours24 = now.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const period = hours24 >= 12 ? 'PM' : 'AM';

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = dayNames[now.getDay()];
    const date = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    const { label, colors } = getPoeticTime(hours24);

    setTime({
      hours: hours12,
      minutes,
      seconds,
      period,
      date,
      dayName,
      poeticTime: label,
      gradientColors: colors,
    });

    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  if (!time) return null;

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  const gradientStyle = {
    background: `
      radial-gradient(ellipse at 20% 20%, ${time.gradientColors[0]}88 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, ${time.gradientColors[1]}88 0%, transparent 50%),
      radial-gradient(ellipse at 60% 30%, ${time.gradientColors[2]}66 0%, transparent 40%),
      radial-gradient(ellipse at 30% 70%, ${time.gradientColors[3]}55 0%, transparent 45%),
      radial-gradient(ellipse at 50% 50%, ${time.gradientColors[4]}44 0%, transparent 60%),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
    `,
  };

  return (
    <div className="app-container" style={gradientStyle}>
      <div className="noise-overlay" />
      <div className="glow-orb orb-1" style={{ background: `radial-gradient(circle, ${time.gradientColors[2]}40, transparent 70%)` }} />
      <div className="glow-orb orb-2" style={{ background: `radial-gradient(circle, ${time.gradientColors[1]}30, transparent 70%)` }} />
      <div className="glow-orb orb-3" style={{ background: `radial-gradient(circle, ${time.gradientColors[3]}25, transparent 70%)` }} />

      <main className="clock-main">
        <div className="poetic-label">
          <span className="poetic-line" />
          <span className="poetic-text">{time.poeticTime}</span>
          <span className="poetic-line" />
        </div>

        <div className={`time-display ${pulse ? 'pulse' : ''}`}>
          <div className="time-segment">
            <span className="time-number">{formatNumber(time.hours)}</span>
          </div>
          <div className="time-colon">
            <span className="colon-dot" />
            <span className="colon-dot" />
          </div>
          <div className="time-segment">
            <span className="time-number">{formatNumber(time.minutes)}</span>
          </div>
          <div className="time-colon">
            <span className="colon-dot" />
            <span className="colon-dot" />
          </div>
          <div className="time-segment seconds">
            <span className="time-number">{formatNumber(time.seconds)}</span>
          </div>
          <div className="period-badge">
            <span>{time.period}</span>
          </div>
        </div>

        <div className="date-display">
          <span className="day-name">{time.dayName}</span>
          <span className="date-separator">|</span>
          <span className="full-date">{time.date}</span>
        </div>

        <div className="progress-ring">
          <svg viewBox="0 0 100 100" className="ring-svg">
            <circle
              className="ring-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="0.5"
            />
            <circle
              className="ring-progress ring-seconds"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="1"
              strokeDasharray={`${(time.seconds / 60) * 283} 283`}
              style={{ stroke: time.gradientColors[2] }}
            />
            <circle
              className="ring-progress ring-minutes"
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray={`${(time.minutes / 60) * 251} 251`}
              style={{ stroke: time.gradientColors[1] }}
            />
            <circle
              className="ring-progress ring-hours"
              cx="50"
              cy="50"
              r="35"
              fill="none"
              strokeWidth="0.6"
              strokeDasharray={`${(time.hours / 12) * 220} 220`}
              style={{ stroke: time.gradientColors[3] }}
            />
          </svg>
        </div>
      </main>

      <footer className="app-footer">
        <span>Requested by @web-user · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;

import {
  Bell,
  BellOff,
  BookOpen,
  Bot,
  Clock,
  CreditCard,
  LayoutDashboard,
  Settings,
  Volume2,
  Zap
} from 'lucide-react';
import type { AppSettings } from '../../types/vocab';

export type ActiveRouteKey =
  | 'dashboard'
  | 'unit'
  | 'dictionary'
  | 'cards'
  | 'tutor'
  | 'settings'
  | 'learn'
  | 'review';

interface TopBarProps {
  activeRoute: ActiveRouteKey;
  dueCount: number;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

export function TopBar({
  activeRoute,
  dueCount,
  settings,
  onUpdateSettings,
  onNavigate
}: TopBarProps) {
  const toggleSpeechRate = () => {
    onUpdateSettings({ speechRate: settings.speechRate === 1.0 ? 0.8 : 1.0 });
  };

  const toggleAccent = () => {
    onUpdateSettings({
      preferredAccent: settings.preferredAccent === 'en-US' ? 'en-GB' : 'en-US',
      selectedVoiceURI: undefined
    });
  };

  const toggleSoundEffects = () => {
    onUpdateSettings({ soundEffectsEnabled: !settings.soundEffectsEnabled });
  };

  const navItems: Array<{
    key: ActiveRouteKey;
    label: React.ReactNode;
    hash: string;
    icon: React.ReactNode;
  }> = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      hash: '#/',
      icon: <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'dictionary',
      label: (
        <>
          Từ điển<span className="hidden xl:inline"> Units</span>
        </>
      ),
      hash: '#/dictionary',
      icon: <BookOpen className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'cards',
      label: 'Cards',
      hash: '#/cards',
      icon: <CreditCard className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'tutor',
      label: 'Gia sư AI',
      hash: '#/tutor',
      icon: <Bot className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      hash: '#/settings',
      icon: <Settings className="w-4 h-4" aria-hidden="true" />
    }
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap min-[1020px]:flex-nowrap items-center justify-between gap-2 sm:gap-3 py-2.5 sm:py-3">
          {/* Brand Logo */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/');
            }}
            className="flex items-center gap-2.5 group focus-ring rounded-lg shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
              <Zap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight whitespace-nowrap">
                EEE5 Vocab Studio
              </div>
              <div className="text-[11px] font-medium text-slate-500 hidden xl:block whitespace-nowrap">
                English for Electrical & Electronics Engineering 5
              </div>
            </div>
          </a>

          {/* Primary Navigation */}
          <nav
            aria-label="Điều hướng chính"
            className="flex items-center gap-1 order-3 min-[1020px]:order-2 w-full min-[1020px]:w-auto justify-start border-t min-[1020px]:border-t-0 pt-2 min-[1020px]:pt-0 border-slate-100 overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive =
                activeRoute === item.key || (activeRoute === 'unit' && item.key === 'dashboard');
              return (
                <a
                  key={item.key}
                  href={item.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.hash);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-ring shrink-0 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Quick Speech & Due Pill Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 order-2 min-[1020px]:order-3 shrink-0">
            {/* Sound Effects Toggle */}
            <button
              type="button"
              onClick={toggleSoundEffects}
              title={
                settings.soundEffectsEnabled
                  ? 'Tắt hiệu ứng âm thanh (Đúng/Sai/Bấm nút)'
                  : 'Bật hiệu ứng âm thanh (Đúng/Sai/Bấm nút)'
              }
              aria-label={
                settings.soundEffectsEnabled
                  ? 'Tắt hiệu ứng âm thanh'
                  : 'Bật hiệu ứng âm thanh'
              }
              className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-colors focus-ring ${
                settings.soundEffectsEnabled
                  ? 'border-blue-200 bg-blue-50/70 text-blue-700 hover:bg-blue-100'
                  : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
              }`}
            >
              {settings.soundEffectsEnabled ? (
                <Bell className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <BellOff className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>

            {/* Speed Toggle */}
            <button
              type="button"
              onClick={toggleSpeechRate}
              title="Chuyển nhanh tốc độ phát âm (0.8x / 1.0x)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 transition-colors focus-ring tabular-nums"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>{settings.speechRate.toFixed(1)}x</span>
            </button>

            {/* Accent Pill */}
            <button
              type="button"
              onClick={toggleAccent}
              title="Đổi giọng ưu tiên (en-US / en-GB)"
              className="inline-flex items-center px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 transition-colors focus-ring"
            >
              {settings.preferredAccent}
            </button>

            {/* Due Review Pill */}
            <button
              type="button"
              onClick={() => onNavigate(dueCount > 0 ? '#/review' : '#/')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors focus-ring tabular-nums ${
                dueCount > 0
                  ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }`}
              title={dueCount > 0 ? 'Bắt đầu ôn tập từ đến hạn' : 'Không có từ đến hạn'}
            >
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{dueCount > 0 ? `Đến hạn: ${dueCount}` : 'Đã xong hôm nay'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

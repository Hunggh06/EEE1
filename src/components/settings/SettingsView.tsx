import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Bell,
  Bot,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FastForward,
  FlaskConical,
  Loader2,
  PlugZap,
  RotateCcw,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  Volume2
} from 'lucide-react';
import { AI_MODEL_OPTIONS } from '../../data/tutorKnowledge';
import { UNITS_META } from '../../data/unitsMeta';
import { ALL_VOCAB, ALL_WORD_IDS, getUnitVocab } from '../../data/vocab';
import { getDueWords, getLevelDistribution } from '../../engine/srs';
import type { AppSettings, StudyState, UnitResetScope } from '../../types/vocab';
import { ResetUnitControl } from '../common/ResetUnitControl';
import { type TestAiConnectionResult, testAiConnection } from '../../utils/aiClient';
import {
  playClickSound,
  playCompleteSound,
  playCorrectSound,
  playWrongSound,
  setSoundEffectsEnabled
} from '../../utils/soundEffects';
import {
  getAvailableEnglishVoices,
  getAvailableVietnameseVoices,
  isSpeechSupported,
  speakText,
  speakVietnameseText,
  subscribeVoicesChanged
} from '../../utils/speech';
import {
  DEFAULT_AI_API_KEY,
  DEFAULT_AI_BASE_URL,
  DEFAULT_AI_MODEL,
  downloadBackupJson,
  fastForwardDueDates,
  parseAndValidateBackupJson
} from '../../utils/storage';

interface SettingsViewProps {
  state: StudyState;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onReplaceState: (nextState: StudyState) => void;
  onResetUnit: (unitNumber: number, scope: UnitResetScope) => void;
  onResetAll: () => void;
}

export function SettingsView({
  state,
  onUpdateSettings,
  onReplaceState,
  onResetUnit,
  onResetAll
}: SettingsViewProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => getAvailableEnglishVoices());
  const [viVoices, setViVoices] = useState<SpeechSynthesisVoice[]>(() =>
    getAvailableVietnameseVoices()
  );
  const [importPreview, setImportPreview] = useState<{
    state: StudyState;
    wordCount: number;
    masteredCount: number;
    ignoredUnknownIds: number;
    fileName: string;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetUnitTarget, setResetUnitTarget] = useState<number>(1);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<TestAiConnectionResult | null>(null);

  const speechSupported = isSpeechSupported();

  useEffect(() => {
    setVoices(getAvailableEnglishVoices());
    setViVoices(getAvailableVietnameseVoices());
    return subscribeVoicesChanged(() => {
      setVoices(getAvailableEnglishVoices());
      setViVoices(getAvailableVietnameseVoices());
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportPreview(null);
    setStatusMessage(null);

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const result = parseAndValidateBackupJson(text, ALL_WORD_IDS);
      if (!result.ok) {
        setImportError(result.error);
      } else {
        setImportPreview({
          state: result.state,
          wordCount: result.summary.wordCount,
          masteredCount: result.summary.masteredCount,
          ignoredUnknownIds: result.summary.ignoredUnknownIds,
          fileName: file.name
        });
      }
    } catch {
      setImportError('Không thể đọc tệp đã chọn.');
    } finally {
      e.target.value = '';
    }
  };

  const handleConfirmImport = () => {
    if (!importPreview) return;
    onReplaceState(importPreview.state);
    setStatusMessage(
      `Đã khôi phục thành công tiến độ từ "${importPreview.fileName}" (${importPreview.wordCount} từ đã học).`
    );
    setImportPreview(null);
  };

  const handleFastForward = (days: number) => {
    const next = fastForwardDueDates(state, days);
    onReplaceState(next);
    const dueNow = getDueWords(ALL_VOCAB, next.progress, Date.now()).length;
    setStatusMessage(
      `Đã tua nhanh lịch ôn tập +${days} ngày. Hiện có ${dueNow} từ đến hạn ôn tập.`
    );
  };

  const handleTestAiConnection = async () => {
    setTestingAi(true);
    setAiTestResult(null);
    const result = await testAiConnection({
      apiKey: state.settings.aiApiKey,
      baseUrl: state.settings.aiBaseUrl,
      model: state.settings.aiModel
    });
    setAiTestResult(result);
    setTestingAi(false);
  };

  const isCustomModel = !AI_MODEL_OPTIONS.some((m) => m.id === state.settings.aiModel);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <Settings className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Cài đặt học tập & Dữ liệu
          </h1>
          <p className="text-sm text-slate-500">
            Tuỳ chỉnh số từ mỗi lượt, giọng phát âm Web Speech API và sao lưu tiến độ SRS.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Study Chunk Size */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Cấu hình phiên học từ mới</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Chọn số lượng từ vựng cho mỗi cụm học (Micro-learning chunk) trước khi bước vào 3 vòng luyện tập.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {([5, 6, 7] as const).map((size) => {
            const active = state.settings.chunkSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onUpdateSettings({ chunkSize: size })}
                className={`rounded-xl border p-3.5 text-center transition-all focus-ring ${
                  active
                    ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xl font-mono font-extrabold tabular-nums">{size}</div>
                <div className="text-xs mt-0.5">từ / lượt</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Speech Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Phát âm & Giọng đọc (Web Speech API)</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {speechSupported
                ? `Tìm thấy ${voices.length} giọng tiếng Anh và ${viVoices.length} giọng tiếng Việt (vi-VN) trên trình duyệt.`
                : 'Trình duyệt hiện tại không hỗ trợ Web Speech API.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={!speechSupported}
              onClick={() =>
                speakText('Three-phase transformer and semiconductor manufacturing', state.settings)
              }
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45"
            >
              <Volume2 className="w-4 h-4" aria-hidden="true" />
              <span>Nghe thử tiếng Anh</span>
            </button>
            <button
              type="button"
              disabled={!speechSupported}
              onClick={() =>
                speakVietnameseText(
                  'Nghe như cơm bê tí tờ: hai quán cơm cạnh tranh khốc liệt, bê chậm một tí là thua ngay đối thủ!',
                  state.settings.speechRate === 0.8 ? 0.9 : 1.0
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45"
            >
              <Volume2 className="w-4 h-4" aria-hidden="true" />
              <span>Nghe thử giọng Việt (vi-VN)</span>
            </button>
          </div>
        </div>

        {/* Accent & Speed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Giọng ưu tiên (Accent)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['en-US', 'en-GB'] as const).map((accent) => {
                const active = state.settings.preferredAccent === accent;
                return (
                  <button
                    key={accent}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({ preferredAccent: accent, selectedVoiceURI: undefined })
                    }
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors focus-ring ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-white/80 border border-current/20">
                      {accent === 'en-US' ? 'US' : 'GB'}
                    </span>
                    <span>{accent === 'en-US' ? 'Mỹ (en-US)' : 'Anh (en-GB)'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Tốc độ đọc mặc định
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([0.8, 1.0] as const).map((rate) => {
                const active = state.settings.speechRate === rate;
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => onUpdateSettings({ speechRate: rate })}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-mono font-semibold transition-colors focus-ring ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {rate === 0.8 ? '0.8x (Chậm)' : '1.0x (Chuẩn)'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Specific Voice Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="voice-selector"
            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Chọn giọng đọc cụ thể (Voice URI)
          </label>
          <select
            id="voice-selector"
            value={state.settings.selectedVoiceURI ?? ''}
            onChange={(e) =>
              onUpdateSettings({
                selectedVoiceURI: e.target.value ? e.target.value : undefined
              })
            }
            disabled={!speechSupported}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:opacity-50"
          >
            <option value="">Tự động chọn giọng tốt nhất theo {state.settings.preferredAccent}</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Auto-play Toggle */}
        <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 cursor-pointer">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Tự động phát âm khi mở thẻ mới
            </div>
            <div className="text-xs text-slate-500">
              Tự phát audio ở Stage 1 (Flashcard), Stage 2 (Vòng 1–2) và chế độ Nghe-gõ khi ôn tập.
            </div>
          </div>
          <input
            type="checkbox"
            checked={state.settings.autoPlayAudio}
            onChange={(e) => onUpdateSettings({ autoPlayAudio: e.target.checked })}
            className="w-5 h-5 rounded accent-blue-600 shrink-0"
          />
        </label>

        {/* Sound Effects Toggle & Preview */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div className="flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Hiệu ứng âm thanh tương tác (Đúng / Sai / Bấm nút)
                </div>
                <div className="text-xs text-slate-500">
                  Phát âm báo nhẹ nhàng, dễ chịu khi trả lời đúng/sai, lật thẻ, hoàn thành phiên và nhấn nút.
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={state.settings.soundEffectsEnabled}
              onChange={(e) => {
                const enabled = e.target.checked;
                setSoundEffectsEnabled(enabled);
                onUpdateSettings({ soundEffectsEnabled: enabled });
                if (enabled) playClickSound();
              }}
              className="w-5 h-5 rounded accent-blue-600 shrink-0"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/70">
            <span className="text-xs font-medium text-slate-500 mr-1">Nghe thử âm thanh:</span>
            <button
              type="button"
              data-sound="custom"
              disabled={!state.settings.soundEffectsEnabled}
              onClick={() => playClickSound()}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors focus-ring disabled:opacity-45"
            >
              Bấm nút
            </button>
            <button
              type="button"
              data-sound="custom"
              disabled={!state.settings.soundEffectsEnabled}
              onClick={() => playCorrectSound()}
              className="px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-700 transition-colors focus-ring disabled:opacity-45"
            >
              Trả lời đúng
            </button>
            <button
              type="button"
              data-sound="custom"
              disabled={!state.settings.soundEffectsEnabled}
              onClick={() => playWrongSound()}
              className="px-2.5 py-1 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-colors focus-ring disabled:opacity-45"
            >
              Trả lời sai
            </button>
            <button
              type="button"
              data-sound="custom"
              disabled={!state.settings.soundEffectsEnabled}
              onClick={() => playCompleteSound()}
              className="px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-700 transition-colors focus-ring disabled:opacity-45"
            >
              Hoàn thành phiên
            </button>
          </div>
        </div>
      </section>

      {/* AI Tutor Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cấu hình Gia sư AI (DeepSeek v4.1 Flash)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Kết nối trực tiếp TokenHarbor OpenAI-compatible API để hỏi đáp, ra đề, nhập vai và chữa bài viết EEE5.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={testingAi}
            onClick={handleTestAiConnection}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs sm:text-sm font-bold shadow-xs transition-colors focus-ring disabled:opacity-50"
          >
            {testingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Đang kiểm tra...</span>
              </>
            ) : (
              <>
                <PlugZap className="w-4 h-4" aria-hidden="true" />
                <span>Kiểm tra kết nối AI</span>
              </>
            )}
          </button>
        </div>

        {/* Model Selector */}
        <div className="space-y-2">
          <div className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Model AI (TokenHarbor)
          </div>
          <div className="grid grid-cols-1 gap-2">
            {AI_MODEL_OPTIONS.map((opt) => {
              const active = state.settings.aiModel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onUpdateSettings({ aiModel: opt.id });
                    setAiTestResult(null);
                  }}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl border px-3.5 py-2.5 text-left transition-all focus-ring ${
                    active
                      ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold flex flex-wrap items-center gap-2">
                      <span>{opt.label}</span>
                      <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {opt.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.description}</div>
                  </div>
                  <span
                    className={`self-start sm:self-center shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      opt.isFree
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    {opt.isFree ? 'Miễn phí' : 'Trả phí'}
                  </span>
                </button>
              );
            })}
          </div>

          {isCustomModel && (
            <div className="text-xs text-slate-600 font-mono">
              Đang dùng model tuỳ chỉnh: <strong>{state.settings.aiModel}</strong>
            </div>
          )}
        </div>

        {/* API Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="ai-api-key-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              TokenHarbor API Key
            </label>
            {Boolean(DEFAULT_AI_API_KEY) && state.settings.aiApiKey !== DEFAULT_AI_API_KEY && (
              <button
                type="button"
                onClick={() => {
                  onUpdateSettings({ aiApiKey: DEFAULT_AI_API_KEY });
                  setAiTestResult(null);
                }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 focus-ring rounded"
              >
                Khôi phục key mặc định
              </button>
            )}
          </div>
          <div className="relative flex items-center">
            <input
              id="ai-api-key-input"
              type={showApiKey ? 'text' : 'password'}
              value={state.settings.aiApiKey}
              onChange={(e) => {
                onUpdateSettings({ aiApiKey: e.target.value });
                setAiTestResult(null);
              }}
              placeholder="thk_live_..."
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white pl-3.5 pr-11 py-2.5 text-sm font-mono text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            />
            <button
              type="button"
              onClick={() => setShowApiKey((v) => !v)}
              aria-label={showApiKey ? 'Ẩn API Key' : 'Hiện API Key'}
              title={showApiKey ? 'Ẩn API Key' : 'Hiện API Key'}
              className="absolute right-2.5 p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-ring"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Base URL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="ai-base-url-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              API Base URL
            </label>
            {state.settings.aiBaseUrl !== DEFAULT_AI_BASE_URL && (
              <button
                type="button"
                onClick={() => {
                  onUpdateSettings({ aiBaseUrl: DEFAULT_AI_BASE_URL });
                  setAiTestResult(null);
                }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 focus-ring rounded"
              >
                Khôi phục URL mặc định
              </button>
            )}
          </div>
          <input
            id="ai-base-url-input"
            type="url"
            value={state.settings.aiBaseUrl}
            onChange={(e) => {
              onUpdateSettings({ aiBaseUrl: e.target.value });
              setAiTestResult(null);
            }}
            placeholder={DEFAULT_AI_BASE_URL}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        {/* Connection Test Result */}
        {aiTestResult && (
          <div
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm space-y-2 ${
              aiTestResult.ok
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}
          >
            {aiTestResult.ok ? (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold">
                    Kết nối AI thành công ({aiTestResult.latencyMs} ms • {aiTestResult.model})
                  </div>
                  <div className="text-xs text-emerald-800 mt-0.5 font-mono">
                    Phản hồi thử: &ldquo;{aiTestResult.replyPreview}&rdquo;
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-bold">
                      {aiTestResult.status === 402
                        ? 'Model hiện tại trả về HTTP 402 Payment Required'
                        : 'Kiểm tra kết nối AI thất bại'}
                    </div>
                    <div className="text-xs sm:text-sm text-rose-800 mt-0.5">
                      {aiTestResult.message}
                    </div>
                  </div>
                </div>

                {aiTestResult.status === 402 && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                      setAiTestResult(null);
                      setStatusMessage(`Đã chuyển model AI về ${DEFAULT_AI_MODEL}.`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold transition-colors focus-ring"
                  >
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Chuyển ngay về {DEFAULT_AI_MODEL}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Data Backup & Restore */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Sao lưu & Khôi phục dữ liệu (JSON)</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dữ liệu được lưu cục bộ trên trình duyệt (<code className="font-mono text-xs">localStorage</code>).
            Hãy xuất tệp JSON định kỳ để bảo toàn tiến độ SRS.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              downloadBackupJson(state);
              setStatusMessage('Đã tải xuống tệp sao lưu JSON.');
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold shadow-xs transition-colors focus-ring"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Xuất bản sao lưu (.json)</span>
          </button>

          <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-600">
            <Upload className="w-4 h-4" aria-hidden="true" />
            <span>Nhập từ tệp JSON</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {importError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{importError}</span>
          </div>
        )}

        {importPreview && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-3">
            <div className="text-sm font-bold text-blue-950">
              Xem trước bản sao lưu: {importPreview.fileName}
            </div>
            <div className="text-xs sm:text-sm text-blue-900 space-y-1">
              <div>
                • Số từ đã có tiến độ học: <strong>{importPreview.wordCount} từ</strong>
              </div>
              <div>
                • Số từ đã thuộc sâu (Level 5): <strong>{importPreview.masteredCount} từ</strong>
              </div>
              {importPreview.ignoredUnknownIds > 0 && (
                <div className="text-amber-800">
                  • Đã bỏ qua {importPreview.ignoredUnknownIds} mã từ không còn trong bộ từ vựng.
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleConfirmImport}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs sm:text-sm font-bold focus-ring"
              >
                Xác nhận khôi phục
              </button>
              <button
                type="button"
                onClick={() => setImportPreview(null)}
                className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 text-xs sm:text-sm font-semibold focus-ring"
              >
                Huỷ
              </button>
            </div>
          </div>
        )}

        {/* Reset Per-Unit Progress */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div>
            <div className="text-sm font-bold text-slate-900">
              Đặt lại tiến trình theo từng Unit
            </div>
            <p className="text-xs text-slate-500">
              Chọn 1 Unit cụ thể để xóa tiến độ Từ vựng hoặc toàn bộ kỹ năng (các Unit khác không bị ảnh hưởng).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <select
              value={resetUnitTarget}
              onChange={(e) => setResetUnitTarget(Number(e.target.value))}
              aria-label="Chọn Unit để đặt lại tiến trình"
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            >
              {UNITS_META.map((u) => {
                const uVocab = getUnitVocab(u.unit);
                const uDist = getLevelDistribution(uVocab, state.progress, Date.now());
                return (
                  <option key={u.unit} value={u.unit}>
                    Unit {u.unit}: {u.vietnameseTitle} ({uDist.learnedCount}/{uDist.total} từ)
                  </option>
                );
              })}
            </select>
            <ResetUnitControl
              key={`settings-reset-u${resetUnitTarget}`}
              unitNumber={resetUnitTarget}
              learnedCount={
                getLevelDistribution(
                  getUnitVocab(resetUnitTarget),
                  state.progress,
                  Date.now()
                ).learnedCount
              }
              onResetUnit={onResetUnit}
              variant="header"
            />
          </div>
        </div>

        {/* Reset Data */}
        <div className="pt-4 border-t border-slate-100">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span>Xoá toàn bộ tiến độ học</span>
            </button>
          ) : (
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold text-rose-900">
                Bạn chắc chắn muốn xoá sạch toàn bộ tiến độ SRS?
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetAll();
                    setConfirmReset(false);
                    setStatusMessage('Đã đặt lại toàn bộ dữ liệu học tập về trạng thái ban đầu.');
                  }}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 text-xs sm:text-sm font-bold focus-ring"
                >
                  Xoá ngay
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-1.5 text-xs sm:text-sm font-semibold focus-ring"
                >
                  Huỷ
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Developer / Test Utilities */}
      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          <FlaskConical className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span>Kiểm thử SRS (Developer / Test Utilities)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Dùng để kiểm tra nhanh chức năng <strong>Due Review</strong> ngay lập tức bằng cách lùi mốc{' '}
          <code className="font-mono text-xs">nextReview</code> của các từ đã học.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => handleFastForward(1)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring"
          >
            <FastForward className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>Tua nhanh +1 ngày</span>
          </button>
          <button
            type="button"
            onClick={() => handleFastForward(7)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <span>Tua nhanh +7 ngày</span>
          </button>
        </div>
      </section>
    </div>
  );
}

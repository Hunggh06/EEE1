import { BookOpenCheck, Bot, Headphones, Layers, PenLine, Sparkles } from 'lucide-react';
import type { TutorMode, UnitSkillDescriptor, UnitSkillKey } from '../../types/vocab';

interface ComingSoonSkillPanelProps {
  unitNumber: number;
  unitTitle: string;
  descriptor: UnitSkillDescriptor;
  onBackToVocab: () => void;
  onNavigate: (hash: string) => void;
}

const SKILL_ICON: Record<UnitSkillKey, React.ReactNode> = {
  grammar: <Layers className="w-6 h-6" aria-hidden="true" />,
  listening: <Headphones className="w-6 h-6" aria-hidden="true" />,
  reading: <BookOpenCheck className="w-6 h-6" aria-hidden="true" />,
  writing: <PenLine className="w-6 h-6" aria-hidden="true" />
};

const SKILL_LABEL: Record<UnitSkillKey, string> = {
  grammar: 'Grammar',
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing'
};

const SKILL_TO_TUTOR_MODE: Record<UnitSkillKey, TutorMode> = {
  grammar: 'qa',
  listening: 'roleplay',
  reading: 'qa',
  writing: 'writing'
};

function buildSkillTutorHash(
  unitNumber: number,
  descriptor: UnitSkillDescriptor
): string {
  const mode = SKILL_TO_TUTOR_MODE[descriptor.skill];
  let prompt: string;
  switch (descriptor.skill) {
    case 'grammar':
      prompt = `Hãy giải thích chi tiết trọng tâm ngữ pháp Unit ${unitNumber} (${descriptor.title}) theo giáo trình HaUI EEE5 và cho mình 2 câu luyện tập.`;
      break;
    case 'listening':
      prompt = `Hãy luyện phản xạ hội thoại & nghe hiểu theo chủ đề Unit ${unitNumber} (${descriptor.title}) bằng cách đóng vai nói từng lượt ngắn để mình luyện đáp lại.`;
      break;
    case 'reading':
      prompt = `Hãy tạo một đoạn đọc hiểu ngắn (120–150 từ) sát chủ đề Unit ${unitNumber} (${descriptor.title}) kèm 3 câu hỏi đọc hiểu (Skimming/Scanning) để mình luyện tập.`;
      break;
    case 'writing':
      prompt = `Hãy hướng dẫn mình dàn ý và cụm từ ăn điểm cho bài viết Unit ${unitNumber} (${descriptor.title}) kèm một đề luyện tập.`;
      break;
  }
  return `#/tutor?unit=${unitNumber}&mode=${mode}&prompt=${encodeURIComponent(prompt)}`;
}

export function ComingSoonSkillPanel({
  unitNumber,
  unitTitle,
  descriptor,
  onBackToVocab,
  onNavigate
}: ComingSoonSkillPanelProps) {
  const tutorHash = buildSkillTutorHash(unitNumber, descriptor);

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-8 shadow-xs">
      <div className="max-w-2xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mx-auto">
          {SKILL_ICON[descriptor.skill]}
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Phase 2 Module • Coming Soon</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Unit {unitNumber} — {SKILL_LABEL[descriptor.skill]}: {descriptor.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {descriptor.summary}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-left space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Nội dung trọng tâm dự kiến (Phase 2 — {unitTitle})
          </div>
          <div className="flex flex-wrap gap-2">
            {descriptor.keyTopics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700"
              >
                {topic}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Bạn có thể luyện trước kỹ năng {SKILL_LABEL[descriptor.skill]} của Unit {unitNumber}{' '}
            ngay bây giờ với Gia sư AI DeepSeek v4.1 Flash.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(tutorHash)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring"
          >
            <Bot className="w-4 h-4" aria-hidden="true" />
            <span>Luyện trước kỹ năng này với Gia sư AI</span>
          </button>

          <button
            type="button"
            onClick={onBackToVocab}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 text-sm font-semibold transition-colors focus-ring"
          >
            Quay lại học Vocabulary Unit {unitNumber}
          </button>
        </div>
      </div>
    </div>
  );
}

import type { TutorMode } from '../types/vocab';

export interface GrammarPoint {
  title: string;
  explanationVi: string;
  formulas: string[];
  examples: string[];
  notes?: string[];
}

export interface ExpressionGroup {
  category: string;
  phrases: string[];
  examples?: string[];
}

export interface StarterPrompt {
  mode: TutorMode;
  label: string;
  prompt: string;
}

export interface UnitTutorKnowledge {
  unit: number;
  title: string;
  vietnameseTitle: string;
  topicSummary: string;
  goals: string[];
  languageFocus: GrammarPoint[];
  keyExpressions: ExpressionGroup[];
  speakingTasks: string[];
  writingTasks: string[];
  starterPrompts: StarterPrompt[];
}

export const AI_MODEL_OPTIONS: Array<{
  id: string;
  label: string;
  description: string;
  isFree: boolean;
}> = [
  {
    id: 'deepseek-v4.1-flash:free',
    label: 'DeepSeek v4.1 Flash (Free • Khuyên dùng)',
    description: 'Nhanh, miễn phí trên TokenHarbor, hỗ trợ stream SSE ổn định.',
    isFree: true
  },
  {
    id: 'deepseek-v4.1-flash',
    label: 'DeepSeek v4.1 Flash (Standard • Trả phí)',
    description: 'Bản tiêu chuẩn trên TokenHarbor (yêu cầu số dư tài khoản, có thể gặp HTTP 402).',
    isFree: false
  },
  {
    id: 'deepseek-v4-flash:free',
    label: 'DeepSeek v4 Flash (Free • Dự phòng)',
    description: 'Kênh miễn phí dự phòng khi cần chuyển đổi model.',
    isFree: true
  }
];

export const TUTOR_MODE_META: Array<{
  id: TutorMode;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: 'qa',
    label: 'Hỏi đáp bài học',
    shortLabel: 'Hỏi đáp',
    description: 'Giải thích từ vựng, IPA, ngữ pháp & cấu trúc theo giáo trình HaUI EEE5.'
  },
  {
    id: 'quiz',
    label: 'Ra đề kiểm tra',
    shortLabel: 'Kiểm tra',
    description: 'Luyện tập trắc nghiệm, điền từ, viết lại câu và ưu tiên từ hay sai.'
  },
  {
    id: 'roleplay',
    label: 'Nhập vai hội thoại',
    shortLabel: 'Nhập vai',
    description: 'Thực hành phỏng vấn, hotline bảo trì, CSKH, họp kỹ thuật theo từng Unit.'
  },
  {
    id: 'writing',
    label: 'Chữa bài viết',
    shortLabel: 'Chữa viết',
    description: 'Hướng dẫn dàn ý & chấm sửa đoạn văn, email, mô tả biểu đồ, CV, biên bản họp.'
  }
];

export const UNIT_TUTOR_KNOWLEDGE: UnitTutorKnowledge[] = [
  {
    unit: 1,
    title: 'Companies in Electrical and Electronics fields',
    vietnameseTitle: 'Doanh nghiệp trong lĩnh vực Điện - Điện tử',
    topicSummary:
      'Hồ sơ doanh nghiệp Điện – Điện tử (trụ sở, năm thành lập, công ty con, lĩnh vực kinh doanh bán dẫn/thiết bị gia dụng, văn hoá doanh nghiệp) và cách nêu quan điểm trong phỏng vấn.',
    goals: [
      'Thực hiện hội thoại về nền tảng công ty và văn hoá doanh nghiệp (company background & culture).',
      'Đóng vai hội thoại giới thiệu doanh nghiệp trong phỏng vấn xin việc.',
      'Viết đoạn văn 100–120 từ về doanh nghiệp Điện – Điện tử muốn làm việc trong tương lai.'
    ],
    languageFocus: [
      {
        title: 'Passive voice in Present Simple & Past Simple (Câu bị động)',
        explanationVi:
          'Dùng để mô tả quy trình sản xuất, sản phẩm được cung cấp bởi công ty, nơi đặt trụ sở và lịch sử thành lập doanh nghiệp.',
        formulas: [
          'Cấu trúc chung: S + to be + P2 (+ by + O)',
          'Present Simple (+): S + am/is/are + P2 | (-): S + am not/isn’t/aren’t + P2 | (?): (Wh-) + am/is/are + S + P2?',
          'Past Simple (+): S + was/were + P2 | (-): S + wasn’t/weren’t + P2 | (?): (Wh-) + was/were + S + P2?'
        ],
        examples: [
          'William Hewlett and David Packard founded HP company in 1939. -> HP company was founded by William Hewlett and David Packard in 1939.',
          'LG Electronics is headquartered in Seoul, South Korea.',
          'Some products offered by Hitachi include air conditioners and LCD projectors.'
        ],
        notes: [
          'Cụm "by + O" đứng sau trạng từ chỉ nơi chốn và đứng trước trạng từ chỉ thời gian.',
          'Có thể lược bỏ "by people / by me / us / them / him / her / someone".'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Express strong opinions (Diễn đạt quan điểm chắc chắn)',
        phrases: [
          'I’m sure / certain that …',
          'I strongly believe that …',
          'It’s obvious to me that …',
          'I have no doubt that …'
        ],
        examples: [
          'I strongly believe that in the next five years, Panasonic will become the world’s largest television manufacturer.',
          'It’s obvious to me / I have no doubt that Google is a successful company with perfect culture.'
        ]
      },
      {
        category: 'Express cautious opinions (Diễn đạt quan điểm thận trọng)',
        phrases: [
          'I think / suppose / consider that …',
          'In my opinion / From my viewpoint, …',
          'As far as I know / I’m concerned, …',
          'It seems to me that …'
        ],
        examples: [
          'In my opinion / From my viewpoint, Oppo cannot compete with the consumer electronics giant like Apple.',
          'As far as I know / I’m concerned, Nikon is the biggest competitor of Canon in imaging solutions.',
          'In my opinion, Dell is a great company to work for, thanks to the freedom and flexibility given to the employees.'
        ]
      }
    ],
    speakingTasks: [
      'Role-play phỏng vấn xin việc tại Samsung Electronics giữa sinh viên tốt nghiệp HaUI và HR Manager: trao đổi về company background, mission, competitors, corporate culture, management style và đóng góp của ứng viên (dùng ít nhất 3 mẫu câu nêu quan điểm).',
      'Mono talk: Giới thiệu một doanh nghiệp Điện – Điện tử bạn muốn làm việc trong tương lai (bối cảnh & văn hoá, lý do ứng tuyển, đóng góp bản thân).'
    ],
    writingTasks: [
      'Viết lại câu dùng câu bị động & từ vựng chuyên ngành (found, headquarter, specialize in, employ, affiliated company, business segments).',
      'Viết đoạn văn 100–120 từ về một doanh nghiệp Điện – Điện tử bạn muốn làm việc sau khi tốt nghiệp HaUI.'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Giải thích bị động & mẫu câu quan điểm',
        prompt:
          'Giải thích ngắn gọn cách dùng câu bị động (hiện tại đơn / quá khứ đơn) và sự khác nhau giữa mẫu câu nêu quan điểm mạnh (strong) và thận trọng (cautious) trong Unit 1, kèm ví dụ về Samsung hoặc Intel.'
      },
      {
        mode: 'quiz',
        label: 'Kiểm tra viết lại câu bị động Unit 1',
        prompt:
          'Ra đề kiểm tra từng câu một giúp mình luyện chuyển câu chủ động sang bị động và dùng từ vựng Unit 1 (found, headquarter, subsidiary, specialize in).'
      },
      {
        mode: 'roleplay',
        label: 'Phỏng vấn xin việc tại Samsung (HR)',
        prompt:
          'Hãy đóng vai HR Manager của Samsung Electronics phỏng vấn mình (sinh viên năm cuối HaUI) về lý do chọn công ty, hiểu biết về văn hoá doanh nghiệp và đóng góp của mình.'
      },
      {
        mode: 'writing',
        label: 'Hướng dẫn viết đoạn văn 120 từ Unit 1',
        prompt:
          'Hướng dẫn mình dàn ý và cụm từ ăn điểm để viết đoạn văn 100–120 từ giới thiệu công ty Điện – Điện tử mình muốn làm việc trong tương lai.'
      }
    ]
  },
  {
    unit: 2,
    title: 'Smart products',
    vietnameseTitle: 'Sản phẩm thông minh & Cảm biến',
    topicSummary:
      'Thông số kỹ thuật, cảm biến (accelerometer, gyroscope, barometer, motion sensor), chuẩn chống nước/bụi (IP67), hệ điều hành và cấu trúc rút gọn mệnh đề quan hệ + so sánh sản phẩm.',
    goals: [
      'Trao đổi về thông số kỹ thuật (specifications) và tính năng (features) của các sản phẩm thông minh.',
      'Thuyết trình ngắn giới thiệu một sản phẩm thông minh mới tại triển lãm công nghệ (CES).',
      'Viết đoạn văn mô tả và so sánh các thiết bị điện tử thông minh.'
    ],
    languageFocus: [
      {
        title: 'Reduced relative clauses (Mệnh đề quan hệ rút gọn)',
        explanationVi:
          'Trong mệnh đề quan hệ xác định, có thể lược bỏ đại từ quan hệ và động từ to be, dùng phân từ hai (P2) cho nghĩa bị động hoặc V-ing cho nghĩa chủ động.',
        formulas: [
          'Nghĩa bị động: N + (which/that + be) + P2 -> N + P2',
          'Nghĩa chủ động: N + (who/which/that) + V -> N + V-ing'
        ],
        examples: [
          'They are talking about the smart watch (which is) introduced by Google.',
          'The smart speaker (which is) designed by Amazon is very expensive.',
          'The man (who is) marketing new smart products is my boss.',
          'Samsung Galaxy S7 is a smartphone which runs Android OS. -> Samsung Galaxy S7 is a smartphone running Android OS.'
        ]
      },
      {
        title: 'Making comparison (So sánh tương đồng và khác biệt)',
        explanationVi:
          'Kết hợp tính từ, giới từ, cấu trúc so sánh ngang bằng/hơn kém và liên từ để đối chiếu thông số kỹ thuật giữa các thiết bị thông minh.',
        formulas: [
          'Similarity (Giống nhau): similar (to) | like + N | as + adj + as | the same + N + as | both … and … | Similarly, S + V. | Likewise, S + V.',
          'Difference (Khác nhau): different (from) | unlike + N | not as + adj + as | adj-er / more + adj + than | In contrast, S + V.'
        ],
        examples: [
          'The screen size of Galaxy S7 Edge is similar to the iPhone 7 Plus’s.',
          'Apple Watch Series 1 runs a dual-core processor like the Series 2.',
          'The Gear 2’s battery is very different from the battery used in LG G Watch.',
          'Unlike the predecessors, iPhone 7 is equipped with dual camera.',
          'PS4 gaming console is as expensive as Xbox one.',
          'The LG OLED B6P smart TV has the same design as the E7P model.',
          'Both Samsung Gear 2 and LG G-Watch are certified IP67 for dust and water resistance.',
          'The Exynos dual-core processor is not as fast as the Snapdragon quad-core.',
          'The iPhone 7 Plus is bigger and heavier than the iPhone 7.',
          'Apple Series 1 smartwatch has accelerometer sensor. Similarly, Series 2 is equipped with this feature.',
          'Sony Watch 2 is built with two separate apps: Walkmate and Runtastic. In contrast, these apps are combined into one...'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Smart product specs & comparison phrases',
        phrases: [
          'runs … operating system / compatible with …',
          'equipped with … / feature built-in GPS',
          'certified IP67 for dust and water resistance',
          'Unlike its predecessor, …',
          'Similarly, … / Likewise, … / In contrast, …'
        ]
      }
    ],
    speakingTasks: [
      'Group discussion: So sánh Apple iPad Pro 2017 và Microsoft Surface Pro (OS, Display, Processor, Storage, Camera, Battery, Sensors, Features, Price) và chọn sản phẩm phù hợp.',
      'Pair work speaking card: Hỏi – đáp trao đổi thông số còn thiếu của đồng hồ thông minh Samsung SM Gear Fit 2.',
      'Mono talk (CES pitch): Giới thiệu sản phẩm thông minh mới bạn thiết kế (tên, thông số, hệ điều hành tương thích, cảm biến & tính năng nổi bật, so sánh với đối thủ).'
    ],
    writingTasks: [
      'Viết lại câu so sánh giữ nguyên nghĩa với từ gợi ý (cheap, similar, as…as, In contrast, Both…and) và viết câu hoàn chỉnh từ từ gợi ý.',
      'Viết đoạn văn mô tả một sản phẩm thông minh kèm bảng thông số và câu so sánh.'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Phân biệt V-ing / P2 & cấu trúc so sánh',
        prompt:
          'Giúp mình phân biệt khi nào rút gọn mệnh đề quan hệ dùng V-ing và khi nào dùng P2, đồng thời tóm tắt bảng cấu trúc so sánh (similar to, unlike, the same...as, In contrast) trong Unit 2.'
      },
      {
        mode: 'quiz',
        label: 'Trắc nghiệm & viết lại câu so sánh Unit 2',
        prompt:
          'Kiểm tra mình kiến thức rút gọn mệnh đề quan hệ và cấu trúc so sánh Unit 2 bằng các câu hỏi thực tế về smartphone và smartwatch.'
      },
      {
        mode: 'roleplay',
        label: 'Hội thoại hỏi thông số Gear Fit 2 / CES',
        prompt:
          'Đóng vai khách hàng / đồng nghiệp tại triển lãm CES, hỏi mình các thông số về bộ xử lý, cảm biến (gyroscope, barometer), hệ điều hành và khả năng chống nước của một smartwatch mới.'
      },
      {
        mode: 'writing',
        label: 'Chữa đoạn văn giới thiệu sản phẩm thông minh',
        prompt:
          'Cho mình dàn ý viết đoạn văn mô tả một sản phẩm nhà thông minh hoặc thiết bị đeo tay dùng ít nhất 2 mệnh đề quan hệ rút gọn và 2 cấu trúc so sánh.'
      }
    ]
  },
  {
    unit: 3,
    title: 'Installation',
    vietnameseTitle: 'Lắp đặt thiết bị & Hệ thống điện',
    topicSummary:
      'Quy trình lắp đặt thiết bị điện – điện tử (điều hoà, bóng đèn, tủ điện, máy biến áp), thao tác kỹ thuật (insert, locate, reverse, pull, push) và an toàn điện bằng câu mệnh lệnh & động từ khuyết thiếu.',
    goals: [
      'Tạo hội thoại hướng dẫn lắp đặt thiết bị điện dân dụng và công nghiệp.',
      'Trình bày từng bước lắp đặt thiết bị điện đơn giản kèm lưu ý an toàn.',
      'Viết email hướng dẫn quy trình lắp đặt một thiết bị cho đồng nghiệp hoặc khách hàng.'
    ],
    languageFocus: [
      {
        title: 'Imperatives (Câu mệnh lệnh ngắn & dài)',
        explanationVi:
          'Dùng để đưa ra yêu cầu, chỉ dẫn thao tác hoặc cảnh báo an toàn điện trực tiếp, rõ ràng.',
        formulas: [
          'Short form (Dạng ngắn): V (nguyên thể) -> Stop! / Go! / Hurry!',
          'Long form (Dạng dài): (Don’t) + V(infinitive) + O',
          'Dạng tính từ / phân từ: (Don’t) + be + Adjective / V.Participle'
        ],
        examples: [
          'Cut off the electricity to avoid electric shock.',
          'Don’t attach a cord to another surface with nails or staples — they can damage the insulation.',
          'Don’t be rushed when fixing the light. Be slow and careful!'
        ]
      },
      {
        title: 'Modal verbs (Động từ khuyết thiếu)',
        explanationVi:
          'Diễn đạt khả năng, sự cho phép, nghĩa vụ bắt buộc, lời khuyên an toàn và mức độ chắc chắn trong công việc kỹ thuật.',
        formulas: [
          'can / could: Khả năng / cho phép thân mật / yêu cầu lịch sự / điều không thể (can’t)',
          'have to / had to: Sự cần thiết, bắt buộc (phủ định don’t/didn’t have to = không cần thiết)',
          'may / might: Độ chắc chắn < 50% (quá khứ: may/might + have + P2)',
          'must: Độ chắc chắn ~95% / bắt buộc tuân thủ an toàn (quá khứ suy đoán: must + have + P2)',
          'ought to: Lời khuyên nên làm / độ chắc chắn ~80% (quá khứ: ought to + have + P2)'
        ],
        examples: [
          'I can fix this machine. / Can I borrow your tool kit? / We can’t use this screwdriver for this screw.',
          'I have to clean the equipment after using. / I didn’t have to fix the lamp yesterday.',
          'He may be at the lab. / He may have been at the construction site.',
          'Mary isn’t at the lab. She must be sick.',
          'I ought to set up the circuit tonight. / She ought to have set up the circuit last night.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Pre-installation, Installation & Safety cautions',
        phrases: [
          'Cut off the electricity / power before starting.',
          'Check the compatibility of the tool size / bracket with the unit.',
          'Twist ends of the same colored wires together (Live: black/red, Neutral: blue, Earth/ground: green & yellow).',
          'Use a voltage tester all the time.',
          'Do not twist the power cords.'
        ]
      }
    ],
    speakingTasks: [
      'Role-play theo cặp: Kỹ thuật viên mới hỏi kỹ thuật viên giàu kinh nghiệm cách lắp đặt điều hoà (air conditioner) hoặc bóng đèn (light bulb) qua 3 giai đoạn Pre-installation, Installation, Post-installation và Caution.',
      'Hướng dẫn khách hàng quy trình 4 bước lắp đặt bóng đèn dựa trên tranh minh hoạ.'
    ],
    writingTasks: [
      'Viết hướng dẫn lắp đặt theo trình tự từng bước dựa vào hình ảnh hoặc ghi chú kỹ thuật.',
      'Viết email gửi đồng nghiệp hoặc khách hàng hướng dẫn lắp đặt một thiết bị điện (dụng cụ cần chuẩn bị, các bước thực hiện, lưu ý an toàn).'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Phân biệt must, have to, ought to & câu mệnh lệnh',
        prompt:
          'Giải thích sự khác nhau về mức độ chắc chắn và nghĩa vụ giữa can, have to, may/might, must và ought to trong ngữ cảnh lắp đặt thiết bị điện Unit 3.'
      },
      {
        mode: 'quiz',
        label: 'Luyện tập modal verbs & câu mệnh lệnh Unit 3',
        prompt:
          'Ra đề kiểm tra cho mình về động từ khuyết thiếu (must, have to, ought to, may/might) và câu mệnh lệnh phủ định an toàn điện trong Unit 3.'
      },
      {
        mode: 'roleplay',
        label: 'Nhập vai kỹ thuật viên hướng dẫn lắp điều hoà / đèn',
        prompt:
          'Hãy đóng vai một kỹ thuật viên mới chưa có kinh nghiệm hỏi mình (kỹ thuật viên hướng dẫn) quy trình lắp đặt bóng đèn hoặc máy lạnh an toàn.'
      },
      {
        mode: 'writing',
        label: 'Viết email hướng dẫn lắp đặt thiết bị Unit 3',
        prompt:
          'Hướng dẫn mình cấu trúc một email chuyên nghiệp gửi khách hàng chỉ dẫn từng bước lắp đặt thiết bị điện, dùng câu mệnh lệnh và modal verbs chuẩn Unit 3.'
      }
    ]
  },
  {
    unit: 4,
    title: 'Maintenance and repairs',
    vietnameseTitle: 'Bảo trì & Sửa chữa hệ thống',
    topicSummary:
      'Bảo dưỡng, khắc phục sự cố điều hoà và máy giặt (refrigerant, filter, fin, hose, thermostat, drain, lubricate, wear out), câu hỏi kiểm tra lỗi, chẩn đoán nguyên nhân hiện tại/quá khứ và đề xuất giải pháp.',
    goals: [
      'Thực hiện hội thoại hỏi thăm triệu chứng, chẩn đoán nguyên nhân và đề xuất giải pháp sửa điều hoà / máy giặt.',
      'Trình bày hướng dẫn bảo trì và sửa chữa thiết bị dựa trên bảng mã lỗi.',
      'Viết câu và chỉ dẫn ngắn gọn về bảo trì, sửa chữa thiết bị.'
    ],
    languageFocus: [
      {
        title: 'Structures to troubleshoot problems (Hỏi kiểm tra sự cố)',
        explanationVi: 'Dùng để hỏi người dùng đã thử các bước kiểm tra cơ bản trước đó hay chưa.',
        formulas: ['Have you tried + V-ing …?', 'Have you + P2 (yet)?'],
        examples: [
          'Have you tried fixing the air filter?',
          'Have you cleaned the filter yet?'
        ]
      },
      {
        title: 'Structures to diagnose problems (Chẩn đoán nguyên nhân)',
        explanationVi:
          'Phân biệt suy đoán có khả năng (Possibility < 95%) và chắc chắn cao (Certainty ~95%) ở hiện tại và quá khứ.',
        formulas: [
          'Present Possibility: S + may / might / could + V …',
          'Present Certainty: S + must + V …',
          'Past Possibility (Probably/Perhaps + S + V-ed): S + may / might / could + have + P2 …',
          'Past Certainty (It’s certain that + S + V-ed): S + must + have + P2 …'
        ],
        examples: [
          'The file may be too large. / The fan must be dirty.',
          'You might have broken it. (= Probably, you broke it.)',
          'You must have broken it. (= It’s certain that you broke it.)'
        ]
      },
      {
        title: 'Structures to give solutions (Đưa ra giải pháp)',
        explanationVi: 'Chỉ dẫn hành động khắc phục trực tiếp hoặc chỉ ra bộ phận cần được bảo dưỡng.',
        formulas: [
          'If + S + V (Present Simple) …, V (+ O) …',
          'S + need(s) + V-ing … = S + need(s) + to be + P2 …',
          'Try + V-ing …'
        ],
        examples: [
          'If there is not air coming out of the interior unit, check the fan.',
          'The fin needs cleaning. / The fin needs to be cleaned.',
          'Try rebooting the computer.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Troubleshooting & Repair checklist phrases',
        phrases: [
          'Alarm code E10 / U0 on the display',
          'Check whether the water tap is open / the inlet hose is squashed or kinked',
          'Dismantle the water inlet hose filter and clean it',
          'Find the leakage and recharge coolant / refrigerant',
          'The … needs lubricating / overhauling / replacing'
        ]
      }
    ],
    speakingTasks: [
      'Hotline Role-play (Card 1): Khách hàng gọi báo máy giặt Electrolux báo lỗi E10 (không cấp nước) — kỹ thuật viên hỏi các bước đã kiểm tra, chẩn đoán bẩn lọc ống cấp nước và hướng dẫn tháo rửa.',
      'Hotline Role-play (Card 2): Tư vấn sửa điều hoà Daikin báo lỗi U0 (thiếu gas lạnh, hỏng thermostat, cảm biến áp suất thấp hoặc bo mạch dàn nóng).'
    ],
    writingTasks: [
      'Sắp xếp, hoàn thành và viết câu hướng dẫn bảo trì – sửa chữa dùng cấu trúc troubleshooting, diagnosis và need + V-ing / to be P2.',
      'Viết hướng dẫn ngắn gọn các bước kiểm tra và bảo dưỡng định kỳ một thiết bị gia dụng.'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Cấu trúc chẩn đoán lỗi & need + V-ing',
        prompt:
          'Hệ thống lại giúp mình 3 nhóm cấu trúc Unit 4: hỏi kiểm tra sự cố (Have you tried...), chẩn đoán hiện tại/quá khứ (may/might/could/must + have P2) và đưa giải pháp (need + V-ing / to be done).'
      },
      {
        mode: 'quiz',
        label: 'Luyện tập chẩn đoán lỗi & viết lại câu Unit 4',
        prompt:
          'Ra đề kiểm tra Unit 4 cho mình: chuyển đổi câu có "Probably/It is certain that..." sang "may/must + have + P2" và kiểm tra cấu trúc "need + V-ing".'
      },
      {
        mode: 'roleplay',
        label: 'Hotline sửa máy giặt lỗi E10 / điều hoà lỗi U0',
        prompt:
          'Hãy đóng vai khách hàng gọi tới tổng đài kỹ thuật báo máy giặt Electrolux không vào nước và hiện mã lỗi E10 để mình đóng vai kỹ thuật viên hotline hỗ trợ xử lý.'
      },
      {
        mode: 'writing',
        label: 'Viết hướng dẫn bảo trì thiết bị Unit 4',
        prompt:
          'Hướng dẫn mình viết một đoạn chỉ dẫn bảo dưỡng điều hoà hoặc máy giặt khoảng 80–100 từ sử dụng đúng các động từ Unit 4 (dismantle, rinse, lubricate, wear out, refrigerant).'
      }
    ]
  },
  {
    unit: 5,
    title: 'Customer service',
    vietnameseTitle: 'Dịch vụ khách hàng kỹ thuật',
    topicSummary:
      'Tiếp nhận và giải quyết khiếu nại qua điện thoại & email (giao thiếu hàng, linh kiện lỗi, đĩa rô-tô, cánh van), cấu trúc nói giảm nói tránh lịch sự (seem, appear, sound, look like, look as if, may, might) và văn phong email trang trọng.',
    goals: [
      'Xử lý cuộc gọi khiếu nại từ khách hàng một cách chuyên nghiệp và hợp tác.',
      'Dùng cấu trúc lịch sự để báo lỗi sản phẩm hoặc sự cố hệ thống.',
      'Viết email phản hồi khiếu nại chuẩn cấu trúc và đúng sắc thái trang trọng.'
    ],
    languageFocus: [
      {
        title: 'Polite problem explanations (Cấu trúc giải thích vấn đề lịch sự)',
        explanationVi:
          'Các động từ seem, appear, sound, may, might, look as if, look like giúp làm mềm thông tin tiêu cực, tránh đổ lỗi trực tiếp cho khách hàng hoặc sản phẩm.',
        formulas: [
          'Seem / Appear: There seem(s)/appear(s) + to be + N | S + seem(s)/appear(s) + to + V',
          'Look as if / Sound as if / Look like: It looks as if / It sounds as if / It looks like + clause',
          'Might / May: S + might/may + bare V | There might/may be + N'
        ],
        examples: [
          'The activation key doesn’t work. -> The activation key doesn’t seem to work.',
          'There seems to be a missing rotor disc.',
          'The blender appears to be faulty.',
          'It looks like the system is a little slow today.',
          'It sounds as if your antivirus program might be causing the problem.',
          'It looks as if the fridge has stopped working.',
          'There might be some problems with the device.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Telephone support & Email register',
        phrases: [
          'Good morning. [Company]. [Name] speaking. How can I help?',
          'Salutation: Dear Mr/Ms [Surname], (Formal) vs. Hi/Hello [Name], (Informal)',
          'Body opening: I’m writing to … (Formal) vs. Just a quick note to … (Informal)',
          'Formal vs. Informal verbs: receive / get, inform / tell, assist / help, contact / get in touch',
          'Closing: Looking forward to your reply. / Regards, / Best wishes, / Yours sincerely,'
        ]
      },
      {
        category: 'Reporting handled complaints',
        phrases: [
          'I explained to her/him that it was because …',
          'Therefore, I offered a replacement / credit note as a goodwill gesture.'
        ]
      }
    ],
    speakingTasks: [
      'Role-play cuộc gọi giữa bộ phận mua hàng Vietnam Airlines và nhân viên kinh doanh VAECO Vietnam xử lý hoá đơn giao thiếu Disc Rotors (chỉ nhận 2/4) và giao dư Vanes (65 thay vì 60).',
      'Kể lại cho đồng nghiệp về khiếu nại vừa xử lý (tên khách hàng, công ty, vấn đề, nguyên nhân, giải pháp đưa ra và phản hồi của khách).'
    ],
    writingTasks: [
      'Chuyển đổi các câu nhận định thẳng thành câu giải thích lịch sự dùng seem, appear, look as if, sound as if, might.',
      'Viết email phản hồi khiếu nại khách hàng về đơn hàng hoặc thiết bị điện – điện tử bị lỗi (xin lỗi, giải thích nguyên nhân, đề xuất đổi trả/bồi thường thiện chí).'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Cách dùng seem, appear, look as if, sound as if',
        prompt:
          'Giải thích sự khác nhau về cấu trúc ngữ pháp giữa seem/appear, look like/look as if/sound as if và may/might khi giải thích lỗi kỹ thuật lịch sự trong Unit 5.'
      },
      {
        mode: 'quiz',
        label: 'Luyện chuyển câu thẳng sang câu lịch sự Unit 5',
        prompt:
          'Kiểm tra mình cách viết lại câu báo lỗi thẳng thừng thành câu lịch sự trong Unit 5 và phân biệt từ vựng email trang trọng (formal) với thân mật (informal).'
      },
      {
        mode: 'roleplay',
        label: 'Cuộc gọi xử lý đơn hàng thiếu linh kiện (VAECO)',
        prompt:
          'Hãy đóng vai khách hàng của Vietnam Airlines gọi phàn nàn về đơn hàng giao thiếu 2 Disc Rotors và thừa 5 Vanes để mình đóng vai nhân viên CSKH của VAECO xử lý.'
      },
      {
        mode: 'writing',
        label: 'Viết & chữa email trả lời khiếu nại Unit 5',
        prompt:
          'Hướng dẫn mình khung viết một email phản hồi khiếu nại khách hàng chuyên nghiệp (Subject, Salutation, xin lỗi, giải thích lịch sự, goodwill gesture, Closing) theo đúng mẫu Unit 5.'
      }
    ]
  },
  {
    unit: 6,
    title: 'Data Analysis',
    vietnameseTitle: 'Phân tích dữ liệu & Xu hướng biểu đồ',
    topicSummary:
      'Ngôn ngữ thuyết trình dẫn chiếu biểu đồ (visual aids), mô tả xu hướng tăng/giảm/ổn định/dao động bằng cặp cấu trúc S + V + Adv và There + be + Adj + N, cùng diễn đạt tỷ trọng đóng góp (account for / make up).',
    goals: [
      'Thảo luận chỉ ra các đặc điểm nổi bật của biểu đồ đường, biểu đồ cột.',
      'Thuyết trình mô tả biểu đồ sử dụng mẫu câu dẫn chiếu hình ảnh trực quan.',
      'Viết bài mô tả biểu đồ số liệu liên quan đến ngành Điện – Điện tử.'
    ],
    languageFocus: [
      {
        title: 'Language for presentation when referring to visual aids',
        explanationVi: 'Mẫu câu hướng sự chú ý của người nghe tới biểu đồ, đồ thị khi thuyết trình.',
        formulas: [
          'I’d like to show you / refer to a line graph / bar graph which represents …',
          'This graph / chart represents / shows / gives information about …',
          'If we take a look we can see … | I’d like to draw your attention to …',
          'As you can see, … | Take a look at … | You will see … | You can see that …'
        ],
        examples: [
          'I’d like to draw your attention to the sharp rise in smartphone sales between 2013 and 2015.',
          'As you can see, water heater energy consumption peaked in the fourth quarter.'
        ]
      },
      {
        title: 'Language for chart description (Charts with trends)',
        explanationVi:
          'Hai cấu trúc cốt lõi hoán đổi linh hoạt để mô tả xu hướng số liệu theo thời gian, kết hợp động từ/danh từ chỉ hướng và tính từ/trạng từ chỉ mức độ & tốc độ.',
        formulas: [
          'Cấu trúc 1: Subject + Verb + Adverb',
          'Cấu trúc 2: There + be + (a/an) + Adjective + Noun (+ in + Subject)',
          'Up: climb, go up, increase, rise, grow (N: increase, rise, growth)',
          'Down: decline, decrease, fall, go down (N: decline, decrease, fall)',
          'Level: not change, remain/stay constant/stable (N: no change) | Other: fluctuate (N: fluctuation)',
          'Adjectives/Adverbs of size & speed: sharp(ly), dramatic(ally), significant(ly), sudden(ly), gradual(ly), steady/steadily, slight(ly), insignificant(ly), slow(ly)'
        ],
        examples: [
          'The number of Internet users rises sharply. <-> There is a sharp rise in the number of Internet users.',
          'The electricity consumption of home appliances decreased sharply from 2010 to 2015. <-> There was a sharp decrease in the electricity consumption of home appliances from 2010 to 2015.',
          'Smartphone sales remained level at $10 million until 2013 and then increased dramatically.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Graph description outline & contribution phrases',
        phrases: [
          'Introduction: The bar/line graph shows / represents / compares / illustrates information about / percentage of / figures of …',
          'Overview: Overall, there were upward/downward trends in … / It can be seen that …',
          'Contribution: account for = make up (chiếm tỷ trọng), majority (đa số), minority (thiểu số), peak (đạt đỉnh), level off (chững lại)'
        ]
      }
    ],
    speakingTasks: [
      'Practice 1: Mô tả nhanh 5 biểu đồ số liệu (giá tủ lạnh Toshiba, lượng điều hoà bán tại Việt Nam, máy tính để bàn bán ra, điện năng tiêu thụ bình nóng lạnh theo quý, thị phần smartphone Apple/Samsung/Nokia).',
      'Mono-talk: Thuyết trình mô tả một biểu đồ hoàn chỉnh dùng cụm từ dẫn chiếu visual aids (nội dung biểu đồ, xu hướng chung, xu hướng từng đối tượng).'
    ],
    writingTasks: [
      'Viết lại câu chuyển đổi giữa "S + V + Adv" và "There + be + Adj + N".',
      'Viết bài mô tả biểu đồ hoàn chỉnh (Introduction + Overall + 2 Body paragraphs so sánh các đường/cột).'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Chuyển đổi S+V+Adv <-> There+be+Adj+N',
        prompt:
          'Giải thích quy tắc chuyển đổi giữa "Subject + Verb + Adv" và "There + be + Adj + Noun" trong Unit 6, kèm bảng phân biệt sharp/dramatic/gradual/steady và động từ peak, level off, account for.'
      },
      {
        mode: 'quiz',
        label: 'Luyện viết lại câu mô tả xu hướng Unit 6',
        prompt:
          'Ra đề cho mình luyện viết lại câu mô tả biểu đồ (tiêu thụ điện năng, doanh số smartphone/máy lạnh) giữa 2 cấu trúc của Unit 6 và kiểm tra giới từ đi kèm số liệu.'
      },
      {
        mode: 'roleplay',
        label: 'Thuyết trình biểu đồ tiêu thụ điện năng',
        prompt:
          'Đóng vai sếp / ban giám khảo buổi báo cáo kỹ thuật, yêu cầu mình thuyết trình một biểu đồ về điện năng tiêu thụ bình nóng lạnh qua 4 quý và đặt câu hỏi phản biện ngắn.'
      },
      {
        mode: 'writing',
        label: 'Chấm & sửa bài mô tả biểu đồ Unit 6',
        prompt:
          'Cho mình dàn ý chuẩn 3 phần (Introduction, Overview, Body) để viết bài mô tả biểu đồ so sánh doanh số máy tính và smartphone, sau đó mình sẽ viết thử để bạn chấm.'
      }
    ]
  },
  {
    unit: 7,
    title: 'Career Orientation',
    vietnameseTitle: 'Định hướng nghề nghiệp & Hồ sơ ứng tuyển',
    topicSummary:
      'Từ vựng hồ sơ xin việc (CV, qualification, reference, technical expertise, short-term/long-term objective), phân loại từ loại bằng hậu tố (Suffixes), ôn tập các thì trong phỏng vấn và kỹ năng viết CV kỹ sư.',
    goals: [
      'Tự giới thiệu bản thân và trả lời câu hỏi phỏng vấn xin việc ngành Điện – Điện tử.',
      'Nhận diện chính xác danh từ, tính từ, động từ, trạng từ qua hậu tố (suffixes).',
      'Viết CV chuẩn chỉnh ứng tuyển vị trí kỹ sư Điện – Điện tử.'
    ],
    languageFocus: [
      {
        title: 'Word formation with Suffixes (Phân loại từ loại theo hậu tố)',
        explanationVi:
          'Thêm hậu tố vào gốc từ giúp tạo từ mới và xác định đúng từ loại (Danh từ / Tính từ / Động từ / Trạng từ) trong câu và khi viết CV.',
        formulas: [
          'Noun suffixes: -er/-or (trainer, supervisor, transmitter, receiver), -ian/-ant (electrician, technician, applicant), -ist (technologist, scientist), -eer (engineer), -ee (interviewee, employee), -ics (electronics, mechanics), -ion/-tion/-ation (production, inspection, transmission), -ment (management, achievement), -ity/-ty/-ness (productivity, happiness), -ship (leadership)',
          'Adjective suffixes: -ing (interesting), -ed (qualified), -ible/-able (responsible, manageable), -al/-ial (electrical, technical, mechanical), -ic (enthusiastic), -ful (thoughtful), -ive/-ative (creative), -ous/-ious (ambitious), -less (useless)',
          'Verb suffixes: -en (soften, harden), -ify (identify, simplify), -ize (industrialize, modernize)',
          'Adverb suffix: -ly (happily, creatively)'
        ],
        examples: [
          'Laura is a qualified and committed employee.',
          'They prefer the young for this job because they are often enthusiastic and creative.',
          'You will be responsible for the operation and supervision of the assembly lines.'
        ]
      },
      {
        title: 'Tenses review (Ôn tập thì trong CV & Phỏng vấn)',
        explanationVi:
          'Phân biệt chính xác Hiện tại đơn (công việc hiện tại), Quá khứ đơn (kinh nghiệm/mốc tốt nghiệp đã kết thúc) và Hiện tại hoàn thành (kinh nghiệm tích luỹ tới hiện tại).',
        formulas: [
          'Present Simple: Công việc, vị trí hiện tại (I work at… / I am responsible for…)',
          'Past Simple: Công việc cũ, năm tốt nghiệp, dự án thời đại học (graduated in 2024, led a team when I was at university)',
          'Present Perfect: Kinh nghiệm kéo dài đến hiện tại hoặc chưa nêu mốc thời gian cụ thể (have worked since…, have learnt… so far)'
        ],
        examples: [
          'I graduated from Hanoi University of Industry in 2024. Since then I have worked as a technical sales engineer.',
          'What have you learnt so far? — I have learnt problem-solving and presentation skills.',
          'What have you done to show leadership skills? — I led a team when I was at university.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'CV & Job Interview expressions',
        phrases: [
          'short-term / long-term career objectives',
          'technical expertise / hands-on experience',
          'make an impact / professional development',
          'When it comes to …, I …',
          'I was responsible for diagnosing / evaluating malfunction systems.'
        ]
      }
    ],
    speakingTasks: [
      'Role-play phỏng vấn vị trí Electronics Engineer (EVN / Samsung): Greeting, Career objectives, Experience, Skills, Strengths & weaknesses, Reasons to employ.',
      'Mono-talk: Tự giới thiệu bản thân ứng tuyển vị trí Maintenance Engineer (Personal info, Qualifications, Experience, Skills, Interests, Objectives).'
    ],
    writingTasks: [
      'Bài tập sửa lỗi sai và chia động từ đúng thì/từ loại trong ngữ cảnh phỏng vấn & mô tả công việc.',
      'Viết một bản CV hoàn chỉnh bằng tiếng Anh ứng tuyển vị trí kỹ sư Điện – Điện tử (gồm Career Objective, Education, Experience, Technical Skills, References).'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Bảng hậu tố (Suffixes) & chia thì phỏng vấn',
        prompt:
          'Tóm tắt giúp mình bảng hậu tố nhận biết Danh từ / Tính từ / Động từ / Trạng từ trong Unit 7 và cách phân biệt Past Simple với Present Perfect khi trả lời phỏng vấn.'
      },
      {
        mode: 'quiz',
        label: 'Kiểm tra từ loại (Suffixes) & chia thì Unit 7',
        prompt:
          'Ra đề kiểm tra Unit 7 cho mình gồm chọn đúng dạng từ theo hậu tố (qualified/qualification, enthusiastic/enthusiasm) và sửa lỗi chia thì phỏng vấn.'
      },
      {
        mode: 'roleplay',
        label: 'Phỏng vấn vị trí Electronics / Maintenance Engineer',
        prompt:
          'Hãy đóng vai nhà tuyển dụng phỏng vấn mình vào vị trí Maintenance Engineer / Electronics Engineer với các câu hỏi về điểm mạnh/yếu, kinh nghiệm và mục tiêu ngắn hạn – dài hạn.'
      },
      {
        mode: 'writing',
        label: 'Hướng dẫn & chấm CV kỹ sư Điện – Điện tử',
        prompt:
          'Hướng dẫn mình cấu trúc viết CV tiếng Anh chuẩn cho sinh viên ngành Điện – Điện tử HaUI và gợi ý các động từ mạnh cho phần Experience & Career Objective.'
      }
    ]
  },
  {
    unit: 8,
    title: 'Meetings and discussion',
    vietnameseTitle: 'Họp kỹ thuật & Thảo luận nhóm',
    topicSummary:
      'Ngôn ngữ điều phối cuộc họp (nêu quan điểm, ngắt lời lịch sự, xử lý khi bị ngắt lời, đồng ý/phản đối, đề xuất giải pháp, chốt quyết định), cấu trúc Should + V, Gerund/Infinitive, Mệnh đề danh ngữ (Noun clauses) và cách ghi biên bản họp (Meeting minutes).',
    goals: [
      'Thảo luận vấn đề kỹ thuật và bảo trì hệ thống trong cuộc họp nhóm.',
      'Sử dụng thành thạo mẫu câu ngắt lời và xử lý ngắt lời lịch sự.',
      'Viết biên bản cuộc họp (Meeting Minutes) rõ ràng, đầy đủ thông tin.'
    ],
    languageFocus: [
      {
        title: 'Suggestions & Advice (Should + V)',
        explanationVi: 'Dùng để đề xuất phương án hoặc đưa lời khuyên trong cuộc họp.',
        formulas: ['S + should + V (infinitive)'],
        examples: [
          'In my opinion, we should maintain the indoor unit of the air conditioner system regularly.'
        ]
      },
      {
        title: 'Gerunds and Infinitives (Danh động từ & Động từ nguyên mẫu)',
        explanationVi:
          'Dùng to-infinitive để chỉ mục đích hoặc sau các động từ tư duy/ý định; dùng V-ing (gerund) sau giới từ.',
        formulas: [
          'To-infinitive chỉ mục đích: to + V (trả lời cho "Why…?")',
          'Sau động từ (choose, decide, expect, forget, hate, hope, intend, learn, like, love, mean, plan, prefer, remember, want, would like/love) + to + V',
          'Sau giới từ (in charge of, responsible for, about, before, after…) + V-ing'
        ],
        examples: [
          'We are here today to discuss the best ways to maintain the electrical system of our company.',
          'So, we have decided to find the solutions for customer service improvement.',
          'Mr. Chang was in charge of taking the minutes of the meeting last week.'
        ]
      },
      {
        title: 'Noun Clauses (Mệnh đề danh ngữ làm Chủ ngữ / Bổ ngữ)',
        explanationVi:
          'Mệnh đề có chủ ngữ và động từ đóng vai trò như một danh từ (Subject hoặc Subject Complement) trong phát biểu cuộc họp.',
        formulas: [
          'Làm Chủ ngữ (Subject): What + S + V + is/are …',
          'Làm Bổ ngữ chủ ngữ (Subject Complement): The main content / purpose of … is + how/what/that + …'
        ],
        examples: [
          'What we decide to do is to change the logo of the company.',
          'What you are talking about is very interesting!',
          'The main content of the meeting is how to deal with complaints of the customers.'
        ]
      }
    ],
    keyExpressions: [
      {
        category: 'Give opinion / Make a point (Đưa ý kiến)',
        phrases: [
          'My point is … / In my opinion, …',
          'I’m positive that … / I really think that …',
          'If you ask me, I tend to think that …',
          'I just want to say something about …'
        ]
      },
      {
        category: 'Interrupt & Deal with interruptions (Ngắt lời & Xử lý ngắt lời)',
        phrases: [
          'Interrupt: Sorry to interrupt you … / I apologize for interrupting but … / Could I make a point here? / Can I just say something about that? / May I have a word?',
          'Hold/Delay: Hold on, please. / Just a second, please. I promise we’ll come right back to you.',
          'Accept: Over to you! / Of course. So what would you like to say? / Of course. / Sure, go ahead!'
        ]
      },
      {
        category: 'Agree, Disagree, Suggest & Confirm decisions',
        phrases: [
          'Strongly agree: Absolutely. I think that’s a fantastic idea! / I agree completely. / I couldn’t agree with you more. / Yes, that’s definitely true.',
          'Disagree: I’m afraid I can’t agree with you there. / I don’t think that’s true. I completely disagree.',
          'Make suggestions: I suggest/recommend that … / Why don’t we … / What about if we/you … / Let’s … / What I think we need to do is …',
          'Confirm decisions: So, to sum up, what we decide is … / Alright! So we are going to … / We’ve decided to …'
        ]
      }
    ],
    speakingTasks: [
      'Role-play theo sơ đồ cuộc họp: Hai kỹ thuật viên phụ trách bảo trì máy giặt toà nhà thảo luận quy trình (ngắt điện trước khi thao tác, vệ sinh lưới lọc, đánh bóng vỏ ngoài, tranh luận chu kỳ thay ống dẫn 7 năm hay 5 năm và chốt quyết định).'
    ],
    writingTasks: [
      'Sắp xếp từ thành câu họp chuẩn mẫu câu Unit 8.',
      'Viết biên bản cuộc họp (Meeting Minutes): Meeting title, Date, Time, Venue, Purpose, Chairman, Minute taker, Participants, Apologies, Agenda items, Decisions/Action items, AOB, Date of next meeting.'
    ],
    starterPrompts: [
      {
        mode: 'qa',
        label: 'Tổng hợp mẫu câu họp & Mệnh đề danh ngữ Unit 8',
        prompt:
          'Tổng hợp giúp mình các mẫu câu dùng trong cuộc họp Unit 8 (ngắt lời, xử lý ngắt lời, đồng tình/phản đối, chốt quyết định) cùng cách dùng Gerund/Infinitive và Noun clause.'
      },
      {
        mode: 'quiz',
        label: 'Kiểm tra Gerund/Infinitive & tình huống họp Unit 8',
        prompt:
          'Ra đề kiểm tra cho mình về cách chọn to-V hay V-ing (in charge of, decided, purpose) và chọn mẫu câu xử lý ngắt lời / phản biện lịch sự trong cuộc họp.'
      },
      {
        mode: 'roleplay',
        label: 'Nhập vai họp bảo trì hệ thống máy giặt / điều hoà',
        prompt:
          'Hãy đóng vai đồng nghiệp cùng họp với mình bàn kế hoạch bảo trì hệ thống máy giặt của toà nhà theo đúng lưu đồ Unit 8 (nêu ý kiến, ngắt lời lịch sự, phản biện và chốt quyết định).'
      },
      {
        mode: 'writing',
        label: 'Hướng dẫn & chấm biên bản cuộc họp (Minutes)',
        prompt:
          'Hướng dẫn mình bố cục chuẩn để viết Meeting Minutes (biên bản cuộc họp kỹ thuật) theo mẫu Unit 8 và đặt một tình huống họp để mình viết thử rồi bạn chấm.'
      }
    ]
  }
];

export const TUTOR_KNOWLEDGE_BY_UNIT: Record<number, UnitTutorKnowledge> = Object.fromEntries(
  UNIT_TUTOR_KNOWLEDGE.map((u) => [u.unit, u])
);

export const GLOBAL_STARTER_PROMPTS: StarterPrompt[] = [
  {
    mode: 'qa',
    label: 'Ôn tổng hợp ngữ pháp 8 Units EEE5',
    prompt:
      'Tóm tắt ngắn gọn bức tranh ngữ pháp trọng tâm của cả 8 Units môn Tiếng Anh Chuyên ngành Điện – Điện tử 5 (HaUI) để mình ôn tập nhanh.'
  },
  {
    mode: 'quiz',
    label: 'Kiểm tra từ vựng hay sai & thuật ngữ kỹ thuật',
    prompt:
      'Hãy kiểm tra mình bằng các câu hỏi trắc nghiệm và điền từ (cloze) xoay quanh các từ mình hay sai gần đây hoặc các từ vựng cốt lõi Units 1–8.'
  },
  {
    mode: 'roleplay',
    label: 'Luyện hội thoại kỹ sư Điện – Điện tử tổng hợp',
    prompt:
      'Hãy đóng vai quản lý kỹ thuật hoặc nhà tuyển dụng quốc tế để luyện phản xạ giao tiếp tiếng Anh chuyên ngành Điện – Điện tử cùng mình.'
  },
  {
    mode: 'writing',
    label: 'Chữa bài viết tiếng Anh kỹ thuật (Email / CV / Graph)',
    prompt:
      'Mình muốn luyện viết tiếng Anh chuyên ngành (đoạn văn công ty, email kỹ thuật, mô tả biểu đồ hoặc CV). Hãy gợi ý đề bài phù hợp và chấm chi tiết khi mình gửi bài.'
  }
];

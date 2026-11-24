import type { UnitMeta } from '../types/vocab';

export const UNITS_META: UnitMeta[] = [
  {
    unit: 1,
    title: 'Companies in Electrical and Electronics fields',
    vietnameseTitle: 'Doanh nghiệp trong lĩnh vực Điện - Điện tử',
    description:
      'Thuật ngữ về hồ sơ doanh nghiệp, tập đoàn đa quốc gia, công ty con, văn hoá doanh nghiệp và lĩnh vực sản xuất linh kiện bán dẫn, điện tử tiêu dùng.',
    iconKey: 'building',
    objectives: [
      'Giới thiệu thông tin nền tảng của doanh nghiệp Điện – Điện tử (trụ sở, quy mô nhân sự, doanh thu, sản phẩm chủ lực).',
      'Mô tả văn hoá làm việc, cơ cấu công ty mẹ – công ty liên kết và đối thủ cạnh tranh trên thị trường.',
      'Sử dụng chuẩn xác các cụm danh từ chuyên ngành về bán dẫn, điện gia dụng và thiết bị công nghiệp.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Present Simple & Present Continuous • Past Simple for Company History',
        summary:
          'Ôn tập thì hiện tại đơn, hiện tại tiếp diễn để mô tả hoạt động hiện tại và thì quá khứ đơn khi trình bày lịch sử thành lập doanh nghiệp.',
        keyTopics: ['Active vs. Stative Verbs', 'Founded / Established in...', 'Prepositions of Location & Time']
      },
      listening: {
        skill: 'listening',
        title: 'Company Profiles & Corporate Briefings',
        summary:
          'Nghe hiểu bài giới thiệu tập đoàn công nghệ (Samsung, Intel, Schneider Electric) và điền thông tin số liệu nhân sự, doanh thu.',
        keyTopics: ['Numbers & Revenue Figures', 'Headquarters & Subsidiaries', 'Product Line Overview']
      },
      reading: {
        skill: 'reading',
        title: 'Semiconductor & Consumer Electronics Market Profiles',
        summary:
          'Đọc hiểu bài viết về chuỗi cung ứng sản xuất vi mạch, văn hoá doanh nghiệp và chiến lược mở rộng thị trường toàn cầu.',
        keyTopics: ['Skimming for Company Facts', 'Scanning Product Portfolios', 'Corporate Culture Comparison']
      },
      writing: {
        skill: 'writing',
        title: 'Writing a Technical Company Profile',
        summary:
          'Viết đoạn văn/bài giới thiệu ngắn 120–150 từ về một doanh nghiệp điện – điện tử kèm số liệu cốt lõi và thế mạnh công nghệ.',
        keyTopics: ['Topic Sentences for Profiles', 'Linking Facts Logically', 'Formal Business Register']
      }
    }
  },
  {
    unit: 2,
    title: 'Smart products',
    vietnameseTitle: 'Sản phẩm thông minh & Cảm biến',
    description:
      'Từ vựng chuyên sâu về cảm biến (gia tốc, con quay hồi chuyển, áp suất, chuyển động), phần cứng nhúng, tiêu chuẩn IP và tính năng thông minh.',
    iconKey: 'cpu',
    objectives: [
      'Phân biệt chức năng của các loại cảm biến hiện đại trong thiết bị đeo, nhà thông minh và hệ thống tự động.',
      'Giải thích thông số phần cứng, hệ điều hành, bảng điều khiển và chỉ số bảo vệ chống bụi/nước (IP rating).',
      'Thuyết trình ưu điểm, tính năng nổi bật và nguyên lý hoạt động cơ bản của một sản phẩm thông minh.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Describing Purpose & Function (used for / designed to / allow + O + to V)',
        summary:
          'Cấu trúc ngữ pháp mô tả chức năng cảm biến, mục đích thiết kế phần cứng và khả năng kết nối của thiết bị thông minh.',
        keyTopics: ['Infinitive of Purpose', 'Relative Clauses for Specifications', 'Comparatives & Superlatives']
      },
      listening: {
        skill: 'listening',
        title: 'Smart Device Product Demos & Sensor Specs',
        summary:
          'Nghe kỹ sư giới thiệu tính năng đồng hồ thông minh, bộ điều nhiệt IoT và thông số cảm biến tích hợp.',
        keyTopics: ['Sensor Capabilities', 'Hardware Specifications', 'User Interaction Flows']
      },
      reading: {
        skill: 'reading',
        title: 'Datasheets & Smart Appliance Reviews',
        summary:
          'Đọc hiểu tài liệu thông số kỹ thuật (datasheet) về chuẩn IP, GPS, bộ vi xử lý và bài đánh giá thiết bị thông minh.',
        keyTopics: ['Technical Datasheet Extraction', 'IP Code Interpretation', 'Feature Comparison']
      },
      writing: {
        skill: 'writing',
        title: 'Smart Product Specification Sheet & Overview',
        summary:
          'Soạn thảo bản mô tả tính năng và thông số kỹ thuật cho một thiết bị điện tử thông minh ứng dụng cảm biến.',
        keyTopics: ['Technical Bullet Points', 'Describing Features Clearly', 'Summarizing User Benefits']
      }
    }
  },
  {
    unit: 3,
    title: 'Installation',
    vietnameseTitle: 'Lắp đặt thiết bị & Hệ thống điện',
    description:
      'Từ vựng về thiết bị lắp đặt (tủ điện, hộp đấu nối, máy biến áp ba pha, hệ thống thông gió) và các động tác thao tác kỹ thuật tại hiện trường.',
    iconKey: 'wrench',
    objectives: [
      'Nhận diện đúng tên gọi thiết bị, phụ kiện đấu nối và dụng cụ đo kiểm khi lắp đặt hệ thống điện công nghiệp.',
      'Mô tả trình tự các bước lắp đặt, cố định, đấu dây, nối đất và kiểm tra an toàn trước khi đóng điện.',
      'Đọc hiểu và diễn đạt các chỉ dẫn lắp đặt theo tiêu chuẩn kỹ thuật an toàn.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Imperatives, Sequencing & Passive Voice for Procedures',
        summary:
          'Sử dụng câu mệnh lệnh, từ nối trình tự (First, Then, Before + V-ing) và câu bị động để mô tả quy trình lắp đặt chuẩn xác.',
        keyTopics: ['Sequencing Markers', 'Safety Modals (must / should)', 'Passive Process Descriptions']
      },
      listening: {
        skill: 'listening',
        title: 'On-site Installation Briefings & Technician Instructions',
        summary:
          'Nghe hướng dẫn lắp đặt tủ phân phối điện, đấu nối máy biến áp và kiểm tra thông mạch bằng đồng hồ đo điện áp.',
        keyTopics: ['Step-by-step Instructions', 'Safety Warnings', 'Clarifying Wiring Details']
      },
      reading: {
        skill: 'reading',
        title: 'Installation Manuals & Safety Checklists',
        summary:
          'Đọc hiểu tài liệu hướng dẫn lắp đặt hệ thống thông gió, tủ điều khiển và danh mục kiểm tra nghiệm thu ban đầu.',
        keyTopics: ['Manual Troubleshooting', 'Pre-commissioning Checks', 'Compliance Standards']
      },
      writing: {
        skill: 'writing',
        title: 'Writing Step-by-Step Installation Procedures',
        summary:
          'Viết hướng dẫn quy trình lắp đặt thiết bị điện gồm chuẩn bị dụng cụ, các bước thực hiện và lưu ý an toàn.',
        keyTopics: ['Procedural Formatting', 'Warning & Caution Notes', 'Precise Action Verbs']
      }
    }
  },
  {
    unit: 4,
    title: 'Maintenance and repairs',
    vietnameseTitle: 'Bảo trì & Sửa chữa hệ thống',
    description:
      'Thuật ngữ về linh kiện thay thế, vật tư tiêu hao và các thao tác chẩn đoán lỗi, thay thế, hiệu chuẩn và bảo dưỡng phòng ngừa.',
    iconKey: 'shield-check',
    objectives: [
      'Phân biệt bảo trì phòng ngừa (preventive maintenance) và sửa chữa khắc phục sự cố (corrective repair).',
      'Mô tả tình trạng hỏng hóc linh kiện, đọc lỗi và quy trình kiểm tra, tháo lắp, thay thế vật tư.',
      'Giao tiếp rõ ràng khi bàn giao tình trạng thiết bị sau bảo trì và đề xuất lịch kiểm tra định kỳ.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Present Perfect for Maintenance Status & Conditionals for Faults',
        summary:
          'Dùng thì hiện tại hoàn thành báo cáo công việc đã sửa xong và câu điều kiện để chẩn đoán nguyên nhân – hệ quả sự cố.',
        keyTopics: ['Present Perfect vs. Past Simple', 'First & Second Conditionals', 'Cause & Effect Connectors']
      },
      listening: {
        skill: 'listening',
        title: 'Diagnostic Calls & Maintenance Handover Reports',
        summary:
          'Nghe hội thoại giữa kỹ sư bảo trì và vận hành viên về nguyên nhân quá nhiệt, sụt áp và thay thế linh kiện.',
        keyTopics: ['Fault Symptoms', 'Repair Actions Taken', 'Spare Part Requests']
      },
      reading: {
        skill: 'reading',
        title: 'Preventive Maintenance Logs & Troubleshooting Guides',
        summary:
          'Đọc hiểu nhật ký bảo trì thiết bị nhà máy, bảng tra mã lỗi và quy trình cô lập nguồn an toàn (LOTO).',
        keyTopics: ['Diagnostic Flowcharts', 'Service Intervals', 'Root-Cause Notes']
      },
      writing: {
        skill: 'writing',
        title: 'Completing a Maintenance & Repair Report',
        summary:
          'Hoàn thiện phiếu báo cáo sự cố và biên bản sửa chữa thiết bị với đầy đủ triệu chứng, nguyên nhân và linh kiện đã thay.',
        keyTopics: ['Incident Summary', 'Corrective Actions', 'Preventive Recommendations']
      }
    }
  },
  {
    unit: 5,
    title: 'Customer service',
    vietnameseTitle: 'Dịch vụ khách hàng kỹ thuật',
    description:
      'Từ vựng và mẫu câu xử lý khiếu nại kỹ thuật, bảo hành sản phẩm, đơn hàng linh kiện thay thế và hỗ trợ khách hàng chuyên nghiệp.',
    iconKey: 'headphones',
    objectives: [
      'Tiếp nhận và phản hồi lịch sự các khiếu nại về lỗi thiết bị, giao hàng thiếu linh kiện hoặc chậm tiến độ.',
      'Trao đổi thông tin đơn hàng, mã phụ tùng, chính sách bảo hành và phương án đổi trả/sửa chữa.',
      'Duy trì thái độ chuyên nghiệp, đồng cảm và cam kết giải pháp cụ thể với khách hàng doanh nghiệp.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Polite Requests, Apologies & Future Commitments',
        summary:
          'Cấu trúc câu lịch sự khi xin lỗi, hứa khắc phục sự cố (will / would be glad to) và câu gián tiếp xác nhận thông tin.',
        keyTopics: ['Modal Verbs for Politeness', 'Reported Speech in Complaints', 'Softening Language']
      },
      listening: {
        skill: 'listening',
        title: 'Technical Support Calls & Order Inquiries',
        summary:
          'Nghe các cuộc gọi hỗ trợ khách hàng xử lý lỗi phần cứng, kiểm tra tình trạng đơn linh kiện và xác nhận lịch kỹ thuật viên.',
        keyTopics: ['Active Listening Cues', 'Verifying Part Numbers', 'Confirming Action Plans']
      },
      reading: {
        skill: 'reading',
        title: 'Warranty Policies & Customer Complaint Emails',
        summary:
          'Đọc hiểu email phản ánh lỗi sản phẩm từ khách hàng và điều khoản bảo hành, đổi mới thiết bị điện tử.',
        keyTopics: ['Identifying Core Complaints', 'Warranty Eligibility', 'SLA Response Timelines']
      },
      writing: {
        skill: 'writing',
        title: 'Writing a Professional Complaint Response Email',
        summary:
          'Soạn email phản hồi khiếu nại khách hàng gồm lời xin lỗi, giải thích nguyên nhân kỹ thuật và phương án bù đắp.',
        keyTopics: ['Email Tone & Etiquette', 'Action-Oriented Closings', 'Clear Follow-up Commitments']
      }
    }
  },
  {
    unit: 6,
    title: 'Data Analysis',
    vietnameseTitle: 'Phân tích dữ liệu & Xu hướng biểu đồ',
    description:
      'Từ vựng chuyên dùng mô tả biểu đồ, đồ thị (đường, cột, tròn), tốc độ tăng giảm, điểm đỉnh/đáy và biến động số liệu kỹ thuật.',
    iconKey: 'bar-chart',
    objectives: [
      'Mô tả chính xác các loại biểu đồ, trục dữ liệu và số liệu đo lường năng lượng, sản lượng, hiệu suất.',
      'Sử dụng linh hoạt động từ và danh từ chỉ xu hướng tăng, giảm, ổn định, dao động cùng trạng từ chỉ mức độ.',
      'So sánh tương quan dữ liệu giữa các giai đoạn và rút ra nhận xét kỹ thuật ngắn gọn.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Verb + Adverb vs. Adjective + Noun for Trends & Prepositions',
        summary:
          'Chuyển đổi linh hoạt giữa cấu trúc mô tả xu hướng (rose sharply / a sharp rise) và giới từ đi kèm số liệu (by, to, from, at).',
        keyTopics: ['Prepositions with Data (by / to / of)', 'Degree Modifiers', 'Comparing Data Series']
      },
      listening: {
        skill: 'listening',
        title: 'Quarterly Performance & Power Consumption Briefings',
        summary:
          'Nghe báo cáo phân tích biểu đồ tiêu thụ điện năng, tỷ lệ lỗi sản xuất và hiệu suất dây chuyền theo quý.',
        keyTopics: ['Extracting Peak & Trough Values', 'Identifying Trend Shifts', 'Matching Audio to Charts']
      },
      reading: {
        skill: 'reading',
        title: 'Engineering Test Reports & Trend Summaries',
        summary:
          'Đọc hiểu báo cáo thử nghiệm kỹ thuật kèm bảng số liệu, biểu đồ xu hướng nhiệt độ, dòng tải và sản lượng.',
        keyTopics: ['Chart-to-Text Verification', 'Highlighting Anomalies', 'Summarizing Key Findings']
      },
      writing: {
        skill: 'writing',
        title: 'Describing a Technical Chart or Line Graph',
        summary:
          'Viết bài phân tích biểu đồ 150 từ nêu tổng quan xu hướng chính, các điểm nổi bật và so sánh số liệu cụ thể.',
        keyTopics: ['Overview Paragraph', 'Data Evidence Integration', 'Cohesive Trend Transitions']
      }
    }
  },
  {
    unit: 7,
    title: 'Career Orientation',
    vietnameseTitle: 'Định hướng nghề nghiệp & Hồ sơ ứng tuyển',
    description:
      'Thuật ngữ về hồ sơ xin việc (CV), bằng cấp, mục tiêu ngắn hạn/dài hạn, nhiệm vụ kỹ sư và phẩm chất nghề nghiệp ngành Điện – Điện tử.',
    iconKey: 'briefcase',
    objectives: [
      'Trình bày học vấn, chứng chỉ chuyên môn, kinh nghiệm thực tập và kỹ năng kỹ thuật trong CV bằng tiếng Anh.',
      'Diễn đạt mục tiêu nghề nghiệp ngắn hạn, dài hạn và lý do phù hợp với vị trí kỹ sư Điện – Điện tử.',
      'Trả lời tự tin các câu hỏi phỏng vấn phổ biến về thế mạnh cá nhân và kinh nghiệm xử lý dự án.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Action Verbs in CVs, Gerunds & Future Career Plans',
        summary:
          'Dùng động từ hành động mạnh mẽ trong CV (designed, calibrated, supervised) và cấu trúc diễn đạt định hướng tương lai.',
        keyTopics: ['Past Action Verbs for Resumes', 'Expressing Career Goals', 'Talking About Strengths']
      },
      listening: {
        skill: 'listening',
        title: 'Engineering Job Interviews & HR Screenings',
        summary:
          'Nghe trích đoạn phỏng vấn vị trí kỹ sư thiết kế mạch, kỹ sư tự động hoá và ghi chú yêu cầu nhà tuyển dụng.',
        keyTopics: ['Interview Questions', 'Qualification Matching', 'Evaluating Candidate Responses']
      },
      reading: {
        skill: 'reading',
        title: 'Job Descriptions & Sample Engineering CVs',
        summary:
          'Đọc hiểu bản mô tả công việc (JD) cho kỹ sư Điện – Điện tử và phân tích bố cục một bản CV đạt chuẩn quốc tế.',
        keyTopics: ['Decoding Job Requirements', 'Essential vs. Desirable Skills', 'CV Critique']
      },
      writing: {
        skill: 'writing',
        title: 'Drafting a Technical CV & Cover Letter',
        summary:
          'Viết phần Tóm tắt nghề nghiệp (Career Objective) và Thư xin việc (Cover Letter) nhắm trúng vị trí kỹ sư mục tiêu.',
        keyTopics: ['Tailoring to JD Keywords', 'Quantifying Achievements', 'Formal Application Structure']
      }
    }
  },
  {
    unit: 8,
    title: 'Meetings and discussion',
    vietnameseTitle: 'Họp kỹ thuật & Thảo luận nhóm',
    description:
      'Từ vựng và ngôn ngữ điều phối cuộc họp (chương trình họp, biên bản, chủ trì, đồng thuận) và thảo luận giải pháp kỹ thuật.',
    iconKey: 'users',
    objectives: [
      'Nắm vững quy trình tổ chức một buổi họp kỹ thuật: chuẩn bị agenda, mở đầu, điều phối ý kiến và tổng kết.',
      'Sử dụng lịch sự các mẫu câu đưa ra đề xuất, đồng tình, phản biện có cơ sở và chốt phương án hành động.',
      'Ghi chép biên bản họp (meeting minutes) rõ ràng với đầu việc, người phụ trách và hạn hoàn thành.'
    ],
    skills: {
      grammar: {
        skill: 'grammar',
        title: 'Making Suggestions, Agreeing/Disagreeing Politely & Action Items',
        summary:
          'Cấu trúc đề xuất giải pháp (Why don’t we / Let’s consider / I suggest + V-ing) và phản biện mang tính xây dựng.',
        keyTopics: ['Polite Disagreement', 'Turn-Taking Phrases', 'Assigning Responsibilities']
      },
      listening: {
        skill: 'listening',
        title: 'Engineering Design Reviews & Project Meetings',
        summary:
          'Nghe cuộc họp nhóm kỹ sư thảo luận lựa chọn linh kiện, xử lý chậm tiến độ và phân công nhiệm vụ tiếp theo.',
        keyTopics: ['Identifying Speaker Stances', 'Tracking Decisions Made', 'Noting Deadlines']
      },
      reading: {
        skill: 'reading',
        title: 'Meeting Agendas & Technical Minutes',
        summary:
          'Đọc hiểu chương trình họp dự án và biên bản họp kỹ thuật để xác định các vấn đề tồn đọng cần giải quyết.',
        keyTopics: ['Agenda Structure', 'Action Register', 'Decision Logs']
      },
      writing: {
        skill: 'writing',
        title: 'Writing a Meeting Agenda & Minutes',
        summary:
          'Soạn thảo Agenda trước cuộc họp và tổng hợp Biên bản họp ngắn gọn, chính xác sau buổi thảo luận nhóm.',
        keyTopics: ['Concise Note-taking', 'Owner & Deadline Tables', 'Follow-up Summary']
      }
    }
  }
];

export const UNITS_META_BY_NUMBER: Record<number, UnitMeta> = Object.fromEntries(
  UNITS_META.map((u) => [u.unit, u])
);

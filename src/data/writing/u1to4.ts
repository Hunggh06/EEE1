import type { UnitWritingTask } from '../../types/curriculum';

export const WRITING_U1_TO_U4: UnitWritingTask[] = [
  {
    unit: 1,
    title: 'Đoạn văn giới thiệu công ty Điện – Điện tử mơ ước (Samsung Electronics)',
    taskTypeVi: 'Đoạn văn (110–130 từ)',
    objectiveVi:
      'Luyện dịch và ghi nhớ từng câu để hoàn chỉnh đoạn văn giới thiệu doanh nghiệp Điện – Điện tử bạn muốn làm việc sau khi tốt nghiệp HaUI, sử dụng đúng câu bị động, từ vựng doanh nghiệp và mẫu câu nêu quan điểm.',
    targetChecklist: [
      'Nêu rõ tên công ty, loại hình tập đoàn đa quốc gia, năm thành lập và trụ sở (was founded, is headquartered)',
      'Dùng chính xác động từ chủ động (specialize in, focus on) và bị động (are employed)',
      'Mô tả văn hóa doanh nghiệp (creativity, integrity, cooperation) và sứ mệnh đổi mới',
      'Kết hợp mẫu câu nêu quan điểm (In my opinion / I strongly believe that) và lý do muốn gia nhập'
    ],
    sentences: [
      {
        id: 'u1-w1',
        order: 1,
        sectionLabel: 'Mở đoạn (Tên & Loại hình)',
        vietnamesePrompt:
          'Sau khi tốt nghiệp trường Đại học Công nghiệp Hà Nội (HaUI), tôi muốn ứng tuyển vào vị trí kỹ sư điện tại Samsung Electronics, một tập đoàn đa quốc gia hàng đầu.',
        grammarTargets: ['After + V-ing', 'apply for', 'multinational corporation'],
        keywordSkeleton:
          'After / graduate / HaUI / want / apply / electrical engineering position / Samsung Electronics / leading / multinational corporation',
        modelSentence:
          'After graduating from HaUI, I want to apply for an electrical engineering position at Samsung Electronics, a leading multinational corporation.',
        tipVi:
          'Dùng cụm "After graduating from HaUI," để mở đoạn mạch lạc và cụm đồng vị "a leading multinational corporation" để giới thiệu quy mô doanh nghiệp.'
      },
      {
        id: 'u1-w2',
        order: 2,
        sectionLabel: 'Lịch sử & Trụ sở (Câu bị động)',
        vietnamesePrompt:
          'Công ty được thành lập vào năm 1969 và hiện nay đặt trụ sở chính tại Suwon, Hàn Quốc.',
        grammarTargets: ['Passive Past (was founded)', 'Passive Present (is headquartered)', 'headquartered in'],
        keywordSkeleton: 'company / found / 1969 / currently / headquarter / Suwon, South Korea',
        modelSentence:
          'The company was founded in 1969 and is currently headquartered in Suwon, South Korea.',
        tipVi:
          'Kết hợp bị động quá khứ đơn ("was founded") cho năm 1969 và bị động hiện tại đơn ("is currently headquartered") cho vị trí trụ sở chính.'
      },
      {
        id: 'u1-w3',
        order: 3,
        sectionLabel: 'Lĩnh vực & Sản phẩm chủ lực',
        vietnamesePrompt:
          'Doanh nghiệp này chuyên về chất bán dẫn, điện tử tiêu dùng và các thiết bị gia dụng thông minh giúp nâng cao cuộc sống hằng ngày của con người.',
        grammarTargets: ['specialize in (chủ động)', 'semiconductors', 'consumer electronics', 'home appliances', 'enhance'],
        keywordSkeleton:
          'specialize / semiconductor / consumer electronics / smart home appliance / enhance / daily life',
        modelSentence:
          "It specializes in semiconductors, consumer electronics, and smart home appliances that enhance people's daily lives.",
        tipVi:
          'Nhớ dùng dạng chủ động "specializes in" khi chủ ngữ là tên công ty, tuyệt đối không viết bị động "is specialized in".'
      },
      {
        id: 'u1-w4',
        order: 4,
        sectionLabel: 'Nhân sự, Công ty con & Doanh thu',
        vietnamesePrompt:
          'Ngày nay, hơn 260.000 nhân viên được tuyển dụng tại các công ty con trên toàn cầu của tập đoàn, tạo ra hàng tỷ đô la doanh thu hằng năm.',
        grammarTargets: ['Passive Present (are employed)', 'subsidiaries', 'annual revenue'],
        keywordSkeleton:
          'Today / over 260,000 employee / employ / global subsidiary / generate / billion / dollar / annual revenue',
        modelSentence:
          'Today, over 260,000 employees are employed across its global subsidiaries, generating billions of dollars in annual revenue.',
        tipVi:
          'Dùng bị động số nhiều "are employed" và rút gọn mệnh đề kết quả bằng phân từ "generating..." để ghép số liệu doanh thu tự nhiên.'
      },
      {
        id: 'u1-w5',
        order: 5,
        sectionLabel: 'Văn hóa doanh nghiệp & Quan điểm thận trọng',
        vietnamesePrompt:
          'Theo quan điểm của tôi, Samsung là một nơi làm việc lý tưởng vì văn hóa doanh nghiệp của họ khuyến khích sự sáng tạo, tính chính trực và tinh thần hợp tác.',
        grammarTargets: ['In my opinion', 'corporate culture', 'encourage', 'creativity', 'integrity', 'cooperation'],
        keywordSkeleton:
          'In my opinion / Samsung / ideal workplace / corporate culture / encourage / creativity / integrity / cooperation',
        modelSentence:
          'In my opinion, Samsung is an ideal workplace because its corporate culture encourages creativity, integrity, and cooperation.',
        tipVi:
          'Dùng mẫu câu nêu quan điểm thận trọng "In my opinion," kết hợp bộ ba danh từ văn hóa doanh nghiệp trọng tâm của Unit 1.'
      },
      {
        id: 'u1-w6',
        order: 6,
        sectionLabel: 'Sứ mệnh & Đổi mới công nghệ',
        vietnamesePrompt:
          'Hơn nữa, sứ mệnh của công ty tập trung vào việc đổi mới liên tục nhằm tạo ra các công nghệ tiên tiến cho khách hàng toàn cầu.',
        grammarTargets: ['mission', 'focus on', 'innovation', 'cutting-edge technologies'],
        keywordSkeleton:
          'Furthermore / mission / focus / continuous innovation / create / cutting-edge technology / global customer',
        modelSentence:
          'Furthermore, its mission focuses on continuous innovation to create cutting-edge technologies for global customers.',
        tipVi:
          'Dùng từ nối "Furthermore," để chuyển ý mượt mà sang sứ mệnh công ty với cụm động từ "focus on" + động từ chỉ mục đích "to create".'
      },
      {
        id: 'u1-w7',
        order: 7,
        sectionLabel: 'Kết đoạn (Lý do & Đóng góp cá nhân)',
        vietnamesePrompt:
          'Tôi tin tưởng mạnh mẽ rằng việc làm việc tại đây sẽ giúp tôi nâng cao kỹ năng chuyên môn và đóng góp vào sự phát triển bền vững của công ty.',
        grammarTargets: ['I strongly believe that', 'enhance', 'contribute to'],
        keywordSkeleton:
          'I strongly believe that / work / here / help / enhance / technical skill / contribute / company / sustainable growth',
        modelSentence:
          "I strongly believe that working here will help me enhance my technical skills and contribute to the company's sustainable growth.",
        tipVi:
          'Khép lại đoạn văn bằng mẫu câu nêu quan điểm chắc chắn "I strongly believe that..." cùng cụm "contribute to + N" nêu đóng góp của bản thân.'
      }
    ]
  },
  {
    unit: 2,
    title: 'Đoạn văn mô tả & so sánh sản phẩm thông minh (Smartwatch)',
    taskTypeVi: 'Đoạn văn kỹ thuật (115–135 từ)',
    objectiveVi:
      'Xây dựng đoạn văn 7 câu mô tả thông số phần cứng, cảm biến, chuẩn chống nước IP68 và so sánh đồng hồ thông minh mới với sản phẩm tiền nhiệm/đối thủ bằng cấu trúc Unit 2.',
    targetChecklist: [
      'Sử dụng cả hai dạng mệnh đề quan hệ rút gọn: bị động (P2) và chủ động (V-ing)',
      'Đưa đầy đủ thông số: bộ xử lý (processor), hệ điều hành (OS), cảm biến (GPS, gyroscope, motion sensor), chuẩn IP68',
      'Vận dụng cấu trúc so sánh tương đồng (similar to, both ... and) và khác biệt (Unlike, lighter and thinner than)'
    ],
    sentences: [
      {
        id: 'u2-w1',
        order: 1,
        sectionLabel: 'Tổng quan sản phẩm (Rút gọn bị động P2)',
        vietnamesePrompt:
          'PulseWatch Pro là một thiết bị đeo tay thông minh được thiết kế bởi đội ngũ kỹ sư của chúng tôi dành cho người dùng năng động.',
        grammarTargets: ['Reduced relative clause (P2: designed by)', 'gadget'],
        keywordSkeleton: 'PulseWatch Pro / smart wearable gadget / design / engineering team / active user',
        modelSentence:
          'The PulseWatch Pro is a smart wearable gadget designed by our engineering team for active users.',
        tipVi:
          'Rút gọn mệnh đề quan hệ bị động "which is designed by..." thành quá khứ phân từ "designed by..." đứng ngay sau danh từ "gadget".'
      },
      {
        id: 'u2-w2',
        order: 2,
        sectionLabel: 'Bộ xử lý & Hệ điều hành (Rút gọn chủ động V-ing)',
        vietnamesePrompt:
          'Sản phẩm được vận hành bởi bộ vi xử lý lõi tứ chạy hệ điều hành WearOS mới nhất để mang lại hiệu năng mượt mà.',
        grammarTargets: ['Reduced relative clause (V-ing: running)', 'processor', 'operating system'],
        keywordSkeleton: 'power / quad-core processor / run / latest WearOS operating system / smooth performance',
        modelSentence:
          'It is powered by a quad-core processor running the latest WearOS operating system for smooth performance.',
        tipVi:
          'Rút gọn mệnh đề quan hệ chủ động "which runs..." thành hiện tại phân từ "running..." đi sau danh từ "quad-core processor".'
      },
      {
        id: 'u2-w3',
        order: 3,
        sectionLabel: 'Cảm biến tích hợp & Theo dõi',
        vietnamesePrompt:
          'Chiếc đồng hồ tích hợp GPS gắn sẵn, cảm biến con quay hồi chuyển và cảm biến chuyển động để theo dõi việc tập luyện chính xác.',
        grammarTargets: ['integrate', 'built-in GPS', 'gyroscope sensor', 'motion sensor', 'track'],
        keywordSkeleton:
          'watch / integrate / built-in GPS / gyroscope sensor / motion sensor / track / workout / accurately',
        modelSentence:
          'The watch integrates a built-in GPS, a gyroscope sensor, and a motion sensor to track workouts accurately.',
        tipVi:
          'Sử dụng bộ danh từ cảm biến chuẩn Unit 2 kết hợp động từ "integrate" và cụm động từ chỉ mục đích "to track...".'
      },
      {
        id: 'u2-w4',
        order: 4,
        sectionLabel: 'Chuẩn chống nước IP & So sánh tiền nhiệm',
        vietnamesePrompt:
          'Khác với sản phẩm tiền nhiệm, mẫu đồng hồ này được chứng nhận chuẩn IP68 về khả năng kháng bụi và chống nước vượt trội.',
        grammarTargets: ['Unlike + N', 'predecessor', 'certified IP68', 'dust and water resistance'],
        keywordSkeleton: 'Unlike / predecessor / model / certify IP68 / superior dust / water resistance',
        modelSentence:
          'Unlike its predecessor, this model is certified IP68 for superior dust and water resistance.',
        tipVi:
          'Dùng giới từ "Unlike + cụm danh từ" đầu câu để đối chiếu sự nâng cấp so với thế hệ trước, kèm mẫu bị động "is certified IP68 for...".'
      },
      {
        id: 'u2-w5',
        order: 5,
        sectionLabel: 'Tính năng kết nối & So sánh tương đồng',
        vietnamesePrompt:
          'Độ phân giải màn hình của nó tương tự như một chiếc điện thoại thông minh cao cấp, và nó đồng bộ hóa mượt mà với cả thiết bị iOS lẫn Android.',
        grammarTargets: ['similar to', 'resolution', 'synchronize', 'both ... and ...'],
        keywordSkeleton:
          "screen resolution / similar / flagship smartphone's / synchronize / seamlessly / both iOS / Android device",
        modelSentence:
          "Its screen resolution is similar to a flagship smartphone's, and it synchronizes seamlessly with both iOS and Android devices.",
        tipVi:
          'Kết hợp cấu trúc so sánh tương đồng "similar to" (nhớ sở hữu cách smartphone\'s) và cặp liên từ "both ... and ...".'
      },
      {
        id: 'u2-w6',
        order: 6,
        sectionLabel: 'Pin & So sánh đối thủ (So sánh hơn)',
        vietnamesePrompt:
          'Mặc dù pin của nó kéo dài tới 72 giờ, thiết bị vẫn nhẹ hơn và mỏng hơn hầu hết các đồng hồ thông minh đối thủ.',
        grammarTargets: ['Comparative (-er than)', 'lighter and thinner than'],
        keywordSkeleton: 'Although / battery / last up to 72 hour / lighter / thinner / most competing smartwatch',
        modelSentence:
          'Although its battery lasts up to 72 hours, it is lighter and thinner than most competing smartwatches.',
        tipVi:
          'Dùng "Although" tạo sự tương phản tích cực giữa thời lượng pin dài và thiết kế "lighter and thinner than" (tính từ ngắn nhân đôi phụ âm "thin" -> "thinner").'
      },
      {
        id: 'u2-w7',
        order: 7,
        sectionLabel: 'Kết luận đánh giá sản phẩm',
        vietnamesePrompt:
          'Tóm lại, PulseWatch Pro mang lại độ tin cậy cao hơn và thời lượng pin dài hơn bất kỳ phiên bản trước đây nào trong dòng sản phẩm này.',
        grammarTargets: ['Comparative (greater ... and longer ... than)', 'In short'],
        keywordSkeleton:
          'In short / PulseWatch Pro / offer / greater reliability / longer battery life / any previous version / product line',
        modelSentence:
          'In short, the PulseWatch Pro offers greater reliability and longer battery life than any previous version in this product line.',
        tipVi:
          'Tổng kết bằng "In short," cùng cấu trúc so sánh hơn song song "greater ... and longer ... than" để khẳng định giá trị sản phẩm.'
      }
    ]
  },
  {
    unit: 3,
    title: 'Email trang trọng hướng dẫn lắp đặt thiết bị điện (Đèn điện dân dụng)',
    taskTypeVi: 'Email kỹ thuật (120–140 từ)',
    objectiveVi:
      'Thực hành viết từng câu để tạo thành một bức email kỹ thuật hoàn chỉnh gửi khách hàng hướng dẫn lắp đặt bộ đèn LED an toàn theo trình tự Unit 3.',
    targetChecklist: [
      'Đầy đủ cấu trúc email trang trọng: lời chào + mục đích (I am writing to...) và kết thư (Yours faithfully)',
      'Trình bày rõ 3 giai đoạn: chuẩn bị & ngắt điện (Pre-installation), lắp đặt (Steps 1–4) và kiểm tra nghiệm thu',
      'Sử dụng chính xác câu mệnh lệnh khẳng định/phủ định (Cut off, Twist, Fasten, Don\'t be rushed) và modal verb (ought to)'
    ],
    sentences: [
      {
        id: 'u3-w1',
        order: 1,
        sectionLabel: 'Lời chào & Mục đích email',
        vietnamesePrompt:
          'Kính gửi Ông/Bà, tôi viết thư này để cung cấp hướng dẫn từng bước về cách lắp đặt bộ đèn LED mới của quý khách một cách an toàn.',
        grammarTargets: ['Formal salutation', 'I am writing to + V', 'how to + V'],
        keywordSkeleton:
          'Dear Sir or Madam / writing / provide / step-by-step instruction / how / install / new LED light fixture / safely',
        modelSentence:
          'Dear Sir or Madam, I am writing to provide step-by-step instructions on how to install your new LED light fixture safely.',
        tipVi:
          'Mở đầu email trang trọng bằng "Dear Sir or Madam," và nêu trực tiếp mục đích bằng mẫu "I am writing to provide instructions on...".'
      },
      {
        id: 'u3-w2',
        order: 2,
        sectionLabel: 'Chuẩn bị & Ngắt nguồn (Pre-installation)',
        vietnamesePrompt:
          'Trước khi bắt đầu, hãy chuẩn bị một chiếc tua-vít và một bút thử điện, đồng thời ngắt nguồn điện tại cầu dao tổng.',
        grammarTargets: ['Before + V-ing', 'Imperative (prepare, cut off)', 'voltage tester'],
        keywordSkeleton:
          'Before / start / prepare / screwdriver / voltage tester / cut off / electricity / main breaker',
        modelSentence:
          'Before starting, prepare a screwdriver and a voltage tester, and cut off the electricity at the main breaker.',
        tipVi:
          'Dùng cụm "Before starting," mở đầu giai đoạn Pre-installation, nối hai câu mệnh lệnh trực tiếp "prepare..." và "cut off...".'
      },
      {
        id: 'u3-w3',
        order: 3,
        sectionLabel: 'Bước 1–2: Kiểm tra tương thích & Dây dẫn',
        vietnamesePrompt:
          'Đầu tiên, hãy kiểm tra độ tương thích giữa đèn mới và giá đỡ, rồi kiểm tra chất lượng của các dây dẫn hiện có.',
        grammarTargets: ['Sequencing (First)', 'Imperative (check, inspect)', 'compatibility', 'bracket'],
        keywordSkeleton:
          'First / check / compatibility / between / new light / bracket / inspect / quality / existing wire',
        modelSentence:
          'First, check the compatibility between the new light and the bracket, and inspect the quality of the existing wires.',
        tipVi:
          'Từ nối trình tự "First," mở đầu các bước lắp đặt chính với động từ nguyên thể mệnh lệnh "check" và "inspect".'
      },
      {
        id: 'u3-w4',
        order: 4,
        sectionLabel: 'Bước 3–4: Đấu nối dây & Cố định đèn',
        vietnamesePrompt:
          'Tiếp theo, hãy xoắn chặt các đầu dây pha, dây trung tính và dây tiếp địa cùng màu lại với nhau, sau đó vặn cố định bóng đèn vào giá đỡ.',
        grammarTargets: ['Sequencing (Next, then)', 'Imperative (twist, fasten)', 'live / neutral / earth wires'],
        keywordSkeleton:
          'Next / twist / end / same-colored / live / neutral / earth wire / together / securely / then / fasten / bulb / bracket',
        modelSentence:
          'Next, twist the ends of the same-colored live, neutral, and earth wires together securely, then fasten the bulb into the bracket.',
        tipVi:
          'Sử dụng đúng thuật ngữ màu dây điện chuẩn giáo trình (live, neutral, earth) cùng các động từ thao tác "twist" và "fasten".'
      },
      {
        id: 'u3-w5',
        order: 5,
        sectionLabel: 'Kiểm tra sau lắp đặt (Modal verb)',
        vietnamesePrompt:
          'Sau khi lắp đặt, bạn nên đóng điện trở lại và kiểm tra dòng điện để đảm bảo đèn hoạt động bình thường.',
        grammarTargets: ['Modal verb (ought to)', 'post-installation check'],
        keywordSkeleton:
          'After installation / ought to / restore / power / test / electrical current / ensure / lamp / operate / properly',
        modelSentence:
          'After installation, you ought to restore the power and test the electrical current to ensure the lamp operates properly.',
        tipVi:
          'Dùng động từ khuyết thiếu "ought to + V(nguyên thể)" (mức độ khuyên làm ~80%) cho bước kiểm tra nghiệm thu sau lắp đặt.'
      },
      {
        id: 'u3-w6',
        order: 6,
        sectionLabel: 'Cảnh báo an toàn (Negative imperative)',
        vietnamesePrompt:
          'Quan trọng nhất là đừng vội vàng trong suốt quy trình, và tuyệt đối không chạm vào dây điện hở khi chưa đeo găng tay cách điện.',
        grammarTargets: ["Negative imperative (Don't be + Adj/P2)", 'never + V'],
        keywordSkeleton:
          "Most importantly / don't / rush / during / procedure / never / touch / exposed wire / without / wear / insulated glove",
        modelSentence:
          "Most importantly, don't be rushed during the procedure, and never touch exposed wires without wearing insulated gloves.",
        tipVi:
          'Vận dụng công thức sách giáo khoa "Don\'t be + P2/Adj" ("don\'t be rushed") kết hợp "never + V" để nhấn mạnh cảnh báo an toàn.'
      },
      {
        id: 'u3-w7',
        order: 7,
        sectionLabel: 'Kết thư lịch sự',
        vietnamesePrompt:
          'Nếu quý khách có bất kỳ thắc mắc nào, vui lòng liên hệ đội ngũ hỗ trợ kỹ thuật của chúng tôi qua email; trân trọng, Peter, Kỹ thuật viên lắp đặt điện tử.',
        grammarTargets: ['Conditional + polite imperative', 'Yours faithfully'],
        keywordSkeleton:
          'If / have / any question / please contact / technical support team / email / yours faithfully / Peter / Electronics Installer',
        modelSentence:
          'If you have any questions, please contact our technical support team by email; yours faithfully, Peter, Electronics Installer.',
        tipVi:
          'Khi mở đầu email bằng "Dear Sir or Madam,", phần kết thư chuẩn trang trọng luôn là "Yours faithfully," kèm tên và chức danh.'
      }
    ]
  },
  {
    unit: 4,
    title: 'Hướng dẫn chẩn đoán sự cố & bảo trì điều hòa không khí',
    taskTypeVi: 'Hướng dẫn bảo trì (120–140 từ)',
    objectiveVi:
      'Luyện viết từng câu theo trình tự một tài liệu hướng dẫn xử lý sự cố và bảo trì máy điều hòa: chẩn đoán nguyên nhân, câu hỏi kiểm tra ban đầu, vệ sinh linh kiện, giải pháp điều kiện và bảo dưỡng định kỳ.',
    targetChecklist: [
      'Dùng cấu trúc chẩn đoán khả năng hiện tại (may be + P2, might have + N)',
      'Dùng đúng câu hỏi kiểm tra lỗi (Have you tried + V-ing...?)',
      'Sử dụng cả hai dạng cấu trúc giải pháp: needs + V-ing và needs + to be + P2',
      'Dùng câu điều kiện giải pháp (If..., V + O) và từ vựng bảo trì Unit 4 (filter, evaporator, fin, refrigerant, lubricate)'
    ],
    sentences: [
      {
        id: 'u4-w1',
        order: 1,
        sectionLabel: 'Chẩn đoán triệu chứng (may / might)',
        vietnamesePrompt:
          'Khi máy điều hòa của bạn thổi ra gió nóng, bộ lọc không khí có thể bị tắc hoặc thiết bị có khả năng đang bị rò rỉ môi chất làm lạnh.',
        grammarTargets: ['Diagnosis (may be / might have)', 'air filter', 'clog', 'refrigerant'],
        keywordSkeleton:
          'When / air conditioner / blow / warm air / air filter / may / clog / unit / might / have / refrigerant leak',
        modelSentence:
          'When your air conditioner blows warm air, the air filter may be clogged or the unit might have a refrigerant leak.',
        tipVi:
          'Áp dụng cấu trúc chẩn đoán khả năng hiện tại "S + may/might + V(nguyên thể)" (may be clogged, might have).'
      },
      {
        id: 'u4-w2',
        order: 2,
        sectionLabel: 'Kiểm tra ban đầu (Have you tried + V-ing?)',
        vietnamesePrompt:
          'Trước khi gọi kỹ thuật viên, bạn đã thử điều chỉnh bộ điều nhiệt và đặt lại aptomat chính chưa?',
        grammarTargets: ['Have you tried + V-ing...?', 'thermostat', 'breaker'],
        keywordSkeleton:
          'Before / call / technician / have you tried / adjust / thermostat / reset / main circuit breaker / yet',
        modelSentence:
          'Before calling a technician, have you tried adjusting the thermostat and resetting the main circuit breaker yet?',
        tipVi:
          'Cấu trúc hỏi kiểm tra lỗi "Have you tried + V-ing" chi phối cả hai động từ "adjusting" và "resetting" (nhớ gấp đôi "t" trong "resetting").'
      },
      {
        id: 'u4-w3',
        order: 3,
        sectionLabel: 'Kiểm tra dàn lạnh & Ống thoát nước',
        vietnamesePrompt:
          'Tiếp theo, hãy kiểm tra các cuộn dây dàn lạnh và đảm bảo ống thoát nước ngưng không bị bẹp hay xoắn gập.',
        grammarTargets: ['evaporator coils', 'condensate', 'hose', 'kink'],
        keywordSkeleton:
          'Next / inspect / evaporator coil / make sure / condensate drain hose / neither squash / nor kink',
        modelSentence:
          'Next, inspect the evaporator coils and make sure the condensate drain hose is neither squashed nor kinked.',
        tipVi:
          'Dùng "neither ... nor ..." nối hai tính từ/phân từ (squashed, kinked) mô tả tình trạng thông suốt của đường ống.'
      },
      {
        id: 'u4-w4',
        order: 4,
        sectionLabel: 'Vệ sinh linh kiện (needs + V-ing / to be + P2)',
        vietnamesePrompt:
          'Nếu bụi tích tụ bên trong, bộ lọc không khí bám bụi cần được vệ sinh và các cánh tản nhiệt cần được xịt rửa nhẹ nhàng.',
        grammarTargets: ['needs + V-ing', 'need + to be + P2', 'radiator fins', 'rinse'],
        keywordSkeleton:
          'If / dust / build up / inside / dusty air filter / need / clean / radiator fin / need / rinse / gently',
        modelSentence:
          'If dust builds up inside, the dusty air filter needs cleaning and the radiator fins need to be rinsed gently.',
        tipVi:
          'Vận dụng song song hai cấu trúc tương đương của Unit 4: chủ ngữ số ít "filter needs cleaning" và chủ ngữ số nhiều "fins need to be rinsed".'
      },
      {
        id: 'u4-w5',
        order: 5,
        sectionLabel: 'Giải pháp theo điều kiện (If..., V)',
        vietnamesePrompt:
          'Nếu vẫn không có khí mát thổi ra từ dàn lạnh, hãy tắt hệ thống ngay lập tức để tránh làm hỏng máy nén.',
        grammarTargets: ['If + S + V, V + O', 'interior unit', 'compressor'],
        keywordSkeleton:
          'If / there / still / no cool air / come out / interior unit / turn off / system / immediately / prevent / compressor damage',
        modelSentence:
          'If there is still no cool air coming out of the interior unit, turn off the system immediately to prevent compressor damage.',
        tipVi:
          'Áp dụng đúng công thức giải pháp sách giáo khoa: "If + mệnh đề hiện tại đơn, động từ mệnh lệnh (turn off...)".'
      },
      {
        id: 'u4-w6',
        order: 6,
        sectionLabel: 'Lưu ý bảo trì phòng ngừa',
        vietnamesePrompt:
          'Để tránh hư hỏng đột ngột, các bộ phận quạt chuyển động phải được tra dầu bôi trơn và toàn bộ máy nên được bảo dưỡng vào mỗi mùa xuân.',
        grammarTargets: ['lubricate', 'maintain', 'must be + P2', 'ought to be + P2'],
        keywordSkeleton:
          'avoid / sudden breakdown / moving fan part / must / lubricate / whole unit / ought to / maintain / every spring',
        modelSentence:
          'To avoid sudden breakdowns, moving fan parts must be lubricated and the whole unit ought to be maintained every spring.',
        tipVi:
          'Kết hợp bị động với động từ khuyết thiếu ("must be lubricated", "ought to be maintained") để nhấn mạnh lịch bảo trì phòng ngừa định kỳ.'
      },
      {
        id: 'u4-w7',
        order: 7,
        sectionLabel: 'Ghi chú hỗ trợ kỹ thuật',
        vietnamesePrompt:
          'Cuối cùng, nếu mã lỗi vẫn hiển thị trên màn hình, hãy liên hệ kỹ thuật viên HVAC có chứng chỉ để chẩn đoán lỗi và nạp lại môi chất làm lạnh.',
        grammarTargets: ['If..., V + O', 'alarm code', 'coolant'],
        keywordSkeleton:
          'Finally / if / alarm code / persist / display / contact / certified HVAC technician / diagnose / fault / recharge / coolant',
        modelSentence:
          'Finally, if an alarm code persists on the display, contact a certified HVAC technician to diagnose the fault and recharge the coolant.',
        tipVi:
          'Kết thúc hướng dẫn bằng phương án an toàn khi thiết bị báo mã lỗi phức tạp: "if..., contact..." kèm cụm "recharge the coolant".'
      }
    ]
  }
];

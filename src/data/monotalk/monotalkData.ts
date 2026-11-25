import type { UnitMonoTalkTask } from '../../types/curriculum';

export const ALL_MONOTALK_TASKS: UnitMonoTalkTask[] = [
  {
    unit: 1,
    title: 'Dream Company in Electrical / Electronics Field (Samsung Electronics)',
    taskTypeVi: 'Mono Talk • Video Presentation',
    promptEn:
      'Prepare a short talk about the company in electrical/ electronics field that you want to work for in the future. You should talk about:',
    promptBulletsEn: [
      'Some features of company background and culture',
      'The reasons you want to work there',
      'Your possible contribution to this company'
    ],
    objectiveVi:
      'Luyện từng câu và ghi nhớ kịch bản bài nói ngắn giới thiệu doanh nghiệp Điện – Điện tử mơ ước (Samsung Electronics) theo đúng 3 ý yêu cầu của Speaking Task Unit 1.',
    targetChecklist: [
      'Mở đầu rõ ràng nêu tên công ty mong muốn làm việc (Samsung Electronics).',
      'Nêu được nét nổi bật về môi trường làm việc & văn hoá (modern environment, teamwork, creativity).',
      'Nêu lý do muốn làm việc tại công ty (big, successful, learn new things, improve skills).',
      'Trình bày đóng góp cụ thể (knowledge of electrical systems, control systems, programming) và mục tiêu tương lai.'
    ],
    sentences: [
      {
        id: 'u1-mt-1',
        order: 1,
        sectionLabel: 'Mở đầu & Tên công ty',
        vietnamesePrompt:
          'Hôm nay tôi sẽ nói về công ty mà tôi muốn làm việc trong tương lai.',
        grammarTargets: ['Today I will talk about...', 'in the future'],
        keywordSkeleton: 'Today / will talk / company / want / work for / future.',
        modelSentence:
          'Today I will talk about the company I want to work for in the future.',
        tipVi: 'Câu mở đầu chuẩn bài thi Speaking Mono Talk, ngắn gọn và trực diện.'
      },
      {
        id: 'u1-mt-2',
        order: 2,
        sectionLabel: 'Giới thiệu Samsung',
        vietnamesePrompt: 'Công ty mà tôi muốn làm việc là Samsung Electronics.',
        grammarTargets: ['The company I want to work for is...'],
        keywordSkeleton: 'company / want / work for / Samsung Electronics.',
        modelSentence: 'The company I want to work for is Samsung Electronics.',
        tipVi: 'Nhấn mạnh tên doanh nghiệp mục tiêu ngay ở câu thứ hai.'
      },
      {
        id: 'u1-mt-3',
        order: 3,
        sectionLabel: 'Văn hoá công ty',
        vietnamesePrompt:
          'Samsung có môi trường làm việc hiện đại và khuyến khích làm việc nhóm cùng sự sáng tạo.',
        grammarTargets: ['modern working environment', 'encourage teamwork and creativity'],
        keywordSkeleton:
          'Samsung / modern working environment / encourage / teamwork / creativity.',
        modelSentence:
          'Samsung has a modern working environment and encourages teamwork and creativity.',
        tipVi: 'Động từ "encourage" chia số ít "encourages" đi với chủ ngữ Samsung.'
      },
      {
        id: 'u1-mt-4',
        order: 4,
        sectionLabel: 'Lý do lựa chọn',
        vietnamesePrompt:
          'Tôi muốn làm việc ở đó vì Samsung là một công ty lớn và thành công, nơi tôi có thể học hỏi nhiều điều mới và cải thiện kỹ năng.',
        grammarTargets: ['because', 'learn many new things', 'improve skills'],
        keywordSkeleton:
          'want / work there / because / big / successful company / learn / new things / improve / skills.',
        modelSentence:
          'I want to work there because Samsung is a big and successful company, and I can learn many new things and improve my skills.',
        tipVi: 'Nối lý do bằng "because" rất rõ ràng cho phần Speaking.'
      },
      {
        id: 'u1-mt-5',
        order: 5,
        sectionLabel: 'Kiến thức chuyên môn',
        vietnamesePrompt:
          'Tôi có kiến thức về hệ thống điện, hệ thống điều khiển và lập trình, và tôi có thể dùng các kỹ năng này để giúp ích cho công ty.',
        grammarTargets: ['electrical systems', 'control systems', 'programming'],
        keywordSkeleton:
          'have knowledge / electrical systems / control systems / programming / use these skills / help company.',
        modelSentence:
          'I have some knowledge of electrical systems, control systems, and programming, so I can use these skills to help the company.',
        tipVi: 'Cụm từ chuyên ngành chuẩn: "knowledge of electrical systems, control systems, and programming".'
      },
      {
        id: 'u1-mt-6',
        order: 6,
        sectionLabel: 'Đóng góp & Thái độ',
        vietnamesePrompt:
          'Tôi sẽ làm việc chăm chỉ, học hỏi từ các kỹ sư khác và phối hợp tốt với đồng nghiệp.',
        grammarTargets: ['work hard', 'learn from...', 'work well with colleagues'],
        keywordSkeleton:
          'will work hard / learn from / other engineers / work well / colleagues.',
        modelSentence:
          'I will work hard, learn from other engineers, and work well with my colleagues.',
        tipVi: 'Dùng thì tương lai đơn "will" thể hiện cam kết khi gia nhập công ty.'
      },
      {
        id: 'u1-mt-7',
        order: 7,
        sectionLabel: 'Kết bài',
        vietnamesePrompt:
          'Trong tương lai, tôi hy vọng trở thành một kỹ sư giỏi tại Samsung.',
        grammarTargets: ['In the future', 'hope to become...'],
        keywordSkeleton: 'In / future / hope / become / good engineer / Samsung.',
        modelSentence: 'In the future, I hope to become a good engineer at Samsung.',
        tipVi: 'Kết thúc gọn gàng, tích cực.'
      }
    ]
  },

  {
    unit: 2,
    title: 'Introducing a Smart Product at CES (SmartHome Watch)',
    taskTypeVi: 'Mono Talk • CES Product Pitch',
    promptEn:
      'You are an electronics engineer and you have just invented a new smart product. On behalf of your company, you are in charge of introducing it in Consumer Electronics Show (CES) 2020. Talk about the specifications and features of this product.',
    promptBulletsEn: [
      '1. What is your smart product? (Name, type …)',
      '2. What are the specifications of the product?',
      '3. What operating systems are compatible with the product and how do they work (via Wi-fi, Bluetooth, additional apps …)?',
      "4. What are this product's key features?",
      '5. What are its outstanding features compared to other products in the same line? (A short comparison needed)'
    ],
    objectiveVi:
      'Luyện từng câu bài thuyết trình ra mắt sản phẩm thông minh SmartHome Watch tại triển lãm CES theo đúng 5 câu hỏi gợi ý của Unit 2.',
    targetChecklist: [
      'Giới thiệu vai trò kỹ sư điện tử và tên/loại sản phẩm (SmartHome Watch — smart watch).',
      'Nêu thông số kỹ thuật (1.5-inch AMOLED screen, 400 mAh battery, Bluetooth 5.3, Wi-Fi, sensors).',
      'Trình bày khả năng tương thích (Android & iOS qua SmartHome app) và cách kết nối.',
      'Nêu rõ các tính năng chính (health monitoring, GPS, voice control, sleep tracking, emergency alerts).',
      'So sánh ưu điểm vượt trội so với đồng hồ cùng phân khúc (longer battery life, control more smart home devices).'
    ],
    sentences: [
      {
        id: 'u2-mt-1',
        order: 1,
        sectionLabel: '1. Tên & Loại sản phẩm',
        vietnamesePrompt:
          'Tôi là một kỹ sư điện tử và tôi vừa phát minh ra một sản phẩm thông minh mới gọi là SmartHome Watch.',
        grammarTargets: ['electronic engineer', 'invented', 'called...'],
        keywordSkeleton:
          'electronic engineer / have invented / new smart product / called / SmartHome Watch.',
        modelSentence:
          'I am an electronic engineer, and I have invented a new smart product called SmartHome Watch.',
        tipVi: 'Trả lời trực tiếp câu hỏi 1: bạn là ai và sản phẩm tên là gì.'
      },
      {
        id: 'u2-mt-2',
        order: 2,
        sectionLabel: 'Mục đích thiết kế',
        vietnamesePrompt:
          'Đây là chiếc đồng hồ thông minh được thiết kế để giúp người dùng theo dõi sức khoẻ và điều khiển các thiết bị thông minh.',
        grammarTargets: ['be designed to + V', 'monitor health', 'control smart devices'],
        keywordSkeleton:
          'smart watch / designed / help users / monitor health / control smart devices.',
        modelSentence:
          'It is a smart watch designed to help users monitor their health and control smart devices.',
        tipVi: 'Rút gọn mệnh đề quan hệ "designed to help..." giúp câu nói mượt mà hơn.'
      },
      {
        id: 'u2-mt-3',
        order: 3,
        sectionLabel: '2. Thông số kỹ thuật',
        vietnamesePrompt:
          'Chiếc đồng hồ có màn hình AMOLED 1,5 inch, pin 400 mAh, Bluetooth 5.3, Wi-Fi cùng các cảm biến đo nhịp tim, bước chân và giấc ngủ.',
        grammarTargets: ['1.5-inch AMOLED screen', '400 mAh battery', 'sensors for...'],
        keywordSkeleton:
          'watch / 1.5-inch AMOLED screen / 400 mAh battery / Bluetooth 5.3 / Wi-Fi / sensors / heart rate / steps / sleep.',
        modelSentence:
          'The watch has a 1.5-inch AMOLED screen, a 400 mAh battery, Bluetooth 5.3, Wi-Fi, and several sensors for heart rate, steps, and sleep.',
        tipVi: 'Đọc rõ thông số kỹ thuật có dấu gạch nối "1.5-inch AMOLED screen".'
      },
      {
        id: 'u2-mt-4',
        order: 4,
        sectionLabel: '3. Tương thích hệ điều hành',
        vietnamesePrompt:
          'Nó tương thích với cả điện thoại Android và iOS thông qua ứng dụng SmartHome.',
        grammarTargets: ['compatible with', 'through + app'],
        keywordSkeleton: 'compatible with / Android / iOS smartphones / through / SmartHome app.',
        modelSentence:
          'It is compatible with Android and iOS smartphones through the SmartHome app.',
        tipVi: 'Cụm từ bắt buộc trong Unit 2: "be compatible with ...".'
      },
      {
        id: 'u2-mt-5',
        order: 5,
        sectionLabel: 'Cách kết nối & Tương tác',
        vietnamesePrompt:
          'Người dùng có thể kết nối đồng hồ với điện thoại qua Bluetooth và Wi-Fi để nhận tin nhắn, gọi điện và điều khiển đèn thông minh.',
        grammarTargets: ['via Bluetooth and Wi-Fi', 'receive messages'],
        keywordSkeleton:
          'Users / connect watch / phones / via Bluetooth / Wi-Fi / receive messages / make calls / control smart lights.',
        modelSentence:
          'Users can connect the watch to their phones via Bluetooth and Wi-Fi to receive messages, make calls, and control smart lights.',
        tipVi: 'Giới từ "via" nghĩa là "thông qua / qua kết nối".'
      },
      {
        id: 'u2-mt-6',
        order: 6,
        sectionLabel: '4. Tính năng chính',
        vietnamesePrompt:
          'Các tính năng chính của sản phẩm bao gồm theo dõi sức khoẻ, GPS, điều khiển bằng giọng nói, theo dõi giấc ngủ và cảnh báo khẩn cấp.',
        grammarTargets: ['key features include...', 'voice control', 'emergency alerts'],
        keywordSkeleton:
          'key features / include / health monitoring / GPS / voice control / sleep tracking / emergency alerts.',
        modelSentence:
          'Its key features include health monitoring, GPS, voice control, sleep tracking, and emergency alerts.',
        tipVi: 'Liệt kê 5 danh từ/cụm danh từ song song rất chuẩn Speaking.'
      },
      {
        id: 'u2-mt-7',
        order: 7,
        sectionLabel: '5. So sánh vượt trội & Kết bài',
        vietnamesePrompt:
          'So với các đồng hồ thông minh khác, SmartHome Watch có thời lượng pin dài hơn, có thể điều khiển nhiều thiết bị nhà thông minh hơn, vừa tiện lợi vừa dễ sử dụng.',
        grammarTargets: ['Compared with...', 'longer battery life'],
        keywordSkeleton:
          'Compared with / other smart watches / SmartHome Watch / longer battery life / control / more smart home devices / convenient / easy to use.',
        modelSentence:
          'Compared with other smart watches, SmartHome Watch has a longer battery life and can control more smart home devices, making it convenient, safe, and easy to use.',
        tipVi: 'Dùng "Compared with..." để thực hiện phần so sánh theo câu hỏi số 5.'
      }
    ]
  },

  {
    unit: 3,
    title: 'How to Replace a Ceiling Light Fixture',
    taskTypeVi: 'Mono Talk • Technical Instruction',
    promptEn:
      'You are a technician and you are going to give a talk to instruct customers on how to replace a ceiling light fixture.',
    promptBulletsEn: [
      'How many steps are there?',
      'What equipment do you need?',
      'What do we do in each step?',
      'Are there any cautions we need to take?'
    ],
    objectiveVi:
      'Luyện thuyết trình hướng dẫn khách hàng 8 bước thay thế bộ đèn trần kèm dụng cụ và cảnh báo an toàn điện theo đúng Speaking Task Unit 3.',
    targetChecklist: [
      'Nêu rõ tổng số bước (8 steps) và dụng cụ cần thiết (screwdriver, wire stripper, wire connectors, new light fixture).',
      'Trình bày tuần tự 8 bước rõ ràng bằng từ nối (First, Second, Third, ..., Finally).',
      'Dùng câu mệnh lệnh kỹ thuật chính xác (turn off, disconnect, strip, connect, tighten).',
      'Nhấn mạnh cảnh báo an toàn điện trước và sau khi thực hiện.'
    ],
    sentences: [
      {
        id: 'u3-mt-1',
        order: 1,
        sectionLabel: 'Mở đầu & Số bước',
        vietnamesePrompt:
          'Xin chào, hôm nay tôi sẽ hướng dẫn các bạn cách thay thế một bộ đèn trần gồm 8 bước.',
        grammarTargets: ['am going to show you how to...', 'There are eight steps'],
        keywordSkeleton:
          'Hello / Today / going to show / how / replace / ceiling light fixture / There are / eight steps.',
        modelSentence:
          'Hello. Today, I am going to show you how to replace a ceiling light fixture, and there are eight steps.',
        tipVi: 'Giới thiệu ngay số bước theo câu hỏi gợi ý "How many steps are there?".'
      },
      {
        id: 'u3-mt-2',
        order: 2,
        sectionLabel: 'Dụng cụ cần chuẩn bị',
        vietnamesePrompt:
          'Chúng ta cần một số thiết bị gồm: tua-vít, kìm tuốt dây, đầu nối dây và một bộ đèn mới.',
        grammarTargets: ['equipment', 'wire stripper', 'wire connectors'],
        keywordSkeleton:
          'need / equipment / screwdriver / wire stripper / wire connectors / new light fixture.',
        modelSentence:
          'We need some equipment: a screwdriver, a wire stripper, wire connectors, and a new light fixture.',
        tipVi: 'Từ chuyên ngành lắp đặt: "wire stripper" (kìm tuốt dây) và "wire connectors" (cút nối dây).'
      },
      {
        id: 'u3-mt-3',
        order: 3,
        sectionLabel: 'Bước 1 & 2 (Ngắt điện & Tháo cũ)',
        vietnamesePrompt:
          'Đầu tiên, ngắt nguồn điện và tháo bộ đèn cũ ra; thứ hai, ngắt kết nối các dây điện cũ thật cẩn thận.',
        grammarTargets: ['First', 'Second', 'turn off the power', 'disconnect'],
        keywordSkeleton:
          'First / turn off / power / remove / old light fixture / Second / disconnect / old wires / carefully.',
        modelSentence:
          'First, turn off the power and remove the old light fixture. Second, disconnect the old wires carefully.',
        tipVi: 'Luôn bắt đầu bước 1 bằng thao tác an toàn "turn off the power".'
      },
      {
        id: 'u3-mt-4',
        order: 4,
        sectionLabel: 'Bước 3 & 4 (Tuốt & Chuẩn bị dây)',
        vietnamesePrompt:
          'Thứ ba, dùng kìm tuốt dây để tuốt vỏ dây; thứ tư, cắt và chuẩn bị đầu dây cho bộ đèn mới.',
        grammarTargets: ['Third', 'Fourth', 'strip the wires'],
        keywordSkeleton:
          'Third / use / wire stripper / strip / wires / Fourth / cut / prepare / wires / new light fixture.',
        modelSentence:
          'Third, use a wire stripper to strip the wires. Fourth, cut and prepare the wires for the new light fixture.',
        tipVi: 'Động từ tuốt dây điện là "strip the wires".'
      },
      {
        id: 'u3-mt-5',
        order: 5,
        sectionLabel: 'Bước 5 & 6 (Đấu nối & Cố định mối nối)',
        vietnamesePrompt:
          'Thứ năm, nối dây của đèn mới vào dây trên trần; thứ sáu, dùng đầu nối dây để cố định chắc chắn các mối nối.',
        grammarTargets: ['Fifth', 'Sixth', 'secure the connections'],
        keywordSkeleton:
          'Fifth / connect / wires / new light fixture / ceiling wires / Sixth / use / wire connectors / secure / connections.',
        modelSentence:
          'Fifth, connect the wires of the new light fixture to the ceiling wires. Sixth, use wire connectors to secure the connections.',
        tipVi: '"secure the connections" = cố định chắc chắn các mối nối dây.'
      },
      {
        id: 'u3-mt-6',
        order: 6,
        sectionLabel: 'Bước 7 & 8 (Lắp đèn & Chụp đèn)',
        vietnamesePrompt:
          'Thứ bảy, gắn bộ đèn mới lên trần và siết chặt ốc vít; cuối cùng, lắp chụp đèn vào và đảm bảo nó chắc chắn.',
        grammarTargets: ['Seventh', 'Finally', 'tighten the screws'],
        keywordSkeleton:
          'Seventh / attach / new light fixture / ceiling / tighten / screws / Finally / install / light cover / make sure / secure.',
        modelSentence:
          'Seventh, attach the new light fixture to the ceiling and tighten the screws. Finally, install the light cover and make sure it is secure.',
        tipVi: '"tighten the screws" = vặn/siết chặt ốc vít.'
      },
      {
        id: 'u3-mt-7',
        order: 7,
        sectionLabel: 'Cảnh báo an toàn',
        vietnamesePrompt:
          'Trước khi bắt đầu hãy đảm bảo đã ngắt điện, cẩn thận với dây dẫn và luôn kiểm tra lại mọi mối nối trước khi cấp điện.',
        grammarTargets: ['Before starting', 'make sure', 'always check'],
        keywordSkeleton:
          'Before starting / make sure / power is off / Be careful / wires / always check / connections / before turning on / power.',
        modelSentence:
          'Before starting, make sure the power is off. Be careful with the wires and always check the connections before turning on the power.',
        tipVi: 'Trả lời trọn vẹn câu hỏi cuối về Cautions.'
      }
    ]
  },

  {
    unit: 4,
    title: 'How to Solve Error Code U0 on Daikin Air Conditioner (FTXS35K2V1B)',
    taskTypeVi: 'Mono Talk • Troubleshooting Instruction',
    promptEn:
      'Give an instruction on how to solve U0 error code of a Daikin air conditioner using the suggested information below.',
    promptBulletsEn: [
      'Product name & Model: Daikin air conditioner (FTXS35K2V1B)',
      'Problem & Error code: The air conditioner does not cool (Error code U0)',
      '4 Diagnoses (Causes & matching Solutions)',
      '3 Maintenance & Safety Precautions'
    ],
    objectiveVi:
      'Luyện thuyết trình quy trình chẩn đoán và khắc phục mã lỗi U0 trên điều hoà Daikin FTXS35K2V1B dựa theo bảng nguyên nhân – giải pháp – phòng ngừa của Speaking Task Unit 4.',
    targetChecklist: [
      'Nêu tên thiết bị, model FTXS35K2V1B, hiện tượng không mát và mã lỗi U0.',
      'Trình bày đủ 4 cặp nguyên nhân & cách xử lý (thiếu/tắc gas, hỏng thermistor, hỏng cảm biến áp suất thấp, hỏng bo mạch chính dàn nóng).',
      'Dùng cấu trúc gợi ý/biện pháp chuẩn xác ("We should...", "may be defective").',
      'Đọc đủ 3 lưu ý bảo trì (chân đế dàn nóng không gỉ, cửa hút/xả thông thoáng, bảo dưỡng hằng năm).'
    ],
    cueTable: {
      caption: 'Daikin Air Conditioner — Error Code U0 Diagnosis Table',
      rows: [
        { label: 'Product / Model', value: 'Daikin air conditioner — Model FTXS35K2V1B' },
        { label: 'Problem / Error Code', value: 'The air conditioner does not cool — Code U0' },
        {
          label: 'Cause & Solution 1',
          value: 'Shortage of coolant and coolant clogging',
          solution: 'Find the leakage and recharge coolant'
        },
        {
          label: 'Cause & Solution 2',
          value: 'Defective thermistor',
          solution: 'Repair or replace the thermistor'
        },
        {
          label: 'Cause & Solution 3',
          value: 'Defective low pressure sensor',
          solution: 'Replace the sensor'
        },
        {
          label: 'Cause & Solution 4',
          value: 'Defective outdoor unit main PCB',
          solution: 'Repair or replace outdoor unit main PCB'
        }
      ],
      precautions: [
        'Check that the base, stand and other fittings of the outdoor unit are not decayed or corroded.',
        'Check that nothing blocks the air inlets and outlets of the indoor unit and the outdoor unit.',
        'Ask a professional technician to maintain your air conditioner every year.'
      ]
    },
    sentences: [
      {
        id: 'u4-mt-1',
        order: 1,
        sectionLabel: 'Mở đầu & Mã máy',
        vietnamesePrompt:
          'Xin chào mọi người, hôm nay tôi sẽ nói về cách xử lý mã lỗi U0 của máy điều hoà Daikin, model FTXS35K2V1B, khi máy gặp lỗi không làm mát.',
        grammarTargets: ['Today, I will talk about how to solve...', 'The model is...'],
        keywordSkeleton:
          'Hello everyone / Today / will talk / how / solve / U0 error code / Daikin air conditioner / model FTXS35K2V1B / does not cool.',
        modelSentence:
          'Hello everyone. Today, I will talk about how to solve the U0 error code of a Daikin air conditioner, model FTXS35K2V1B, when the air conditioner does not cool.',
        tipVi: 'Đưa đầy đủ 4 thông tin đầu bảng (Daikin, FTXS35K2V1B, U0, does not cool) ngay phần mở đầu.'
      },
      {
        id: 'u4-mt-2',
        order: 2,
        sectionLabel: 'Nguyên nhân & Xử lý 1',
        vietnamesePrompt:
          'Có bốn nguyên nhân có thể xảy ra: trước tiên có thể do thiếu gas làm lạnh hoặc tắc gas, trong trường hợp này chúng ta cần tìm chỗ rò rỉ và nạp thêm gas.',
        grammarTargets: ['four possible causes', 'shortage of coolant', 'recharge the coolant'],
        keywordSkeleton:
          'four possible causes / First / may be / shortage of coolant / coolant clogging / should find / leakage / recharge / coolant.',
        modelSentence:
          'There are four possible causes. First, there may be a shortage of coolant or coolant clogging, and in this case, we should find the leakage and recharge the coolant.',
        tipVi: 'Đọc rõ "coolant clogging" (tắc môi chất lạnh) và "recharge the coolant" (nạp lại gas).'
      },
      {
        id: 'u4-mt-3',
        order: 3,
        sectionLabel: 'Nguyên nhân & Xử lý 2',
        vietnamesePrompt:
          'Thứ hai, cảm biến nhiệt (thermistor) có thể bị hỏng, vì vậy chúng ta nên sửa chữa hoặc thay thế cảm biến nhiệt này.',
        grammarTargets: ['Second', 'thermistor', 'may be defective'],
        keywordSkeleton:
          'Second / thermistor / may be defective / should repair or replace / thermistor.',
        modelSentence:
          'Second, the thermistor may be defective, so we should repair or replace the thermistor.',
        tipVi: 'Tính từ "defective" = bị lỗi/hỏng (dùng cho cả nguyên nhân 2, 3, 4).'
      },
      {
        id: 'u4-mt-4',
        order: 4,
        sectionLabel: 'Nguyên nhân & Xử lý 3',
        vietnamesePrompt:
          'Thứ ba, cảm biến áp suất thấp có thể bị hỏng và chúng ta cần thay thế cảm biến đó.',
        grammarTargets: ['Third', 'low-pressure sensor', 'replace the sensor'],
        keywordSkeleton: 'Third / low-pressure sensor / may be defective / should replace / sensor.',
        modelSentence:
          'Third, the low-pressure sensor may be defective, and we should replace the sensor.',
        tipVi: 'Ghép mượt giữa cặp cause-solution thứ 3.'
      },
      {
        id: 'u4-mt-5',
        order: 5,
        sectionLabel: 'Nguyên nhân & Xử lý 4',
        vietnamesePrompt:
          'Cuối cùng, bảng mạch chính của dàn nóng (outdoor unit main PCB) có thể bị lỗi, chúng ta cần sửa chữa hoặc thay thế nó.',
        grammarTargets: ['Finally', 'outdoor unit main PCB'],
        keywordSkeleton:
          'Finally / outdoor unit main PCB / may be defective / should repair or replace / outdoor unit main PCB.',
        modelSentence:
          'Finally, the outdoor unit main PCB may be defective, so we should repair or replace the outdoor unit main PCB.',
        tipVi: 'PCB = Printed Circuit Board (bảng mạch in).'
      },
      {
        id: 'u4-mt-6',
        order: 6,
        sectionLabel: 'Phòng ngừa 1 & 2',
        vietnamesePrompt:
          'Cũng cần lưu ý kiểm tra chân đế, giá đỡ dàn nóng không bị mục nát hay ăn mòn, và không có vật gì chặn cửa hút và cửa xả gió của dàn lạnh lẫn dàn nóng.',
        grammarTargets: ['precautions', 'decayed or corroded', 'air inlets and outlets'],
        keywordSkeleton:
          'some precautions / should check / base, stand, fittings / outdoor unit / not decayed or corroded / nothing blocks / air inlets and outlets.',
        modelSentence:
          'There are also some precautions: we should check that the base, stand, and other fittings of the outdoor unit are not decayed or corroded, and check that nothing blocks the air inlets and outlets of the indoor and outdoor units.',
        tipVi: 'Từ vựng quan trọng: "decayed or corroded" (mục nát hoặc rỉ sét ăn mòn).'
      },
      {
        id: 'u4-mt-7',
        order: 7,
        sectionLabel: 'Phòng ngừa 3 & Kết thúc',
        vietnamesePrompt:
          'Cuối cùng, chúng ta nên nhờ kỹ thuật viên chuyên nghiệp bảo dưỡng điều hoà hằng năm.',
        grammarTargets: ['ask a professional technician to maintain...'],
        keywordSkeleton:
          'Finally / should ask / professional technician / maintain / air conditioner / every year.',
        modelSentence:
          'Finally, we should ask a professional technician to maintain the air conditioner every year.',
        tipVi: 'Mẫu câu bảo dưỡng định kỳ chuẩn xuyên suốt Unit 4.'
      }
    ]
  },

  {
    unit: 5,
    title: 'Reporting a Handled Customer Complaint (Joan Tran — Order T6758)',
    taskTypeVi: 'Mono Talk • Past Incident Report',
    promptEn: 'Tell a colleague about the complaint you handled. You should talk about:',
    promptBulletsEn: [
      "Customer's name",
      "Name of the customer's company",
      "Customer's problem(s)",
      'Reasons for the problems',
      'Solutions you offered',
      "Customer's response to the offers"
    ],
    objectiveVi:
      'Luyện thuật lại tình huống vừa xử lý khiếu nại đơn hàng cho đồng nghiệp theo đủ 6 ý yêu cầu của Speaking Task Unit 5.',
    targetChecklist: [
      'Dùng thì quá khứ đơn xuyên suốt để kể lại sự việc đã xử lý.',
      'Nêu đúng tên khách hàng (Joan Tran) và công ty (Vietnam Airlines).',
      'Kể đủ 2 vấn đề (75 vs 70 gas turbine blades — thiếu 5 chiếc; ST23-56R vs ST28-56R vanes).',
      'Giải thích nguyên nhân (sai sót khi đóng gói / chuyển văn phòng) & giải pháp đề xuất.',
      'Nêu phản hồi của khách hàng (chấp nhận và cảm ơn).'
    ],
    sentences: [
      {
        id: 'u5-mt-1',
        order: 1,
        sectionLabel: 'Mở đầu bài nói',
        vietnamesePrompt:
          'Xin chào mọi người! Hôm nay tôi muốn kể cho các bạn nghe về một khiếu nại khách hàng mà tôi đã xử lý.',
        grammarTargets: ['would like to tell you about...', 'handled'],
        keywordSkeleton:
          'Hello everyone / Today / would like / tell you / customer complaint / handled.',
        modelSentence:
          'Hello everyone! Today, I would like to tell you about a customer complaint I handled.',
        tipVi: 'Giới thiệu chủ đề kể chuyện quá khứ tự nhiên.'
      },
      {
        id: 'u5-mt-2',
        order: 2,
        sectionLabel: 'Tên khách & Công ty',
        vietnamesePrompt:
          'Sáng nay tôi nhận được khiếu nại từ một khách hàng tên là Joan Tran, cô ấy làm việc tại Vietnam Airlines.',
        grammarTargets: ['received a complaint from...', 'works at...'],
        keywordSkeleton:
          'This morning / received / complaint / customer / Her name / Joan Tran / works at / Vietnam Airlines.',
        modelSentence:
          'This morning, I received a complaint from a customer whose name is Joan Tran, and she works at Vietnam Airlines.',
        tipVi: 'Gộp 2 ý đầu ("Customer\'s name" & "Customer\'s company") rất trôi chảy.'
      },
      {
        id: 'u5-mt-3',
        order: 3,
        sectionLabel: 'Vấn đề thứ 1 (Thiếu hàng)',
        vietnamesePrompt:
          'Có hai vấn đề với đơn hàng vừa rồi của cô ấy: thứ nhất, cô ấy đặt 75 cánh tuabin khí nhưng chỉ nhận được 70 chiếc, tức là thiếu 5 chiếc.',
        grammarTargets: ['two problems with...', 'received only...'],
        keywordSkeleton:
          'two problems / last order / First / ordered 75 gas turbine blades / received only 70 / Five blades / missing.',
        modelSentence:
          'There were two problems with her last order: first, she ordered 75 gas turbine blades, but she received only 70, so five blades were missing.',
        tipVi: 'Sử dụng số lượng chính xác (75, 70, 5 missing).'
      },
      {
        id: 'u5-mt-4',
        order: 4,
        sectionLabel: 'Vấn đề thứ 2 (Nhầm mã)',
        vietnamesePrompt:
          'Thứ hai, cô ấy nhận nhầm cánh tĩnh: cô ấy đặt mã ST23-56R nhưng lại nhận mã ST28-56R.',
        grammarTargets: ['Second', 'wrong vanes', 'ordered... but received...'],
        keywordSkeleton:
          'Second / received / wrong vanes / ordered ST23-56R / received ST28-56R.',
        modelSentence:
          'Second, she received the wrong vanes: she ordered ST23-56R, but received ST28-56R.',
        tipVi: 'Phát âm rõ từng ký tự mã phụ tùng ST23-56R và ST28-56R.'
      },
      {
        id: 'u5-mt-5',
        order: 5,
        sectionLabel: 'Nguyên nhân dự đoán',
        vietnamesePrompt:
          'Nhân viên của chúng ta có lẽ đã mắc sai sót trong quá trình đóng gói đơn hàng sau khi chuyển văn phòng.',
        grammarTargets: ['might have + V3/ed', 'make mistakes'],
        keywordSkeleton:
          'Our staff / might have made mistakes / when packing / order.',
        modelSentence:
          'Our staff might have made mistakes when packing the order.',
        tipVi: 'Dùng "might have + V3/ed" để phỏng đoán nguyên nhân trong quá khứ rất chuẩn ngữ pháp Unit 5.'
      },
      {
        id: 'u5-mt-6',
        order: 6,
        sectionLabel: 'Giải pháp đã đề xuất',
        vietnamesePrompt:
          'Tôi đã đề xuất gửi bù năm cánh tuabin bị thiếu và đổi lại đúng mã cánh tĩnh miễn phí vận chuyển.',
        grammarTargets: ['offered to + V', 'replace the wrong...'],
        keywordSkeleton:
          'offered to send / five missing blades / replace / wrong vanes.',
        modelSentence:
          'I offered to send the five missing blades and replace the wrong vanes.',
        tipVi: '"offer to V" = chủ động đề xuất giải pháp hỗ trợ.'
      },
      {
        id: 'u5-mt-7',
        order: 7,
        sectionLabel: 'Phản hồi của khách',
        vietnamesePrompt:
          'Cô ấy đã chấp nhận các đề xuất của tôi và gửi lời cảm ơn.',
        grammarTargets: ['accepted my offers', 'thanked me'],
        keywordSkeleton: 'She / accepted / offers / thanked me.',
        modelSentence: 'She accepted my offers and thanked me.',
        tipVi: 'Hoàn thành ý thứ 6 một cách gọn gàng.'
      }
    ]
  },

  {
    unit: 6,
    title: 'Line Graph: Home Appliance Ownership in Vietnam (2018–2025)',
    taskTypeVi: 'Mono Talk • Visual Aid Graph Description',
    promptEn:
      'Describe a given chart/graph, using language for referring to visual aids. You should talk about:',
    promptBulletsEn: [
      'What the graph represents',
      'The overall trend',
      'The trends of each subject (Refrigerator, Air conditioner, Electric heater from 2018 to 2025)'
    ],
    objectiveVi:
      'Luyện từng câu bài thuyết trình mô tả biểu đồ đường tỷ lệ phần trăm sở hữu thiết bị gia dụng tại Việt Nam (2018–2025) gồm tủ lạnh, điều hoà và máy sưởi điện.',
    targetChecklist: [
      'Giới thiệu đối tượng biểu đồ ("The line graph shows the percentage of... from 2018 to 2025").',
      'Dùng cụm dẫn chiếu biểu đồ ("As you can see,").',
      'Mô tả chính xác số liệu & xu hướng Tủ lạnh (90% -> 89% -> 95%: decreased slightly, rose to 95%).',
      'Mô tả Điều hoà (80% -> 75% -> 69%: decreased steadily) và Máy sưởi điện (46% -> 54% -> 76%: increased gradually, rose sharply & overtook air conditioners).',
      'Chốt xu hướng tổng quát ("upward trend" vs "downward trend").'
    ],
    chart: {
      title: 'Home appliance ownership in Vietnam; in percent',
      chartType: 'line',
      unitLabel: '%',
      points: [],
      multiSeries: [
        {
          name: 'Refrigerator',
          color: '#2563eb',
          points: [
            { label: '2018', value: 90 },
            { label: '2021', value: 89 },
            { label: '2025', value: 95 }
          ]
        },
        {
          name: 'Air conditioner',
          color: '#ea580c',
          points: [
            { label: '2018', value: 80 },
            { label: '2021', value: 75 },
            { label: '2025', value: 69 }
          ]
        },
        {
          name: 'Electric heater',
          color: '#16a34a',
          points: [
            { label: '2018', value: 46 },
            { label: '2021', value: 54 },
            { label: '2025', value: 76 }
          ]
        }
      ]
    },
    sentences: [
      {
        id: 'u6-mt-1',
        order: 1,
        sectionLabel: 'Giới thiệu biểu đồ',
        vietnamesePrompt:
          'Hôm nay tôi sẽ thuyết trình về biểu đồ đường này; biểu đồ thể hiện tỷ lệ phần trăm sở hữu thiết bị gia dụng tại Việt Nam từ năm 2018 đến năm 2025, gồm tủ lạnh, điều hoà và máy sưởi điện.',
        grammarTargets: ['The line graph shows...', 'percentage of...', 'from ... to ...'],
        keywordSkeleton:
          'Today / talk about / line graph / shows / percentage / home appliance ownership / Vietnam / 2018 to 2025 / refrigerators, air conditioners, electric heaters.',
        modelSentence:
          'Today, I will talk about this line graph, which shows the percentage of home appliance ownership in Vietnam from 2018 to 2025, including refrigerators, air conditioners, and electric heaters.',
        tipVi: 'Câu mở bài nêu đầy đủ: loại biểu đồ, chủ đề, địa điểm và mốc thời gian (2018–2025).'
      },
      {
        id: 'u6-mt-2',
        order: 2,
        sectionLabel: 'Tủ lạnh (2018–2021)',
        vietnamesePrompt:
          'Như các bạn thấy, tỷ lệ sở hữu tủ lạnh khởi đầu ở mức 90% vào năm 2018 và giảm nhẹ xuống 89% vào năm 2021.',
        grammarTargets: ['As you can see,', 'started at...', 'decreased slightly to...'],
        keywordSkeleton:
          'As you can see / percentage / refrigerators / started at 90% in 2018 / decreased slightly to 89% in 2021.',
        modelSentence:
          'As you can see, the percentage of refrigerators started at 90% in 2018 and decreased slightly to 89% in 2021.',
        tipVi: '"As you can see" là cấu trúc dẫn chiếu biểu đồ trọng tâm của Unit 6.'
      },
      {
        id: 'u6-mt-3',
        order: 3,
        sectionLabel: 'Tủ lạnh (2021–2025)',
        vietnamesePrompt: 'Sau đó, con số này tăng lên đạt mức 95% vào năm 2025.',
        grammarTargets: ['Then', 'rose to...'],
        keywordSkeleton: 'Then / rose to / 95% in 2025.',
        modelSentence: 'Then, it rose to a peak of 95% in 2025.',
        tipVi: '"rose to a peak of + %" diễn tả mức tăng đạt đỉnh cao nhất trên biểu đồ.'
      },
      {
        id: 'u6-mt-4',
        order: 4,
        sectionLabel: 'Điều hoà (2018–2025)',
        vietnamesePrompt:
          'Trong khi đó, tỷ lệ sở hữu máy điều hoà giảm đều từ 80% năm 2018 xuống 75% năm 2021 và giảm tiếp còn 69% năm 2025.',
        grammarTargets: ['Meanwhile', 'decreased steadily from ... to ...'],
        keywordSkeleton:
          'Meanwhile / percentage / air conditioners / decreased steadily / 80% in 2018 / 75% in 2021 / 69% in 2025.',
        modelSentence:
          'Meanwhile, the percentage of air conditioners decreased steadily from 80% in 2018 to 75% in 2021 and dropped to 69% in 2025.',
        tipVi: 'Trạng từ "steadily" diễn tả tốc độ giảm đều qua cả hai mốc.'
      },
      {
        id: 'u6-mt-5',
        order: 5,
        sectionLabel: 'Máy sưởi điện (2018–2021)',
        vietnamesePrompt:
          'Đối với máy sưởi điện, tỷ lệ này ở mức 46% vào năm 2018 và tăng dần lên 54% vào năm 2021.',
        grammarTargets: ['stood at...', 'increased gradually to...'],
        keywordSkeleton:
          'For electric heaters / figure / stood at 46% in 2018 / increased gradually / 54% in 2021.',
        modelSentence:
          'For electric heaters, the figure stood at 46% in 2018 and increased gradually to 54% in 2021.',
        tipVi: '"stood at + %" dùng rất tự nhiên khi nêu số liệu mốc xuất phát.'
      },
      {
        id: 'u6-mt-6',
        order: 6,
        sectionLabel: 'Máy sưởi điện (2021–2025)',
        vietnamesePrompt:
          'Sau đó, tỷ lệ này tăng mạnh lên 76% vào năm 2025, vượt qua cả tỷ lệ sở hữu điều hoà.',
        grammarTargets: ['Then', 'rose sharply to...', 'overtaking...'],
        keywordSkeleton:
          'Then / rose sharply to 76% in 2025 / overtaking air conditioners.',
        modelSentence:
          'Then, it rose sharply to 76% in 2025, overtaking air conditioners.',
        tipVi: '"overtaking ..." mô tả chính xác điểm đường màu xanh vượt lên trên đường điều hoà vào năm 2025.'
      },
      {
        id: 'u6-mt-7',
        order: 7,
        sectionLabel: 'Xu hướng tổng quát',
        vietnamesePrompt:
          'Nhìn chung, tủ lạnh và máy sưởi điện cho thấy xu hướng tăng, trong khi máy điều hoà cho thấy xu hướng giảm.',
        grammarTargets: ['Overall', 'upward trend', 'downward trend', 'while'],
        keywordSkeleton:
          'Overall / refrigerators / electric heaters / showed / upward trend / while / air conditioners / downward trend.',
        modelSentence:
          'Overall, refrigerators and electric heaters showed an upward trend, while air conditioners showed a downward trend.',
        tipVi: 'Tổng kết rõ xu hướng chung của 3 thiết bị để khép lại phần biểu đồ.'
      }
    ]
  },

  {
    unit: 7,
    title: 'Job Interview Self-Introduction (Electronics / Automation Engineer)',
    taskTypeVi: 'Mono Talk • Interview Pitch',
    promptEn:
      'Imagine you are a candidate in a job interview for the position of Electronics Engineer or Technical Sales Engineer. Prepare a short talk to introduce yourself. You should talk about:',
    promptBulletsEn: [
      'Personal information',
      'Qualifications',
      'Experience',
      'Skills',
      'Interests',
      'Objectives'
    ],
    objectiveVi:
      'Luyện từng câu phần tự giới thiệu bản thân trong buổi phỏng vấn kỹ sư theo đủ 6 mục của Speaking Task Unit 7.',
    targetChecklist: [
      'Nêu đầy đủ thông tin cá nhân (tên, tuổi, quê quán).',
      'Trình bày bằng cấp/chuyên ngành tại ĐH Công nghiệp Hà Nội (HaUI) và GPA.',
      'Nêu kinh nghiệm làm việc/thực tập liên quan (công việc cụ thể với hệ thống điện/tự động hoá).',
      'Nêu cả kỹ năng chuyên môn (PLC, AutoCAD, C/C++) và kỹ năng mềm (teamwork, problem-solving).',
      'Chia sẻ sở thích công nghệ và mục tiêu nghề nghiệp rõ ràng.'
    ],
    sentences: [
      {
        id: 'u7-mt-1',
        order: 1,
        sectionLabel: 'Thông tin cá nhân',
        vietnamesePrompt:
          'Tên tôi là Nguyễn Hữu Nhật Minh, tôi 20 tuổi và tôi đến từ Hà Nội, Việt Nam.',
        grammarTargets: ['My name is...', 'come from...'],
        keywordSkeleton: 'My name / ... / 20 years old / come from / Hanoi, Vietnam.',
        modelSentence:
          'My name is Nguyen Huu Nhat Minh. I am 20 years old, and I come from Hanoi, Vietnam.',
        tipVi: 'Bạn có thể thay bằng tên và tuổi thật của chính bạn khi luyện nói.'
      },
      {
        id: 'u7-mt-2',
        order: 2,
        sectionLabel: 'Học vấn & Chuyên ngành',
        vietnamesePrompt:
          'Tôi là sinh viên trường Đại học Công nghiệp Hà Nội, chuyên ngành Kỹ thuật Điều khiển và Tự động hoá với điểm trung bình 3.5 trên 4.0.',
        grammarTargets: ['Hanoi University of Industry', 'major is...', 'GPA is...'],
        keywordSkeleton:
          'student / Hanoi University of Industry / major / Control Engineering and Automation / GPA / 3.5 out of 4.0.',
        modelSentence:
          'I am a student at Hanoi University of Industry, my major is Control Engineering and Automation, and my GPA is 3.5 out of 4.0.',
        tipVi: 'Hoặc dùng "Electrical and Electronics Engineering" nếu đó là chuyên ngành của bạn.'
      },
      {
        id: 'u7-mt-3',
        order: 3,
        sectionLabel: 'Kinh nghiệm làm việc',
        vietnamesePrompt:
          'Tôi đã từng làm việc tại Công ty Tự động hoá A&D và có kinh nghiệm về hệ thống điện và tự động hoá.',
        grammarTargets: ['Present Perfect (have worked)', 'experience in...'],
        keywordSkeleton:
          'have worked / A&D Automation Company / have experience / electrical and automation systems.',
        modelSentence:
          'I have worked at A&D Automation Company, and I have experience in electrical and automation systems.',
        tipVi: 'Thì Hiện tại hoàn thành ("have worked") nhấn mạnh kinh nghiệm tính tới hiện tại.'
      },
      {
        id: 'u7-mt-4',
        order: 4,
        sectionLabel: 'Kỹ năng chuyên môn',
        vietnamesePrompt:
          'Tôi có kiến thức cơ bản về lập trình PLC, AutoCAD và C/C++.',
        grammarTargets: ['basic knowledge of...', 'programming'],
        keywordSkeleton: 'have basic knowledge / PLC, AutoCAD, and C/C++ programming.',
        modelSentence: 'I have basic knowledge of PLC, AutoCAD, and C/C++ programming.',
        tipVi: 'Kể 2–3 công cụ kỹ thuật cụ thể giúp hồ sơ thuyết phục hơn.'
      },
      {
        id: 'u7-mt-5',
        order: 5,
        sectionLabel: 'Kỹ năng mềm',
        vietnamesePrompt:
          'Tôi cũng có kỹ năng làm việc nhóm và giải quyết vấn đề tốt.',
        grammarTargets: ['teamwork', 'problem-solving skills'],
        keywordSkeleton: 'also have / good teamwork / problem-solving skills.',
        modelSentence: 'I also have good teamwork and problem-solving skills.',
        tipVi: 'Tính từ ghép chuẩn: "teamwork and problem-solving skills".'
      },
      {
        id: 'u7-mt-6',
        order: 6,
        sectionLabel: 'Sở thích nghề nghiệp',
        vietnamesePrompt:
          'Trong thời gian rảnh, tôi thích tìm hiểu công nghệ mới và thiết kế các hệ thống điện.',
        grammarTargets: ['enjoy + V-ing', 'In my free time'],
        keywordSkeleton:
          'In my free time / enjoy learning / new technology / designing electrical systems.',
        modelSentence:
          'In my free time, I enjoy learning about new technology and designing electrical systems.',
        tipVi: 'Chọn sở thích liên quan đến ngành giúp ghi điểm với nhà tuyển dụng.'
      },
      {
        id: 'u7-mt-7',
        order: 7,
        sectionLabel: 'Mục tiêu nghề nghiệp',
        vietnamesePrompt:
          'Mục tiêu của tôi là trở thành một kỹ sư chuyên nghiệp, nâng cao kỹ năng kỹ thuật và được làm việc cho quý công ty.',
        grammarTargets: ['My goal is to...', 'hope to work for...'],
        keywordSkeleton:
          'My goal / become / professional engineer / improve technical skills / hope / work for your company.',
        modelSentence:
          'My goal is to become a professional engineer and improve my technical skills, and I hope to work for your company.',
        tipVi: 'Chốt lời khẳng định mong muốn gia nhập công ty tuyển dụng.'
      }
    ]
  },

  {
    unit: 8,
    title: 'Resort Washing Machine Maintenance Plan Briefing',
    taskTypeVi: 'Mono Talk • Meeting Summary & Discussion Plan',
    promptEn:
      'You and your partner are two colleagues who are responsible for maintaining a washing machine system in a resort. Present your maintenance discussion & final agreed plan based on the flowchart below.',
    promptBulletsEn: [
      'Safety step first (cut power to avoid electric shock)',
      'Monthly inspection & cleaning (keep washer level, clean inside monthly, remove and clean filter)',
      'Exterior care (polish outside using a soft cloth)',
      'Replacement cycle discussion (1 year vs recommended 5 years) & final decision'
    ],
    objectiveVi:
      'Luyện từng câu bản trình bày tóm tắt cuộc họp và kế hoạch bảo trì hệ thống máy giặt resort dựa trên lưu đồ Unit 8.',
    targetChecklist: [
      'Giới thiệu bối cảnh họp bàn kế hoạch bảo trì máy giặt trong khu nghỉ dưỡng (resort).',
      'Nhấn mạnh an toàn trước tiên: ngắt nguồn điện để tránh giật điện (cut power to avoid electric shock).',
      'Nêu đầy đủ hạng mục vệ sinh định kỳ: kê cân bằng, rửa lồng hàng tháng, tháo lọc, lau vỏ bằng khăn mềm.',
      'Trình bày phần trao đổi bất đồng chu kỳ thay thế và chốt quyết định cuối cùng (mỗi 5 năm).'
    ],
    flowSteps: [
      { speaker: 'A', action: 'Make a point: Keep the washer level & clean the inside (once monthly)' },
      { speaker: 'B', action: 'Interrupt: Firstly: Cut power to avoid electricity' },
      { speaker: 'A', action: 'Strongly Agree' },
      { speaker: 'B', action: 'Make a point: Remove and clean the filter -> Help the washer run efficiently; Polish the outside' },
      { speaker: 'A', action: 'Comment and emphasize: Use a soft cloth to wipe out' },
      { speaker: 'B', action: 'Strongly agree' },
      { speaker: 'A', action: 'Make a point: Suggest replacement period' },
      { speaker: 'B', action: 'Interrupt: Strongly disagree (long/short period) -> Recommend 5 years' },
      { speaker: 'Both', action: 'Reach the decision' }
    ],
    sentences: [
      {
        id: 'u8-mt-1',
        order: 1,
        sectionLabel: 'Mở đầu bối cảnh họp',
        vietnamesePrompt:
          'Hôm nay tôi và đồng nghiệp đã thảo luận cách bảo trì đúng chuẩn cho hệ thống máy giặt tại khu nghỉ dưỡng của chúng ta.',
        grammarTargets: ['discussed how to maintain...', 'properly'],
        keywordSkeleton:
          'Today / colleague and I / discussed / how / maintain / washing machine system / resort / properly.',
        modelSentence:
          'Today, my colleague and I discussed how to maintain the washing machine system in our resort properly.',
        tipVi: 'Mở đầu tóm tắt kết quả buổi thảo luận Unit 8.'
      },
      {
        id: 'u8-mt-2',
        order: 2,
        sectionLabel: 'Quy tắc an toàn đầu tiên',
        vietnamesePrompt:
          'Trước hết, chúng tôi thống nhất phải ngắt nguồn điện trước khi kiểm tra để tránh bị điện giật.',
        grammarTargets: ['First of all', 'cut the power', 'avoid electric shock'],
        keywordSkeleton:
          'First of all / agreed / must cut / power first / avoid / electric shock.',
        modelSentence:
          'First of all, we agreed that we must cut the power first to avoid electric shock.',
        tipVi: 'Bước "Interrupt: Firstly cut power" trong lưu đồ là lưu ý an toàn quan trọng nhất.'
      },
      {
        id: 'u8-mt-3',
        order: 3,
        sectionLabel: 'Kiểm tra cân bằng & Lồng giặt',
        vietnamesePrompt:
          'Thứ hai, chúng tôi cần giữ các máy giặt được kê thăng bằng và vệ sinh bên trong mỗi tháng một lần.',
        grammarTargets: ['keep the washer level', 'once a month'],
        keywordSkeleton:
          'Second / need to keep / washing machines level / clean / inside / once a month.',
        modelSentence:
          'Second, we need to keep the washing machines level and clean the inside once a month.',
        tipVi: 'Tính từ "level" = cân bằng, không bị nghiêng rung lắc.'
      },
      {
        id: 'u8-mt-4',
        order: 4,
        sectionLabel: 'Làm sạch lưới lọc',
        vietnamesePrompt:
          'Tiếp theo, chúng tôi nên tháo và vệ sinh lưới lọc để giúp máy vận hành hiệu quả.',
        grammarTargets: ['remove and clean', 'run efficiently'],
        keywordSkeleton:
          'Next / should remove / clean / filters / help / machines run efficiently.',
        modelSentence:
          'Next, we should remove and clean the filters to help the machines run efficiently.',
        tipVi: '"run efficiently" = vận hành trơn tru, đạt hiệu suất cao.'
      },
      {
        id: 'u8-mt-5',
        order: 5,
        sectionLabel: 'Vệ sinh vỏ ngoài',
        vietnamesePrompt:
          'Bên cạnh đó, chúng tôi nhấn mạnh việc đánh bóng vỏ ngoài bằng một chiếc khăn mềm để tránh làm trầy xước.',
        grammarTargets: ['emphasize', 'soft cloth', 'wipe the outside'],
        keywordSkeleton:
          'In addition / emphasized / polishing / outside / using / soft cloth / avoid scratching.',
        modelSentence:
          'In addition, we emphasized polishing and wiping the outside using a soft cloth to avoid scratching.',
        tipVi: 'Chú ý viết đúng "soft cloth" (khăn mềm).'
      },
      {
        id: 'u8-mt-6',
        order: 6,
        sectionLabel: 'Thảo luận thời hạn thay thế',
        vietnamesePrompt:
          'Về chu kỳ thay thế, mặc dù lúc đầu có đề xuất thay mỗi năm một lần, nhưng chúng tôi đã phản biện rằng một năm là quá ngắn và đề xuất thay sau mỗi năm năm.',
        grammarTargets: ['Replacing cycle', 'recommend + V-ing / 5 years'],
        keywordSkeleton:
          'Regarding / replacement / although / first suggestion / one year / recommended replacing / every five years.',
        modelSentence:
          'Regarding replacement, although there was an initial idea to replace them every year, we disagreed that one year is too short and recommended replacing them every five years.',
        tipVi: 'Tóm gọn phần bất đồng quan điểm và đưa đề xuất thay thế trong lưu đồ.'
      },
      {
        id: 'u8-mt-7',
        order: 7,
        sectionLabel: 'Chốt quyết định cuối',
        vietnamesePrompt:
          'Tóm lại, quyết định cuối cùng của chúng tôi là kiểm tra, vệ sinh máy giặt định kỳ và thay mới sau mỗi năm năm nếu cần thiết.',
        grammarTargets: ['To sum up', 'agree to...'],
        keywordSkeleton:
          'To sum up / final decision / check and clean / regularly / replace / every five years / if necessary.',
        modelSentence:
          'To sum up, our final decision is to check and clean the machines regularly and replace them every five years if necessary.',
        tipVi: 'Kết bài hoàn chỉnh bước "Reach the decision".'
      }
    ]
  }
];

export const MONOTALK_BY_UNIT: Record<number, UnitMonoTalkTask> = Object.fromEntries(
  ALL_MONOTALK_TASKS.map((t) => [t.unit, t])
);

export function getUnitMonoTalk(unit: number): UnitMonoTalkTask | undefined {
  return MONOTALK_BY_UNIT[unit];
}

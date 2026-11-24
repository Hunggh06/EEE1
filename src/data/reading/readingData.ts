import type { UnitReadingModule } from '../../types/curriculum';

export const ALL_READING_MODULES: UnitReadingModule[] = [
  {
    unit: 1,
    title: 'Reading: Corporate Culture & Company Profiles',
    subtitleVi: 'Văn hoá doanh nghiệp Google và hồ sơ phát triển của Tập đoàn Xiaomi Inc.',
    tasks: [
      {
        id: 'u1_reading_google',
        unit: 1,
        taskCode: "Practice 1 • Teacher's Handout pp. 11–12",
        title: 'Google Company Culture',
        subtitleVi: '6 câu True/False + 6 câu điền từ (tối đa 2 từ)',
        instructionEn:
          'Read the text about Google company culture, decide True (T) / False (F), and complete the sentences with NO MORE THAN TWO WORDS from the text.',
        instructionVi:
          'Đọc bài viết về văn hoá công ty Google, chọn Đúng (True) / Sai (False) và điền KHÔNG QUÁ HAI TỪ từ bài đọc vào chỗ trống.',
        passageTitle: 'Google Company Culture',
        paragraphs: [
          {
            text: 'One of the side effects of the free food for Google staff is “Google 15” – the number of pounds that employees gain after joining the Internet company. But whether it is providing free meals, annual skiing trips or games rooms, the philosophy is the same – getting staff to meet each other, interact in formal settings and encourage teamwork.'
          },
          {
            text: 'One way the company does this is to hold competitions in everything, from office decorating to dancing and football, with prizes for the winners. Managers also receive a quarterly “celebratory fund” either to reward accomplishments or to build teamwork by going bowling, go-karting or dining out.'
          },
          {
            text: 'The Best Workplaces survey indicates that such initiatives have a powerful effect. At Google Italy, for example, 90% of the employees agreed that “people celebrate special events around here”. Also in Italy, 100% agreed that “this is a friendly place to work” and 96% agreed that “there is a ‘family’ or ‘team’ feeling here”.'
          },
          {
            text: "Another part of Google's objective is to make its workplace feel fun. Massage chairs, table-tennis tables, video games, lava lamps, large rubber balls, couches and scooters are all parts of the furniture in Google offices."
          },
          {
            text: "However, when it comes to the serious business of work, strong emphasis is placed on engaging employees. “What makes Google a great workplace is that the nature of the work itself is very challenging and interesting”, says Nick Creswell - the company's university programs manager."
          },
          {
            text: 'Fostering this intellectual activity is a policy giving employees a large degree of independence in deciding how to work - both in terms of the hours they work and how they do their jobs. Individuals understand what their own objectives are within the context of their teams, and have a lot of freedom to go out and make those happen.'
          },
          {
            text: 'Even when it comes to learning and development, many programs are voluntary. Often it may be a case of inviting university faculty in to discuss their latest research. Google also invites prominent writers to give lunchtime talks about their books.'
          }
        ],
        questions: [
          {
            id: 'u1_r1_q1',
            orderLabel: '1.1',
            type: 'tf',
            prompt: 'Google promotes the idea of staff getting together.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi:
              'Đoạn 1 ghi rõ: "the philosophy is the same – getting staff to meet each other, interact... and encourage teamwork."'
          },
          {
            id: 'u1_r1_q2',
            orderLabel: '1.2',
            type: 'tf',
            prompt: 'Every month, managers get money to build teamwork or reward staff.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi:
              'Đoạn 2 dùng từ "quarterly" (hằng quý = 3 tháng/lần), không phải hằng tháng (every month).'
          },
          {
            id: 'u1_r1_q3',
            orderLabel: '1.3',
            type: 'tf',
            prompt: '90% of Google Italy workers thought it was a friendly place to work.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi:
              'Đoạn 3: 100% nhân viên Google Italy đồng ý đây là nơi làm việc thân thiện (90% là đồng ý tổ chức sự kiện đặc biệt).'
          },
          {
            id: 'u1_r1_q4',
            orderLabel: '1.4',
            type: 'tf',
            prompt: 'The furniture is different among Google offices.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi:
              'Đoạn 4 nêu ghế massage, bàn bóng bàn, trò chơi điện tử... đều là nội thất chung tại các văn phòng Google.'
          },
          {
            id: 'u1_r1_q5',
            orderLabel: '1.5',
            type: 'tf',
            prompt: 'Employees know what their objectives are and have freedom to achieve them.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi:
              'Đoạn 6: "Individuals understand what their own objectives are... and have a lot of freedom to go out and make those happen."'
          },
          {
            id: 'u1_r1_q6',
            orderLabel: '1.6',
            type: 'tf',
            prompt: 'Employees have the opportunity to listen to well-known authors.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi:
              'Đoạn 7: "Google also invites prominent writers to give lunchtime talks about their books."'
          },
          {
            id: 'u1_r1_q7',
            orderLabel: '2.1',
            type: 'fill',
            prompt:
              'Google encourages communication between the employees in formal settings and _____.',
            acceptedAnswers: ['encourage teamwork', 'teamwork', 'informal settings'],
            displayAnswer: 'encourage teamwork',
            wordLimitNote: '<= 2 words',
            explanationVi:
              'Trong bài đọc ghi "interact in formal settings and encourage teamwork" (bài tập điền cụm "encourage teamwork" hoặc "teamwork").'
          },
          {
            id: 'u1_r1_q8',
            orderLabel: '2.2',
            type: 'fill',
            prompt:
              'A _____ is provided for the managers every three months as a reward for task fulfillment.',
            acceptedAnswers: ['celebratory fund'],
            displayAnswer: 'celebratory fund',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 2: "Managers also receive a quarterly \'celebratory fund\'".'
          },
          {
            id: 'u1_r1_q9',
            orderLabel: '2.3',
            type: 'fill',
            prompt:
              'Google considers creating a pleasant workplace as a component of its _____.',
            acceptedAnswers: ['objective', "Google's objective"],
            displayAnswer: 'objective',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 4: "Another part of Google\'s objective is to make its workplace feel fun."'
          },
          {
            id: 'u1_r1_q10',
            orderLabel: '2.4',
            type: 'fill',
            prompt:
              'Google strongly emphasizes on _____ in case of serious business of work.',
            acceptedAnswers: ['engaging employees'],
            displayAnswer: 'engaging employees',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 5: "strong emphasis is placed on engaging employees."'
          },
          {
            id: 'u1_r1_q11',
            orderLabel: '2.5',
            type: 'fill',
            prompt:
              "Promoting intellectual activity helps the Google's employees with _____ and freedom in making decision.",
            acceptedAnswers: ['independence'],
            displayAnswer: 'independence',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 6: "giving employees a large degree of independence in deciding how to work".'
          },
          {
            id: 'u1_r1_q12',
            orderLabel: '2.6',
            type: 'fill',
            prompt:
              "Google offers many voluntary programs to foster the employees' learning and _____.",
            acceptedAnswers: ['development'],
            displayAnswer: 'development',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 7: "when it comes to learning and development, many programs are voluntary."'
          }
        ]
      },
      {
        id: 'u1_reading_xiaomi',
        unit: 1,
        taskCode: "Practice 2 • Student's Handout pp. 10–11",
        title: 'Xiaomi Inc. Profile & Culture',
        subtitleVi: '5 câu Trắc nghiệm + 7 câu điền từ (tối đa 4 từ)',
        instructionEn:
          'Read the text about Xiaomi Inc., choose the correct answers, and complete the sentences with NO MORE THAN FOUR WORDS from the text.',
        instructionVi:
          'Đọc bài viết về Xiaomi Inc., chọn đáp án đúng và điền KHÔNG QUÁ BỐN TỪ từ bài đọc.',
        passageTitle: 'Xiaomi Inc.',
        paragraphs: [
          {
            text: "Xiaomi Inc. is a privately owned Chinese electronics company headquartered in Beijing. It was founded in 2010 by Lei Jun - the China's 23rd richest person. Xiaomi designs, develops, and sells smartphones, laptops, mobile apps, and related consumer electronics. The company creates remarkable hardware, software, and internet services for and with the help of Mi fans. Since the release of its first smartphone in August 2011, Xiaomi has gained market share in China and expanded into developing a wider range of consumer electronics, including a smart home device ecosystem. In 2014, Xiaomi was the third largest smartphone maker in the world, following Samsung and Apple Inc., and followed by Lenovo and LG Electronics."
          },
          {
            text: "The company has over 8,000 employees, mainly in China, Bangladesh, India, Malaysia, and Singapore, and is expanding to other countries such as Indonesia, Philippines, and Brazil. To reduce operating costs, Xiaomi touts its products through microblogging, social networking and meeting with stakeholders. However, in 2013 the company opened two own “offline” shops in Beijing and Zhuhai, where customers can buy Xiaomi's products."
          },
          {
            text: "“Just for fans” - that's what Xiaomi believes. Mi fans lead every step of the way. In fact, many Xiaomi employees were first Mi fans before joining the team. As a team, they share the same pursuit of perfection, constantly enhancing the products to create the best user experiences. The fearlessness in thinking outside boundaries and testing new ideas, together with the support of Mi fans, are the driving forces behind the unique Mi products."
          }
        ],
        questions: [
          {
            id: 'u1_r2_q1',
            orderLabel: '1.1',
            type: 'mcq',
            prompt: 'When did Xiaomi introduce its first smartphone to public?',
            options: ['In 2010', 'In 2011', 'In 2013', 'In 2014'],
            acceptedAnswers: ['In 2011', 'B', 'August 2011'],
            displayAnswer: 'In 2011',
            explanationVi:
              'Đoạn 1: "Since the release of its first smartphone in August 2011..." (2010 là năm thành lập công ty).'
          },
          {
            id: 'u1_r2_q2',
            orderLabel: '1.2',
            type: 'mcq',
            prompt: 'According to the reading passage, who are Mi fans?',
            options: [
              "Xiaomi's leaders",
              "Xiaomi's employees",
              "Xiaomi's retailers",
              "Xiaomi's customers"
            ],
            acceptedAnswers: ["Xiaomi's customers", 'D'],
            displayAnswer: "Xiaomi's customers",
            explanationVi:
              'Mi fans là cộng đồng người dùng/khách hàng yêu thích sản phẩm Xiaomi ("many Xiaomi employees were first Mi fans before joining the team").'
          },
          {
            id: 'u1_r2_q3',
            orderLabel: '1.3',
            type: 'mcq',
            prompt: 'Which company is the fourth largest smartphone maker in the world in 2014?',
            options: ['Samsung', 'Apple Inc.', 'Lenovo', 'LG Electronics'],
            acceptedAnswers: ['Lenovo', 'C'],
            displayAnswer: 'Lenovo',
            explanationVi:
              'Xiaomi đứng thứ 3 (sau Samsung và Apple) và theo sau là Lenovo (thứ 4) rồi LG Electronics (thứ 5).'
          },
          {
            id: 'u1_r2_q4',
            orderLabel: '1.4',
            type: 'mcq',
            prompt: 'Which sentence is NOT true about Xiaomi?',
            options: [
              'There are more than 8,000 people working in Xiaomi.',
              'Xiaomi has operation in India, Malaysia and Singapore.',
              'Xiaomi only promotes its products through online advertising.',
              "Customers can buy Xiaomi's products at two retail stores in China."
            ],
            acceptedAnswers: [
              'Xiaomi only promotes its products through online advertising.',
              'C'
            ],
            displayAnswer: 'Xiaomi only promotes its products through online advertising.',
            explanationVi:
              'Sai ở chữ "only" — ngoài microblogging & mạng xã hội, Xiaomi còn quảng bá qua gặp gỡ cổ đông/đối tác (meeting with stakeholders) và mở 2 cửa hàng offline.'
          },
          {
            id: 'u1_r2_q5',
            orderLabel: '1.5',
            type: 'mcq',
            prompt: "Which word BEST describes Xiaomi's culture?",
            options: ['Innovation', 'Integrity', 'Cooperation', 'Competition'],
            acceptedAnswers: ['Innovation', 'A'],
            displayAnswer: 'Innovation',
            explanationVi:
              'Đoạn cuối nhấn mạnh "thinking outside boundaries and testing new ideas" — thể hiện văn hoá Đổi mới (Innovation).'
          },
          {
            id: 'u1_r2_q6',
            orderLabel: '2.1',
            type: 'fill',
            prompt: 'Xiaomi Inc. was established in _____.',
            acceptedAnswers: ['2010'],
            displayAnswer: '2010',
            wordLimitNote: '<= 4 words',
            explanationVi: 'Đoạn 1: "It was founded in 2010 by Lei Jun".'
          },
          {
            id: 'u1_r2_q7',
            orderLabel: '2.2',
            type: 'fill',
            prompt: "Xiaomi's head office is located in _____.",
            acceptedAnswers: ['Beijing'],
            displayAnswer: 'Beijing',
            wordLimitNote: '<= 4 words',
            explanationVi: 'Đoạn 1: "headquartered in Beijing".'
          },
          {
            id: 'u1_r2_q8',
            orderLabel: '2.3',
            type: 'fill',
            prompt:
              'It specializes in both hardware like smartphones, laptops, etc., and software like _____.',
            acceptedAnswers: ['mobile apps', 'mobile apps, internet services', 'internet services'],
            displayAnswer: 'mobile apps',
            wordLimitNote: '<= 4 words',
            explanationVi:
              'Đoạn 1: "sells smartphones, laptops, mobile apps, and related consumer electronics".'
          },
          {
            id: 'u1_r2_q9',
            orderLabel: '2.4',
            type: 'fill',
            prompt:
              'Since 2011, Xiaomi has developed many types of consumer electronics, such as a _____.',
            acceptedAnswers: ['smart home device ecosystem', 'smart home ecosystem'],
            displayAnswer: 'smart home device ecosystem',
            wordLimitNote: '<= 4 words',
            explanationVi: 'Đoạn 1: "including a smart home device ecosystem".'
          },
          {
            id: 'u1_r2_q10',
            orderLabel: '2.5',
            type: 'fill',
            prompt: "It was the world's third biggest _____ manufacturer in 2014.",
            acceptedAnswers: ['smartphone', 'smartphones'],
            displayAnswer: 'smartphone',
            wordLimitNote: '<= 4 words',
            explanationVi: 'Đoạn 1: "Xiaomi was the third largest smartphone maker in the world".'
          },
          {
            id: 'u1_r2_q11',
            orderLabel: '2.6',
            type: 'fill',
            prompt:
              'Besides online promotion, Xiaomi advertises its products through _____.',
            acceptedAnswers: ['meeting with stakeholders', 'offline shops'],
            displayAnswer: 'meeting with stakeholders',
            wordLimitNote: '<= 4 words',
            explanationVi:
              'Đoạn 2: "through microblogging, social networking and meeting with stakeholders".'
          },
          {
            id: 'u1_r2_q12',
            orderLabel: '2.7',
            type: 'fill',
            prompt:
              'In order to create the best user experiences, Xiaomi employees always try to make the _____ better.',
            acceptedAnswers: ['products'],
            displayAnswer: 'products',
            wordLimitNote: '<= 4 words',
            explanationVi: 'Đoạn 3: "constantly enhancing the products to create the best user experiences".'
          }
        ]
      }
    ]
  },

  {
    unit: 2,
    title: 'Reading: Smart Devices & Smart Home Ecosystems',
    subtitleVi: 'Đồng hồ thông minh Samsung Gear S2 Classic Platinum và hệ thống nhà thông minh BKAV',
    tasks: [
      {
        id: 'u2_reading_gears2',
        unit: 2,
        taskCode: "Practice 1 • Teacher's Handout pp. 25–27",
        title: 'Samsung Gear S2 Classic Platinum',
        subtitleVi: 'Hoàn thành bảng thông số kỹ thuật (10 mục) & 5 câu hỏi ngắn',
        instructionEn:
          'Read the text about Samsung Gear S2 Classic Platinum smartwatch, complete the specification table, and answer the questions with NO MORE THAN TWO WORDS.',
        instructionVi:
          'Đọc bài viết về đồng hồ Samsung Gear S2 Classic Platinum, điền bảng thông số và trả lời 5 câu hỏi ngắn (tối đa 2 từ).',
        passageTitle: 'Samsung Gear S2 Classic Platinum Smartwatch',
        paragraphs: [
          {
            text: 'Announced during CES 2016, the Samsung Gear S2 Classic Platinum smartwatch is a more upmarket variant of the already premium Gear S2 Classic with platinum coating. The device debuted alongside another variant with rose gold finish. Thanks to its platinum finish and leather band in contrasting black, the new Gear S2 Classic looks great in the metal.'
          },
          {
            text: 'With a case that measures 39.9 millimeters, the Gear S2 Classic Platinum appears pleasantly understated despite its precious metal finish. The watch has a standard 20-millimeter watchband, which allows users to change the look of the device whenever they desire. Specs-wise, the Samsung Gear S2 Classic Platinum is no different than its more affordable siblings. Key features include a gorgeous 1.2-inch fully circular Super AMOLED display of 360 x 360 pixels, 1 GHz ARM Cortex-A7 dual-core processor, 4 GB of built-in memory, Wi-Fi, and NFC connectivity.'
          },
          {
            text: "The device is also a capable fitness tracker, featuring a heart-rate monitor on its back. In order to take advantage of its full health and fitness capabilities, users will need to install the free S-Health app and create an account. Samsung's Gear S2 product family runs Tizen OS. The smartwatch can connect to Android smartphones via Bluetooth 4.1. A free app by Samsung is required in order to take advantage of its functionality."
          },
          {
            text: 'The Samsung Gear S2 Classic Platinum has a price tag of $450, which is quite attractive considering its appealing design and precious metal coating. For the time being, all Samsung Gear S2 smartwatches are only compatible with Android smartphones. However, Apple iOS support is expected to arrive in the near future.'
          }
        ],
        questions: [
          {
            id: 'u2_r1_t1',
            orderLabel: '(1)',
            type: 'fill',
            prompt: 'Materials: _____',
            acceptedAnswers: [
              'platinum, leather',
              'platinum coating, leather band',
              'platinum and leather',
              'platinum',
              'platinum coating'
            ],
            displayAnswer: 'platinum, leather',
            explanationVi: 'Đoạn 1: "platinum finish and leather band".'
          },
          {
            id: 'u2_r1_t2',
            orderLabel: '(2)',
            type: 'fill',
            prompt: 'Case diameter: _____',
            acceptedAnswers: ['39.9 mm', '39.9 millimeters', '39.9mm'],
            displayAnswer: '39.9 millimeters',
            explanationVi: 'Đoạn 2: "a case that measures 39.9 millimeters".'
          },
          {
            id: 'u2_r1_t3',
            orderLabel: '(3)',
            type: 'fill',
            prompt: 'Band width: _____',
            acceptedAnswers: ['20 mm', '20 millimeters', '20mm', '20-millimeter'],
            displayAnswer: '20 millimeters',
            explanationVi: 'Đoạn 2: "standard 20-millimeter watchband".'
          },
          {
            id: 'u2_r1_t4',
            orderLabel: '(4)',
            type: 'fill',
            prompt: 'Display diameter: _____',
            acceptedAnswers: ['1.2-inch', '1.2 inches', '1.2 inch', '1.2 in'],
            displayAnswer: '1.2 inches',
            explanationVi: 'Đoạn 2: "1.2-inch fully circular Super AMOLED display".'
          },
          {
            id: 'u2_r1_t5',
            orderLabel: '(5)',
            type: 'fill',
            prompt: 'Display resolution: _____',
            acceptedAnswers: ['360 x 360 pixels', '360 x 360', '360x360', '360x360 pixels'],
            displayAnswer: '360 x 360 pixels',
            explanationVi: 'Đoạn 2: "360 x 360 pixels".'
          },
          {
            id: 'u2_r1_t6',
            orderLabel: '(6)',
            type: 'fill',
            prompt: 'Processor: _____',
            acceptedAnswers: [
              '1 GHz ARM Cortex-A7',
              '1 GHz ARM Cortex-A7 dual-core',
              'ARM Cortex-A7 dual-core',
              '1 GHz dual-core'
            ],
            displayAnswer: '1 GHz ARM Cortex-A7',
            explanationVi: 'Đoạn 2: "1 GHz ARM Cortex-A7 dual-core processor".'
          },
          {
            id: 'u2_r1_t7',
            orderLabel: '(7)',
            type: 'fill',
            prompt: 'Internal storage: _____',
            acceptedAnswers: ['4 GB', '4GB'],
            displayAnswer: '4 GB',
            explanationVi: 'Đoạn 2: "4 GB of built-in memory".'
          },
          {
            id: 'u2_r1_t8',
            orderLabel: '(8)',
            type: 'fill',
            prompt: 'Connectivity: _____',
            acceptedAnswers: [
              'Wi-Fi, NFC, Bluetooth 4.1',
              'Wi-Fi, NFC',
              'Wi-Fi and NFC',
              'WiFi, NFC, Bluetooth 4.1'
            ],
            displayAnswer: 'Wi-Fi, NFC, Bluetooth 4.1',
            explanationVi: 'Đoạn 2 & 3 đề cập Wi-Fi, NFC và Bluetooth 4.1.'
          },
          {
            id: 'u2_r1_t9',
            orderLabel: '(9)',
            type: 'fill',
            prompt: 'Operating system: _____',
            acceptedAnswers: ['Tizen OS', 'Tizen'],
            displayAnswer: 'Tizen OS',
            explanationVi: 'Đoạn 3: "runs Tizen OS".'
          },
          {
            id: 'u2_r1_t10',
            orderLabel: '(10)',
            type: 'fill',
            prompt: 'Price: _____',
            acceptedAnswers: ['$450', '450$', '450 dollars', '450'],
            displayAnswer: '$450',
            explanationVi: 'Đoạn 4: "has a price tag of $450".'
          },
          {
            id: 'u2_r1_q1',
            orderLabel: '2.1',
            type: 'qa',
            prompt: 'What makes the new Gear S2 Classic more upmarket than its predecessor?',
            acceptedAnswers: ['platinum coating', 'platinum finish', 'platinum'],
            displayAnswer: 'platinum coating',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 1: "a more upmarket variant... with platinum coating".'
          },
          {
            id: 'u2_r1_q2',
            orderLabel: '2.2',
            type: 'qa',
            prompt: 'What is the watchband made of?',
            acceptedAnswers: ['leather'],
            displayAnswer: 'leather',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 1: "leather band in contrasting black".'
          },
          {
            id: 'u2_r1_q3',
            orderLabel: '2.3',
            type: 'qa',
            prompt: 'Which sensor is integrated into this smartwatch?',
            acceptedAnswers: ['heart-rate monitor', 'heart rate monitor'],
            displayAnswer: 'heart-rate monitor',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 3: "featuring a heart-rate monitor on its back".'
          },
          {
            id: 'u2_r1_q4',
            orderLabel: '2.4',
            type: 'qa',
            prompt: 'Which software is needed to utilize the operation of this fitness tracker?',
            acceptedAnswers: ['S-Health app', 'S-Health', 'free app'],
            displayAnswer: 'S-Health app',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 3: "users will need to install the free S-Health app".'
          },
          {
            id: 'u2_r1_q5',
            orderLabel: '2.5',
            type: 'qa',
            prompt: 'Which mobile operating system is it compatible with?',
            acceptedAnswers: ['Android', 'Android OS'],
            displayAnswer: 'Android',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 4: "only compatible with Android smartphones".'
          }
        ]
      },
      {
        id: 'u2_reading_bkav',
        unit: 2,
        taskCode: "Practice 2 • Teacher's Handout pp. 27–28",
        title: 'BKAV SmartHome System',
        subtitleVi: 'Hoàn thành 6 câu tóm tắt (tối đa 3 từ)',
        instructionEn:
          'Read the text and complete the sentences with NO MORE THAN THREE WORDS from the text.',
        instructionVi:
          'Đọc bài viết về hệ thống BKAV SmartHome và điền KHÔNG QUÁ BA TỪ từ bài đọc vào chỗ trống.',
        passageTitle: 'BKAV SMARTHOME',
        paragraphs: [
          {
            text: 'BKAV smart home is the latest generation of smart home systems in the world with outstanding technology in comparison with product from US and EU.'
          },
          {
            text: 'For a conventional smart home system, you shall need dozens or even up to hundreds of switches to control all the devices. However, with BKAV Smart Home, all electrical appliances shall be switched with only a few of buttons on touch screen of a smartphone or tablet. You can also control your house via visual 3D interface, in which the devices are simulated same as in reality, just by tapping the corresponding device on screen to control.'
          },
          {
            text: 'Besides smartphone and tablet, you can also control BKAV Smart Home directly through your voice. BKAV Smart Home is equipped with virtual assistant component, which helps communicating with the system. It is comfortable when using your own voice to give command and the system responses to it.'
          },
          {
            text: "The lighting system inside and outside your home will be divided into areas. Only when there is a person at an area, will the lights of the area turn on. They will automatically turn off as soon as the person leaves. Moreover, the lighting system has ability to learn its owner's habits so it can operate like owner's hobbies such as greeting guests in welcome mode."
          },
          {
            text: "BKAV Smart Home can also control temperature, humidity, oxygen by activating barometer sensors. The parameters will be transferred to center system for calculating and giving control commands to air condition devices, dehumidifiers, ventilators etc. to help maintain your home's environment at its best. The owner can freely set up environmental parameters to suit his family, such as temperature to be set up lower in children's room and higher for grandparents' room. BKAV Smart Home will also learn changes of the environment. For example, with “Sleep setup” at normal default, it automatically closes curtains, turns off ceiling lights and reflector lamps, only turns on bedside lamps, set air conditioner's temperature at 25 °C."
          }
        ],
        questions: [
          {
            id: 'u2_r2_q1',
            orderLabel: '1',
            type: 'fill',
            prompt:
              'BKAV Smart Home allows you to control the _____ at the touch of buttons on the screen of a smartphone or tablet.',
            acceptedAnswers: ['electrical appliances', 'all electrical appliances', 'devices'],
            displayAnswer: 'electrical appliances',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 2: "all electrical appliances shall be switched with only a few of buttons".'
          },
          {
            id: 'u2_r2_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'Thanks to the _____, you can communicate with BKAV Smart Home and control it through your voice.',
            acceptedAnswers: ['virtual assistant component', 'virtual assistant'],
            displayAnswer: 'virtual assistant component',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 3: "equipped with virtual assistant component".'
          },
          {
            id: 'u2_r2_q3',
            orderLabel: '3',
            type: 'fill',
            prompt:
              "The _____ can welcome guests in a similar way to its owner's routines.",
            acceptedAnswers: ['lighting system'],
            displayAnswer: 'lighting system',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 4: "the lighting system has ability to learn... such as greeting guests".'
          },
          {
            id: 'u2_r2_q4',
            orderLabel: '4',
            type: 'fill',
            prompt:
              'The _____ of BKAV Smart Home enable you to control the air condition of your house.',
            acceptedAnswers: ['barometer sensors'],
            displayAnswer: 'barometer sensors',
            wordLimitNote: '<= 3 words',
            explanationVi:
              'Đoạn 5: "by activating barometer sensors... giving control commands to air condition devices".'
          },
          {
            id: 'u2_r2_q5',
            orderLabel: '5',
            type: 'fill',
            prompt: '_____ can be freely set up to be suitable for the family.',
            acceptedAnswers: ['environmental parameters', 'Environmental parameters'],
            displayAnswer: 'Environmental parameters',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 5: "The owner can freely set up environmental parameters to suit his family".'
          },
          {
            id: 'u2_r2_q6',
            orderLabel: '6',
            type: 'fill',
            prompt:
              '_____ of BKAV Smart Home can help the owner with some automatic operation in normal default.',
            acceptedAnswers: ['Sleep setup', 'sleep setup'],
            displayAnswer: 'Sleep setup',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 5: "with \'Sleep setup\' at normal default, it automatically closes curtains...".'
          }
        ]
      }
    ]
  },

  {
    unit: 3,
    title: 'Reading: Electrical Terms & Cable Installation',
    subtitleVi: 'Kiến thức cường độ dòng điện, điện áp, công suất và công việc kỹ thuật viên lắp đặt cáp',
    tasks: [
      {
        id: 'u3_reading_terms',
        unit: 3,
        taskCode: "Reading 1 • Teacher's Handout pp. 40–41",
        title: 'Understanding Common Electrical Terms',
        subtitleVi: '5 câu Trắc nghiệm về Amps, Volts và Watts',
        instructionEn: 'Read the passage and choose the correct answer for each question.',
        instructionVi: 'Đọc đoạn văn kỹ thuật về Ampe, Vôn, Oát và chọn đáp án đúng.',
        passageTitle: 'Understanding Common Electrical Terms',
        paragraphs: [
          {
            text: "Amperage is the measurement of the strength of the volume of electrons flowing through an electrical conductor or system. The measurement is based on the number of electrons that pass through a point in a given amount of time. This measurement is done with an ammeter that tells us reading like 20 amp, 30 amps, etc. In a typical home's electrical system, that standard circuits for lights and outlets will be 15-amp or 20-amp circuits."
          },
          {
            text: 'Voltage, also known as electromotive force, is the pressure of the electrons in a system. Another definition of voltage is that it is the potential difference in charge between two points in an electrical field. In other words, the greater the flow of current electrons, the greater the voltage.'
          },
          {
            text: 'The typical circuits in your home will carry either about 120-volts (the actual voltage can vary between about 115 to 125 volts), or 240 volts (actual range: 230 to 250 volts). Most light fixtures and outlets will be fed by 120-volt circuits, while many appliances will use 240-volt circuits.'
          },
          {
            text: "Wattage is used to specify the rate at which electrical energy is dissipated or the rate at which electromagnetic energy is radiated, absorbed or dissipated. A watt is a standard unit of power which is measured by the amount of energy used per unit of time. The total amount of power consumed by the electrical system in your home is read through the utility company's electric meter. It is measured in kilowatts and that is how you are billed."
          },
          {
            text: 'Amps, volts, and watts exist in a mathematical relationship to one another, expressed as follows: Amps x voltage = watts. When the term "electrical power" or "power" is used to describe a home\'s electrical service, it is in reference to the total amount of wattage available to the system, as calculated by voltage x amperage. This is the potential energy of the system available to provide heat to radiating appliances, to turn motors in appliances like vacuum cleaners, and to provide light in lightbulbs.'
          }
        ],
        questions: [
          {
            id: 'u3_r1_q1',
            orderLabel: '1',
            type: 'mcq',
            prompt: 'What is the basic circuit for light in house?',
            options: ['10amp circuit', '17amp circuit', '20amp circuit', '30amp circuit'],
            acceptedAnswers: ['20amp circuit', 'C'],
            displayAnswer: '20amp circuit',
            explanationVi: 'Đoạn 1: "standard circuits for lights and outlets will be 15-amp or 20-amp circuits".'
          },
          {
            id: 'u3_r1_q2',
            orderLabel: '2',
            type: 'mcq',
            prompt: 'Choose the best statement:',
            options: [
              'If the flow of current electrons is low, the voltage is low.',
              'If the flow of current electrons is low, the voltage is high.',
              'If the flow of current electrons is low, the voltage is unchanged.',
              'If the flow of current electrons is high, the voltage is unchanged.'
            ],
            acceptedAnswers: ['If the flow of current electrons is low, the voltage is low.', 'A'],
            displayAnswer: 'If the flow of current electrons is low, the voltage is low.',
            explanationVi:
              'Đoạn 2 nêu mối quan hệ thuận: "the greater the flow of current electrons, the greater the voltage".'
          },
          {
            id: 'u3_r1_q3',
            orderLabel: '3',
            type: 'mcq',
            prompt: 'Watt is _____.',
            options: [
              'the strength of the volume of electrons flowing a power system',
              "power in home's electrical device",
              'the force of electron in the system',
              'the consumed power in a long time'
            ],
            acceptedAnswers: ["power in home's electrical device", 'B'],
            displayAnswer: "power in home's electrical device",
            explanationVi:
              'Watt là đơn vị đo công suất điện (power) của thiết bị, trong khi A là Amperage và C là Voltage.'
          },
          {
            id: 'u3_r1_q4',
            orderLabel: '4',
            type: 'mcq',
            prompt: 'How much power is available for a 20-amp circuit that has 120-volt electromotive force?',
            options: ['6w power', '100w power', '240w power', '2400w power'],
            acceptedAnswers: ['2400w power', 'D', '2400w', '2400 w'],
            displayAnswer: '2400w power',
            explanationVi: 'Theo công thức: Amps × Voltage = Watts → 20 × 120 = 2400W.'
          },
          {
            id: 'u3_r1_q5',
            orderLabel: '5',
            type: 'mcq',
            prompt: 'What is electric meter used to?',
            options: [
              'Measure the volume of electrons',
              'Measure the strength of electrons',
              'Measure the electromotive force',
              'Measure electrical energy'
            ],
            acceptedAnswers: ['Measure electrical energy', 'D'],
            displayAnswer: 'Measure electrical energy',
            explanationVi:
              'Đoạn 4: công tơ điện (electric meter) dùng để đọc tổng lượng điện năng tiêu thụ trong gia đình để tính hoá đơn.'
          }
        ]
      },
      {
        id: 'u3_reading_cable',
        unit: 3,
        taskCode: "Reading 2 • Teacher's Handout pp. 41–42",
        title: 'What Do Cable Installers Do?',
        subtitleVi: '7 câu hỏi đọc hiểu (tối đa 2 từ)',
        instructionEn:
          'Read the passage and answer the following questions with NO MORE THAN TWO WORDS.',
        instructionVi:
          'Đọc bài viết về công việc của kỹ thuật viên lắp đặt cáp và trả lời với KHÔNG QUÁ HAI TỪ.',
        passageTitle: 'WHAT DO CABLE INSTALLERS DO?',
        paragraphs: [
          {
            text: "Cable installers work in homes and businesses to install and repair telecommunications cables. These could be phone lines, internet cables or cable television. If it comes into your home or office through a cable, then a cable installer put it there. Cable installers typically drive to people's homes in vans or trucks that are outfitted with the tools and materials needed to install or repair cables, and are prepared for different types of installations, whether they be under the house or on top of a building. They test lines when there is trouble reported by the customer, and modify, adjust or replace equipment that is malfunctioning."
          },
          {
            text: 'Cable installers often work directly with the customer, and customer service is a big part of this job, as is the technical know-how to use diagnostic equipment and tools to service telecommunications equipment.'
          },
          {
            heading: 'WHAT ARE THE EDUCATION REQUIREMENTS?',
            text: "An associate's degree or certification program in electronics repair, computer science or similar areas might get you started, but companies are looking for cable installers with advanced knowledge. A four year degree is becoming more important for advancement, and cable installers will have to have ongoing education to keep up to date on the latest technologies. Certification is available."
          },
          {
            heading: 'JOB SKILLS AND REQUIREMENTS',
            text: "Bookkeeping: Cable installers need to keep track of parts used, time spent at a customer's house and repairs made.\nColor Vision: Wires and cables are color coded for safety reasons, and installers must have color vision to help them in their job.\nCustomer Service: Working directly with customers means that cable installers need to be friendly, polite and be able to describe the actions being taken during repair or installation.\nDexterity: Installing and repairing wires and cables means using your hands, and having full range of motion in your hands and fingers is necessary.\nTechnical Skills: Working with computers, diagnostic equipment and complex machines is part of the job.\nTroubleshooting: Cable installers need to be able to find the root cause of technical issues and devise a solution for repairing it."
          }
        ],
        questions: [
          {
            id: 'u3_r2_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'Which job is mentioned in this paragraph?',
            acceptedAnswers: ['cable installers', 'cable installer'],
            displayAnswer: 'cable installers',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Nhan đề và câu đầu: "Cable installers".'
          },
          {
            id: 'u3_r2_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What does the word “These” in sentence 2 refer to?',
            acceptedAnswers: ['telecommunications cables', 'cables'],
            displayAnswer: 'telecommunications cables',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Câu trước là "install and repair telecommunications cables. These could be phone lines..."'
          },
          {
            id: 'u3_r2_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'Which are used to support telecommunication equipment?',
            acceptedAnswers: ['diagnostic equipment', 'equipment, tools', 'diagnostic tools', 'tools'],
            displayAnswer: 'diagnostic equipment',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 2: "use diagnostic equipment and tools to service telecommunications equipment".'
          },
          {
            id: 'u3_r2_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'What do the installers investigate when customers inform the problems?',
            acceptedAnswers: ['lines', 'the lines'],
            displayAnswer: 'lines',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Đoạn 1: "They test lines when there is trouble reported by the customer".'
          },
          {
            id: 'u3_r2_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'What skill do the installers need to record their work?',
            acceptedAnswers: ['bookkeeping'],
            displayAnswer: 'bookkeeping',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Bookkeeping: "need to keep track of parts used, time spent... and repairs made".'
          },
          {
            id: 'u3_r2_q6',
            orderLabel: '6',
            type: 'qa',
            prompt: 'Why do wires and cables have different colors?',
            acceptedAnswers: ['safety reasons', 'for safety', 'safety'],
            displayAnswer: 'safety reasons',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Color Vision: "Wires and cables are color coded for safety reasons".'
          },
          {
            id: 'u3_r2_q7',
            orderLabel: '7',
            type: 'qa',
            prompt: 'Which skill do the installers need to find the cause of electrical problems?',
            acceptedAnswers: ['troubleshooting'],
            displayAnswer: 'troubleshooting',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Troubleshooting: "find the root cause of technical issues".'
          }
        ]
      }
    ]
  },

  {
    unit: 4,
    title: 'Reading: Air Conditioner Maintenance & Compressor Faults',
    subtitleVi: '5 bước phòng tránh hỏng điều hoà và 5 nguyên nhân máy nén điều hoà ngừng hoạt động',
    tasks: [
      {
        id: 'u4_reading_prevent',
        unit: 4,
        taskCode: "Practice 1 • Student's Handout pp. 54–55",
        title: 'Easy Steps to Prevent Air Conditioner Problems',
        subtitleVi: '5 câu trả lời ngắn (tối đa 3 từ)',
        instructionEn:
          'Read the passage below and answer the following questions with NO MORE THAN 3 WORDS.',
        instructionVi:
          'Đọc 5 bước phòng ngừa sự cố điều hoà và trả lời với KHÔNG QUÁ 3 TỪ.',
        passageTitle: 'Easy Steps to Prevent Air Conditioner Problems',
        paragraphs: [
          {
            text: '1. REPLACE DIRTY AIR FILTERS. Air flow problems that lead to coils freezing are often caused by clogged air filters.'
          },
          {
            text: "2. INSPECT DUCTS AND REPAIR ANY HOLES. If it seems like there's not enough air coming from the registers, or your energy bills keep going up, have an HVAC expert take a look at the condition of your ducts."
          },
          {
            text: '3. INSTALL A PROGRAMMABLE THERMOSTAT AND LEARN HOW TO USE IT. Eliminate issues with older control systems by installing new thermostats, which are more precise and save energy. You can even get thermostats that can be controlled remotely using your smartphone or tablet.'
          },
          {
            text: "4. CLEAR BRUSH AND DEBRIS FROM AROUND THE OUTDOOR UNIT. When the condenser and outdoor fan unit get clogged with leaves, trash and dirt, the unit can't expel heat as effectively."
          },
          {
            text: "5. DON'T NEGLECT REGULAR MAINTENANCE. Virtually all of the most common causes of air conditioner problems can be easily prevented with regular maintenance. Have an HVAC expert come in to inspect and tune up your system each spring before starting it up for the first time. It's relatively inexpensive, and you'll save yourself from having to make that emergency call when the AC stops working on the hottest day of the year."
          }
        ],
        questions: [
          {
            id: 'u4_r1_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'What causes air flow issues?',
            acceptedAnswers: ['clogged air filters', 'dirty air filters'],
            displayAnswer: 'clogged air filters',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bước 1: "Air flow problems... are often caused by clogged air filters".'
          },
          {
            id: 'u4_r1_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What should be checked if the registers do not generate enough air?',
            acceptedAnswers: ['ducts', 'your ducts', 'the ducts'],
            displayAnswer: 'ducts',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bước 2: "have an HVAC expert take a look at the condition of your ducts".'
          },
          {
            id: 'u4_r1_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'What should be installed to solve problems related to control systems?',
            acceptedAnswers: ['new thermostats', 'programmable thermostat', 'a programmable thermostat'],
            displayAnswer: 'new thermostats',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bước 3: "Eliminate issues with older control systems by installing new thermostats".'
          },
          {
            id: 'u4_r1_q4',
            orderLabel: '4',
            type: 'fill',
            prompt:
              "Why can't the heat be expelled effectively? — Because the outdoor unit _____ (with leaves, trash and dirt).",
            acceptedAnswers: ['gets clogged', 'is clogged'],
            displayAnswer: 'gets clogged',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bước 4: "When the condenser and outdoor fan unit get clogged with leaves, trash and dirt...".'
          },
          {
            id: 'u4_r1_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: "What shouldn't be ignored to prevent common AC problems?",
            acceptedAnswers: ['regular maintenance'],
            displayAnswer: 'regular maintenance',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bước 5: "DON\'T NEGLECT REGULAR MAINTENANCE".'
          }
        ]
      },
      {
        id: 'u4_reading_compressor',
        unit: 4,
        taskCode: "Practice 2 • Student's Handout pp. 55–56",
        title: '5 Common Reasons Behind AC Compressor Not Working',
        subtitleVi: '5 câu trả lời ngắn (tối đa 3 từ)',
        instructionEn:
          'Read the passage below and answer the following questions with NO MORE THAN 3 WORDS.',
        instructionVi:
          'Đọc bài viết về nguyên nhân hỏng máy nén điều hoà và trả lời với KHÔNG QUÁ 3 TỪ.',
        passageTitle: '5 Common Reasons Behind AC Compressor Not Working',
        paragraphs: [
          {
            text: 'A compressor is the heart of an air conditioner system. It is the component that is responsible for cooling your room. It is located in the outside box along with the condenser and fan. This is also called the outer unit of AC system. A compressor is a reliable component of AC. So when it goes bad it indicates that there is a serious underlying fault that needs to be corrected immediately.'
          },
          {
            text: "There are various reasons behind AC compressor not working:\n• Excess refrigerant flow: The compressor's job is to compress the low pressure cool refrigerant into high pressure hot gas. Excess refrigerant means excess high pressure. This high pressure build up inside the compressor makes it go bad.\n• Lack of lubrication: A compressor needs lubrication for proper operations. Lubricating oil is carried through the AC system and compressor by the refrigerant. The oil will not circulate without refrigerant. When the refrigerant is undercharged or leaks then the lubrication oil also leaks along with it. Less refrigerant means lack of lubrication which damages the compressor."
          },
          {
            text: '• Poor heat dissipation: The compressor compresses the cool low pressure gas into high pressure hot gas. This process produces heat. A clogged radiator or dirt covered fins or faulty fan (the ones responsible for keeping the outer unit cool and well ventilated) result in poor heat dissipation from the outer unit. This causes the temperature and pressure to shoot up and damage the compressor.\n• Compressor contamination: Over time dust, dirt and impurities get deposited inside the compressor. This contamination hinders in the proper functioning of compressor. It also makes the compressor go bad.\n• Over use & frequent on-off: Frequent on-off of air conditioner hinders in the working of compressor. Sometime long and continuous hours of operation heats up the outer unit. This overheating has adverse effect on the compressor.'
          },
          {
            text: 'It is a common practice that when the compressor fails you replace it with a new one. But before making the replacement, make sure that you find out the actual cause of failure and repair it. If the actual causes of failure i.e. refrigerant over flow, lack of lubrication, heat dissipation etc. are not corrected, then within no time your new compressor will also go bad.'
          }
        ],
        questions: [
          {
            id: 'u4_r2_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'Which component is used to make your room cold?',
            acceptedAnswers: ['compressor', 'a compressor', 'the compressor'],
            displayAnswer: 'compressor',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 1: "A compressor... is the component that is responsible for cooling your room".'
          },
          {
            id: 'u4_r2_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'How many causes of not working AC compressors are mentioned in the passage?',
            acceptedAnswers: ['5', 'five', '5 reasons', 'five reasons'],
            displayAnswer: '5',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Bài viết liệt kê 5 nguyên nhân cụ thể (gạch đầu dòng).'
          },
          {
            id: 'u4_r2_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'What is used to carry lubricating oil along the AC system and compressor?',
            acceptedAnswers: ['refrigerant', 'the refrigerant'],
            displayAnswer: 'refrigerant',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Lack of lubrication: "Lubricating oil is carried... by the refrigerant".'
          },
          {
            id: 'u4_r2_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'What can cause increasing temperature and broken compressor?',
            acceptedAnswers: ['poor heat dissipation', 'heat dissipation'],
            displayAnswer: 'poor heat dissipation',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Poor heat dissipation: "result in poor heat dissipation... causes the temperature and pressure to shoot up and damage the compressor".'
          },
          {
            id: 'u4_r2_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'What contaminates the compressor?',
            acceptedAnswers: ['dust, dirt, impurities', 'dust, dirt and impurities', 'dirt and impurities'],
            displayAnswer: 'dust, dirt, impurities',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Compressor contamination: "Over time dust, dirt and impurities get deposited inside the compressor".'
          }
        ]
      }
    ]
  },

  {
    unit: 5,
    title: 'Reading: Handling Customer Complaints',
    subtitleVi: 'Thư phản hồi khiếu nại sản phẩm lỗi và bài đọc 5 nguyên tắc xử lý khiếu nại',
    tasks: [
      {
        id: 'u5_reading_email',
        unit: 5,
        taskCode: "Practice 1 • Student's Handout pp. 65–66",
        title: "Reply to a Customer's Email of Complaint",
        subtitleVi: '5 câu hỏi phân tích cấu trúc email trả lời khiếu nại',
        instructionEn:
          "Read the reply to a customer's email of complaint and answer the comprehension questions.",
        instructionVi:
          'Đọc email phản hồi khiếu nại khách hàng của cửa hàng trưởng Robert Wilson và trả lời câu hỏi.',
        passageTitle: 'Email Reply to Ms Beck',
        paragraphs: [
          {
            text: 'Dear Ms Beck,\nThank you for your email complaining about your DVD player from our store. I was sorry to hear that the top surface of the machine was scratched and the edge was cracked.'
          },
          {
            text: 'Unfortunately, we do not have any more DVD players in stock at the moment. However, I am pleased to inform you that we will give you your money back in full. In addition, as a gesture of goodwill, we will give you a 10% discount off your next purchase from our store.'
          },
          {
            text: 'I would like to apologise for the inconvenience you have experienced. Please do not hesitate to contact me if you have any further queries.\nYours sincerely,\nRobert Wilson\nStore Manager'
          }
        ],
        questions: [
          {
            id: 'u5_r1_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'What item did the customer complain about?',
            acceptedAnswers: ['DVD player', 'her DVD player'],
            displayAnswer: 'DVD player',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 1: "complaining about your DVD player from our store".'
          },
          {
            id: 'u5_r1_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What does the store offer instead of replacing the out-of-stock item?',
            acceptedAnswers: ['full refund', 'money back', 'a 10% discount', '10% discount'],
            displayAnswer: 'full refund',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Đoạn 2: hoàn tiền toàn bộ ("give you your money back in full") và giảm giá 10% lần mua tới.'
          },
          {
            id: 'u5_r1_q3',
            orderLabel: '3',
            type: 'mcq',
            prompt: 'Which expression is used in the email to show sympathy?',
            options: [
              'Unfortunately, we do not have any more DVD players',
              'I was sorry to hear that...',
              'I am pleased to inform you that...',
              'Please do not hesitate to contact me'
            ],
            acceptedAnswers: ['I was sorry to hear that...', 'B', 'I was sorry to hear that'],
            displayAnswer: 'I was sorry to hear that...',
            explanationVi: '"I was sorry to hear that..." dùng để bày tỏ sự đồng cảm với vấn đề khách gặp phải.'
          },
          {
            id: 'u5_r1_q4',
            orderLabel: '4',
            type: 'mcq',
            prompt: 'Which expression is used to apologize?',
            options: [
              'Thank you for your email complaining about...',
              'As a gesture of goodwill...',
              'I would like to apologise for the inconvenience...',
              'Yours sincerely'
            ],
            acceptedAnswers: ['I would like to apologise for the inconvenience...', 'C'],
            displayAnswer: 'I would like to apologise for the inconvenience...',
            explanationVi: 'Đoạn 3 dùng "I would like to apologise for the inconvenience you have experienced."'
          },
          {
            id: 'u5_r1_q5',
            orderLabel: '5',
            type: 'mcq',
            prompt: 'Which words introduce good news and bad news respectively?',
            options: [
              'However / As a gesture of goodwill',
              'I am pleased to inform you / Unfortunately',
              'In addition / Unfortunately',
              'Yours sincerely / Thank you for'
            ],
            acceptedAnswers: ['I am pleased to inform you / Unfortunately', 'B'],
            displayAnswer: 'I am pleased to inform you / Unfortunately',
            explanationVi:
              'Tin tốt: "I am pleased to inform you..." / Tin xấu (hết hàng): "Unfortunately...".'
          }
        ]
      },
      {
        id: 'u5_reading_handle',
        unit: 5,
        taskCode: "Practice 3 • Student's Handout pp. 68–69",
        title: 'How to Handle a Customer Complaint',
        subtitleVi: '5 chỗ trống tóm tắt quy trình 5 bước (tối đa 2 từ)',
        instructionEn:
          'Read the passage and fill in each blank of the below summary with NO MORE THAN TWO WORDS.',
        instructionVi:
          'Đọc bài viết về 5 nguyên tắc xử lý khiếu nại và điền KHÔNG QUÁ HAI TỪ vào đoạn tóm tắt bên dưới.',
        passageTitle: 'How to Handle a Customer Complaint',
        paragraphs: [
          {
            heading: 'Respond Professionally',
            text: "In short, this sentence means one thing - Solve the Problem. Apologize for the inconvenience and get on your way to resolving the problem. What matters to the customer is that you are willing and able to handle the problem presented to you. Don't make the company look bad... Make everyone look great by being productive and proactive. If a situation warrants further investigation or action, that is another matter, don't bring the customer into it."
          },
          {
            heading: 'Sympathize',
            text: "A customer with a complaint may be angry and can expect resistance. By sympathizing you can often defuse the situation. Statements such as “I understand how you feel,” or “I can see how you are upset by this” are often great phrases. Acknowledge the customer's feeling without agreeing with their position. A friendly, open, non-defensive attitude lets the customer know how important they are to you."
          },
          {
            heading: 'Apologize',
            text: "Be sincere in expressing regrets that the customer has been inconvenienced or disappointed. Now state the company position. Ask questions to find out if the customer understands company policy. If adjustments are in order, make them quickly, and cheerfully. If no adjustment is due, explain the company policy to the customer. If the company made the fault, admit it quickly and show your willingness to correct the error. If the error is the customer's, allow him to save face. Remember the purpose is to bring them back."
          },
          {
            heading: 'Rebuild Your Reputation',
            text: 'After apology, remind the customer that your company successfully deals with hundreds (or thousands) of customers every year. Remind them that we have built a good reputation based on service and dedication to your customers. Let them know you appreciate them and are able to correct the problem.'
          },
          {
            heading: 'Thank the Customer',
            text: "Make the customer feel good. By now they're a little embarrassed they've created such a fuss. If they go away feeling that they've made a mountain out of a molehill, they may never come back. Be sure that you take the opportunity to thank them for the constructive criticism and allow them to save face."
          }
        ],
        questions: [
          {
            id: 'u5_r2_q1',
            orderLabel: '(1)',
            type: 'fill',
            prompt:
              'Firstly, you must _____, which means you can and are willing to solve the problem.',
            acceptedAnswers: ['respond professionally'],
            displayAnswer: 'respond professionally',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Tiêu đề bước 1: "Respond Professionally".'
          },
          {
            id: 'u5_r2_q2',
            orderLabel: '(2)',
            type: 'fill',
            prompt:
              "Secondly, show your sympathy! It's important to show a friendly, open, non-defensive _____.",
            acceptedAnswers: ['attitude'],
            displayAnswer: 'attitude',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Sympathize: "A friendly, open, non-defensive attitude".'
          },
          {
            id: 'u5_r2_q3',
            orderLabel: '(3)',
            type: 'fill',
            prompt:
              "Next, admit and apologise if it's the company's _____, but allow customers to save face if the error is theirs.",
            acceptedAnswers: ['fault'],
            displayAnswer: 'fault',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Apologize: "If the company made the fault, admit it quickly".'
          },
          {
            id: 'u5_r2_q4',
            orderLabel: '(4)',
            type: 'fill',
            prompt:
              'After apologising, remember to emphasize your _____ based on service and dedication to customers.',
            acceptedAnswers: ['reputation', 'good reputation'],
            displayAnswer: 'reputation',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Rebuild Your Reputation: "built a good reputation based on service...".'
          },
          {
            id: 'u5_r2_q5',
            orderLabel: '(5)',
            type: 'fill',
            prompt:
              'Last but not least, thank the customers for their _____.',
            acceptedAnswers: ['constructive criticism'],
            displayAnswer: 'constructive criticism',
            wordLimitNote: '<= 2 words',
            explanationVi: 'Mục Thank the Customer: "thank them for the constructive criticism".'
          }
        ]
      }
    ]
  },

  {
    unit: 6,
    title: 'Reading: Interpreting Chart & Trend Reports',
    subtitleVi: '3 bài đọc phân tích số liệu viễn thông, thị trường game và tỷ lệ sử dụng Internet',
    tasks: [
      {
        id: 'u6_reading_phones',
        unit: 6,
        taskCode: "Practice 1 • Student's Handout p. 83",
        title: 'US Spending on Mobile vs. Landline Phones (2001–2010)',
        subtitleVi: '4 câu True/False đọc hiểu báo cáo biểu đồ đường',
        instructionEn:
          'Read the passage and decide if the following sentences are True (T) or False (F).',
        instructionVi:
          'Đọc đoạn báo cáo xu hướng chi tiêu điện thoại tại Mỹ (2001–2010) và chọn True (T) hoặc False (F).',
        passageTitle: 'Average Yearly Spending on Phone Services (2001–2010)',
        paragraphs: [
          {
            text: 'The line graph compares average yearly spending by Americans on mobile and landline phone services from 2001 to 2010.'
          },
          {
            text: 'It is clear that spending on landline phones fell steadily over the 10-year period, while mobile phone expenditure rose quickly. The year 2006 marks the point at which expenditure on mobile services overtook that for residential phone services.'
          },
          {
            text: 'In 2001, US consumers spent an average of nearly $700 on residential phone services, compared to only around $200 on cell phone services. Over the following five years, average yearly spending on landlines dropped by nearly $200. By contrast, expenditure on mobiles rose by approximately $300.'
          },
          {
            text: 'In the year 2006, the average American paid out the same amount of money on both types of phone service, spending just over $500 on each. By 2010, expenditure on mobile phones had reached around $750, while the figure for spending on residential services had fallen to just over half this amount.'
          }
        ],
        questions: [
          {
            id: 'u6_r1_q1',
            orderLabel: '1',
            type: 'tf',
            prompt:
              "The graph illustrates Americans' average spending on cell phone and landline phone services every year from 2001 to 2010.",
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi: 'Đoạn 1: "compares average yearly spending by Americans on mobile and landline phone services from 2001 to 2010".'
          },
          {
            id: 'u6_r1_q2',
            orderLabel: '2',
            type: 'tf',
            prompt: 'There was a downward trend in the spending on cell phone service.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi: 'Chi tiêu điện thoại di động tăng nhanh ("mobile phone expenditure rose quickly"), không phải xu hướng giảm.'
          },
          {
            id: 'u6_r1_q3',
            orderLabel: '3',
            type: 'tf',
            prompt:
              'From 2006, the spending of cell phone service was higher than that of residential phone service.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi: 'Đoạn 2: "The year 2006 marks the point at which expenditure on mobile services overtook that for residential phone services."'
          },
          {
            id: 'u6_r1_q4',
            orderLabel: '4',
            type: 'tf',
            prompt: 'The spending for landline phone service in 2010 was about 750 dollars.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi:
              '750 đô là chi tiêu điện thoại di động năm 2010; điện thoại cố định (landline) giảm xuống chỉ hơn một nửa con số này (~$375).'
          }
        ]
      },
      {
        id: 'u6_reading_games',
        unit: 6,
        taskCode: "Practice 2 • Student's Handout p. 84",
        title: 'Global Video Game Sales by Platform (2000–2006)',
        subtitleVi: '4 câu trả lời ngắn (tối đa 2 từ và 1 số)',
        instructionEn:
          'Read the passage and answer the following questions. Write NO MORE THAN TWO WORDS AND A NUMBER.',
        instructionVi:
          'Đọc đoạn phân tích biểu đồ cột doanh số trò chơi điện tử và điền KHÔNG QUÁ HAI TỪ VÀ MỘT CON SỐ.',
        passageTitle: 'Video Game Sales Turnover (2000–2006)',
        paragraphs: [
          {
            text: 'The bar chart compares the turnover in dollars from sales of video games for four different platforms, namely mobile phones, online, consoles and handheld devices, from 2000 to 2006.'
          },
          {
            text: 'It is clear that sales of games for three out of the four platforms rose each year, leading to a significant rise in total global turnover over the 7-year period. Sales figures for handheld games were at least twice as high as those for any other platform in almost every year.'
          },
          {
            text: 'In 2000, worldwide sales of handheld games stood at around $11 billion, while console games earned just under $6 billion. No figures are given for mobile or online games in that year. Over the next 3 years, sales of handheld video games rose by about $4 billion, but the figure for consoles decreased by $2 billion. Mobile phone and online games started to become popular, with sales reaching around $3 billion in 2003.'
          },
          {
            text: 'In 2006, sales of handheld, online and mobile games reached peaks of 17, 9 and 7 billion dollars respectively. By contrast, turnover from console games dropped to its lowest point, at around $2.5 billion.'
          }
        ],
        questions: [
          {
            id: 'u6_r2_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'How many types of game platforms are mentioned in the text?',
            acceptedAnswers: ['4', 'four', 'four platforms'],
            displayAnswer: '4',
            wordLimitNote: '<= 2 words & number',
            explanationVi: 'Đoạn 1: "four different platforms, namely mobile phones, online, consoles and handheld devices".'
          },
          {
            id: 'u6_r2_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'Which games platform has the highest sales?',
            acceptedAnswers: ['handheld devices', 'handheld games', 'handheld'],
            displayAnswer: 'handheld devices',
            wordLimitNote: '<= 2 words & number',
            explanationVi: 'Doanh số handheld games cao gấp ít nhất 2 lần các nền tảng khác qua hầu hết các năm.'
          },
          {
            id: 'u6_r2_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: "How much can handheld games earn when it's at the highest sales?",
            acceptedAnswers: ['17 billion dollars', '$17 billion', '17 billion'],
            displayAnswer: '17 billion dollars',
            wordLimitNote: '<= 2 words & number',
            explanationVi: 'Đoạn 4: "handheld... reached peaks of 17... billion dollars".'
          },
          {
            id: 'u6_r2_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'Which game platform has a downward trend in sales?',
            acceptedAnswers: ['consoles', 'console games', 'console'],
            displayAnswer: 'consoles',
            wordLimitNote: '<= 2 words & number',
            explanationVi: 'Doanh số console giảm 2 tỷ năm 2003 và xuống đáy 2.5 tỷ năm 2006.'
          }
        ]
      },
      {
        id: 'u6_reading_internet',
        unit: 6,
        taskCode: "Practice 3 • Student's Handout pp. 84–85",
        title: 'Internet Usage in Three Countries (1999–2009)',
        subtitleVi: '4 câu True/False đọc hiểu xu hướng 3 đường so sánh',
        instructionEn:
          'Read the passage and decide if the following sentences are True (T) or False (F).',
        instructionVi:
          'Đọc đoạn so sánh tỷ lệ người dùng Internet tại Mỹ, Canada và Mexico và chọn True (T) hoặc False (F).',
        passageTitle: 'Internet Users Comparison (1999–2009)',
        paragraphs: [
          {
            text: 'The line graph compares the percentage of people in three countries who used the Internet between 1999 and 2009.'
          },
          {
            text: 'It is clear that the proportion of the population who used the Internet increased in each country over the period shown. Overall, a much larger percentage of Canadians and Americans had access to the Internet in comparison with Mexicans, and Canada experienced the fastest growth in internet usage.'
          },
          {
            text: 'In 1999, the proportion of people using the Internet in the USA was about 20%. The figures for Canada and Mexico were lower, at about 10% and 5% respectively. In 2005, internet usage in both the USA and Canada rose to around 70% of the population, while the figure for Mexico reached just over 25%.'
          },
          {
            text: 'By 2009, the percentage of internet users was highest in Canada. Almost 100% of Canadians used the internet, compared to about 80% of Americans and only 40% of Mexicans.'
          }
        ],
        questions: [
          {
            id: 'u6_r3_q1',
            orderLabel: '1',
            type: 'tf',
            prompt: 'The number of Internet users in three countries rose throughout the period.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi: 'Đoạn 2: "increased in each country over the period shown".'
          },
          {
            id: 'u6_r3_q2',
            orderLabel: '2',
            type: 'tf',
            prompt: 'Canada has the smallest amount of Internet users throughout the period.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi: 'Mexico mới là quốc gia có tỷ lệ người dùng Internet thấp nhất xuyên suốt giai đoạn.'
          },
          {
            id: 'u6_r3_q3',
            orderLabel: '3',
            type: 'tf',
            prompt: 'USA has the largest amount of Internet users in 2009.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['False (F)', 'False', 'F'],
            displayAnswer: 'False (F)',
            explanationVi: 'Đoạn 4: Năm 2009, Canada cao nhất (~100%), còn Mỹ khoảng 80%.'
          },
          {
            id: 'u6_r3_q4',
            orderLabel: '4',
            type: 'tf',
            prompt: 'The percentage of Internet users in Mexico in 1999 is 5 percent.',
            options: ['True (T)', 'False (F)'],
            acceptedAnswers: ['True (T)', 'True', 'T'],
            displayAnswer: 'True (T)',
            explanationVi: 'Đoạn 3: "The figures for Canada and Mexico were lower, at about 10% and 5% respectively."'
          }
        ]
      }
    ]
  },

  {
    unit: 7,
    title: 'Reading: Resumes & Skills Engineering Employers Seek',
    subtitleVi: 'Cách viết CV xin việc chuẩn kỹ sư và 5 nhóm kỹ năng nhà tuyển dụng tìm kiếm',
    tasks: [
      {
        id: 'u7_reading_resume',
        unit: 7,
        taskCode: "Practice 1 • Teacher's Handout pp. 98–99",
        title: 'Getting the Job You Deserve',
        subtitleVi: '4 câu Trắc nghiệm về cách trình bày hồ sơ (Resume / CV)',
        instructionEn: 'Read the text and choose the best answer.',
        instructionVi: 'Đọc đoạn hướng dẫn viết hồ sơ xin việc và chọn đáp án đúng nhất.',
        passageTitle: 'Getting the Job You Deserve',
        paragraphs: [
          {
            text: "Many of us wish we were in a better-paid or more interesting job but don't know how to start looking for something else. If this describes you, the first thing you need to do is update your resume. A resume is a tool that can be used to obtain a job interview. Along with a cover letter, it is the first impression a prospective employee makes on a potential employer. Therefore, it is important that a resume provide as much relevant information as possible while remaining brief."
          },
          {
            text: 'When it comes to length, a resume should be no more than two sides of A4 paper. Make it any longer and it won’t get read. A resume must be neatly typed, with at least 3/4 inch margins on all four sides. Use underlining, capital letters, and asterisks to highlight important information. A resume should be single-spaced with an extra line of space between blocks of information.'
          },
          {
            text: 'Begin a resume with your name, address, and home and business telephone numbers. Do not include age, marital status, or other personal facts. Next, many resumes list a career goal, followed by a chronological outline of work experience, starting with the most recent job and working backward including a brief description of relevant duties and skills. Finally, include an outline of your educational background from the most recent, backward. Include dates, schools, and diplomas awarded. Before you send it, make sure you check your spelling and grammar, or get someone else to go over it if you can.'
          }
        ],
        questions: [
          {
            id: 'u7_r1_q1',
            orderLabel: '1',
            type: 'mcq',
            prompt: 'What is the best title for this passage?',
            options: [
              'How to get a job',
              'How to prepare a resume',
              'How to find your goal in life',
              'How to write a cover letter'
            ],
            acceptedAnswers: ['How to prepare a resume', 'B'],
            displayAnswer: 'How to prepare a resume',
            explanationVi:
              'Toàn bộ bài viết hướng dẫn bố cục, độ dài, cách trình bày và nội dung cần có của một bản Resume.'
          },
          {
            id: 'u7_r1_q2',
            orderLabel: '2',
            type: 'mcq',
            prompt: 'What is the function of a resume?',
            options: [
              'To describe your employment and educational background in extensive detail',
              'To provide an impressive example of your writing and typing skills',
              'To act as a tool for getting a job interview',
              'To give an employer a good first impression of you'
            ],
            acceptedAnswers: ['To act as a tool for getting a job interview', 'C'],
            displayAnswer: 'To act as a tool for getting a job interview',
            explanationVi: 'Đoạn 1: "A resume is a tool that can be used to obtain a job interview."'
          },
          {
            id: 'u7_r1_q3',
            orderLabel: '3',
            type: 'mcq',
            prompt: 'On a resume, which job should be listed first?',
            options: [
              'Your most recent job',
              'Your most relevant job',
              'Your first job',
              'Your most important job'
            ],
            acceptedAnswers: ['Your most recent job', 'A'],
            displayAnswer: 'Your most recent job',
            explanationVi: 'Đoạn 3: "starting with the most recent job and working backward".'
          },
          {
            id: 'u7_r1_q4',
            orderLabel: '4',
            type: 'mcq',
            prompt: 'Which of the following should NOT be on your resume?',
            options: [
              'Your name, telephone, and fax number',
              "The year you received your bachelor's degree",
              'Your personality and the fact that you are single',
              'A description of the tasks you did in your last job'
            ],
            acceptedAnswers: ['Your personality and the fact that you are single', 'C'],
            displayAnswer: 'Your personality and the fact that you are single',
            explanationVi: 'Đoạn 3: "Do not include age, marital status, or other personal facts."'
          }
        ]
      },
      {
        id: 'u7_reading_skills',
        unit: 7,
        taskCode: "Practice 2 • Teacher's Handout pp. 100–101",
        title: 'What Skills Are Engineering Employers Looking For?',
        subtitleVi: '5 câu điền chính xác HAI TỪ (ONLY TWO WORDS)',
        instructionEn:
          'Read the passage and fill in the blank in each sentence with ONLY TWO WORDS.',
        instructionVi:
          'Đọc bài viết về kỹ năng tuyển dụng kỹ sư và điền CHÍNH XÁC HAI TỪ từ bài đọc vào mỗi chỗ trống.',
        passageTitle: 'What Skills Are Engineering Employers Looking For?',
        paragraphs: [
          {
            text: "With around 1 in 10 university graduates embarking upon a career in engineering each year, it's important that you are aware of the necessary skills and qualities that engineering employers are looking for to give yourself a competitive advantage over the other candidates."
          },
          {
            text: 'One of the beauties of working in this industry is that there are a wide range of jobs available to suit all types of personalities and levels of expertise. Some positions demand a high level of academic achievement, some relying more on technical expertise. Incorporated engineers and engineering technicians need to have a high level of attention to detail, reasoning ability, the skills and knowhow to make things happen and strength of character to manage others. On the other hand craft workers and operators will need basic mathematical ability, resilience, patience and of course, manual skills.'
          },
          {
            text: "Regardless of the role in which you will be working, there are a common set of intangible skills that employers look for across all engineering disciplines:\n• Effective communication skills - with an increase in the documentation and instructions that engineers use in the workplace, clear and concise communication is a requirement.\n• Interpersonal skills - you need to know how to effectively work as part of a team and work with customers to identify needs and provide solutions.\n• Technical knowledge - whatever technical expertise is vital to your job, you need to understand how to apply this to solving practical problems.\n• Organizational skills - being able to prioritize tasks, manage your time effectively and resource planning are key skills for engineers.\n• Enthusiasm and commitment - learning new skills is part of every engineer's role, so you need to be adept at assimilating a lot of new information."
          },
          {
            text: 'More importantly, employers are looking for evidence that you are well rounded, take an active interest in and have an understanding of the engineering industry. Furthermore, that you have the motivation, drive and ambition to make an impact within their company.'
          }
        ],
        questions: [
          {
            id: 'u7_r2_q1',
            orderLabel: '1',
            type: 'fill',
            prompt:
              'Graduates who are looking for a job can gain _____ once they understand necessary skills and qualities for the targeted position.',
            acceptedAnswers: ['competitive advantage', 'a competitive advantage'],
            displayAnswer: 'competitive advantage',
            wordLimitNote: 'ONLY 2 WORDS',
            explanationVi: 'Đoạn 1: "give yourself a competitive advantage over the other candidates".'
          },
          {
            id: 'u7_r2_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'Working in engineering industry allows employees to choose the most suitable position which may require high level of academic achievement or _____.',
            acceptedAnswers: ['technical expertise'],
            displayAnswer: 'technical expertise',
            wordLimitNote: 'ONLY 2 WORDS',
            explanationVi: 'Đoạn 2: "high level of academic achievement, some relying more on technical expertise".'
          },
          {
            id: 'u7_r2_q3',
            orderLabel: '3',
            type: 'fill',
            prompt:
              'Some qualities required for an operator are manual skills, patience, resilience and _____.',
            acceptedAnswers: ['mathematical ability'],
            displayAnswer: 'mathematical ability',
            wordLimitNote: 'ONLY 2 WORDS',
            explanationVi: 'Đoạn 2: "operators will need basic mathematical ability, resilience, patience and... manual skills".'
          },
          {
            id: 'u7_r2_q4',
            orderLabel: '4',
            type: 'fill',
            prompt:
              'All engineers must have a set of skills including enthusiasm and commitment, organizational skills, technical knowledge, interpersonal skills and _____.',
            acceptedAnswers: ['communication skills', 'effective communication'],
            displayAnswer: 'communication skills',
            wordLimitNote: 'ONLY 2 WORDS',
            explanationVi: 'Nhóm kỹ năng còn lại trong 5 gạch đầu dòng là "Effective communication skills" (2 từ: communication skills).'
          },
          {
            id: 'u7_r2_q5',
            orderLabel: '5',
            type: 'fill',
            prompt:
              'Employers also seek employees who are motivated to make _____ to better the company.',
            acceptedAnswers: ['an impact'],
            displayAnswer: 'an impact',
            wordLimitNote: 'ONLY 2 WORDS',
            explanationVi: 'Đoạn cuối: "have the motivation, drive and ambition to make an impact within their company".'
          }
        ]
      }
    ]
  },

  {
    unit: 8,
    title: 'Reading: Effective Meetings, Video Conferencing & Minutes',
    subtitleVi: 'Họp đa văn hoá, họp trực tuyến và đọc hiểu biên bản cuộc họp Delta Electronics',
    tasks: [
      {
        id: 'u8_reading_multicultural',
        unit: 8,
        taskCode: "Practice 1 • Teacher's Handout pp. 115–116",
        title: 'Effective Multi-Cultural Meetings',
        subtitleVi: '4 câu Trắc nghiệm về giao tiếp trong cuộc họp quốc tế',
        instructionEn: 'Read the passage and choose the best answer for each question.',
        instructionVi:
          'Đọc bài viết về kỹ năng điều hành cuộc họp đa văn hoá và chọn đáp án đúng.',
        passageTitle: 'Effective Multi-Cultural Meetings',
        paragraphs: [
          {
            text: 'Culture influences what we do, say, think and believe. Culture is different in different countries and contexts. In the context of international business it affects how people approach, perceive and contribute towards meetings. A few examples include:'
          },
          {
            heading: 'Time',
            text: 'Not all cultures live by the clock. Time orientated cultures such as the British or Germans will have strict approaches to how meetings run. The start time, finishing time and all the different stages in between will be planned carefully. However, some Asian cultures will see the start time as an approximation, the finish time as non-fixed and all the different stages in between as flexible.'
          },
          {
            heading: 'The Purpose of Meetings',
            text: 'In the meeting room, the common term in the West is: "let\'s get down to business". Western meetings generally run to a tight schedule with an organized, pre-planned agenda. On the other hand, different cultures see the meeting as the arena for building personal relationships and strengthening bonds. Getting down to business comes further down the priority list.\nWhen chairing an international business meeting it is always advisable to bear in mind the attendees\' cultures and backgrounds. Following are some guidelines that may assist you when approaching cultural diversity in your next international business meeting.'
          },
          {
            heading: 'Group Sizes in Meetings',
            text: 'In short, small groups will work more effectively in meetings. Smaller groups offer increased security and allow for greater participation. In international business meetings, using smaller groups can be preferred.'
          },
          {
            heading: 'Multi-Cultural Meetings',
            text: 'It is vital you mix up your meeting. The additional benefit to this approach is that it allows for cross cultural interpersonal relationships to develop, strengthening staff bonds. International business meetings require great planning, organization and consideration if they are to succeed in offering effective outcomes. The above mentioned tips are merely basic pointers that will hopefully help you start to think about how culture impacts international meetings.'
          }
        ],
        questions: [
          {
            id: 'u8_r1_q1',
            orderLabel: '1',
            type: 'mcq',
            prompt:
              'According to the passage, in which cultures should the meeting stages be implemented as planned?',
            options: [
              'British and German cultures',
              'All cultures',
              'Asian cultures',
              'Only British culture'
            ],
            acceptedAnswers: ['British and German cultures', 'British and Germans cultures', 'A'],
            displayAnswer: 'British and German cultures',
            explanationVi: 'Mục Time: "Time orientated cultures such as the British or Germans will have strict approaches to how meetings run."'
          },
          {
            id: 'u8_r1_q2',
            orderLabel: '2',
            type: 'mcq',
            prompt: 'What should be paid attention when a multinational meeting is called?',
            options: [
              "attendees' cultures",
              "attendees' backgrounds",
              "attendees' cultures and backgrounds",
              "attendees' relationships"
            ],
            acceptedAnswers: ["attendees' cultures and backgrounds", 'C'],
            displayAnswer: "attendees' cultures and backgrounds",
            explanationVi:
              'Đoạn 3: "it is always advisable to bear in mind the attendees\' cultures and backgrounds."'
          },
          {
            id: 'u8_r1_q3',
            orderLabel: '3',
            type: 'mcq',
            prompt: 'Which approach is believed to build up the relationships among attendees?',
            options: [
              'additional benefit approach',
              'vital approach',
              'small group approach',
              'Multi-Cultural approach'
            ],
            acceptedAnswers: ['Multi-Cultural approach', 'D'],
            displayAnswer: 'Multi-Cultural approach',
            explanationVi:
              'Mục Multi-Cultural Meetings nêu rõ: "allows for cross cultural interpersonal relationships to develop, strengthening staff bonds".'
          },
          {
            id: 'u8_r1_q4',
            orderLabel: '4',
            type: 'mcq',
            prompt: 'What is the main topic of the passage?',
            options: [
              'how to minimize the negative effects of cultural differences in meetings',
              'how to maximize the negative effects of cultural differences in meetings',
              'how to minimize the positive effects of cultural differences in meetings',
              'how to maximize the positive effects of cultural differences in meetings'
            ],
            acceptedAnswers: [
              'how to minimize the negative effects of cultural differences in meetings',
              'A'
            ],
            displayAnswer: 'how to minimize the negative effects of cultural differences in meetings',
            explanationVi:
              'Bài viết đưa ra chỉ dẫn giúp người chủ trì lưu ý sự khác biệt văn hoá để giảm trở ngại và họp quốc tế hiệu quả.'
          }
        ]
      },
      {
        id: 'u8_reading_video',
        unit: 8,
        taskCode: "Practice 1 • Student's Handout pp. 115–116",
        title: 'Digital Meetings: The Growth in Video Conferencing',
        subtitleVi: '5 câu trả lời ngắn (KHÔNG QUÁ MỘT TỪ HOẶC MỘT SỐ)',
        instructionEn:
          'Read the article and answer the questions with NO MORE THAN ONE WORD AND/OR A NUMBER.',
        instructionVi:
          'Đọc bài báo về hội nghị truyền hình trực tuyến và trả lời với CHỈ TỐI ĐA MỘT TỪ VÀ/HOẶC MỘT SỐ.',
        passageTitle: 'DIGITAL MEETINGS: THE GROWTH IN VIDEO CONFERENCING',
        paragraphs: [
          {
            text: 'An increasing number of companies are turning to video conferencing to bring people together for meetings. So why has there been such growth in digital meetings?'
          },
          {
            text: '“The key driver behind our use of video conferencing is cost,” says Martin Pile, Director of Corporate Communications with a multinational engineering company. “The technology means that we can save on airfares and hotel bills. Our people can meet more frequently at less cost.”'
          },
          {
            text: 'Fiona Clark, a communications consultant who advises companies about digital conferencing solutions, is also enthusiastic. But she sounds a note of caution. “Companies have to realize that the technology is not free. Video conferencing systems are getting cheaper and more reliable, but companies which want to use them still have to make some kind of investment. This can be a particular problem for small and medium-sized companies,” says Fiona.'
          },
          {
            text: '“There’s also the problem of people feeling comfortable with video conferencing, users often find the video conference environment difficult at first,” she adds. Fiona often recommends companies that adopt video conferencing to invest in training for the staff who will meet each other digitally.'
          },
          {
            text: '“People have to realize that a meeting via video conference is not the same as a face-to-face meeting. People can feel nervous and act in a different way than usual,” Fiona comments. “We provide training where we videotape users and get them to notice their nervous tics on screen... We also advise people to slow their body language. Hand and body gestures can sometimes seem more aggressive on screen.”'
          }
        ],
        questions: [
          {
            id: 'u8_r2_q1',
            orderLabel: '1',
            type: 'qa',
            prompt:
              'How many people were asked to express their opinions about the growth in digital meetings?',
            acceptedAnswers: ['2', 'two'],
            displayAnswer: '2',
            wordLimitNote: '<= 1 word/number',
            explanationVi: 'Có 2 nhân vật được phỏng vấn: Martin Pile và Fiona Clark.'
          },
          {
            id: 'u8_r2_q2',
            orderLabel: '2',
            type: 'qa',
            prompt:
              'According to Martin Pile, what can be saved on beside hotel bills when video conference is adopted?',
            acceptedAnswers: ['airfares'],
            displayAnswer: 'airfares',
            wordLimitNote: '<= 1 word/number',
            explanationVi: 'Đoạn 2: "save on airfares and hotel bills".'
          },
          {
            id: 'u8_r2_q3',
            orderLabel: '3',
            type: 'qa',
            prompt:
              'What problem do small and medium-sized companies have to face when they want to use digital conferencing?',
            acceptedAnswers: ['investment', 'cost'],
            displayAnswer: 'investment',
            wordLimitNote: '<= 1 word/number',
            explanationVi: 'Đoạn 3: "still have to make some kind of investment. This can be a particular problem for small and medium-sized companies".'
          },
          {
            id: 'u8_r2_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'What does Fiona suggest participants do with their gestures?',
            acceptedAnswers: ['slow'],
            displayAnswer: 'slow',
            wordLimitNote: '<= 1 word/number',
            explanationVi: 'Đoạn 5: "We also advise people to slow their body language."'
          },
          {
            id: 'u8_r2_q5',
            orderLabel: '5',
            type: 'qa',
            prompt:
              'What, according to Fiona, can be provided in order to overcome the very first difficulties of video conference environment?',
            acceptedAnswers: ['training'],
            displayAnswer: 'training',
            wordLimitNote: '<= 1 word/number',
            explanationVi: 'Đoạn 4–5: khuyến khích đầu tư vào đào tạo ("invest in training" / "provide training").'
          }
        ]
      },
      {
        id: 'u8_reading_minutes',
        unit: 8,
        taskCode: "Practice 2 • Student's Handout pp. 116–118",
        title: 'Delta Electronics, Inc. — Minutes of 2017 Annual Meeting',
        subtitleVi: '6 câu đọc hiểu Biên bản cuộc họp (tối đa 3 từ)',
        instructionEn:
          'Read the minutes of meeting and answer the following questions WITH NO MORE THAN THREE WORDS.',
        instructionVi:
          'Đọc biên bản cuộc họp thường niên của Delta Electronics và trả lời với KHÔNG QUÁ BA TỪ.',
        passageTitle: 'Delta Electronics, Inc. — Minutes of 2017 Annual Meeting',
        paragraphs: [
          {
            text: 'Date: June 10, 2017   |   Time: 11:00 am   |   Venue: Meeting room 23\nObjectives: to discuss cost-cutting measures\nChairman: Johnson Lee   |   Minute taker: Nick Jackson'
          },
          {
            heading: 'Members present & Action items',
            text: 'Members present: Johnson Lee (Chair), Yancey Hai, Mark Ko, Ping Chen, Sarah Watt, Bruce Cheng, Luke Gump, John Smith.\nAction items:\n• High-priority Budget Items\n• Re-investment in mobile technology'
          },
          {
            heading: 'Schedule & Presenters',
            text: '• 11:00 – 11:15: Check-in, general updates (Mark Ko)\n• 11:15 – 11:45: Script Review, New changes (Ping Chen)\n• 11:45 – 1:00: Fundraising Updates (Sarah Watt)\n• 1:00 – 1:15: Pre-Production timeline (Luke Gump)\n• 1:15 – 1:30: Announcements (All)\nMeeting closed at 5:15 pm. | Next meeting: June 10, 2017, Conference room B.'
          }
        ],
        questions: [
          {
            id: 'u8_r3_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'Where did they hold the meeting?',
            acceptedAnswers: ['Meeting room 23'],
            displayAnswer: 'Meeting room 23',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Venue trong biên bản: "Meeting room 23".'
          },
          {
            id: 'u8_r3_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What was the topic of the meeting?',
            acceptedAnswers: ['cost-cutting measures', 'to discuss cost-cutting'],
            displayAnswer: 'cost-cutting measures',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Objectives: "to discuss cost-cutting measures".'
          },
          {
            id: 'u8_r3_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'Who took the minutes?',
            acceptedAnswers: ['Nick Jackson'],
            displayAnswer: 'Nick Jackson',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Mục Minute taker: "Nick Jackson".'
          },
          {
            id: 'u8_r3_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'Who was the first presenter in the meeting?',
            acceptedAnswers: ['Mark Ko'],
            displayAnswer: 'Mark Ko',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Khung 11:00 – 11:15 đầu tiên: Mark Ko.'
          },
          {
            id: 'u8_r3_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'What time did Sarah Watt start her presentation?',
            acceptedAnswers: ['11:45 am', '11:45', 'at 11:45 am', 'at 11:45'],
            displayAnswer: '11:45 am',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Phần Fundraising Updates của Sarah Watt bắt đầu lúc 11:45.'
          },
          {
            id: 'u8_r3_q6',
            orderLabel: '6',
            type: 'qa',
            prompt: 'What were the last actions as scheduled?',
            acceptedAnswers: ['Announcements'],
            displayAnswer: 'Announcements',
            wordLimitNote: '<= 3 words',
            explanationVi: 'Khung giờ cuối 1:15 – 1:30 trong lịch trình: "Announcements".'
          }
        ]
      }
    ]
  }
];

export const READING_BY_UNIT: Record<number, UnitReadingModule> = Object.fromEntries(
  ALL_READING_MODULES.map((m) => [m.unit, m])
);

export function getUnitReading(unit: number): UnitReadingModule | undefined {
  return READING_BY_UNIT[unit];
}

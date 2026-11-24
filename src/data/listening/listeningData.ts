import type { UnitListeningModule } from '../../types/curriculum';

export const ALL_LISTENING_MODULES: UnitListeningModule[] = [
  {
    unit: 1,
    title: 'Listening: Company Profile — Contrinex',
    subtitleVi: 'Nghe bài giới thiệu công ty Contrinex (Thụy Sĩ) và hoàn thành bảng thông tin',
    tasks: [
      {
        id: 'u1_listening_practice2',
        unit: 1,
        taskCode: 'Unit 1 - Lesson 1 (Practice 2)',
        title: 'Contrinex Company Overview',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 5) • Điền bảng thông tin (tối đa 2 từ/số)',
        instructionEn:
          'Listen to a talk about Contrinex company and complete the table with NO MORE THAN TWO WORDS AND/OR A NUMBER.',
        instructionVi:
          'Nghe đoạn giới thiệu công ty Contrinex và điền KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT CON SỐ vào các chỗ trống (1)–(8).',
        audioType: 'mp3',
        audioSrc: '/audio/u1_listening_2.mp3',
        transcript: [
          {
            speaker: 'Narrator',
            line: 'Contrinex, whose corporate headquarters are in Givisiez near Fribourg, Switzerland, was founded in 1972 by the engineer Peter Heimlicher. From a one-man operation, this active entrepreneur and pioneer has built a business with more than 500 employees.'
          },
          {
            speaker: 'Narrator',
            line: 'Today, Contrinex is the world market leader in miniature sensor technology. Important customer sectors include the engineering industry, automotive manufacturing, robotics and aviation. Due to their excellent reliability, Contrinex sensors are also to be found in many wind power installations.'
          },
          {
            speaker: 'Narrator',
            line: 'The company is a leading manufacturer of inductive and photoelectric sensors, as well as safety and RFID systems. Sensors from the Swiss high-tech company are used in rough, hot, or cold environments, and wherever space is tight and pressure is high.'
          },
          {
            speaker: 'Narrator',
            line: 'The trend towards a networked, constantly communicating world was recognized early by Peter Heimlicher with the development of intelligent sensors. The company now operates production facilities in Switzerland, Hungary, China and Brazil and sells its products in over 60 countries. Exports account for about 97%.'
          },
          {
            speaker: 'Narrator',
            line: 'In autumn 2012, Annette Heimlicher, the daughter of the founder, took over operational responsibility as CEO and set ambitious goals for the future. Contrinex ensures its long-term success by consistent orientation towards future markets, new innovative products and a focused export strategy.'
          }
        ],
        questions: [
          {
            id: 'u1_q1',
            orderLabel: '(1)',
            type: 'fill',
            prompt: 'Founded year: _____',
            acceptedAnswers: ['1972'],
            displayAnswer: '1972',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Nghe năm thành lập công ty bởi kỹ sư Peter Heimlicher.'
          },
          {
            id: 'u1_q2',
            orderLabel: '(2)',
            type: 'fill',
            prompt: 'Number of employees: more than _____',
            acceptedAnswers: ['500', '500 employees'],
            displayAnswer: '500',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Nghe cụm "more than ... employees".'
          },
          {
            id: 'u1_q3',
            orderLabel: '(3)',
            type: 'fill',
            prompt: 'Reputation: The world market leader in miniature _____',
            acceptedAnswers: ['sensor technology'],
            displayAnswer: 'sensor technology',
            wordLimitNote: '<= 2 words/number',
            hintVi: '2 danh từ ghép sau từ "miniature".'
          },
          {
            id: 'u1_q4',
            orderLabel: '(4)',
            type: 'fill',
            prompt:
              'Customer sectors: Engineering industry, Automotive manufactory, _____, Aviation',
            acceptedAnswers: ['robotics'],
            displayAnswer: 'robotics',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Lĩnh vực đứng giữa automotive manufacturing và aviation.'
          },
          {
            id: 'u1_q5',
            orderLabel: '(5)',
            type: 'fill',
            prompt:
              'Major products: Inductive sensors, Photo _____, Safety systems, RFID systems',
            acceptedAnswers: ['electric sensors', 'photoelectric sensors'],
            displayAnswer: 'electric sensors',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Bảng đã in sẵn chữ "Photo", hãy điền 2 từ tiếp theo.'
          },
          {
            id: 'u1_q6',
            orderLabel: '(6)',
            type: 'fill',
            prompt: 'Operating countries: Switzerland, Hungary, _____, Brazil',
            acceptedAnswers: ['China'],
            displayAnswer: 'China',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Quốc gia châu Á thứ ba trong danh sách nhà máy.'
          },
          {
            id: 'u1_q7',
            orderLabel: '(7)',
            type: 'fill',
            prompt: 'Exports percentage: _____',
            acceptedAnswers: ['97%', '97', '97 percent', 'about 97%', 'about 97 percent'],
            displayAnswer: '97%',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Tỷ lệ phần trăm xuất khẩu.'
          },
          {
            id: 'u1_q8',
            orderLabel: '(8)',
            type: 'fill',
            prompt: 'Oriented goals: Future markets, New _____, A focused export strategy',
            acceptedAnswers: ['innovative products'],
            displayAnswer: 'innovative products',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Cụm danh từ 2 chữ đứng sau "New".'
          }
        ]
      }
    ]
  },

  {
    unit: 2,
    title: 'Listening: Smart Home Systems & Smart Speakers',
    subtitleVi: '2 bài nghe gốc về hệ thống nhà thông minh Life Smart và loa thông minh Apple HomePod',
    tasks: [
      {
        id: 'u2_listening_practice2',
        unit: 2,
        taskCode: 'Unit 2 (Practice 2)',
        title: 'Life Smart — Smart Home System',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 6) • Điền chỗ trống (tối đa 2 từ/số)',
        instructionEn:
          'Listen to a talk about Life Smart - a smart home system and complete these sentences with NO MORE THAN TWO WORDS AND/OR A NUMBER.',
        instructionVi:
          'Nghe đoạn giới thiệu hệ thống Life Smart và hoàn thành câu với KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT CON SỐ.',
        audioType: 'mp3',
        audioSrc: '/audio/u2_practice_2.mp3',
        transcript: [
          {
            speaker: 'Narrator',
            line: 'Life Smart provides you and your family with a safe, comfortable, and colorful home environment. Simply connect any of your existing electronic devices with the easy to set up Life Smart station, and take control of your surroundings with the Life Smart app.'
          },
          {
            speaker: 'Narrator',
            line: 'Every electric device is now available at your fingertips, bringing you peace of mind and a comfortable lifestyle. Life Smart open-close and motion sensors are ideal for home security. They can notify you if a door or window is accessed, or if something is moving in your home. Life Smart will then send you an alert, wherever you are.'
          },
          {
            speaker: 'Narrator',
            line: "Life Smart is also your personal home assistant. Environmental sensors will detect changes in light, temperature, and humidity, and automatically activate appliances to improve your home's ambiance."
          },
          {
            speaker: 'Narrator',
            line: 'Distance is never an issue with Life Smart, which features a range of over 5,000 feet square. From anywhere in your home, Life Smart devices only need one station to run sensors, cameras, and outlets.'
          }
        ],
        questions: [
          {
            id: 'u2_p2_q1',
            orderLabel: '1',
            type: 'fill',
            prompt:
              'By connecting your _____ with the Life Smart station, you can use the app to control your surroundings.',
            acceptedAnswers: ['electronic devices', 'existing electronic devices'],
            displayAnswer: 'electronic devices',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Nghe cụm "connect any of your existing ...".'
          },
          {
            id: 'u2_p2_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'Home security becomes much easier thanks to Life Smart open-closed and _____.',
            acceptedAnswers: ['motion sensors'],
            displayAnswer: 'motion sensors',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Loại cảm biến đi kèm với "open-close".'
          },
          {
            id: 'u2_p2_q3',
            orderLabel: '3',
            type: 'fill',
            prompt:
              'In case there is something moving in your house, Life Smart will send you _____.',
            acceptedAnswers: ['an alert', 'alert'],
            displayAnswer: 'an alert',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Trong đề PDF ghi nhầm "send and ___ you", file nghe chuẩn đọc là "send you an alert".'
          },
          {
            id: 'u2_p2_q4a',
            orderLabel: '4a',
            type: 'fill',
            prompt:
              'The function of environmental sensor is to _____ changes in light, temperature and humidity...',
            acceptedAnswers: ['detect'],
            displayAnswer: 'detect',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Động từ nghĩa là "phát hiện" (1 từ).'
          },
          {
            id: 'u2_p2_q4b',
            orderLabel: '4b',
            type: 'fill',
            prompt: '...and _____ appliances automatically.',
            acceptedAnswers: ['activate'],
            displayAnswer: 'activate',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Động từ nghĩa là "kích hoạt" (1 từ).'
          },
          {
            id: 'u2_p2_q5',
            orderLabel: '5',
            type: 'fill',
            prompt: 'Life Smart can operate within the distance of _____ square.',
            acceptedAnswers: ['5,000 feet', '5000 feet', 'over 5,000 feet', '5,000 ft', '5000 ft'],
            displayAnswer: '5,000 feet',
            wordLimitNote: '<= 2 words/number',
            hintVi: 'Phạm vi phủ sóng tính bằng feet vuông.'
          }
        ]
      },
      {
        id: 'u2_listening_practice3',
        unit: 2,
        taskCode: 'Unit 2 (Practice 3)',
        title: 'Apple HomePod Review',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 6) • Trả lời ngắn (tối đa 3 từ/số)',
        instructionEn:
          'Listen to a talk about Apple Home Pods and answer the questions with NO MORE THAN THREE WORDS AND/OR A NUMBER.',
        instructionVi:
          'Nghe đoạn nói về loa Apple HomePod và trả lời câu hỏi với KHÔNG QUÁ BA TỪ VÀ/HOẶC MỘT CON SỐ.',
        audioType: 'mp3',
        audioSrc: '/audio/u2_practice_3.mp3',
        transcript: [
          {
            speaker: 'Reporter',
            line: 'Apple HomePods are landing in December. Apple unveiled a 7-inch-tall smart speaker that uses Siri. It comes in black and white and costs more than twice as much as the competition. One Apple HomePod will set you back 350 dollars, but Apple is saying that you are going to get better sound out of this speaker than you would from the Amazon Echo, so you can turn it up without distortion.'
          },
          {
            speaker: 'Reporter',
            line: "And this has the same chip inside as an iPhone. So that's a big brain for a speaker. It uses those smarts to adjust sound to fit to your environment. It knows if you put it against a wall, and it will direct the sound accordingly."
          },
          {
            speaker: 'Reporter',
            line: 'With Siri, you can ask it to play your music similar to your interests or ask questions about the song or artist and add a track to a playlist. It still does all those other typical assistant things, like getting news or setting reminders and controlling other compatible smart home devices. But if you are feeling creeped out by having six internet-connected microphones in your home, Apple says all Siri commands are sent anonymously with end-to-end encryption.'
          }
        ],
        questions: [
          {
            id: 'u2_p3_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'How tall is Apple Home Pod?',
            acceptedAnswers: ['7 inches', '7-inch', 'seven inches', '7 inch'],
            displayAnswer: '7 inches',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u2_p3_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'How much does it cost?',
            acceptedAnswers: ['$350', '350 dollars', '350', '350$'],
            displayAnswer: '$350',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u2_p3_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'Which component of Apple Home Pod is similar to an iPhone’s?',
            acceptedAnswers: ['chip', 'the chip', 'a chip', 'same chip'],
            displayAnswer: 'chip',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u2_p3_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'What can its smart features do to fit the environment?',
            acceptedAnswers: ['adjust sound', 'adjust the sound'],
            displayAnswer: 'adjust sound',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u2_p3_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'Which products can we control by using Siri?',
            acceptedAnswers: [
              'smart home devices',
              'compatible smart home devices',
              'other smart home devices'
            ],
            displayAnswer: 'smart home devices',
            wordLimitNote: '<= 3 words/number'
          }
        ]
      }
    ]
  },

  {
    unit: 3,
    title: 'Listening: Window Air Conditioner Installation Briefing',
    subtitleVi: 'Audio tổng hợp bám sát quy trình lắp đặt & an toàn Unit 3 (do bộ MP3 Ôn tập không có file Unit 3)',
    tasks: [
      {
        id: 'u3_listening_installation',
        unit: 3,
        taskCode: 'Unit 3 (Guided Audio)',
        title: 'Pre-installation, 6 Steps & Safety Cautions',
        subtitleVi: 'Audio tổng hợp Web Speech • Điền thông tin (tối đa 3 từ/số)',
        instructionEn:
          'Listen to the supervisor briefing a new technician on installing a window air conditioner and fill in the blanks with NO MORE THAN THREE WORDS AND/OR A NUMBER.',
        instructionVi:
          'Nghe kỹ sư hướng dẫn quy trình lắp đặt điều hòa cửa sổ và điền KHÔNG QUÁ BA TỪ VÀ/HOẶC MỘT CON SỐ vào chỗ trống.',
        audioType: 'tts',
        speechScript:
          'Today we are going to install a window air conditioner in a residential house. Before installation, you must turn off the breaker, confirm the unit is compatible with five K, six K, or ten K BTU specifications, and check the tool sizes using a drill and a level. During installation, measure and mark the centerline of the inner sill, insert the guide panels, set the unit carefully on the windowsill, and fasten the side curtains with four type A screws on each side. Remember our three strict safety cautions: you need two or more technicians for safe installation, never twist the power cords, and do not make a hole on the base pan for draining.',
        transcript: [
          {
            speaker: 'Instructor',
            line: 'Today we are going to install a window air conditioner in a residential house. Before installation, you must turn off the breaker, confirm the unit is compatible with 5K, 6K, or 10K BTU specifications, and check the tool sizes using a drill and a level.'
          },
          {
            speaker: 'Instructor',
            line: 'During installation, measure and mark the centerline of the inner sill, insert the guide panels, set the unit carefully on the windowsill, and fasten the side curtains with four type-A screws on each side.'
          },
          {
            speaker: 'Instructor',
            line: 'Remember our three strict safety cautions: you need 2 or more technicians for safe installation, never twist the power cords, and do not make a hole on the base pan for draining.'
          }
        ],
        questions: [
          {
            id: 'u3_q1',
            orderLabel: '1',
            type: 'fill',
            prompt:
              'Before installation, turn off the _____ and check compatibility with 5K–10K BTU units.',
            acceptedAnswers: ['breaker', 'circuit breaker'],
            displayAnswer: 'breaker',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u3_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'Measure and mark the centerline of the _____ before cutting the adhesive seal strip.',
            acceptedAnswers: ['inner sill'],
            displayAnswer: 'inner sill',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u3_q3',
            orderLabel: '3',
            type: 'fill',
            prompt: 'Fasten the curtains to the unit with four _____ on each side.',
            acceptedAnswers: ['type-A screws', 'type A screws', 'type a screws'],
            displayAnswer: 'type-A screws',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u3_q4',
            orderLabel: '4',
            type: 'fill',
            prompt: 'Safe installation requires _____ technicians.',
            acceptedAnswers: ['2 or more', 'two or more', '2', 'two'],
            displayAnswer: '2 or more',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u3_q5',
            orderLabel: '5',
            type: 'fill',
            prompt: 'Never twist the _____ during or after installation.',
            acceptedAnswers: ['power cords', 'cords'],
            displayAnswer: 'power cords',
            wordLimitNote: '<= 3 words/number'
          }
        ]
      }
    ]
  },

  {
    unit: 4,
    title: 'Listening: HVAC Troubleshooting & Washer Error Codes',
    subtitleVi: '2 bài nghe gốc về chẩn đoán điều hòa hai cục (Split AC) và xử lý mã lỗi 5C/5E máy giặt Samsung',
    tasks: [
      {
        id: 'u4_listening_practice1',
        unit: 4,
        taskCode: 'Unit 4 - Lesson 5 (Practice 1)',
        title: 'Split Air Conditioner Troubleshooting',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 6–7, chuyển từ U4_Practice 1.wma) • Tối đa 2 từ',
        instructionEn:
          'Listen to a conversation and complete the following sentences with NO MORE THAN 2 WORDS.',
        instructionVi:
          'Nghe hội thoại chẩn đoán sự cố điều hòa và điền KHÔNG QUÁ 2 TỪ vào mỗi chỗ trống.',
        audioType: 'mp3',
        audioSrc: '/audio/u4_practice_1.mp3',
        transcript: [
          {
            speaker: 'User',
            line: 'I need your advice on split air conditioner troubleshooting.'
          },
          {
            speaker: 'Technician',
            line: 'A split AC is just as likely as any other AC to have a refrigerant leak. As the refrigerant leaks out, it may literally freeze on the coils, bubble and pop as it tries to run with less refrigerant or run for hours to hardly make a difference.'
          },
          {
            speaker: 'Technician',
            line: 'If there is not air coming out of the interior unit, check to see if the fan on the outside is running. If neither is, check the breaker for the AC to make sure it is not tripped. If the breaker is not the problem, my next guess is the control panel or the wires between the thermostat and the air handler.'
          },
          {
            speaker: 'Technician',
            line: 'If the unit has power but is not turning on, you could check the thermostat. The thermostat itself may be broken.'
          },
          {
            speaker: 'Technician',
            line: 'If the compressor starts but the fan does not kick in, the condenser fan motor needs to be fixed if the wires are not corroded.'
          }
        ],
        questions: [
          {
            id: 'u4_p1_q1',
            orderLabel: '1',
            type: 'fill',
            prompt: 'As the refrigerant leaks out, it may freeze on the _____.',
            acceptedAnswers: ['coils', 'coil'],
            displayAnswer: 'coils',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u4_p1_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'If there’s no air getting out of the inside unit, the _____ on the outside should be checked.',
            acceptedAnswers: ['fan'],
            displayAnswer: 'fan',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u4_p1_q3',
            orderLabel: '3',
            type: 'fill',
            prompt:
              'If the breaker is not the cause, it might be the _____ or the wires.',
            acceptedAnswers: ['control panel'],
            displayAnswer: 'control panel',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u4_p1_q4',
            orderLabel: '4',
            type: 'fill',
            prompt:
              'If the unit has power but is not turning on, the _____ should be checked.',
            acceptedAnswers: ['thermostat'],
            displayAnswer: 'thermostat',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u4_p1_q5',
            orderLabel: '5',
            type: 'fill',
            prompt:
              'If the compressor starts, but the fan doesn’t kick in, the condenser fan motor needs to be _____.',
            acceptedAnswers: ['fixed'],
            displayAnswer: 'fixed',
            wordLimitNote: '<= 2 words'
          }
        ]
      },
      {
        id: 'u4_listening_practice3',
        unit: 4,
        taskCode: 'Unit 4 - Lesson 5 (Practice 3)',
        title: 'Resolving Samsung Washer Codes 5C / 5E',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 7) • Trả lời ngắn (tối đa 3 từ)',
        instructionEn:
          'Listen and answer the questions with NO MORE THAN THREE WORDS.',
        instructionVi:
          'Nghe hướng dẫn xử lý mã lỗi 5C và 5E trên máy giặt Samsung và trả lời với KHÔNG QUÁ BA TỪ.',
        audioType: 'mp3',
        audioSrc: '/audio/u4_practice_3.mp3',
        transcript: [
          {
            speaker: 'Instructor',
            line: 'Next, we will show you how to resolve 5C or 5E code. This code means that there is an issue with draining water from the washing machine.'
          },
          {
            speaker: 'Instructor',
            line: 'First check the debris filter. Before cleaning the filter, unplug the washing machine from electrical supply. The debris filter cover can be opened by using a spanner or coin. This allows access to the emergency hose and filter. Ensure you have a large bowl to catch the drain water.'
          },
          {
            speaker: 'Instructor',
            line: 'Now we can remove the debris filter by turning anti-clockwise until it is released. Clean the filter using warm water and a small brush. Once cleaned, refit the filter by turning clockwise until it is secured firmly.'
          },
          {
            speaker: 'Instructor',
            line: 'Finally check that the drain hose is not kinked when the washing machine is pushed back into position, as this can prevent the water draining. Check that the fixings are not restricting the drain hose.'
          }
        ],
        questions: [
          {
            id: 'u4_p3_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'What’s the problem with the error codes 5c and 5e?',
            acceptedAnswers: ['draining water', 'water draining'],
            displayAnswer: 'draining water',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u4_p3_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What’s the first thing to check?',
            acceptedAnswers: ['debris filter', 'the debris filter'],
            displayAnswer: 'debris filter',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u4_p3_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'What can be used to open the debris filter besides the coin?',
            acceptedAnswers: ['spanner', 'a spanner'],
            displayAnswer: 'spanner',
            wordLimitNote: '<= 3 words',
            hintVi: 'Trong đề PDF có lỗi chính tả "coil" (ý gốc là coin — đồng xu).'
          },
          {
            id: 'u4_p3_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'Beside warm water, what do you use to clean the debris filter?',
            acceptedAnswers: ['small brush', 'a small brush'],
            displayAnswer: 'small brush',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u4_p3_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'What’s the last thing to check?',
            acceptedAnswers: ['drain hose', 'the drain hose', 'fixings', 'the fixings'],
            displayAnswer: 'drain hose',
            wordLimitNote: '<= 3 words'
          }
        ]
      }
    ]
  },

  {
    unit: 5,
    title: 'Listening: Soft Solve Help Desk Calls',
    subtitleVi: 'So sánh 2 cuộc gọi tổng đài Soft Solve (phiên bản thiếu lịch sự và phiên bản chuyên nghiệp)',
    tasks: [
      {
        id: 'u5_listening_practice1',
        unit: 5,
        taskCode: 'Unit 5 - Lesson 6 (Practice 1)',
        title: 'Help Desk Call — Version 1 (Unhelpful)',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 7) • Trả lời ngắn (tối đa 3 từ)',
        instructionEn:
          'Listen and answer the questions with NO MORE THAN THREE WORDS.',
        instructionVi:
          'Nghe cuộc gọi hỗ trợ phần mềm lần 1 và trả lời câu hỏi với KHÔNG QUÁ BA TỪ.',
        audioType: 'mp3',
        audioSrc: '/audio/u5_task_1.mp3',
        transcript: [
          { speaker: 'Agent', line: 'Hello?' },
          { speaker: 'Customer', line: 'Is that the Soft Solve help desk?' },
          { speaker: 'Agent', line: "Yeah, that's right. What do you want?" },
          {
            speaker: 'Customer',
            line: "I'm having problems trying to install the Project Planner program I downloaded from your site. The activation key doesn't work."
          },
          { speaker: 'Agent', line: 'Okay. Give me your order number.' },
          { speaker: 'Customer', line: 'Sorry?' },
          {
            speaker: 'Agent',
            line: "I can't sort it out without your order reference number."
          },
          { speaker: 'Customer', line: 'And where would I find that?' },
          { speaker: 'Agent', line: 'On the invoice we emailed you.' },
          {
            speaker: 'Customer',
            line: "Okay, it's X6 hyphen 792... / X6 792 44. Hello, are you still there?"
          },
          {
            speaker: 'Agent',
            line: "Yes, I'm just looking it up. Okay, you're Thomas Vega of Grupo Diaz, right? ... Are you sure you didn't make a mistake when you typed it in?"
          },
          {
            speaker: 'Customer',
            line: 'Absolutely sure. I copied and pasted it from the email you sent.'
          },
          {
            speaker: 'Agent',
            line: "Then it's your antivirus program that's causing the problem. Switch your antivirus program off and then reinstall. If that doesn't work, call us back."
          },
          { speaker: 'Customer', line: 'But how do I switch it off? Oh!' }
        ],
        questions: [
          {
            id: 'u5_p1_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'What program is the customer trying to install?',
            acceptedAnswers: ['Project Planner', 'the Project Planner', 'Project Planner program'],
            displayAnswer: 'Project Planner',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u5_p1_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What’s his order reference number?',
            acceptedAnswers: ['X6-792-44', 'X679244', 'X6 792 44'],
            displayAnswer: 'X6-792-44',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u5_p1_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'Did he type in the activation key?',
            acceptedAnswers: ['No', "No, he didn't", 'No, he copied'],
            displayAnswer: 'No',
            wordLimitNote: '<= 3 words',
            hintVi: 'Khách nói đã "copied and pasted", không tự gõ tay.'
          },
          {
            id: 'u5_p1_q4',
            orderLabel: '4',
            type: 'qa',
            prompt:
              'What does the help-desk worker tell him to do with the antivirus program?',
            acceptedAnswers: ['switch it off', 'turn it off', 'switch off'],
            displayAnswer: 'switch it off',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u5_p1_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'Is the help-desk worker helpful?',
            acceptedAnswers: ['No', "No, she isn't", 'No, not helpful'],
            displayAnswer: 'No',
            wordLimitNote: '<= 3 words'
          }
        ]
      },
      {
        id: 'u5_listening_practice2',
        unit: 5,
        taskCode: 'Unit 5 - Lesson 6 (Practice 2)',
        title: 'Help Desk Call — Version 2 (Polite)',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 7–8) • Điền chỗ trống (tối đa 2 từ)',
        instructionEn:
          'Listen to another version of the conversation on task 2. Listen and fill in the blanks with NO MORE THAN TWO WORDS.',
        instructionVi:
          'Nghe phiên bản lịch sự với nhân viên Melanie và điền KHÔNG QUÁ HAI TỪ vào mỗi chỗ trống.',
        audioType: 'mp3',
        audioSrc: '/audio/u5_task_2.mp3',
        transcript: [
          {
            speaker: 'Melanie',
            line: 'Good morning, Soft Solve, Melanie speaking. How can I help?'
          },
          {
            speaker: 'Customer',
            line: "Hi, I'm having problems trying to install the Project Planner program I downloaded from your site. The activation key doesn't seem to work."
          },
          {
            speaker: 'Melanie',
            line: "I'm sorry to hear that. Can I have the order reference number from the top of the invoice we emailed you, and we can sort it out?"
          },
          { speaker: 'Customer', line: "Okay, it's X6-792-44." },
          {
            speaker: 'Melanie',
            line: "Thanks. I'm just calling the order up on my screen now. Sorry to keep you waiting. It looks like the system's a little slow today. Um... ah, here it is. So you're Mr Thomas Vega of Grupo Diaz?"
          },
          { speaker: 'Customer', line: "That's right." },
          { speaker: 'Melanie', line: 'And your activation key appears to be faulty?' },
          { speaker: 'Customer', line: 'Yes.' },
          {
            speaker: 'Melanie',
            line: 'Well, there can sometimes be an issue if you use lower case letters.'
          },
          {
            speaker: 'Customer',
            line: 'I don’t think so. I copied and pasted it from the email you sent.'
          },
          {
            speaker: 'Melanie',
            line: 'Good. Then it sounds as if your antivirus program might be causing the problem.'
          },
          {
            speaker: 'Melanie',
            line: 'Switch it off and reinstall. I can help you with that now. Are you at your computer?'
          },
          {
            speaker: 'Customer',
            line: "Yes... That's great! Yes, that's terrific. Thanks a lot."
          },
          {
            speaker: 'Melanie',
            line: "You're welcome. And if you need any further assistance, just call us again."
          }
        ],
        questions: [
          {
            id: 'u5_p2_q1',
            orderLabel: '1',
            type: 'fill',
            prompt:
              'Can I have the order reference number from the top of the _____ we emailed you?',
            acceptedAnswers: ['invoice'],
            displayAnswer: 'invoice',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u5_p2_q2',
            orderLabel: '2',
            type: 'fill',
            prompt:
              'Sorry to keep you waiting. It looks like the system’s a little _____ today. Um … ah, here it is. So you’re Mr Tomas Vega of Grupo Diaz?',
            acceptedAnswers: ['slow'],
            displayAnswer: 'slow',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u5_p2_q3',
            orderLabel: '3',
            type: 'fill',
            prompt: 'And your activation key appears to be _____?',
            acceptedAnswers: ['faulty'],
            displayAnswer: 'faulty',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u5_p2_q4',
            orderLabel: '4',
            type: 'fill',
            prompt:
              'Well, there can sometimes be an issue if you use lower case _____.',
            acceptedAnswers: ['letters'],
            displayAnswer: 'letters',
            wordLimitNote: '<= 2 words'
          },
          {
            id: 'u5_p2_q5',
            orderLabel: '5',
            type: 'fill',
            prompt:
              'Then it sounds as if your _____ might be causing the problem.',
            acceptedAnswers: ['antivirus program', 'anti-virus program'],
            displayAnswer: 'antivirus program',
            wordLimitNote: '<= 2 words'
          }
        ]
      }
    ]
  },

  {
    unit: 6,
    title: 'Listening: Describing Trends & Data Briefings',
    subtitleVi: 'Audio tổng hợp nguyên văn từ bài Practice 3 (Giáo trình Unit 6, tr. 228)',
    tasks: [
      {
        id: 'u6_listening_practice3',
        unit: 6,
        taskCode: 'Unit 6 (Handout p.228 Practice 3)',
        title: 'Sales, Production & Hotel Trend Reports',
        subtitleVi: 'Audio tổng hợp Web Speech theo giáo trình • Điền từ mô tả xu hướng (tối đa 3 từ)',
        instructionEn:
          'Listen to three short data briefings based on Unit 6 Practice 3 and fill in each blank with NO MORE THAN THREE WORDS.',
        instructionVi:
          'Nghe 3 báo cáo ngắn về xu hướng doanh số & sản lượng và điền KHÔNG QUÁ BA TỪ vào chỗ trống.',
        audioType: 'tts',
        speechScript:
          'Report one. As you can see from the graph, sales have increased considerably this year. The beginning of the year was poor, but sales picked up in February and peaked in August. Since then they have fallen a little, but the overall trend is upward. The outlook is very healthy. Report two. The chart clearly shows the downturn in production since the beginning of the year, and unfortunately this is a trend which will continue. The closure of our Lufwa plant in January accounts for the sharp drop at that time, and as sales have continued to decrease, we have had to temporarily shut down a number of our factories. These are difficult times for the company.',
        transcript: [
          {
            speaker: 'Report 1',
            line: 'As you can see from the graph, sales have increased considerably this year. The beginning of the year was poor, but sales picked up in February and peaked in August. Since then they have fallen a little, but the overall trend is upward. The outlook is very healthy.'
          },
          {
            speaker: 'Report 2',
            line: 'The chart clearly shows the downturn in production since the beginning of the year, and unfortunately this is a trend which will continue. The closure of our Lufwa plant in January accounts for the sharp drop at that time, and as sales have continued to decrease, we have had to temporarily shut down a number of our factories. These are difficult times for the company.'
          }
        ],
        questions: [
          {
            id: 'u6_q1',
            orderLabel: '(1)',
            type: 'fill',
            prompt: 'As you can see from the graph, sales have _____ considerably this year.',
            acceptedAnswers: ['increased', 'risen', 'grown'],
            displayAnswer: 'increased',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u6_q2',
            orderLabel: '(2)',
            type: 'fill',
            prompt:
              'The beginning of the year was poor, but sales picked up in February and _____ in August.',
            acceptedAnswers: ['peaked'],
            displayAnswer: 'peaked',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u6_q3',
            orderLabel: '(3)',
            type: 'fill',
            prompt: 'Since then they have fallen a little, but the overall trend is _____.',
            acceptedAnswers: ['upward', 'upwards', 'rising'],
            displayAnswer: 'upward',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u6_q4',
            orderLabel: '(4)',
            type: 'fill',
            prompt:
              'The chart clearly shows the _____ in production since the beginning of the year.',
            acceptedAnswers: ['downturn', 'decline', 'decrease', 'fall'],
            displayAnswer: 'downturn',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u6_q5',
            orderLabel: '(5)',
            type: 'fill',
            prompt:
              'The closure of our Lufwa plant in January accounts for the _____ at that time.',
            acceptedAnswers: ['sharp drop', 'drop', 'sharp fall'],
            displayAnswer: 'sharp drop',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u6_q6',
            orderLabel: '(6)',
            type: 'fill',
            prompt: 'As sales have continued to _____, we have had to temporarily shut down factories.',
            acceptedAnswers: ['decrease', 'fall', 'decline', 'drop'],
            displayAnswer: 'decrease',
            wordLimitNote: '<= 3 words'
          }
        ]
      }
    ]
  },

  {
    unit: 7,
    title: 'Listening: Job Interviews & Career Journey',
    subtitleVi: '2 bài nghe gốc về buổi phỏng vấn cô Laura Verdi (Wiggins) và kỹ thuật viên Brian Jones',
    tasks: [
      {
        id: 'u7_listening_practice2',
        unit: 7,
        taskCode: 'Unit 7 - Lesson 8 (Practice 2)',
        title: 'Job Interview — Laura Verdi (Wiggins Systems)',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 8) • Trả lời ngắn (tối đa 3 từ)',
        instructionEn:
          'Listen and answer the questions with NO MORE THAN THREE WORDS.',
        instructionVi:
          'Nghe buổi phỏng vấn xin việc của ứng viên Laura Verdi và trả lời với KHÔNG QUÁ BA TỪ.',
        audioType: 'mp3',
        audioSrc: '/audio/u7_task_2.mp3',
        transcript: [
          { speaker: 'Interviewer', line: "I've read through your CV." },
          {
            speaker: 'Laura',
            line: 'There are a few changes since I sent it to you. I got married last month so I’ve changed my surname.'
          },
          { speaker: 'Interviewer', line: "So, it's not Laura Muti, but..." },
          { speaker: 'Laura', line: "Laura Verdi. That's V-E-R-D-I." },
          {
            speaker: 'Interviewer',
            line: "Right, I've got that. And you've applied for the post of Computer Technician."
          },
          {
            speaker: 'Laura',
            line: "Yes, but I see from your website that you're also advertising for a Supervisor."
          },
          {
            speaker: 'Interviewer',
            line: 'That’s correct. Do you want to apply for the post of supervisor too?'
          },
          { speaker: 'Laura', line: 'Yes.' },
          {
            speaker: 'Interviewer',
            line: 'Very well. We’ll talk about that job in a minute. When exactly did you start your job at Wiggins?'
          },
          {
            speaker: 'Laura',
            line: "In January 2004, so I've been there four years now."
          },
          {
            speaker: 'Interviewer',
            line: 'And you say that you do computer upgrades, such as installing new software, installing memory cards, antivirus systems and so on?'
          },
          {
            speaker: 'Laura',
            line: "Yes, but in addition, I now do site visits. I visit some of our bigger clients' offices. I upgrade the computer systems in their offices."
          },
          { speaker: 'Interviewer', line: 'And why do you want to leave Wiggins?' },
          {
            speaker: 'Laura',
            line: "It's too far to travel. I'd prefer to work in Swindon, where I'm living now. By the way, Wiggins recently changed its name. It's now called SuperLink."
          }
        ],
        questions: [
          {
            id: 'u7_p2_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'What is the woman’s last name now?',
            acceptedAnswers: ['Verdi', 'Laura Verdi'],
            displayAnswer: 'Verdi',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p2_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'What position(s) is she applying for?',
            acceptedAnswers: [
              'Computer Technician, Supervisor',
              'Computer Technician and Supervisor',
              'Computer Technician & Supervisor',
              'Technician and Supervisor',
              'Technician, Supervisor'
            ],
            displayAnswer: 'Computer Technician, Supervisor',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p2_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'How long has the woman worked for Wiggins?',
            acceptedAnswers: ['four years', '4 years', 'two years', '2 years'],
            displayAnswer: 'four years',
            wordLimitNote: '<= 3 words',
            hintVi:
              'Trong file âm thanh cô ấy đọc "In January 2004, so I\'ve been there four years now" (một bản trắc nghiệm cũ ghi Two years — cả hai đều được chấm đúng).'
          },
          {
            id: 'u7_p2_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'What does she do with clients’ system?',
            acceptedAnswers: [
              'upgrade',
              'upgrades',
              'upgrades them',
              'upgrade computer systems',
              'upgrade the systems',
              'upgrade systems'
            ],
            displayAnswer: 'upgrade',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p2_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'Why does the woman want to leave her job?',
            acceptedAnswers: ['too far', 'too far to travel', 'it is too far', 'too far away'],
            displayAnswer: 'too far to travel',
            wordLimitNote: '<= 3 words'
          }
        ]
      },
      {
        id: 'u7_listening_practice3',
        unit: 7,
        taskCode: 'Unit 7 - Lesson 8 (Practice 3)',
        title: 'Interview with Brian Jones — Electronics Technician',
        subtitleVi: 'Bài nghe gốc REVISION 3 (tr. 8) • Điền chỗ trống (1)–(6) (tối đa 3 từ)',
        instructionEn:
          'Listen to the interview with Brian Jones, an Electronics Technician and fill in each blank with NO MORE THAN THREE WORDS.',
        instructionVi:
          'Nghe phỏng vấn kỹ thuật viên điện tử Brian Jones và điền KHÔNG QUÁ BA TỪ vào các chỗ trống (1)–(6).',
        audioType: 'mp3',
        audioSrc: '/audio/u7_task_3.mp3',
        transcript: [
          {
            speaker: 'Interviewer',
            line: 'Brian, how did you get interested in electronics?'
          },
          {
            speaker: 'Brian',
            line: 'At school, the history teacher was a radio amateur. He started an after-school electronics club. He showed us how to make simple radios, multimeters, that sort of thing. I learned more from him than the physics teacher.'
          },
          {
            speaker: 'Brian',
            line: 'Another reason I was interested was one of my friends built model aircraft, large things with a wingspan well over a meter, and I used to make the transmitters and receivers for radio control. If you forgot to switch on the receiver, the plane flew off into the distance until the fuel ran out. That happened more than once.'
          },
          { speaker: 'Interviewer', line: 'What did you do after school?' },
          {
            speaker: 'Brian',
            line: 'I took a certificate course in electronics at the local college.'
          },
          { speaker: 'Interviewer', line: 'What subjects did you study?' },
          {
            speaker: 'Brian',
            line: "I can't remember them all... uh, DC and AC circuits, solid state devices, applied maths."
          },
          { speaker: 'Interviewer', line: 'All technical subjects?' },
          {
            speaker: 'Brian',
            line: "Yes, apart from technical communications — that's speaking and writing about technology. About half the time was spent in the lab, which was good. I like the practical side."
          }
        ],
        questions: [
          {
            id: 'u7_p3_q1',
            orderLabel: '(1)',
            type: 'fill',
            prompt:
              'Two examples of things the history teacher showed them how to build are _____ (2 món cách nhau bởi dấu phẩy).',
            acceptedAnswers: [
              'simple radios, multimeters',
              'simple radios and multimeters',
              'radios, multimeters',
              'radios and multimeters'
            ],
            displayAnswer: 'simple radios, multimeters',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p3_q2',
            orderLabel: '(2)',
            type: 'fill',
            prompt: 'To help his friends build _____, ...',
            acceptedAnswers: ['model aircraft', 'model aircrafts'],
            displayAnswer: 'model aircraft',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p3_q3',
            orderLabel: '(3)',
            type: 'fill',
            prompt: '...he made the transmitters and _____ for radio control.',
            acceptedAnswers: ['receivers'],
            displayAnswer: 'receivers',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p3_q4',
            orderLabel: '(4)',
            type: 'fill',
            prompt: 'After he graduated from school, he did a course in _____ at a college.',
            acceptedAnswers: ['electronics', 'electronic'],
            displayAnswer: 'electronics',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p3_q5',
            orderLabel: '(5)',
            type: 'fill',
            prompt:
              'Some technical subjects he learnt were DC and AC _____, Solid state devices, Applied maths.',
            acceptedAnswers: ['circuits'],
            displayAnswer: 'circuits',
            wordLimitNote: '<= 3 words'
          },
          {
            id: 'u7_p3_q6',
            orderLabel: '(6)',
            type: 'fill',
            prompt:
              'What he loved about college is that he spent half of the time in the _____ for practical purposes.',
            acceptedAnswers: ['lab', 'the lab', 'laboratory'],
            displayAnswer: 'lab',
            wordLimitNote: '<= 3 words'
          }
        ]
      }
    ]
  },

  {
    unit: 8,
    title: 'Listening: Technical Maintenance Meeting',
    subtitleVi: 'Audio tổng hợp bám sát nội dung thảo luận & chốt quyết định kỹ thuật Unit 8',
    tasks: [
      {
        id: 'u8_listening_meeting',
        unit: 8,
        taskCode: 'Unit 8 (Guided Audio)',
        title: 'Resort Washing Machine Maintenance Discussion',
        subtitleVi: 'Audio tổng hợp Web Speech • Trả lời câu hỏi (tối đa 3 từ/số)',
        instructionEn:
          'Listen to the maintenance meeting between two engineers and answer the questions with NO MORE THAN THREE WORDS AND/OR A NUMBER.',
        instructionVi:
          'Nghe cuộc họp kỹ thuật về kế hoạch bảo trì hệ thống máy giặt resort và trả lời với KHÔNG QUÁ BA TỪ VÀ/HOẶC MỘT CON SỐ.',
        audioType: 'tts',
        speechScript:
          'Technician A: I just want to say something about maintaining the washing machine system of this resort. I think we should keep the washer level and clean the inside once a month. Technician B: Sorry to interrupt you, but firstly we must cut the power to avoid electric shock, and also remove and clean the filter. Technician A: I totally agree with you. And let me emphasize that we should use a soft cloth to wipe the outside so we do not scratch it. Also, how about replacing the hoses every seven years? Technician B: I apologize for interrupting you, but I am afraid seven years is too long. Let us replace the hoses every five years instead. Technician A: Good point. So we agree on that.',
        transcript: [
          {
            speaker: 'Technician A',
            line: 'I just want to say something about maintaining the washing machine system of this resort. I think we should keep the washer level and clean the inside once a month.'
          },
          {
            speaker: 'Technician B',
            line: 'Sorry to interrupt you, but firstly we must cut the power to avoid electric shock, and also remove and clean the filter.'
          },
          {
            speaker: 'Technician A',
            line: 'I totally agree with you. And let me emphasize that we should use a soft cloth to wipe the outside so we do not scratch it. Also, how about replacing the hoses every 7 years?'
          },
          {
            speaker: 'Technician B',
            line: "I apologize for interrupting you, but I'm afraid 7 years is too long. Let's replace the hoses every 5 years instead."
          },
          { speaker: 'Technician A', line: 'Good point. So we agree on that.' }
        ],
        questions: [
          {
            id: 'u8_q1',
            orderLabel: '1',
            type: 'qa',
            prompt: 'How often should technicians clean the inside of the washer?',
            acceptedAnswers: ['once a month', 'every month', 'monthly'],
            displayAnswer: 'once a month',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u8_q2',
            orderLabel: '2',
            type: 'qa',
            prompt: 'Why must technicians cut the power first?',
            acceptedAnswers: ['avoid electric shock', 'to avoid electric shock', 'prevent electric shock'],
            displayAnswer: 'avoid electric shock',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u8_q3',
            orderLabel: '3',
            type: 'qa',
            prompt: 'What should be used to wipe the outside without scratching it?',
            acceptedAnswers: ['a soft cloth', 'soft cloth'],
            displayAnswer: 'soft cloth',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u8_q4',
            orderLabel: '4',
            type: 'qa',
            prompt: 'How many years is considered too long for hose replacement?',
            acceptedAnswers: ['7 years', 'seven years', '7'],
            displayAnswer: '7 years',
            wordLimitNote: '<= 3 words/number'
          },
          {
            id: 'u8_q5',
            orderLabel: '5',
            type: 'qa',
            prompt: 'In the end, every how often will they replace the hoses?',
            acceptedAnswers: ['every 5 years', '5 years', 'five years', 'every five years'],
            displayAnswer: 'every 5 years',
            wordLimitNote: '<= 3 words/number'
          }
        ]
      }
    ]
  }
];

export const LISTENING_BY_UNIT: Record<number, UnitListeningModule> = Object.fromEntries(
  ALL_LISTENING_MODULES.map((m) => [m.unit, m])
);

export function getUnitListening(unit: number): UnitListeningModule | undefined {
  return LISTENING_BY_UNIT[unit];
}

import type { MonoTalkSample, SpeakingCard } from '../../types/curriculum';

export const SPEAKING_CARDS: SpeakingCard[] = [
  /* ==========================================================================
   * CARD 1 (UNIT 1): Hon Hai Precision Industry (Foxconn Technology Group)
   * ======================================================================== */
  {
    id: 'card_u1_foxconn',
    unit: 1,
    cardCode: 'Card 1 • Unit 1',
    title: 'Hon Hai Precision Industry (Foxconn Technology Group)',
    subtitleVi: 'Trao đổi thông tin hồ sơ doanh nghiệp trước buổi phỏng vấn (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A và Student B vừa tốt nghiệp ĐH Công nghiệp Hà Nội (HaUI) cùng nộp đơn vào Công ty Hon Hai Precision Industry và chuẩn bị phỏng vấn tuần tới. Hai bạn trao đổi thông tin còn thiếu về công ty để sẵn sàng trả lời phỏng vấn.',
    roleAName: 'Student A (Ứng viên HaUI)',
    roleBName: 'Student B (Ứng viên HaUI)',
    rows: [
      {
        field: 'Trading name',
        studentA: 'Foxconn Technology Group',
        studentB: '(1) What is the company’s trading name?',
        bIsQuestionPrompt: true,
        suggestedQuestion: "What is the company's trading name?",
        suggestedAnswer: 'It is Foxconn Technology Group.'
      },
      {
        field: 'Reputation',
        studentA: '(1) What is its reputation?',
        studentB:
          "The world's largest contract electronics manufacturer; one of the biggest exporters of China",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its reputation?',
        suggestedAnswer:
          "It is the world's largest contract electronics manufacturer and one of the biggest exporters of China."
      },
      {
        field: 'Founded year',
        studentA: '1974',
        studentB: '(2) When was it founded?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'When was it founded?',
        suggestedAnswer: 'It was founded in 1974.'
      },
      {
        field: 'Headquarters',
        studentA: '(2) Where is the company’s headquarters?',
        studentB: 'New Taipei City, Taiwan',
        aIsQuestionPrompt: true,
        suggestedQuestion: "Where is the company's headquarters?",
        suggestedAnswer: 'It is in New Taipei City, Taiwan.'
      },
      {
        field: 'Chairman',
        studentA: 'Terry Gou',
        studentB: '(3) Who is the chairman?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Who is the chairman?',
        suggestedAnswer: 'It is Terry Gou.'
      },
      {
        field: 'Specializations',
        studentA: '(3) What about its specializations?',
        studentB: 'Computer, Communication, Consumer electronics',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are its specializations?',
        suggestedAnswer: 'They are computers, communication and consumer electronics.'
      },
      {
        field: 'Products',
        studentA:
          'Electronics components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), Computer chips',
        studentB: '(4) What are its products?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are its products?',
        suggestedAnswer: 'They are electronics components, PCBs, GPUs and computer chips.'
      },
      {
        field: 'Number of employees',
        studentA: '(4) How many employees does it have?',
        studentB: '1.3 million',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'How many employees does it have?',
        suggestedAnswer: 'It has 1.3 million employees.'
      },
      {
        field: 'Number of subsidiaries',
        studentA: '10',
        studentB: '(5) How many subsidiaries does it have?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How many subsidiaries does it have?',
        suggestedAnswer: 'It has 10 subsidiaries.'
      },
      {
        field: 'Annual revenue',
        studentA: '(5) What is its annual revenue?',
        studentB: 'Over $136 billion',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its annual revenue?',
        suggestedAnswer: 'It is over 136 billion dollars.'
      },
      {
        field: 'Mission',
        studentA: "contribute to customer's success by developing effective products and services",
        studentB: '(6) What is its mission?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is its mission?',
        suggestedAnswer:
          "To contribute to customers' success by developing effective products and services."
      },
      {
        field: 'Vision',
        studentA: '(6) What is its vision?',
        studentB:
          'become a leader in developing creative, competitive and comprehensive solutions for customers',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its vision?',
        suggestedAnswer:
          'To become a leader in developing creative, competitive and comprehensive solutions for customers.'
      }
    ],
    keyExpressions: [
      "What is the company's trading name?",
      'It was founded in ...',
      'Its headquarters is in ...',
      'What are its specializations / products?',
      'How many employees / subsidiaries does it have?',
      'What is its mission / vision?'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Hello. Let's talk about Foxconn Technology Group.",
        translationVi: 'Chào bạn. Hãy cùng trao đổi về Foxconn Technology Group nhé.'
      },
      { speaker: 'A', roleLabel: 'Student A', line: 'Ok.', translationVi: 'Được thôi.' },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "What is the company's trading name?",
        translationVi: 'Tên thương mại của công ty là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It is Foxconn Technology Group. What is its reputation?',
        translationVi: 'Đó là Foxconn Technology Group. Công ty nổi tiếng về điều gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "It is the world's largest contract electronics manufacturer and one of the biggest exporters of China. When was it founded?",
        translationVi: 'Đây là nhà sản xuất điện tử theo hợp đồng lớn nhất thế giới và là một trong những nhà xuất khẩu lớn nhất Trung Quốc. Công ty được thành lập năm nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "It was founded in 1974. Where is the company's headquarters?",
        translationVi: 'Công ty thành lập năm 1974. Trụ sở chính ở đâu?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is in New Taipei City, Taiwan. Who is the chairman?',
        translationVi: 'Ở thành phố Tân Bắc, Đài Loan. Ai là chủ tịch?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It is Terry Gou. What about its specializations?',
        translationVi: 'Là ông Terry Gou. Lĩnh vực chuyên môn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'They are computers, communication and consumer electronics. What are its products?',
        translationVi: 'Đó là máy tính, truyền thông và điện tử tiêu dùng. Sản phẩm của công ty là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'They are electronics components, PCBs, GPUs and computer chips. How many employees does it have?',
        translationVi: 'Gồm linh kiện điện tử, bảng mạch PCB, GPU và chip máy tính. Công ty có bao nhiêu nhân viên?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It has 1.3 million employees. How many subsidiaries does it have?',
        translationVi: 'Có 1,3 triệu nhân viên. Có bao nhiêu công ty con?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It has 10 subsidiaries. What is its annual revenue?',
        translationVi: 'Có 10 công ty con. Doanh thu hằng năm là bao nhiêu?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is over 136 billion dollars. What is its mission?',
        translationVi: 'Hơn 136 tỷ đô la. Sứ mệnh của công ty là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "To contribute to customers' success by developing effective products and services. What is its vision?",
        translationVi: 'Đóng góp vào thành công của khách hàng bằng việc phát triển sản phẩm và dịch vụ hiệu quả. Tầm nhìn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'To become a leader in developing creative, competitive and comprehensive solutions for customers.',
        translationVi: 'Trở thành doanh nghiệp dẫn đầu trong việc phát triển giải pháp sáng tạo, cạnh tranh và toàn diện cho khách hàng.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 2 (UNIT 1): Panasonic Corporation Interview (8 turns combined)
   * ======================================================================== */
  {
    id: 'card_u1_panasonic',
    unit: 1,
    cardCode: 'Card 2 • Unit 1',
    title: 'Panasonic Corporation — Phỏng vấn 2 chiều (Bối cảnh & Văn hoá)',
    subtitleVi: 'HR Manager (B) phỏng vấn Ứng viên (A) & Ứng viên (A) hỏi lại về công ty (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A là sinh viên tốt nghiệp HaUI ứng tuyển vào Tập đoàn Panasonic. Student B là HR Manager phỏng vấn Student A 4 câu hỏi (bối cảnh, sứ mệnh, lý do ứng tuyển, đóng góp), sau đó Student A hỏi lại 4 câu về văn hoá công ty, phong cách quản lý, mục tiêu và vị thế 5 năm tới.',
    roleAName: 'Student A (Interviewee - Ứng viên HaUI)',
    roleBName: 'Student B (Interviewer - HR Manager)',
    rows: [
      {
        field: 'Company background (B hỏi A)',
        studentA:
          "Multinational electronics corporation; The world's fourth-largest television manufacturer; Founded year: 1918; Specializations: Consumer electronics, home appliances",
        studentB: "Could you tell me about Panasonic's company background?",
        bIsQuestionPrompt: true,
        suggestedQuestion: "Could you tell me about Panasonic's company background?",
        suggestedAnswer:
          "Panasonic is a multinational electronics corporation. It is the world's fourth-largest television manufacturer. It was founded in 1918 and specializes in consumer electronics and home appliances."
      },
      {
        field: 'Company mission (B hỏi A)',
        studentA:
          'Create value and contribute to society with innovative technologies and products',
        studentB: "What is Panasonic's mission?",
        bIsQuestionPrompt: true,
        suggestedQuestion: "What is Panasonic's mission?",
        suggestedAnswer:
          "I think Panasonic's mission is to create value and contribute to society with innovative technologies and products."
      },
      {
        field: 'Reasons to work for the company (B hỏi A)',
        studentA:
          'Admire high-quality products, especially LED televisions; Enhance knowledge and skills; Gain experiences',
        studentB: 'Why do you want to work for Panasonic?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Why do you want to work for Panasonic?',
        suggestedAnswer:
          'In my opinion, Panasonic has high-quality products, especially LED televisions. I want to enhance my knowledge and skills and gain more experience.'
      },
      {
        field: 'Possible contribution (B hỏi A)',
        studentA:
          'Technical knowledge and skills; English communication skills; Ability to work in groups',
        studentB: 'How can you contribute to our company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How can you contribute to our company?',
        suggestedAnswer:
          'I believe I can contribute my technical knowledge and skills. I also have good English communication skills and the ability to work in groups.'
      },
      {
        field: 'Company culture (A hỏi B)',
        studentA: "Could you tell me about Panasonic's company culture?",
        studentB:
          'Create culture: Focus on risk-taking and innovation; Encourage employee creativity by rewarding innovative ideas',
        aIsQuestionPrompt: true,
        suggestedQuestion: "Could you tell me about Panasonic's company culture?",
        suggestedAnswer:
          'Our company focuses on risk-taking and innovation. We encourage employee creativity by rewarding innovative ideas.'
      },
      {
        field: "Company's management style (A hỏi B)",
        studentA: "What is Panasonic's management style?",
        studentB:
          "Participative style: Encourage employee input in decision making; Reward team's effort",
        aIsQuestionPrompt: true,
        suggestedQuestion: "What is Panasonic's management style?",
        suggestedAnswer:
          "We use a participative management style. We encourage employee input in decision-making and reward the team's effort."
      },
      {
        field: "Company's goals (A hỏi B)",
        studentA: "What are the company's main goals?",
        studentB:
          'Increase annual revenue; Introduce non-electronics products to the market; Create new business and promote innovation',
        aIsQuestionPrompt: true,
        suggestedQuestion: "What are the company's main goals?",
        suggestedAnswer:
          "The company's goals are to increase annual revenue, introduce non-electronics products to the market, and create new businesses and promote innovation."
      },
      {
        field: 'Possible position in next 5 years (A hỏi B)',
        studentA: 'Where do you think Panasonic will be in the next five years?',
        studentB: "The world's largest television manufacturer",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Where do you think Panasonic will be in the next five years?',
        suggestedAnswer:
          "I would say Panasonic could become the world's largest television manufacturer."
      }
    ],
    keyExpressions: [
      'I think / In my opinion / I believe ...',
      'I would say ...',
      'participative management style',
      'risk-taking and innovation',
      'create value and contribute to society'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "Could you tell me about Panasonic's company background?",
        translationVi: 'Bạn có thể cho tôi biết về lịch sử và thông tin nền tảng của Panasonic không?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Panasonic is a multinational electronics corporation. It is the world's fourth-largest television manufacturer. It was founded in 1918 and specializes in consumer electronics and home appliances.",
        translationVi: 'Panasonic là tập đoàn điện tử đa quốc gia, nhà sản xuất TV lớn thứ tư thế giới, thành lập năm 1918 và chuyên về điện tử tiêu dùng cùng thiết bị gia dụng.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "What is Panasonic's mission?",
        translationVi: 'Sứ mệnh của Panasonic là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "I think Panasonic's mission is to create value and contribute to society with innovative technologies and products.",
        translationVi: 'Tôi nghĩ sứ mệnh của Panasonic là tạo ra giá trị và đóng góp cho xã hội bằng các công nghệ và sản phẩm tiên tiến.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Why do you want to work for Panasonic?',
        translationVi: 'Tại sao bạn muốn làm việc cho Panasonic?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'In my opinion, Panasonic has high-quality products, especially LED televisions. I want to enhance my knowledge and skills and gain more experience.',
        translationVi: 'Theo tôi, Panasonic có những sản phẩm chất lượng cao, đặc biệt là TV LED. Tôi muốn nâng cao kiến thức, kỹ năng và tích lũy thêm kinh nghiệm.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'How can you contribute to our company?',
        translationVi: 'Bạn có thể đóng góp gì cho công ty chúng tôi?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'I believe I can contribute my technical knowledge and skills. I also have good English communication skills and the ability to work in groups.',
        translationVi: 'Tôi tin mình có thể đóng góp kiến thức và kỹ năng chuyên môn kỹ thuật, kỹ năng giao tiếp tiếng Anh tốt và khả năng làm việc nhóm.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Could you tell me about Panasonic's company culture?",
        translationVi: 'Anh/chị có thể chia sẻ thêm về văn hoá doanh nghiệp của Panasonic không?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Our company focuses on risk-taking and innovation. We encourage employee creativity by rewarding innovative ideas.',
        translationVi: 'Công ty chúng tôi chú trọng tinh thần dám chấp nhận thử thách và đổi mới, khuyến khích nhân viên sáng tạo bằng cách khen thưởng ý tưởng mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "What is Panasonic's management style?",
        translationVi: 'Phong cách quản lý của Panasonic là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "We use a participative management style. We encourage employee input in decision-making and reward the team's effort.",
        translationVi: 'Chúng tôi áp dụng phong cách quản lý có sự tham gia, khuyến khích nhân viên đóng góp ý kiến ra quyết định và thưởng cho nỗ lực tập thể.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "What are the company's main goals?",
        translationVi: 'Những mục tiêu chính của công ty là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "The company's goals are to increase annual revenue, introduce non-electronics products to the market, and create new businesses and promote innovation.",
        translationVi: 'Mục tiêu của công ty là tăng doanh thu hằng năm, giới thiệu các sản phẩm phi điện tử ra thị trường, tạo lĩnh vực kinh doanh mới và thúc đẩy đổi mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Where do you think Panasonic will be in the next five years?',
        translationVi: 'Anh/chị dự đoán Panasonic sẽ đạt vị thế nào trong 5 năm tới?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "I would say Panasonic could become the world's largest television manufacturer.",
        translationVi: 'Tôi cho rằng Panasonic có thể trở thành nhà sản xuất TV lớn nhất thế giới.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 3 (UNIT 2): Samsung SM Gear Fit 2 Smartwatch
   * ======================================================================== */
  {
    id: 'card_u2_gearfit2',
    unit: 2,
    cardCode: 'Card 3 • Unit 2',
    title: 'Samsung SM Gear Fit 2 Smartwatch',
    subtitleVi: 'Trao đổi thông số kỹ thuật, cảm biến và tính năng đồng hồ thông minh (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A và Student B trao đổi thông tin còn thiếu trên phiếu thông số Samsung SM Gear Fit 2 để hoàn thiện mô tả thiết bị.',
    roleAName: 'Student A',
    roleBName: 'Student B',
    rows: [
      {
        field: 'Operating System',
        studentA: 'Tizen OS',
        studentB: '(1) What is the operating system of the Samsung SM Gear Fit 2?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the operating system of the Samsung SM Gear Fit 2?',
        suggestedAnswer: 'The operating system is Tizen OS.'
      },
      {
        field: 'Processor',
        studentA: '(1) What is the processor of the Samsung SM Gear Fit 2?',
        studentB: 'EX3250 dual-core 1GHz',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the processor of the Samsung SM Gear Fit 2?',
        suggestedAnswer: 'The processor is EX3250 dual-core 1GHz.'
      },
      {
        field: 'Compatibility',
        studentA: 'Android 4.4 or higher; iOS 9.0 or above',
        studentB: '(2) What is the compatibility of the Samsung SM Gear Fit 2?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the compatibility of the Samsung SM Gear Fit 2?',
        suggestedAnswer: 'It is compatible with Android 4.4 or higher and iOS 9.0 or above.'
      },
      {
        field: 'Integrated sensor',
        studentA: '(2) What are the integrated sensors of the Samsung SM Gear Fit 2?',
        studentB: 'Accelerometer, Gyroscope, Barometer',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are the integrated sensors of the Samsung SM Gear Fit 2?',
        suggestedAnswer: 'The integrated sensors are an accelerometer, a gyroscope and a barometer.'
      },
      {
        field: 'Key features — Names',
        studentA: 'GPS Exercise, Notifications, Music Player',
        studentB: '(3) What are the key features of the Samsung SM Gear Fit 2?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are the key features of the Samsung SM Gear Fit 2?',
        suggestedAnswer: 'The key features are GPS Exercise, Notifications and Music Player.'
      },
      {
        field: 'Key features — Functions',
        studentA:
          'Give accurate exercise statistics; Receive or respond to call and text; Connect with Spotify to access online music and stream your favorite songs',
        studentB: '(4) What are the functions of these key features?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are the functions of these key features?',
        suggestedAnswer:
          'They give accurate exercise statistics, allow users to receive or respond to calls and texts, and connect with Spotify to access online music and stream favorite songs.'
      },
      {
        field: 'Additional features — Names',
        studentA: '(3) What are the additional features of the Samsung SM Gear Fit 2?',
        studentB: 'Sleep Tracking, Auto Exercise Tracking, Auto Heart Rate Tracking',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are the additional features of the Samsung SM Gear Fit 2?',
        suggestedAnswer:
          'The additional features are Sleep Tracking, Auto Exercise Tracking and Auto Heart Rate Tracking.'
      },
      {
        field: 'Additional features — Functions',
        studentA: '(4) What are the functions of these additional features?',
        studentB:
          'Record sleeping hours and notify breathes per minute; Record your exercise; Measure heartbeat when training',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are the functions of these additional features?',
        suggestedAnswer:
          'They record sleeping hours and notify breathing, record your exercise, and measure your heartbeat when training.'
      }
    ],
    keyExpressions: [
      'The operating system / processor is ...',
      'It is compatible with Android 4.4 or higher and iOS 9.0 or above.',
      'The integrated sensors are ...',
      'What are the functions of these features?'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'What is the operating system of the Samsung SM Gear Fit 2?',
        translationVi: 'Hệ điều hành của Samsung SM Gear Fit 2 là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'The operating system is Tizen OS. What is the processor of the Samsung SM Gear Fit 2?',
        translationVi: 'Hệ điều hành là Tizen OS. Bộ vi xử lý của máy là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'The processor is EX3250 dual-core 1GHz. What is the compatibility of the Samsung SM Gear Fit 2?',
        translationVi: 'Là chip EX3250 lõi kép 1GHz. Máy tương thích với hệ điều hành nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It is compatible with Android 4.4 or higher and iOS 9.0 or above. What are the integrated sensors of the Samsung SM Gear Fit 2?',
        translationVi: 'Máy tương thích Android 4.4 trở lên và iOS 9.0 trở lên. Các cảm biến tích hợp gồm những gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'The integrated sensors are an accelerometer, a gyroscope and a barometer. What are the key features of the Samsung SM Gear Fit 2?',
        translationVi: 'Gồm gia tốc kế, con quay hồi chuyển và áp kế. Các tính năng chính là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'The key features are GPS Exercise, Notifications and Music Player.',
        translationVi: 'Các tính năng chính là GPS Exercise, Thông báo và Trình phát nhạc.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'What are the functions of these key features?',
        translationVi: 'Chức năng của các tính năng chính đó là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'They give accurate exercise statistics, allow users to receive or respond to calls and texts, and connect with Spotify to access online music and stream favorite songs. What are the additional features of the Samsung SM Gear Fit 2?',
        translationVi: 'Chúng thống kê tập luyện chính xác, cho phép nhận/trả lời cuộc gọi và tin nhắn, đồng thời kết nối Spotify nghe nhạc trực tuyến. Các tính năng bổ sung là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'The additional features are Sleep Tracking, Auto Exercise Tracking and Auto Heart Rate Tracking.',
        translationVi: 'Gồm Theo dõi giấc ngủ, Tự động ghi nhận tập luyện và Đo nhịp tim tự động.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'What are the functions of these additional features?',
        translationVi: 'Chức năng của các tính năng bổ sung là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'They record sleeping hours and notify breathing, record your exercise, and measure your heartbeat when training.',
        translationVi: 'Chúng ghi lại số giờ ngủ và thông báo nhịp thở, ghi nhận quá trình tập và đo nhịp tim khi luyện tập.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 4 (UNIT 3): Installing a Light Bulb
   * ======================================================================== */
  {
    id: 'card_u3_light_bulb',
    unit: 3,
    cardCode: 'Card 4 • Unit 3',
    title: 'Installing a Light Bulb',
    subtitleVi: 'Hướng dẫn quy trình lắp đặt bóng đèn tại nhà & lưu ý an toàn (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A hỏi Student B về dụng cụ, bước chuẩn bị trước lắp đặt và kiểm tra sau lắp đặt bóng đèn tại nhà; ngược lại Student B hỏi Student A về địa điểm lắp đặt, 4 bước lắp đặt và lưu ý an toàn.',
    roleAName: 'Student A',
    roleBName: 'Student B',
    rows: [
      {
        field: 'Item (Mở đầu hội thoại)',
        studentA: '(Hỏi nhờ hướng dẫn lắp đặt Light bulb)',
        studentB: 'Light bulb',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Can you tell me how to install a light bulb?',
        suggestedAnswer: 'Sure! Let us check what you need to install a light bulb.'
      },
      {
        field: 'Location',
        studentA: 'Home',
        studentB: '(1) Where do you want to install it?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Where do you want to install it?',
        suggestedAnswer: 'I want to install it at home.'
      },
      {
        field: 'Required equipment',
        studentA: '(1) What equipment do we need?',
        studentB: 'New bulb, Screwdriver, Screw, Wire, Voltage tester',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What equipment do we need?',
        suggestedAnswer: 'We need a new bulb, a screwdriver, screws, wire and a voltage tester.'
      },
      {
        field: 'Pre-installation',
        studentA: '(2) What should we do before installation?',
        studentB:
          'Cut off electricity; Investigate bracket; Prepare wire; Clean old fixture / installation area; Remove old bulb covering',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do before installation?',
        suggestedAnswer:
          'First, cut off the electricity. Then, investigate the bracket, prepare the wire, clean the old fixture and installation area, and remove the old bulb covering.'
      },
      {
        field: 'Installation',
        studentA:
          'Check compatibility between new lights & bracket; Check quality of wire; Twist cords of the same colored wires; Fasten bulb / bracket',
        studentB: '(2) How do we install the new bulb?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How do we install the new bulb?',
        suggestedAnswer:
          'First, check the compatibility between the new light and the bracket. Then, check the quality of the wire. Next, twist the same-colored wires together. Finally, fasten the bulb to the bracket.'
      },
      {
        field: 'Post installation',
        studentA: '(3) What should we do after installation?',
        studentB: 'Test a new light; Test electrical current for any trouble',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do after installation?',
        suggestedAnswer: 'Test the new light and test the electrical current for any trouble.'
      },
      {
        field: 'Caution',
        studentA: 'Use voltage tester all the time; Prepare more wire',
        studentB: '(3) Are there any cautions?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any cautions?',
        suggestedAnswer: 'Yes. Always use a voltage tester and prepare more wire.'
      }
    ],
    keyExpressions: [
      'Can you tell me how to install ...?',
      'What equipment do we need?',
      'First, cut off the electricity.',
      'Twist the same-colored wires together.',
      'Always use a voltage tester.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Can you tell me how to install a light bulb?',
        translationVi: 'Bạn có thể chỉ cho tôi cách lắp một bóng đèn không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Sure. Where do you want to install it?',
        translationVi: 'Chắc chắn rồi. Bạn muốn lắp nó ở đâu?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I want to install it at home. What equipment do we need?',
        translationVi: 'Tôi muốn lắp ở nhà. Chúng ta cần những dụng cụ gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'We need a new bulb, a screwdriver, screws, wire and a voltage tester.',
        translationVi: 'Chúng ta cần bóng đèn mới, tua-vít, ốc vít, dây điện và bút thử điện.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'What should we do before installation?',
        translationVi: 'Trước khi lắp đặt chúng ta cần làm gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'First, cut off the electricity. Then, investigate the bracket, prepare the wire, clean the old fixture and installation area, and remove the old bulb covering. How do we install the new bulb?',
        translationVi: 'Đầu tiên ngắt điện, sau đó kiểm tra giá đỡ, chuẩn bị dây, vệ sinh đèn cũ/khu vực lắp và tháo chụp đèn cũ. Vậy lắp bóng mới như thế nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'First, check the compatibility between the new light and the bracket. Then, check the quality of the wire. Next, twist the same-colored wires together. Finally, fasten the bulb to the bracket. What should we do after installation?',
        translationVi: 'Đầu tiên kiểm tra độ tương thích giữa đèn mới và giá đỡ, kiểm tra chất lượng dây, xoắn nối các dây cùng màu rồi cố định bóng vào giá đỡ. Sau khi lắp xong cần làm gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Test the new light and test the electrical current for any trouble. Are there any cautions?',
        translationVi: 'Kiểm tra đèn mới sáng chưa và thử dòng điện xem có sự cố gì không. Có lưu ý an toàn nào không?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Yes. Always use a voltage tester and prepare more wire.',
        translationVi: 'Có. Luôn sử dụng bút thử điện và chuẩn bị dự phòng thêm dây dẫn.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 5 (UNIT 4): Daikin Air Conditioner Troubleshooting (DX16SA — CH 34)
   * ======================================================================== */
  {
    id: 'card_u4_daikin_ac',
    unit: 4,
    cardCode: 'Card 5 • Unit 4',
    title: 'Daikin Air Conditioner Hotline (Model DX16SA — Alarm CH 34)',
    subtitleVi: 'Tổng đài kỹ thuật chẩn đoán lỗi không mát & mã CH 34 điều hoà Daikin (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A là nhân viên kỹ thuật trực tổng đài hỗ trợ khách hàng (Student B) xử lý sự cố điều hoà Daikin (model DX16SA) làm mát kém và báo lỗi CH 34 dù đã chỉnh thermostat mức cao nhất.',
    roleAName: 'Student A (Hotline Technician)',
    roleBName: 'Student B (Customer)',
    rows: [
      {
        field: 'Product name',
        studentA: '(1) What is the product name?',
        studentB: 'Daikin air conditioner',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the product name?',
        suggestedAnswer: 'It is a Daikin air conditioner.'
      },
      {
        field: 'Model',
        studentA: '(2) What is the model?',
        studentB: 'DX16SA',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the model?',
        suggestedAnswer: 'The model is DX16SA.'
      },
      {
        field: 'Problem(s)',
        studentA: '(3) What is the problem?',
        studentB: 'The AC is not cooling as it should',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the problem?',
        suggestedAnswer: 'The AC is not cooling as it should.'
      },
      {
        field: 'Trouble signs',
        studentA: '(4) What trouble signs do you see?',
        studentB: 'Alarm code CH 34 on the display',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What trouble signs do you see?',
        suggestedAnswer: 'There is an alarm code CH 34 on the display.'
      },
      {
        field: 'Taken actions',
        studentA: '(5) What did you do?',
        studentB:
          'Check the thermostat -> set it at highest setting; Check the airflow -> not blocked',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What did you do?',
        suggestedAnswer:
          'I checked the thermostat and set it at the highest setting. I also checked the airflow, and it is not blocked.'
      },
      {
        field: 'Predicted cause(s)',
        studentA: 'Dirty air filter; Iced up cooling coils',
        studentB: '(1) What might cause this problem?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What might be the causes of this problem?',
        suggestedAnswer: 'The air filter may be dirty, or the cooling coils may be iced up.'
      },
      {
        field: 'Suggested solutions',
        studentA:
          'Clean the filter; Set the mode control at Med Fan or High Cool with the thermostat at 1 or 2',
        studentB: '(2) What should I do?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do?',
        suggestedAnswer:
          'You should clean the filter and set the mode control at Med Fan or High Cool, with the thermostat at 1 or 2.'
      },
      {
        field: 'Precautions for maintenance and repairs',
        studentA:
          'Clean air filter regularly; Ask a professional technician to maintain the air conditioner every year',
        studentB: '(3) What should I do to maintain the air conditioner?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do to maintain the air conditioner?',
        suggestedAnswer:
          'Clean the air filter regularly and ask a professional technician to maintain the air conditioner every year.'
      }
    ],
    keyExpressions: [
      'The AC is not cooling as it should.',
      'There is an alarm code CH 34 on the display.',
      'The air filter may be dirty, or the cooling coils may be iced up.',
      'Set the mode control at Med Fan or High Cool.',
      'Ask a professional technician to maintain the air conditioner every year.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Good morning. How can I help you?',
        translationVi: 'Chào buổi sáng. Tôi có thể giúp gì cho bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'Good morning. My air conditioner has a problem.',
        translationVi: 'Chào bạn. Điều hoà của tôi đang gặp sự cố.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: "I'm sorry to hear that. What is the product name?",
        translationVi: 'Tôi rất tiếc khi nghe điều đó. Tên sản phẩm là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'It is a Daikin air conditioner.',
        translationVi: 'Đó là điều hoà Daikin.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What is the model?',
        translationVi: 'Mã model là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'The model is DX16SA.',
        translationVi: 'Model là DX16SA.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What is the problem?',
        translationVi: 'Máy đang gặp lỗi gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'The AC is not cooling as it should.',
        translationVi: 'Điều hoà không làm mát đúng như bình thường.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What trouble signs do you see?',
        translationVi: 'Bạn thấy có dấu hiệu bất thường nào không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'There is an alarm code CH 34 on the display.',
        translationVi: 'Màn hình hiển thị mã báo lỗi CH 34.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What did you do?',
        translationVi: 'Bạn đã xử lý thế nào rồi?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'I checked the thermostat and set it at the highest setting. I also checked the airflow, and it is not blocked.',
        translationVi: 'Tôi đã kiểm tra bộ ổn nhiệt và chỉnh lên mức cao nhất, cũng kiểm tra luồng gió thì không bị tắc.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'The air filter may be dirty, or the cooling coils may be iced up.',
        translationVi: 'Lưới lọc gió có thể bị bẩn hoặc dàn lạnh đang bị đóng băng.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'What should I do?',
        translationVi: 'Tôi nên làm gì bây giờ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'You should clean the filter and set the mode control at Med Fan or High Cool, with the thermostat at 1 or 2.',
        translationVi: 'Bạn nên vệ sinh lưới lọc và đặt chế độ Med Fan hoặc High Cool với bộ ổn nhiệt ở mức 1 hoặc 2.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'OK. What should I do to maintain the air conditioner?',
        translationVi: 'Vâng. Tôi nên bảo dưỡng điều hoà thế nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Clean the air filter regularly and ask a professional technician to maintain the air conditioner every year.',
        translationVi: 'Hãy vệ sinh lưới lọc thường xuyên và nhờ kỹ thuật viên chuyên nghiệp bảo dưỡng điều hoà hằng năm.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 6 (UNIT 5): VAECO Vietnam Order Complaint (Invoice #100 — Order T6758)
   * ======================================================================== */
  {
    id: 'card_u5_vaeco',
    unit: 5,
    cardCode: 'Card 6 • Unit 5',
    title: 'VAECO Vietnam Order Complaint (Invoice #100 — Order T6758)',
    subtitleVi: 'Gọi điện khiếu nại giao thiếu 5 cánh tuabin & nhầm mã cánh tĩnh (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A (Joan Tran — Phòng Thu mua Vietnam Airlines) gọi điện tới Student B (Bộ phận kinh doanh VAECO Vietnam) phản ánh đơn hàng T6758 (Hóa đơn #100, ngày 7/6/2017): đặt 75 cánh tuabin TR16-957X nhưng chỉ nhận 70 (thiếu 5 chiếc) và đặt 60 cánh tĩnh ST23-56R nhưng nhận nhầm ST28-56R. VAECO vừa chuyển trụ sở mới nên sơ suất và sẽ gửi bù & đổi trả miễn phí vận chuyển.',
    roleAName: 'Student A (Joan Tran - Vietnam Airlines)',
    roleBName: 'Student B (Sales Staff - VAECO Vietnam)',
    rows: [
      {
        field: 'Order reference & Date',
        studentA: 'Order reference: T6758 • Invoice# 100 • Date: 7 June, 2017 (To: Joan Tran)',
        studentB: '(1) What is the order reference number?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Can I have your order number, please?',
        suggestedAnswer: "Yes. It's T6758."
      },
      {
        field: 'Problem 1: Gas turbine blades (TR16-957X)',
        studentA: 'Invoiced 75 (€415.00/pc = €31,125) -> Only received 70 (5 blades missing)',
        studentB: 'TR16-957X missing quantity on invoice -> Send 5 extra blades',
        suggestedQuestion: "What's the problem with the order?",
        suggestedAnswer:
          'We ordered 75 gas turbine blades, but only got 70. Five blades are missing.'
      },
      {
        field: 'Problem 2: Vanes (ST23-56R) & Other items',
        studentA:
          'Invoiced 60 ST23-56R Vanes (€356/pc = €21,360) -> Shipped wrong ST28-56R (DD368-2B & DB578-6B Disc Rotors: 4 pcs OK; Total: €94,829.9)',
        studentB: 'Recently moved to new building -> Collect wrong vanes, deliver correct ST23-56R & pay shipping cost',
        suggestedQuestion: 'How will VAECO solve both issues?',
        suggestedAnswer:
          'We will send 5 extra blades, collect the wrong vanes, deliver the correct ST23-56R vanes ASAP, and pay the shipping cost.'
      }
    ],
    flowSteps: [
      {
        speaker: 'A',
        action: 'Greet and confirm you are calling VAECO Vietnam',
        sampleLine: 'Hello. Is this VAECO Vietnam?'
      },
      {
        speaker: 'B',
        action: 'Confirm company name and ask how you can help',
        sampleLine: 'Yes. How can I help you?'
      },
      {
        speaker: 'A',
        action: 'Introduce yourself (Joan Tran, Vietnam Airlines) and state you have an order problem',
        sampleLine: "I'm Joan Tran from Vietnam Airlines. I have a problem with my order."
      },
      {
        speaker: 'B',
        action: 'Ask for the order reference number',
        sampleLine: 'Can I have your order number, please?'
      },
      {
        speaker: 'A',
        action: 'Give the order number (T6758)',
        sampleLine: "Yes. It's T6758."
      },
      {
        speaker: 'B',
        action: 'Ask for details of the problem',
        sampleLine: "What's the problem?"
      },
      {
        speaker: 'A',
        action:
          'Report both discrepancies on the invoice (75 vs 70 gas turbine blades; ST23-56R vs ST28-56R vanes)',
        sampleLine:
          'We ordered 75 gas turbine blades, but only got 70. Five blades are missing. We also ordered 60 vanes, number ST23-56R, but got ST28-56R.'
      },
      {
        speaker: 'B',
        action:
          'Apologize, explain office relocation issue, offer 5 extra blades + exchange vanes + pay shipping cost',
        sampleLine:
          "I'm sorry. We moved to a new building, so we had some problems. We will send you 5 extra blades. In addition, we will collect the wrong vanes and deliver the correct vanes as soon as possible. Of course we will pay the shipping cost."
      },
      {
        speaker: 'A',
        action: 'Thank the staff',
        sampleLine: 'Thank you for your help.'
      },
      {
        speaker: 'B',
        action: 'Respond politely, apologize again, and say goodbye',
        sampleLine: "You're welcome. Sorry again. Goodbye!"
      }
    ],
    keyExpressions: [
      'Can I have your order number, please?',
      "What's the problem?",
      'We ordered ..., but only got ... / ... are missing.',
      'We will collect the wrong vanes and deliver the correct vanes as soon as possible.',
      'Of course we will pay the shipping cost.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: 'Hello. Is this VAECO Vietnam?',
        translationVi: 'Xin chào. Đây có phải VAECO Vietnam không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff',
        line: 'Yes. How can I help you?',
        translationVi: 'Vâng đúng rồi. Tôi có thể giúp gì cho bạn?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "I'm Joan Tran from Vietnam Airlines. I have a problem with my order.",
        translationVi: 'Tôi là Joan Tran ở Vietnam Airlines. Đơn hàng của tôi đang gặp vấn đề.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff',
        line: 'Can I have your order number, please?',
        translationVi: 'Vui lòng cho tôi xin mã đơn hàng của chị?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "Yes. It's T6758.",
        translationVi: 'Vâng, mã là T6758.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff',
        line: "What's the problem?",
        translationVi: 'Đơn hàng gặp vấn đề gì vậy ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: 'We ordered 75 gas turbine blades, but only got 70. Five blades are missing. We also ordered 60 vanes, number ST23-56R, but got ST28-56R.',
        translationVi: 'Chúng tôi đặt 75 cánh tuabin khí nhưng chỉ nhận 70, thiếu 5 chiếc. Chúng tôi cũng đặt 60 cánh tĩnh mã ST23-56R nhưng lại nhận mã ST28-56R.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff',
        line: "I'm sorry. We moved to a new building, so we had some problems. We will send you 5 extra blades. In addition, we will collect the wrong vanes and deliver the correct vanes as soon as possible. Of course we will pay the shipping cost.",
        translationVi: 'Tôi rất xin lỗi. Chúng tôi mới chuyển sang tòa nhà mới nên gặp chút nhầm lẫn. Chúng tôi sẽ gửi bù 5 cánh tuabin, đồng thời thu hồi cánh tĩnh sai và giao đúng hàng sớm nhất. Tất nhiên chúng tôi sẽ chịu chi phí vận chuyển.'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: 'Thank you for your help.',
        translationVi: 'Cảm ơn sự hỗ trợ của bạn.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff',
        line: "You're welcome. Sorry again. Goodbye!",
        translationVi: 'Không có chi ạ. Một lần nữa xin lỗi chị. Tạm biệt!'
      },
      { speaker: 'A', roleLabel: 'Joan Tran', line: 'Goodbye!', translationVi: 'Tạm biệt!' }
    ]
  },

  /* ==========================================================================
   * UNIT 6 (MONO TALK CHART): Home Appliance Ownership in Vietnam (2006-2014)
   * ======================================================================== */
  {
    id: 'card_u6_appliance_ownership',
    unit: 6,
    cardCode: 'Unit 6 • Mono Talk Graph',
    title: 'Home Appliance Ownership in Vietnam (2006–2014)',
    subtitleVi: 'Mô tả biểu đồ đường tỷ lệ sở hữu điều hoà, tủ lạnh và quạt trần (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Bám sát phần III. MONO TALK Unit 6 trong ÔN TẬP THI KTHP SPEAKING: Student A thuyết trình số liệu biểu đồ đường tỷ lệ hộ gia đình sở hữu 3 thiết bị điện từ 2006 đến 2014; Student B đặt câu hỏi kiểm tra xu hướng và so sánh.',
    roleAName: 'Student A (Presenter)',
    roleBName: 'Student B (Colleague)',
    charts: [
      {
        title: 'Home Appliance Ownership in Vietnam (2006–2014)',
        chartType: 'line',
        unitLabel: '%',
        points: [],
        multiSeries: [
          {
            name: 'Air conditioners (%)',
            color: '#2563eb',
            points: [
              { label: '2006', value: 5 },
              { label: '2010', value: 7 },
              { label: '2014', value: 40 }
            ]
          },
          {
            name: 'Refrigerators (%)',
            color: '#10b981',
            points: [
              { label: '2006', value: 30 },
              { label: '2010', value: 45 },
              { label: '2014', value: 55 }
            ]
          },
          {
            name: 'Ceiling fans (%)',
            color: '#dc2626',
            points: [
              { label: '2006', value: 90 },
              { label: '2010', value: 70 },
              { label: '2014', value: 50 }
            ]
          }
        ]
      }
    ],
    rows: [
      {
        field: 'Air conditioners trend (2006–2014)',
        studentA: '2006: 5% -> 2010: 7% (increased slightly) -> 2014: 40% (rose sharply)',
        studentB: '(1) How did air conditioner ownership change from 2006 to 2014?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How did the percentage of air conditioners change from 2006 to 2014?',
        suggestedAnswer:
          'The percentage of air conditioners increased slightly from 5% in 2006 to 7% in 2010, and then rose sharply to 40% in 2014.'
      },
      {
        field: 'Refrigerators trend (2006–2014)',
        studentA: '2006: 30% -> 2010: 45% -> 2014: 55% (increased steadily)',
        studentB: '(2) What happened to refrigerators over the same period?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What happened to refrigerator ownership over the same period?',
        suggestedAnswer:
          'The percentage of refrigerators increased steadily from 30% in 2006 to 45% in 2010 and 55% in 2014.'
      },
      {
        field: 'Ceiling fans & Overall comparison',
        studentA:
          '2006: 90% -> 2010: 70% (decreased significantly) -> 2014: 50% (continued to fall); AC & Fridges: upward trend, Fans: downward',
        studentB: '(3) What is the trend for ceiling fans and the overall conclusion?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the trend for ceiling fans and the overall takeaway?',
        suggestedAnswer:
          'Ceiling fans decreased significantly from 90% in 2006 to 70% in 2010, then fell to 50% in 2014. Overall, air conditioners and refrigerators showed an upward trend, while ceiling fans showed a downward trend.'
      }
    ],
    keyExpressions: [
      'The line graph shows the percentage of ... from 2006 to 2014.',
      'increased slightly from 5% to 7%',
      'rose sharply to 40%',
      'increased steadily from 30% to 55%',
      'decreased significantly from 90% to 70%',
      'showed an upward / downward trend'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'The line graph shows the percentage of home appliance ownership in Vietnam from 2006 to 2014, including air conditioners, refrigerators, and ceiling fans.',
        translationVi: 'Biểu đồ đường thể hiện tỷ lệ sở hữu thiết bị gia dụng tại Việt Nam từ 2006 đến 2014 gồm điều hoà, tủ lạnh và quạt trần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'How did the percentage of air conditioners change from 2006 to 2014?',
        translationVi: 'Tỷ lệ sở hữu điều hoà thay đổi thế nào từ 2006 đến 2014?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'As you can see, the percentage of air conditioners increased slightly from 5% in 2006 to 7% in 2010. Then, it rose sharply to 40% in 2014.',
        translationVi: 'Như bạn thấy, điều hoà tăng nhẹ từ 5% năm 2006 lên 7% năm 2010, sau đó tăng vọt lên 40% vào năm 2014.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'And what about refrigerators and ceiling fans?',
        translationVi: 'Thế còn tủ lạnh và quạt trần thì sao?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'Refrigerators increased steadily from 30% in 2006 to 45% in 2010 and 55% in 2014. However, ceiling fans decreased significantly from 90% to 70% in 2010 and continued to fall to 50% in 2014. Overall, air conditioners and refrigerators showed an upward trend, while ceiling fans showed a downward trend.',
        translationVi: 'Tủ lạnh tăng đều từ 30% lên 45% năm 2010 và 55% năm 2014. Ngược lại, quạt trần giảm đáng kể từ 90% xuống 70% và còn 50% năm 2014. Nhìn chung điều hoà và tủ lạnh có xu hướng tăng, còn quạt trần giảm.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 7 (Card.md): EVN Company Electrical Engineer Job Interview
   * ======================================================================== */
  {
    id: 'card_u7_evn_interview',
    unit: 7,
    cardCode: 'Unit 7 • Card.md',
    title: 'EVN Company Job Interview',
    subtitleVi: 'Phỏng vấn vị trí Kỹ sư Điện – Điện tử tại EVN (tài liệu Card.md)',
    source: 'textbook_supplement',
    scenarioVi:
      'Student A đóng vai nhà tuyển dụng tại Công ty EVN phỏng vấn Student B cho vị trí Kỹ sư Điện/Điện tử dựa theo các mục trên phiếu Card Unit 7 trong Card.md.',
    roleAName: 'Student A (Interviewer - EVN Company)',
    roleBName: 'Student B (Candidate)',
    rows: [
      {
        field: 'Greeting',
        studentA: '(Greet the candidate to EVN Company)',
        studentB: 'Greet politely and respond to welcome',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Good morning! Welcome to EVN Company.',
        suggestedAnswer: 'Good morning! Thank you for inviting me today.'
      },
      {
        field: 'Career objectives',
        studentA: '(1) What are your career objectives?',
        studentB: 'Become a good electrical / electronics engineer',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are your career objectives?',
        suggestedAnswer: 'I want to become a good electrical and electronics engineer.'
      },
      {
        field: 'Experience',
        studentA: '(2) What did you learn from your last job / internship?',
        studentB:
          'Internship at Samsung Company: repair and maintain electrical systems, design circuit boards, write technical reports',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What did you learn from your last job or internship?',
        suggestedAnswer:
          'During my internship at Samsung Company, I learned to repair and maintain electrical systems, design circuit boards and write technical reports.'
      },
      {
        field: 'Skills',
        studentA: '(3) Do you have any special skills?',
        studentB: 'Good at languages: can speak English and Chinese very well',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Do you have any special skills?',
        suggestedAnswer: "I'm good at languages. I can speak English and Chinese very well."
      },
      {
        field: 'Strengths and weaknesses',
        studentA: '(4) What are your strengths and weaknesses?',
        studentB:
          'Strengths: communication skills & ability to work under high pressure; Weakness: lack work experience',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are your strengths and weaknesses?',
        suggestedAnswer:
          'My biggest strengths are communication skills and the ability to work under high pressure. My weakness is that I lack work experience.'
      },
      {
        field: 'Reasons to employ',
        studentA: '(5) Why should we hire you?',
        studentB:
          'Contribute technical knowledge and skills, Chinese communication, and strategies for effective teamwork',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Why should we hire you?',
        suggestedAnswer:
          'Because I can contribute not only technical knowledge and skills and Chinese communication, but also strategies for effective teamwork.'
      }
    ],
    keyExpressions: [
      'What are your career objectives?',
      'During my internship at ..., I learned to ...',
      'My biggest strengths are ...',
      'ability to work under high pressure',
      'not only ... but also ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'Good morning! Welcome to EVN Company.',
        translationVi: 'Chào buổi sáng! Chào mừng bạn đến với Công ty EVN.'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'Good morning!',
        translationVi: 'Chào buổi sáng anh/chị!'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'What are your career objectives?',
        translationVi: 'Mục tiêu nghề nghiệp của bạn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'I want to become a good electronics and electrical engineer.',
        translationVi: 'Tôi muốn trở thành một kỹ sư điện – điện tử giỏi.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'What did you learn from your last job?',
        translationVi: 'Bạn đã học được gì từ công việc / kỳ thực tập trước?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'During my internship at Samsung Company, I learned to repair and maintain electrical systems, design circuit boards and write technical reports.',
        translationVi: 'Trong kỳ thực tập tại Samsung, tôi đã học cách sửa chữa bảo trì hệ thống điện, thiết kế mạch in và viết báo cáo kỹ thuật.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'Do you have any special skills?',
        translationVi: 'Bạn có kỹ năng đặc biệt nào không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: "I'm good at languages. I can speak English and Chinese very well.",
        translationVi: 'Tôi giỏi ngoại ngữ, có thể nói tiếng Anh và tiếng Trung rất tốt.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'What are your strengths and weaknesses?',
        translationVi: 'Điểm mạnh và điểm yếu của bạn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'My biggest strengths are communication skills and the ability to work under high pressure. My weakness is that I lack work experience.',
        translationVi: 'Điểm mạnh nhất của tôi là kỹ năng giao tiếp và khả năng làm việc dưới áp lực cao. Điểm yếu là tôi chưa có nhiều kinh nghiệm làm việc.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'Why should we hire you?',
        translationVi: 'Tại sao chúng tôi nên tuyển bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'Because I can contribute not only technical knowledge and skills and Chinese communication, but also strategies for effective teamwork.',
        translationVi: 'Bởi vì tôi có thể đóng góp không chỉ kiến thức kỹ thuật, giao tiếp tiếng Trung mà còn chiến lược làm việc nhóm hiệu quả.'
      }
    ]
  },

  /* ==========================================================================
   * CARD 7 (UNIT 8): Resort Washing Machine System Maintenance Meeting
   * ======================================================================== */
  {
    id: 'card_u8_washer_meeting',
    unit: 8,
    cardCode: 'Card 7 • Unit 8',
    title: 'Resort Washing Machine System Maintenance Meeting',
    subtitleVi: 'Thảo luận lưu đồ bảo trì hệ thống máy giặt khu nghỉ dưỡng (ÔN TẬP THI KTHP)',
    source: 'card_docx',
    scenarioVi:
      'Student A và Student B là hai kỹ thuật viên thảo luận quy trình bảo trì hệ thống máy giặt trong resort theo lưu đồ: đưa ý kiến, ngắt lời lịch sự, đồng ý, nhấn mạnh lau vỏ bằng khăn mềm, phản biện chu kỳ thay mới 1 năm -> 5 năm và chốt kế hoạch.',
    roleAName: 'Student A',
    roleBName: 'Student B',
    flowSteps: [
      {
        speaker: 'A',
        action: 'Make a point: Keep the washer level & clean the inside (once monthly)',
        sampleLine:
          'I think we should keep the washing machines level and clean the inside once a month.'
      },
      {
        speaker: 'B',
        action: 'Interrupt: Firstly: Cut power to avoid electric shock',
        sampleLine:
          'Sorry to interrupt, but we must turn off the power first to avoid electric shock.'
      },
      {
        speaker: 'A',
        action: 'Strongly agree',
        sampleLine: "You're absolutely right. Safety is very important."
      },
      {
        speaker: 'B',
        action: 'Make a point: Remove and clean the filter -> Help washer run efficiently; Polish the outside',
        sampleLine:
          'We should also remove and clean the filters to help the machines run efficiently. We should clean the outside too.'
      },
      {
        speaker: 'A',
        action: 'Comment and emphasize: Use a soft cloth to wipe out',
        sampleLine: 'I agree. We should use a soft cloth to clean the outside.'
      },
      {
        speaker: 'B',
        action: 'Strongly agree',
        sampleLine: 'I totally agree with you.'
      },
      {
        speaker: 'A',
        action: 'Make a point: Suggest replacing the washing machines every year (short period)',
        sampleLine: 'I think we should replace the washing machines every year.'
      },
      {
        speaker: 'B',
        action: 'Interrupt: Strongly disagree (1 year is too short) -> Recommend 5 years',
        sampleLine:
          'I strongly disagree. One year is too short. I recommend replacing them every five years.'
      },
      {
        speaker: 'Both',
        action: 'Reach the decision: Agree to check/clean regularly & replace every 5 years',
        sampleLine:
          "That's reasonable. So, we agree to check and clean the machines regularly and replace them every five years if necessary."
      }
    ],
    keyExpressions: [
      'I think we should ...',
      'Sorry to interrupt, but ...',
      "You're absolutely right. / I totally agree with you.",
      'I strongly disagree. ... I recommend ...',
      'So, we agree to ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Hi! Today, we need to discuss how to maintain the washing machines in our resort.',
        translationVi: 'Chào bạn! Hôm nay chúng ta cần thảo luận cách bảo trì hệ thống máy giặt của khu nghỉ dưỡng.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "That's a good idea. What should we do first?",
        translationVi: 'Ý hay đấy. Trước tiên chúng ta nên làm gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I think we should keep the washing machines level and clean the inside once a month.',
        translationVi: 'Tôi nghĩ nên giữ máy giặt kê thăng bằng và vệ sinh lồng giặt mỗi tháng một lần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Sorry to interrupt, but we must turn off the power first to avoid electric shock.',
        translationVi: 'Xin lỗi đã ngắt lời, nhưng trước tiên ta phải ngắt nguồn điện để tránh giật điện.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "You're absolutely right. Safety is very important.",
        translationVi: 'Bạn nói hoàn toàn đúng. An toàn là trên hết.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'We should also remove and clean the filters to help the machines run efficiently. We should clean the outside too.',
        translationVi: 'Ta cũng nên tháo và vệ sinh lưới lọc để máy chạy hiệu quả, và lau bên ngoài nữa.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I agree. We should use a soft cloth to clean the outside.',
        translationVi: 'Tôi đồng ý. Ta nên dùng khăn mềm để lau bên ngoài.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'I totally agree with you.',
        translationVi: 'Tôi hoàn toàn đồng ý với bạn.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I think we should replace the washing machines every year.',
        translationVi: 'Tôi nghĩ ta nên thay máy giặt mỗi năm một lần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'I strongly disagree. One year is too short. I recommend replacing them every five years.',
        translationVi: 'Tôi hoàn toàn không đồng ý. Một năm là quá ngắn. Tôi đề xuất thay sau mỗi năm năm.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "That's reasonable. So, we agree to check and clean the machines regularly and replace them every five years if necessary.",
        translationVi: 'Hợp lý đấy. Vậy ta thống nhất kiểm tra, vệ sinh định kỳ và thay máy mỗi 5 năm nếu cần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Great! Let's follow this plan.",
        translationVi: 'Tuyệt! Cứ theo kế hoạch này nhé.'
      }
    ]
  }
];

export const MONO_TALKS_BY_UNIT: Record<number, MonoTalkSample> = {
  1: {
    unit: 1,
    title: 'Dream Company — Samsung Electronics',
    topicVi: 'Giới thiệu công ty điện tử bạn muốn làm việc trong tương lai',
    script:
      'Today I will talk about the company I want to work for in the future. The company I want to work for is Samsung Electronics. Samsung has a modern working environment and encourages teamwork and creativity. I want to work there because Samsung is a big and successful company. I can learn many new things and improve my skills. I have some knowledge of electrical systems, control systems, and programming. I can use these skills to help the company. I will work hard, learn from other engineers, and work well with my colleagues. In the future, I hope to become a good engineer at Samsung.'
  },
  2: {
    unit: 2,
    title: 'SmartHome Watch Invention',
    topicVi: 'Giới thiệu một sản phẩm thông minh bạn tự phát minh',
    script:
      'I am an electronic engineer, and I have invented a new smart product called SmartHome Watch. It is a smart watch designed to help users monitor their health and control smart devices. The watch has a 1.5-inch AMOLED screen, a 400 mAh battery, Bluetooth 5.3, Wi-Fi, and several sensors for heart rate, steps, and sleep. It is compatible with Android and iOS smartphones through the SmartHome app. Users can connect the watch to their phones via Bluetooth and Wi-Fi to receive messages, make calls, and control smart lights. Its key features include health monitoring, GPS, voice control, sleep tracking, and emergency alerts. Compared with other smart watches, SmartHome Watch has a longer battery life and can control more smart home devices. It is convenient, safe, and easy to use.'
  },
  3: {
    unit: 3,
    title: 'How to Replace a Ceiling Light Fixture',
    topicVi: 'Hướng dẫn 8 bước thay đèn trần & an toàn điện',
    script:
      'Hello. Today, I am going to show you how to replace a ceiling light fixture. There are eight steps. We need some equipment: a screwdriver, a wire stripper, wire connectors, and a new light fixture. First, turn off the power and remove the old light fixture. Second, disconnect the old wires carefully. Third, use a wire stripper to strip the wires. Fourth, cut and prepare the wires for the new light fixture. Fifth, connect the wires of the new light fixture to the ceiling wires. Sixth, use wire connectors to secure the connections. Seventh, attach the new light fixture to the ceiling and tighten the screws. Finally, install the light cover and make sure it is secure. Before starting, make sure the power is off. Be careful with the wires and always check the connections before turning on the power.'
  },
  4: {
    unit: 4,
    title: 'Solving Daikin AC Error Code U0 (Model FTXS35K2V1B)',
    topicVi: 'Trình bày 4 nguyên nhân & cách khắc phục mã lỗi U0 điều hoà Daikin',
    script:
      'Hello everyone. Today, I will talk about how to solve the U0 error code of a Daikin air conditioner. The model is FTXS35K2V1B. The problem is that the air conditioner does not cool. There are four possible causes. First, there may be a shortage of coolant or coolant clogging. In this case, we should find the leakage and recharge the coolant. Second, the thermistor may be defective. We should repair or replace the thermistor. Third, the low-pressure sensor may be defective. We should replace the sensor. Finally, the outdoor unit main PCB may be defective. We should repair or replace the outdoor unit main PCB. There are also some precautions. We should check that the base, stand and other fittings of the outdoor unit are not decayed or corroded. We should also check that nothing blocks the air inlets and outlets of the indoor and outdoor units. Finally, we should ask a professional technician to maintain the air conditioner every year.'
  },
  5: {
    unit: 5,
    title: 'Handling Customer Complaint — Joan Tran (Order T6758)',
    topicVi: 'Thuật lại tình huống xử lý khiếu nại khách hàng Joan Tran (Vietnam Airlines)',
    script:
      'Hello everyone! Today, I would like to tell you about a customer complaint I handled. This morning, I received a complaint from a customer. Her name is Joan Tran. She works at Vietnam Airlines. There were two problems with her last order. First, she ordered 75 gas turbine blades, but she received only 70. Five blades were missing. Second, she received the wrong vanes. She ordered ST23-56R, but received ST28-56R. Our staff might have made mistakes when packing the order. I offered to send the five missing blades and replace the wrong vanes. She accepted my offers and thanked me.'
  },
  6: {
    unit: 6,
    title: 'Line Graph: Home Appliance Ownership in Vietnam (2006–2014)',
    topicVi: 'Mô tả biểu đồ đường sở hữu điều hoà, tủ lạnh và quạt trần (2006–2014)',
    script:
      'Today, I will talk about this line graph. The line graph shows the percentage of home appliance ownership in Vietnam from 2006 to 2014, including air conditioners, refrigerators, and ceiling fans. As you can see, the percentage of air conditioners increased slightly from 5% in 2006 to 7% in 2010. Then, it rose sharply to 40% in 2014. The percentage of refrigerators also increased steadily from 30% in 2006 to 45% in 2010 and 55% in 2014. However, the percentage of ceiling fans decreased significantly from 90% in 2006 to 70% in 2010. Then, it continued to fall to 50% in 2014. Overall, air conditioners and refrigerators showed an upward trend, while ceiling fans showed a downward trend.'
  },
  7: {
    unit: 7,
    title: 'Personal Self-Introduction & Career Profile',
    topicVi: 'Giới thiệu bản thân, học vấn, kinh nghiệm và mục tiêu nghề nghiệp',
    script:
      'My name is Nguyen Huu Nhat Minh. I am 20 years old, and I come from Hanoi, Vietnam. I am a student at Hanoi University of Industry. My major is Control Engineering and Automation. My GPA is 3.5 out of 4.0. I have worked at A&D Automation Company. I have experience in electrical and automation systems. I have basic knowledge of PLC, AutoCAD, and C/C++ programming. I also have good teamwork and problem-solving skills. In my free time, I enjoy learning about new technology and designing electrical systems. My goal is to become a professional engineer and improve my technical skills. I hope to work for your company.'
  }
};

export const CARDS_BY_UNIT: Record<number, SpeakingCard[]> = SPEAKING_CARDS.reduce<
  Record<number, SpeakingCard[]>
>((acc, card) => {
  if (!acc[card.unit]) {
    acc[card.unit] = [];
  }
  acc[card.unit].push(card);
  return acc;
}, {});

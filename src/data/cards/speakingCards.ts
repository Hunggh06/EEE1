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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào bạn cùng cặp, nhắc bối cảnh tuần tới có buổi phỏng vấn ở Công ty Hon Hai Precision Industry và rủ trao đổi thông tin công ty.',
      contextHintB:
        'Đồng ý rằng cần tìm hiểu thông tin công ty trước và sẵn sàng trao đổi cùng nhau.',
      sampleLineA:
        "Hi! We have an interview at Hon Hai Precision Industry Company next week. Let's exchange some information about it.",
      sampleLineB:
        'Yes, we do. We should learn some information about the company first. Good idea!',
      closingStarter: 'B',
      closingHintB: 'Nhận xét có nhiều thông tin hữu ích và động viên chuẩn bị thật tốt cho buổi phỏng vấn.',
      closingHintA: 'Đồng ý và nói rằng hai bạn đã sẵn sàng cho buổi phỏng vấn.',
      sampleClosingB: "That's a lot of useful information. Great! Let's prepare well for it.",
      sampleClosingA: 'Yes. I think we are ready for the interview now.'
    },
    rows: [
      {
        field: 'Trading name',
        studentA: '(1) What is its trading name?',
        studentB: 'Foxconn Technology Group',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its trading name?',
        suggestedAnswer: 'Its trading name is Foxconn Technology Group.'
      },
      {
        field: 'Reputation',
        studentA:
          "The world's largest contract electronics manufacturer; one of the biggest exporters of China",
        studentB: '(1) What is the company famous for?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the company famous for?',
        suggestedAnswer:
          "It is famous for being the world's largest contract electronics manufacturer and one of the biggest exporters of China."
      },
      {
        field: 'Founded year',
        studentA: '(2) When was it founded?',
        studentB: '1974',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'When was it founded?',
        suggestedAnswer: 'It was founded in 1974.'
      },
      {
        field: 'Headquarters',
        studentA: 'New Taipei City, Taiwan',
        studentB: '(2) Where is its head office?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Where is its head office?',
        suggestedAnswer: 'Its head office is in New Taipei City, Taiwan.'
      },
      {
        field: 'Chairman',
        studentA: '(3) Who is the chairman of the company?',
        studentB: 'Terry Gou',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Who is the chairman of the company?',
        suggestedAnswer: 'The chairman is Terry Gou.'
      },
      {
        field: 'Specializations',
        studentA: 'Computer, Communication, Consumer electronics',
        studentB: '(3) What does the company specialize in?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What does the company specialize in?',
        suggestedAnswer: 'It specializes in computer, communication, and consumer electronics.'
      },
      {
        field: 'Products',
        studentA: '(4) What are its major products?',
        studentB:
          'Electronics components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), Computer chips',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are its major products?',
        suggestedAnswer:
          'Its major products are electronic components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), and computer chips.'
      },
      {
        field: 'Number of employees',
        studentA: '1.3 million',
        studentB: '(4) How many employees does it have?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How many employees does it have?',
        suggestedAnswer: 'It has about 1.3 million employees.'
      },
      {
        field: 'Number of subsidiaries',
        studentA: '(5) How many subsidiaries does it have?',
        studentB: '10',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'How many subsidiaries does it have?',
        suggestedAnswer: 'It has 10 subsidiaries.'
      },
      {
        field: 'Annual revenue',
        studentA: 'Over $136 billion',
        studentB: '(5) What is its annual revenue?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is its annual revenue?',
        suggestedAnswer: 'Its annual revenue is over $136 billion.'
      },
      {
        field: 'Mission',
        studentA: '(6) What is its mission?',
        studentB: "contribute to customer's success by developing effective products and services",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its mission?',
        suggestedAnswer:
          "Its mission is to contribute to customers' success by developing effective products and services."
      },
      {
        field: 'Vision',
        studentA: 'become a leader in developing creative, comprehensive solutions for customers',
        studentB: '(6) What is its vision?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is its vision?',
        suggestedAnswer:
          'Its vision is to become a leader in developing creative, comprehensive solutions for customers.'
      }
    ],
    keyExpressions: [
      'What is its trading name?',
      'What is the company famous for?',
      'Where is its head office?',
      'What does the company specialize in?',
      'What are its major products?',
      'Its annual revenue is over $136 billion.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Hi! We have an interview at Hon Hai Precision Industry Company next week.',
        translationVi: 'Chào bạn! Tuần tới chúng ta có buổi phỏng vấn ở Công ty Hon Hai Precision Industry.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Yes, we do. We should learn some information about the company first.',
        translationVi: 'Đúng rồi. Chúng ta nên tìm hiểu một số thông tin về công ty trước.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "Good idea. Let's exchange some information about it. What is its trading name?",
        translationVi: 'Ý hay đấy. Hãy cùng trao đổi thông tin nhé. Tên thương mại của công ty là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its trading name is Foxconn Technology Group. What is the company famous for?',
        translationVi: 'Tên thương mại là Foxconn Technology Group. Công ty nổi tiếng về điều gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "It is famous for being the world's largest contract electronics manufacturer and one of the biggest exporters of China. When was it founded?",
        translationVi: 'Nổi tiếng là nhà sản xuất điện tử theo hợp đồng lớn nhất thế giới và một trong những nhà xuất khẩu lớn nhất Trung Quốc. Công ty thành lập năm nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It was founded in 1974. Where is its head office?',
        translationVi: 'Thành lập năm 1974. Trụ sở chính ở đâu?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its head office is in New Taipei City, Taiwan. Who is the chairman of the company?',
        translationVi: 'Trụ sở chính ở Thành phố Tân Bắc, Đài Loan. Ai là chủ tịch công ty?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'The chairman is Terry Gou. What does the company specialize in?',
        translationVi: 'Chủ tịch là ông Terry Gou. Công ty chuyên về lĩnh vực gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It specializes in computer, communication, and consumer electronics. What are its major products?',
        translationVi: 'Chuyên về máy tính, truyền thông và điện tử tiêu dùng. Sản phẩm chính là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its major products are electronic components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), and computer chips. How many employees does it have?',
        translationVi: 'Sản phẩm chính gồm linh kiện điện tử, bảng mạch in PCB, GPU và chip máy tính. Công ty có bao nhiêu nhân viên?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It has about 1.3 million employees. How many subsidiaries does it have?',
        translationVi: 'Có khoảng 1,3 triệu nhân viên. Có bao nhiêu công ty con?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It has 10 subsidiaries. What is its annual revenue?',
        translationVi: 'Có 10 công ty con. Doanh thu hằng năm là bao nhiêu?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its annual revenue is over $136 billion. What is its mission?',
        translationVi: 'Doanh thu hằng năm hơn 136 tỷ đô la. Sứ mệnh của công ty là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Its mission is to contribute to customers' success by developing effective products and services. What is its vision?",
        translationVi: 'Sứ mệnh là đóng góp vào thành công của khách hàng bằng việc phát triển sản phẩm và dịch vụ hiệu quả. Tầm nhìn là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its vision is to become a leader in developing creative, comprehensive solutions for customers.',
        translationVi: 'Tầm nhìn là trở thành doanh nghiệp dẫn đầu trong phát triển các giải pháp sáng tạo, toàn diện cho khách hàng.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "That's a lot of useful information.",
        translationVi: 'Nhiều thông tin hữu ích quá.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Yes. I think we are ready for the interview now.',
        translationVi: 'Đúng vậy. Mình nghĩ giờ tụi mình sẵn sàng cho buổi phỏng vấn rồi.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Great! Let's prepare well for it.",
        translationVi: 'Tuyệt! Hãy chuẩn bị thật tốt nhé.'
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
    leadIn: {
      starterSpeaker: 'B',
      contextHintB:
        'Chào mừng ứng viên đến buổi phỏng vấn tại Tập đoàn Panasonic và dẫn dắt bắt đầu trao đổi.',
      contextHintA:
        'Chào HR Manager, cảm ơn đã mời phỏng vấn hôm nay và bày tỏ sẵn sàng bắt đầu.',
      sampleLineB:
        "Good morning! Nice to meet you. I'm the HR Manager of Panasonic Corporation. Thank you for joining this interview today.",
      sampleLineA: "Good morning! Nice to meet you.",
      closingStarter: 'B',
      closingHintB: 'Khen ngợi phần trả lời của ứng viên và cảm ơn đã tham gia phỏng vấn.',
      closingHintA: 'Cảm ơn HR Manager đã dành thời gian giải đáp và chào tạm biệt.',
      sampleClosingB: "That's great! Thank you for your answers.",
      sampleClosingA: 'Thank you.'
    },
    rows: [
      {
        field: 'Company background (B hỏi A)',
        studentA:
          "Multinational electronics corporation; The world's fourth-largest television manufacturer; Founded year: 1918; Specializations: Consumer electronics, home appliances",
        studentB: 'What do you know about our company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What do you know about our company?',
        suggestedAnswer:
          "Panasonic is a multinational electronics corporation and the world's fourth-largest TV manufacturer. It was founded in 1918. It is famous for consumer electronics and home appliances."
      },
      {
        field: 'Company mission (B hỏi A)',
        studentA:
          'Create value and contribute to society with innovative technologies and products',
        studentB: "What is our company's mission?",
        bIsQuestionPrompt: true,
        suggestedQuestion: "What is our company's mission?",
        suggestedAnswer:
          'Its mission is to create value and contribute to society with innovative technologies and products.'
      },
      {
        field: 'Reasons to work for the company (B hỏi A)',
        studentA:
          'Admire high-quality products, especially LED televisions; Enhance knowledge and skills; Gain experiences',
        studentB: 'Why do you want to work for our company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Why do you want to work for our company?',
        suggestedAnswer:
          "Because I admire Panasonic's high-quality products, especially LED televisions. I also want to improve my knowledge and skills and gain more experience."
      },
      {
        field: 'Possible contribution (B hỏi A)',
        studentA:
          'Technical knowledge and skills; English communication skills; Ability to work in groups',
        studentB: 'What can you contribute to our company if you are hired?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What can you contribute to our company if you are hired?',
        suggestedAnswer:
          'I can contribute my technical knowledge and skills, English communication skills, and ability to work in a team.'
      },
      {
        field: 'Company culture (A hỏi B)',
        studentA: "Can you describe the company's culture?",
        studentB:
          'Create culture: Focus on risk-taking and innovation; Encourage employee creativity by rewarding innovative ideas',
        aIsQuestionPrompt: true,
        suggestedQuestion: "Can you describe the company's culture?",
        suggestedAnswer:
          'Your company focuses on risk-taking and innovation. It also encourages employees to be creative and rewards innovative ideas.'
      },
      {
        field: "Company's management style (A hỏi B)",
        studentA: "What about the company's management style?",
        studentB:
          "Participative style: Encourage employee input in decision making; Reward team's effort",
        aIsQuestionPrompt: true,
        suggestedQuestion: "What about the company's management style?",
        suggestedAnswer:
          'Your company has a participative management style. It encourages employees to give ideas and take part in decision-making. It also rewards teamwork.'
      },
      {
        field: "Company's goals (A hỏi B)",
        studentA: "What are the company's goals?",
        studentB:
          'Increase annual revenue; Introduce non-electronics products to the market; Create new business and promote innovation',
        aIsQuestionPrompt: true,
        suggestedQuestion: "What are the company's goals?",
        suggestedAnswer:
          'Your company wants to increase annual revenue, introduce non-electronics products to the market, and create new businesses. It also wants to promote innovation.'
      },
      {
        field: 'Possible position in next 5 years (A hỏi B)',
        studentA: 'Where do you think the company is headed in the next 5 years?',
        studentB: "The world's largest television manufacturer",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Where do you think the company is headed in the next 5 years?',
        suggestedAnswer:
          "Your company will become the world's largest television manufacturer."
      }
    ],
    keyExpressions: [
      'What do you know about our company?',
      'What can you contribute to our company if you are hired?',
      "Can you describe the company's culture?",
      "What about the company's management style?",
      'participative management style',
      'Where do you think the company is headed in the next 5 years?'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "Good morning! Nice to meet you. I'm the HR Manager of Panasonic Corporation. Thank you for joining this interview today.",
        translationVi: 'Chào buổi sáng! Rất vui được gặp bạn. Tôi là Trưởng phòng Nhân sự của Tập đoàn Panasonic. Cảm ơn bạn đã tham gia phỏng vấn hôm nay.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Good morning! Nice to meet you.',
        translationVi: 'Chào buổi sáng! Rất vui được gặp anh/chị.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'What do you know about our company?',
        translationVi: 'Bạn biết gì về công ty chúng tôi?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Panasonic is a multinational electronics corporation and the world's fourth-largest TV manufacturer. It was founded in 1918. It is famous for consumer electronics and home appliances.",
        translationVi: 'Panasonic là tập đoàn điện tử đa quốc gia và là nhà sản xuất TV lớn thứ tư thế giới, thành lập năm 1918, nổi tiếng về điện tử tiêu dùng và thiết bị gia dụng.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "What is our company's mission?",
        translationVi: 'Sứ mệnh của công ty chúng tôi là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Its mission is to create value and contribute to society with innovative technologies and products.',
        translationVi: 'Sứ mệnh là tạo ra giá trị và đóng góp cho xã hội bằng công nghệ và sản phẩm tiên tiến.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Why do you want to work for our company?',
        translationVi: 'Tại sao bạn muốn làm việc cho công ty chúng tôi?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Because I admire Panasonic's high-quality products, especially LED televisions. I also want to improve my knowledge and skills and gain more experience.",
        translationVi: 'Vì tôi ngưỡng mộ các sản phẩm chất lượng cao của Panasonic, đặc biệt là TV LED, và tôi muốn nâng cao kiến thức, kỹ năng cũng như tích lũy thêm kinh nghiệm.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'What can you contribute to our company if you are hired?',
        translationVi: 'Bạn có thể đóng góp gì cho công ty nếu được tuyển dụng?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'I can contribute my technical knowledge and skills, English communication skills, and ability to work in a team.',
        translationVi: 'Tôi có thể đóng góp kiến thức và kỹ năng chuyên môn kỹ thuật, kỹ năng giao tiếp tiếng Anh và khả năng làm việc nhóm.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Today, I'd like to ask you some questions about our company. Can you describe the company's culture?",
        translationVi: 'Tôi cũng muốn hỏi thêm một vài câu về công ty. Anh/chị có thể mô tả văn hoá doanh nghiệp không?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Our company focuses on risk-taking and innovation. It also encourages employees to be creative and rewards innovative ideas.',
        translationVi: 'Công ty chú trọng tinh thần dám chấp nhận thử thách và đổi mới, khuyến khích nhân viên sáng tạo và khen thưởng các ý tưởng mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "What about the company's management style?",
        translationVi: 'Phong cách quản lý của công ty thế nào ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Our company has a participative management style. It encourages employees to give ideas and take part in decision-making. It also rewards teamwork.',
        translationVi: 'Công ty áp dụng phong cách quản lý có sự tham gia, khuyến khích nhân viên đóng góp ý kiến ra quyết định và khen thưởng tinh thần làm việc nhóm.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "What are the company's goals?",
        translationVi: 'Các mục tiêu của công ty là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Our company wants to increase annual revenue, introduce non-electronics products to the market, and create new businesses. It also wants to promote innovation.',
        translationVi: 'Công ty muốn tăng doanh thu hằng năm, đưa sản phẩm phi điện tử ra thị trường, tạo ngành kinh doanh mới và thúc đẩy đổi mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Where do you think the company is headed in the next 5 years?',
        translationVi: 'Anh/chị dự đoán công ty sẽ đứng ở vị trí nào trong 5 năm tới?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'I think our company will become the world’s largest television manufacturer.',
        translationVi: 'Tôi nghĩ công ty sẽ trở thành nhà sản xuất TV lớn nhất thế giới.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "That's great! Thank you for your answers.",
        translationVi: 'Tuyệt vời! Cảm ơn câu trả lời của bạn.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Thank you.',
        translationVi: 'Cảm ơn anh/chị ạ.'
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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào đối tác, nói rằng bạn đang có một số thông tin về đồng hồ thông minh Samsung SM Gear Fit 2 và đề nghị cùng trao đổi các thông số còn thiếu.',
      contextHintB:
        'Đồng ý ngay và mời bắt đầu.',
      sampleLineA:
        "Hi! We have some information about the Samsung SM Gear Fit 2 smartwatch. Let's exchange the missing information.",
      sampleLineB: "Sure. Let's start.",
      closingStarter: 'A',
      closingHintA: 'Nhận xét rằng cả hai đã có đủ các thông tin còn thiếu.',
      closingHintB: 'Đồng tình và xác nhận có thể hoàn thiện bản mô tả tính năng của đồng hồ Samsung SM Gear Fit 2.',
      sampleClosingA: 'Great! Now we have all the missing information.',
      sampleClosingB:
        'Yes. We can complete the feature description of the Samsung SM Gear Fit 2 smartwatch.'
    },
    rows: [
      {
        field: 'Operating System',
        studentA: 'Tizen OS',
        studentB: '(1) What operating system does it run?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What operating system does it run?',
        suggestedAnswer: 'It runs on Tizen OS.'
      },
      {
        field: 'Processor',
        studentA: '(1) What processor is it powered by?',
        studentB: 'EX3250 dual-core 1GHz',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What processor is it powered by?',
        suggestedAnswer: 'It is powered by an EX3250 dual-core 1GHz processor.'
      },
      {
        field: 'Compatibility',
        studentA: 'Android 4.4 or higher; iOS 9.0 or above',
        studentB: '(2) What operating systems is it compatible with?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What operating systems is it compatible with?',
        suggestedAnswer: 'It is compatible with Android 4.4 or higher and iOS 9.0 or above.'
      },
      {
        field: 'Integrated sensor',
        studentA: '(2) Which sensors is it integrated with?',
        studentB: 'Accelerometer, Gyroscope, Barometer',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Which sensors is it integrated with?',
        suggestedAnswer: 'It is integrated with an accelerometer, gyroscope, and barometer.'
      },
      {
        field: 'Key features — Names',
        studentA: 'GPS Exercise, Notifications, Music Player',
        studentB: '(3) What are its key features?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are its key features?',
        suggestedAnswer: 'Its key features are GPS Exercise, Notifications, and Music Player.'
      },
      {
        field: 'Key features — Functions',
        studentA:
          'Give accurate exercise statistics; Receive or respond to call and text; Connect with Spotify to access online music and stream your favorite songs',
        studentB: '(4) What are their functions?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are their functions?',
        suggestedAnswer:
          'GPS Exercise gives accurate exercise statistics. Notifications allow you to receive or respond to calls and text messages. Music Player connects with Spotify to access online music and stream your favourite songs.'
      },
      {
        field: 'Additional features — Names',
        studentA: '(3) What are its additional features?',
        studentB: 'Sleep Tracking, Auto Exercise Tracking, Auto Heart Rate Tracking',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are its additional features?',
        suggestedAnswer:
          'The additional features are Sleep Tracking, Auto Exercise Tracking, and Auto Heart Rate Tracking.'
      },
      {
        field: 'Additional features — Functions',
        studentA: '(4) What are their functions?',
        studentB:
          'Record sleeping hours and notify breathes per minute; Record your exercise; Measure heartbeat when training',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are their functions?',
        suggestedAnswer:
          'Sleep Tracking records sleep patterns. Auto Exercise Tracking records your exercise. Auto Heart Rate Tracking measures your heartbeat when training.'
      }
    ],
    keyExpressions: [
      'What processor is it powered by? -> It is powered by ...',
      'What operating system does it run? -> It runs on ...',
      'Which sensors is it integrated with? -> It is integrated with ...',
      'What operating systems is it compatible with?',
      'What are its key / additional features? -> What are their functions?'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "Hi! We have some information about the Samsung SM Gear Fit 2 smartwatch. Let's exchange the missing information.",
        translationVi: 'Chào bạn! Chúng ta đang có thông tin về đồng hồ thông minh Samsung SM Gear Fit 2. Hãy trao đổi những phần còn thiếu nhé.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Sure. Let's start.",
        translationVi: 'Chắc chắn rồi. Bắt đầu nhé.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'What processor is it powered by?',
        translationVi: 'Máy được trang bị bộ vi xử lý gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is powered by an EX3250 dual-core 1GHz processor. What operating system does it run?',
        translationVi: 'Máy chạy bộ vi xử lý EX3250 lõi kép 1GHz. Máy chạy hệ điều hành gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It runs on Tizen OS. Which sensors is it integrated with?',
        translationVi: 'Máy chạy hệ điều hành Tizen OS. Máy được tích hợp những cảm biến nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is integrated with an accelerometer, gyroscope, and barometer. What operating systems is it compatible with?',
        translationVi: 'Máy tích hợp cảm biến gia tốc, con quay hồi chuyển và áp kế. Máy tương thích với các hệ điều hành nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It is compatible with Android 4.4 or higher and iOS 9.0 or above. What are its key features?',
        translationVi: 'Tương thích với Android 4.4 trở lên và iOS 9.0 trở lên. Các tính năng chính là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its key features are GPS Exercise, Notifications, and Music Player. What are their functions?',
        translationVi: 'Các tính năng chính là GPS Exercise, Thông báo và Trình phát nhạc. Chức năng của chúng là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'GPS Exercise gives accurate exercise statistics. Notifications allow you to receive or respond to calls and text messages. Music Player connects with Spotify to access online music and stream your favourite songs.',
        translationVi: 'GPS Exercise cho số liệu tập luyện chính xác. Thông báo giúp nhận hoặc trả lời cuộc gọi và tin nhắn. Trình phát nhạc kết nối Spotify để nghe nhạc trực tuyến.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'What are its additional features?',
        translationVi: 'Các tính năng bổ sung là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'The additional features are Sleep Tracking, Auto Exercise Tracking, and Auto Heart Rate Tracking. What are their functions?',
        translationVi: 'Các tính năng bổ sung gồm Theo dõi giấc ngủ, Tự động ghi nhận tập luyện và Đo nhịp tim tự động. Chức năng của chúng là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Sleep Tracking records sleep patterns. Auto Exercise Tracking records your exercise. Auto Heart Rate Tracking measures your heartbeat when training.',
        translationVi: 'Theo dõi giấc ngủ ghi lại nhịp ngủ. Tự động theo dõi ghi nhận bài tập. Đo nhịp tim tự động đo nhịp tim khi luyện tập.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Great! Now we have all the missing information.',
        translationVi: 'Tuyệt! Giờ chúng ta đã có đủ toàn bộ thông tin còn thiếu rồi.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Yes. We can complete the feature description of the Samsung SM Gear Fit 2 smartwatch.',
        translationVi: 'Đúng vậy. Chúng ta đã có thể hoàn thiện phần mô tả tính năng đồng hồ Samsung SM Gear Fit 2.'
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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA: 'Chào đối tác và mở lời nhờ hướng dẫn cách lắp đặt một bóng đèn mới an toàn.',
      contextHintB:
        'Nhận lời hướng dẫn nhiệt tình và dẫn dắt hỏi xem đối tác muốn lắp đèn ở đâu.',
      sampleLineA: 'Hello! Can you tell me how to install a light bulb safely?',
      sampleLineB: "Sure! I'd be happy to guide you.",
      closingStarter: 'A',
      closingHintA: 'Cảm ơn đối tác đã hướng dẫn đầy đủ từng bước và các lưu ý an toàn.',
      closingHintB: 'Đáp lại lịch sự và nhắc lại việc luôn dùng bút thử điện trước khi thao tác.',
      sampleClosingA:
        'Thank you for the clear instructions! I will follow all the steps carefully.',
      sampleClosingB: "You're welcome! Remember to always cut off the power first. Good luck!"
    },
    rows: [
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
   * UNIT 3 (Card.md): Installing a Ceiling Fan
   * ======================================================================== */
  {
    id: 'card_u3_ceiling_fan',
    unit: 3,
    cardCode: 'Unit 3 • Card.md',
    title: 'Installing a Ceiling Fan',
    subtitleVi: 'Hướng dẫn quy trình 7 bước lắp đặt quạt trần tại nhà (tài liệu Card.md)',
    source: 'textbook_supplement',
    scenarioVi:
      'Student A là kỹ thuật viên mới đang nhờ người hướng dẫn (Student B) chỉ quy trình lắp đặt quạt trần trong nhà (dụng cụ, chuẩn bị, 7 bước lắp đặt, kiểm tra sau lắp và lưu ý an toàn).',
    roleAName: 'Student A (New Technician)',
    roleBName: 'Student B (Instructor)',
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào người hướng dẫn, giới thiệu mình là kỹ thuật viên mới và nhờ chỉ cách lắp đặt một chiếc quạt trần.',
      contextHintB:
        'Nhận lời hướng dẫn nhiệt tình và sẵn sàng trả lời câu hỏi từng bước.',
      sampleLineA: "Good morning sir, I'm a new technician. Can you help me install a ceiling fan?",
      sampleLineB: 'Of course! Feel free to ask me step by step.',
      closingStarter: 'A',
      closingHintA: 'Cảm ơn người hướng dẫn đã chỉ bảo tận tình.',
      closingHintB: 'Đáp lại lịch sự.',
      sampleClosingA: 'Thank you for your help.',
      sampleClosingB: "You're welcome."
    },
    rows: [
      {
        field: 'Location',
        studentA: 'In a house',
        studentB: 'Where do you install it?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Where do you install it?',
        suggestedAnswer: 'In a house.'
      },
      {
        field: 'Preparation / Required equipment',
        studentA: 'What equipment do we need?',
        studentB:
          'Ladder, wire cutters, voltage tester, new ceiling fan; Check the fixture to see its compatibility',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What equipment do we need?',
        suggestedAnswer:
          'We need a ladder, wire cutters, a voltage tester, and a new ceiling fan.'
      },
      {
        field: 'Pre-installation',
        studentA: 'What should we do before installation?',
        studentB: 'Turn off power; check the fixture to see its compatibility',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do before installation?',
        suggestedAnswer:
          'We should turn off the power and check the fixture to see its compatibility.'
      },
      {
        field: 'Installation (7 steps)',
        studentA: 'How can we install it?',
        studentB:
          '1. Disconnect wires & remove existing fixture; 2. Check electrical box & ceiling; 3. Attach new electrical box; 4. Mount ceiling plate; 5. Assemble fan components; 6. Make wire connections; 7. Attach blades',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'How can we install it?',
        suggestedAnswer:
          'First, we disconnect the wires and remove the existing fixture. Next, we check the electrical box and the ceiling. Then, we attach the new electrical box. After that, we mount the ceiling plate. Next, we assemble the fan components. Then, we make the wire connections. Finally, we attach the blades.'
      },
      {
        field: 'Post-installation',
        studentA: 'What should we do after installation?',
        studentB: 'Check the wire; Check the operation of the device and maintain',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do after installation?',
        suggestedAnswer:
          'We should check the wire, and check the operation of the device and maintain it.'
      },
      {
        field: 'Cautions',
        studentA: 'Are there any cautions?',
        studentB: 'Do not twist the power cords; Use voltage tester to check the current',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any cautions?',
        suggestedAnswer:
          'Yes, you should not twist the power cords and should use a voltage tester to check the current.'
      }
    ],
    keyExpressions: [
      'Can you help me install a ceiling fan?',
      'First, ... Next, ... Then, ... After that, ... Finally, ...',
      'What should we do before / after installation?',
      'Are there any cautions? -> Do not twist the power cords.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: "Good morning sir, I'm a new technician. Can you help me install a ceiling fan?",
        translationVi: 'Chào thầy/anh, em là kỹ thuật viên mới. Anh có thể giúp em lắp đặt quạt trần không ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'Of course. Where do you install it?',
        translationVi: 'Tất nhiên rồi. Em định lắp ở đâu?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'In a house. What equipment do we need?',
        translationVi: 'Trong một ngôi nhà ạ. Chúng ta cần những dụng cụ gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We need a ladder, wire cutters, a voltage tester, and a new ceiling fan.',
        translationVi: 'Chúng ta cần thang, kìm cắt dây, bút thử điện và quạt trần mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'What should we do before installation?',
        translationVi: 'Trước khi lắp đặt chúng ta cần làm gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We should turn off the power and check the fixture to see its compatibility.',
        translationVi: 'Chúng ta cần ngắt điện và kiểm tra giá lắp xem có tương thích không.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'How can we install it?',
        translationVi: 'Chúng ta lắp đặt quạt như thế nào ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'First, we disconnect the wires and remove the existing fixture. Next, we check the electrical box and the ceiling. Then, we attach the new electrical box. After that, we mount the ceiling plate. Next, we assemble the fan components. Then, we make the wire connections. Finally, we attach the blades.',
        translationVi: 'Đầu tiên ngắt dây và tháo thiết bị cũ. Tiếp theo kiểm tra hộp điện và trần. Sau đó gắn hộp điện mới, lắp đế trần, lắp ráp các bộ phận quạt, đấu nối dây và cuối cùng lắp cánh quạt.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'What should we do after installation?',
        translationVi: 'Sau khi lắp đặt xong chúng ta cần làm gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We should check the wire, and check the operation of the device and maintain it.',
        translationVi: 'Ta nên kiểm tra lại dây dẫn, kiểm tra hoạt động của thiết bị và bảo dưỡng định kỳ.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Are there any cautions?',
        translationVi: 'Có lưu ý an toàn nào không ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'Yes, you should not twist the power cords and should use a voltage tester to check the current.',
        translationVi: 'Có, không được xoắn dây nguồn và phải dùng bút thử điện để kiểm tra dòng điện.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Thank you for your help.',
        translationVi: 'Cảm ơn anh đã giúp đỡ.'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: "You're welcome.",
        translationVi: 'Không có gì.'
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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào khách hàng gọi đến tổng đài hỗ trợ kỹ thuật và dẫn dắt hỏi có thể giúp gì.',
      contextHintB:
        'Chào nhân viên tổng đài và nêu ngắn gọn việc chiếc điều hòa đang gặp sự cố.',
      sampleLineA: 'Good morning, Daikin technical support speaking. How can I help you?',
      sampleLineB: 'Good morning. My air conditioner has a problem.',
      closingStarter: 'B',
      closingHintB: 'Cảm ơn kỹ thuật viên đã hướng dẫn xử lý lỗi và cách bảo dưỡng.',
      closingHintA: 'Đáp lại lịch sự, nhắc khách gọi lại nếu cần hỗ trợ thêm và chào tạm biệt.',
      sampleClosingB: 'Thank you very much for your helpful advice. Goodbye!',
      sampleClosingA: "You're welcome! Please call us again if you need more help. Goodbye!"
    },
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
   * UNIT 4 (Card.md): Electrolux Washing Machine Hotline (EFLS617STT — E10)
   * ======================================================================== */
  {
    id: 'card_u4_electrolux_washer',
    unit: 4,
    cardCode: 'Unit 4 • Card.md',
    title: 'Electrolux Washing Machine Hotline (Model EFLS617STT — E10)',
    subtitleVi: 'Tổng đài kỹ thuật chẩn đoán máy giặt báo lỗi E10 không cấp nước (tài liệu Card.md)',
    source: 'textbook_supplement',
    scenarioVi:
      'Student A là kỹ thuật viên trực tổng đài hỗ trợ khách hàng (Student B) xử lý máy giặt Electrolux (model EFLS617STT) không cấp nước và hiển thị mã lỗi E10.',
    roleAName: 'Student A (Hotline Technician)',
    roleBName: 'Student B (Customer)',
    leadIn: {
      starterSpeaker: 'A',
      contextHintA: 'Nhấc máy chào khách hàng theo chuẩn tổng đài kỹ thuật và hỏi có thể giúp gì.',
      contextHintB: 'Chào nhân viên tổng đài và nêu ngắn gọn máy giặt đang gặp sự cố không hoạt động đúng.',
      sampleLineA: 'Hello, this is Samsung Electronics service hotline. How can I help you?',
      sampleLineB: "Hello, I have a problem with my washing machine. It isn't working properly.",
      closingStarter: 'B',
      closingHintB: 'Cảm ơn kỹ thuật viên đã tư vấn.',
      closingHintA: 'Đáp lại lịch sự và chào kết thúc.',
      sampleClosingB: 'Thank you.',
      sampleClosingA: 'You are welcome.'
    },
    rows: [
      {
        field: 'Product name',
        studentA: 'What kind is your washing machine?',
        studentB: 'Electrolux washing machine',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What kind is your washing machine?',
        suggestedAnswer: "It's an Electrolux washing machine."
      },
      {
        field: 'Model',
        studentA: 'What is its model?',
        studentB: 'EFLS617STT',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its model?',
        suggestedAnswer: "It's EFLS617STT."
      },
      {
        field: 'Problem(s)',
        studentA: "What's the problem?",
        studentB: 'The machine does not fill.',
        aIsQuestionPrompt: true,
        suggestedQuestion: "What's the problem?",
        suggestedAnswer: 'The machine does not fill.'
      },
      {
        field: 'Trouble signs',
        studentA: 'Are there any trouble signs on the display?',
        studentB: 'Alarm code E10 on the display',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any trouble signs on the display?',
        suggestedAnswer: 'Yes, there is an alarm code E10 on the display.'
      },
      {
        field: 'Taken actions',
        studentA: 'What did you do?',
        studentB:
          'Read the troubleshooting tips; Open the water tap to check -> not stuck; Check the inlet hose -> not squashed or kinked',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What did you do?',
        suggestedAnswer:
          "I read the troubleshooting tips, opened the water tap to check but it wasn't stuck, and checked the inlet hose but it wasn't squashed or kinked."
      },
      {
        field: 'Possible cause(s)',
        studentA: 'Dirty inlet hose filter blocking water',
        studentB: 'What might be the causes for the problem?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What might be the causes for the problem?',
        suggestedAnswer: 'I think a dirty inlet hose filter is blocking the water.'
      },
      {
        field: 'Suggested solutions',
        studentA: 'Dismantle the water inlet hose filter and clean it',
        studentB: 'What should I do now?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do now?',
        suggestedAnswer: 'You should dismantle the water inlet hose filter and clean it.'
      },
      {
        field: 'Precautions for maintenance and repairs',
        studentA:
          'Clean hose filter regularly; Ask a professional technician to maintain the washing machine every year',
        studentB: 'What should I do to avoid this problem in the future?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do to avoid this problem in the future?',
        suggestedAnswer:
          'You should clean the hose filter regularly and ask a professional technician to maintain the washing machine every year.'
      }
    ],
    keyExpressions: [
      'What kind is your washing machine? / What is its model?',
      'Are there any trouble signs on the display?',
      'What might be the causes for the problem?',
      'You should dismantle the water inlet hose filter and clean it.',
      'ask a professional technician to maintain the washing machine every year'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Hello, this is Samsung Electronics service hotline. How can I help you?',
        translationVi: 'Xin chào, đây là tổng đài dịch vụ Samsung Electronics. Tôi có thể giúp gì cho bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "Hello, I have a problem with my washing machine. It isn't working properly.",
        translationVi: 'Chào bạn, máy giặt của tôi đang gặp sự cố, nó hoạt động không đúng.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What kind is your washing machine?',
        translationVi: 'Máy giặt của bạn thuộc loại/hãng nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "It's an Electrolux washing machine.",
        translationVi: 'Đó là máy giặt Electrolux.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What is its model?',
        translationVi: 'Mã model của máy là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "It's EFLS617STT.",
        translationVi: 'Mã là EFLS617STT.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: "What's the problem?",
        translationVi: 'Máy gặp vấn đề gì vậy?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'The machine does not fill.',
        translationVi: 'Máy không cấp nước.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Are there any trouble signs on the display?',
        translationVi: 'Có dấu hiệu báo lỗi nào trên màn hình hiển thị không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'Yes, there is an alarm code E10 on the display.',
        translationVi: 'Có, màn hình hiện mã báo lỗi E10.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What did you do?',
        translationVi: 'Bạn đã thử kiểm tra những gì rồi?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "I read the troubleshooting tips, opened the water tap to check but it wasn't stuck, and checked the inlet hose but it wasn't squashed or kinked.",
        translationVi: 'Tôi đã đọc hướng dẫn xử lý sự cố, mở vòi nước kiểm tra thì không bị kẹt, và kiểm tra ống cấp nước thì không bị đè bẹp hay xoắn gập.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'What might be the causes for the problem?',
        translationVi: 'Nguyên nhân gây ra sự cố này có thể là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'I think a dirty inlet hose filter is blocking the water.',
        translationVi: 'Tôi nghĩ lưới lọc ống cấp nước bị bẩn đang làm tắc dòng nước.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'What should I do now?',
        translationVi: 'Bây giờ tôi nên làm gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'You should dismantle the water inlet hose filter and clean it.',
        translationVi: 'Bạn nên tháo lưới lọc ở ống cấp nước ra và vệ sinh sạch sẽ.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'What should I do to avoid this problem in the future?',
        translationVi: 'Tôi nên làm gì để tránh lỗi này trong tương lai?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'You should clean the hose filter regularly and ask a professional technician to maintain the washing machine every year.',
        translationVi: 'Bạn nên vệ sinh lưới lọc ống định kỳ và nhờ kỹ thuật viên chuyên nghiệp bảo dưỡng máy giặt hằng năm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'Thank you.',
        translationVi: 'Cảm ơn bạn.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'You are welcome.',
        translationVi: 'Không có gì ạ.'
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
    leadIn: {
      starterSpeaker: 'B',
      contextHintB:
        'Chào khách hàng, giới thiệu VAECO Vietnam (Peter) và hỏi có thể giúp gì.',
      contextHintA: 'Chào nhân viên và nêu ngắn gọn bạn đang gặp vấn đề với đơn hàng vừa rồi.',
      sampleLineB: "Good morning. VAECO Vietnam. Peter's speaking. How can I help?",
      sampleLineA: "Good morning. I'm having problems with my last order.",
      closingStarter: 'A',
      closingHintA: 'Bày tỏ hài lòng với cách giải quyết và cảm ơn.',
      closingHintB: 'Đáp lại lịch sự và mời khách gọi lại nếu cần hỗ trợ thêm.',
      sampleClosingA: "That's great. Thank you!",
      sampleClosingB: "You're welcome. And if you need any further assistance, just call us again."
    },
    rows: [
      {
        field: 'Order reference & Customer name',
        studentA: 'Order reference: T6758 • Customer: Ms Joan Tran of Vietnam Airlines (Invoice# 100, 7 June 2017)',
        studentB: '(1) Ask for order reference number & confirm Ms Joan Tran of Vietnam Airlines',
        bIsQuestionPrompt: true,
        suggestedQuestion: "I'm sorry to hear that. Can I have the order reference number, please?",
        suggestedAnswer: "OK. It's T6758."
      },
      {
        field: 'Problem 1: Gas turbine blades (TR16-957X)',
        studentA: 'Ordered 75 gas turbine blades -> Only received 70 (5 blades missing)',
        studentB: 'TR16-957X missing quantity on invoice -> Send 5 extra blades this afternoon',
        suggestedQuestion: 'And what seems to be the problems?',
        suggestedAnswer:
          'Firstly, I ordered 75 gas turbine blades but I only received 70 ones. Five blades are missing.'
      },
      {
        field: 'Problem 2: Vanes (ST23-56R vs ST28-56R)',
        studentA:
          'Ordered 60 ST23-56R Vanes -> Shipped wrong ST28-56R (DD368-2B & DB578-6B Disc Rotors: 4 pcs OK)',
        studentB: 'Send someone to exchange the vanes for the correct one right away',
        suggestedQuestion: 'Is there anything else, Ms Tran?',
        suggestedAnswer:
          'It looks as if you shipped the wrong vanes. I ordered vanes ST23-56R but I received vane ST28-56R.'
      }
    ],
    flowSteps: [
      {
        speaker: 'B',
        action: 'Show sympathy and ask for the order reference number',
        sampleLine: "I'm sorry to hear that. Can I have the order reference number, please?"
      },
      {
        speaker: 'A',
        action: 'Give the order number (T6758)',
        sampleLine: "OK. It's T6758."
      },
      {
        speaker: 'B',
        action: "Confirm customer's name & company (Ms Joan Tran of Vietnam Airlines)",
        sampleLine: "Thanks. So you're Ms Joan Tran of Vietnam Airlines?"
      },
      {
        speaker: 'A',
        action: 'Confirm your name',
        sampleLine: "That's right."
      },
      {
        speaker: 'B',
        action: 'Ask for details of the problems',
        sampleLine: 'And what seems to be the problems?'
      },
      {
        speaker: 'A',
        action: 'Report Problem 1: ordered 75 gas turbine blades but only received 70 (5 missing)',
        sampleLine:
          'Firstly, I ordered 75 gas turbine blades but I only received 70 ones. Five blades are missing.'
      },
      {
        speaker: 'B',
        action: 'Offer solution 1 (check & send 5 extra blades this afternoon) and ask if anything else',
        sampleLine:
          "Well, we'll check again and send you 5 extra blades this afternoon. Is there anything else, Ms Tran?"
      },
      {
        speaker: 'A',
        action: 'Report Problem 2: ordered vanes ST23-56R but received ST28-56R',
        sampleLine:
          'It looks as if you shipped the wrong vanes. I ordered vanes ST23-56R but I received vane ST28-56R.'
      },
      {
        speaker: 'B',
        action: 'Apologize and send someone to exchange the vanes for the correct ones right away',
        sampleLine:
          "I'm sorry to hear that. We'll send someone to exchange the vanes for the correct one right away."
      }
    ],
    keyExpressions: [
      "I'm sorry to hear that. Can I have the order reference number, please?",
      "So you're Ms ... of ...?",
      'And what seems to be the problems?',
      "Well, we'll check again and send you 5 extra blades this afternoon. Is there anything else?",
      "We'll send someone to exchange the vanes for the correct one right away."
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "Good morning. VAECO Vietnam. Peter's speaking. How can I help?",
        translationVi: 'Chào buổi sáng. VAECO Vietnam xin nghe, tôi là Peter. Tôi có thể giúp gì cho chị?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "Good morning. I'm having problems with my last order.",
        translationVi: 'Chào buổi sáng. Tôi đang gặp sự cố với đơn hàng gần đây của mình.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "I'm sorry to hear that. Can I have the order reference number, please?",
        translationVi: 'Tôi rất tiếc khi nghe vậy. Vui lòng cho tôi xin mã đơn hàng ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "OK. It's T6758.",
        translationVi: 'Vâng. Mã đơn hàng là T6758.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "Thanks. So you're Ms Joan Tran of Vietnam Airlines?",
        translationVi: 'Cảm ơn chị. Vậy chị là cô Joan Tran của Vietnam Airlines phải không ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "That's right.",
        translationVi: 'Đúng rồi.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: 'And what seems to be the problems?',
        translationVi: 'Đơn hàng đang gặp những vấn đề gì vậy ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: 'Firstly, I ordered 75 gas turbine blades but I only received 70 ones. Five blades are missing.',
        translationVi: 'Thứ nhất, tôi đặt 75 cánh tuabin khí nhưng chỉ nhận 70 chiếc, bị thiếu 5 chiếc.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "Well, we'll check again and send you 5 extra blades this afternoon. Is there anything else, Ms Tran?",
        translationVi: 'Vâng, chúng tôi sẽ kiểm tra lại và gửi bù 5 cánh tuabin chiều nay. Còn vấn đề nào nữa không chị Tran?'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: 'It looks as if you shipped the wrong vanes. I ordered vanes ST23-56R but I received vane ST28-56R.',
        translationVi: 'Có vẻ như bên anh giao nhầm cánh tĩnh rồi. Tôi đặt mã ST23-56R nhưng lại nhận mã ST28-56R.'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "I'm sorry to hear that. We'll send someone to exchange the vanes for the correct one right away.",
        translationVi: 'Tôi rất xin lỗi về việc đó. Chúng tôi sẽ cử người đổi lại đúng mã cánh tĩnh ngay lập tức.'
      },
      {
        speaker: 'A',
        roleLabel: 'Joan Tran',
        line: "That's great. Thank you!",
        translationVi: 'Tuyệt quá. Cảm ơn anh!'
      },
      {
        speaker: 'B',
        roleLabel: 'Sales Staff (Peter)',
        line: "You're welcome. And if you need any further assistance, just call us again.",
        translationVi: 'Không có chi ạ. Nếu cần hỗ trợ thêm bất cứ điều gì, chị cứ gọi lại cho chúng tôi nhé.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 6 (MONO TALK CHART): Home Appliance Ownership in Vietnam (2018-2025)
   * ======================================================================== */
  {
    id: 'card_u6_appliance_ownership',
    unit: 6,
    cardCode: 'Unit 6 • Mono Talk Graph',
    title: 'Home Appliance Ownership in Vietnam (2018–2025)',
    subtitleVi: 'Mô tả biểu đồ đường tỷ lệ sở hữu tủ lạnh, điều hoà và máy sưởi điện (2018–2025)',
    source: 'card_docx',
    scenarioVi:
      'Bám sát phần III. MONO TALK Unit 6: Student A thuyết trình số liệu biểu đồ đường tỷ lệ hộ gia đình sở hữu 3 thiết bị gia dụng tại Việt Nam từ 2018 đến 2025; Student B đặt câu hỏi kiểm tra xu hướng và so sánh.',
    roleAName: 'Student A (Presenter)',
    roleBName: 'Student B (Colleague)',
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào đối tác/người nghe và dẫn dắt giới thiệu tổng quan biểu đồ đường: tỷ lệ sở hữu thiết bị gia dụng tại Việt Nam từ 2018 đến 2025 (gồm tủ lạnh, điều hoà, máy sưởi điện).',
      contextHintB:
        'Đáp lại lịch sự và mời người thuyết trình bắt đầu phân tích số liệu từng thiết bị.',
      sampleLineA:
        'Hello! Today I would like to present this line graph, which shows the percentage of home appliance ownership in Vietnam from 2018 to 2025, including refrigerators, air conditioners, and electric heaters.',
      sampleLineB: 'Sure, please go ahead! I am looking forward to the trends.',
      closingStarter: 'A',
      closingHintA: 'Chốt lại ngắn gọn cảm ơn người nghe sau phần trình bày biểu đồ.',
      closingHintB: 'Cảm ơn phần thuyết trình rõ ràng và súc tích.',
      sampleClosingA:
        'That brings me to the end of my chart description. Thank you for listening!',
      sampleClosingB: 'Thank you for that clear explanation!'
    },
    charts: [
      {
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
      }
    ],
    rows: [
      {
        field: 'Refrigerators trend (2018–2025)',
        studentA: '2018: 90% -> 2021: 89% (decreased slightly) -> 2025: 95% (rose to a peak)',
        studentB: '(1) How did refrigerator ownership change from 2018 to 2025?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How did the percentage of refrigerators change from 2018 to 2025?',
        suggestedAnswer:
          'The percentage of refrigerators started at 90% in 2018, decreased slightly to 89% in 2021, and then rose to a peak of 95% in 2025.'
      },
      {
        field: 'Air conditioners trend (2018–2025)',
        studentA: '2018: 80% -> 2021: 75% -> 2025: 69% (decreased steadily)',
        studentB: '(2) What happened to air conditioners over the same period?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What happened to air conditioner ownership over the same period?',
        suggestedAnswer:
          'The percentage of air conditioners decreased steadily from 80% in 2018 to 75% in 2021 and dropped to 69% in 2025.'
      },
      {
        field: 'Electric heaters & Overall comparison',
        studentA:
          '2018: 46% -> 2021: 54% (increased gradually) -> 2025: 76% (rose sharply, overtook AC); Fridges & Heaters: upward trend, AC: downward',
        studentB: '(3) What is the trend for electric heaters and the overall conclusion?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the trend for electric heaters and the overall takeaway?',
        suggestedAnswer:
          'Electric heaters stood at 46% in 2018, increased gradually to 54% in 2021, and then rose sharply to 76% in 2025, overtaking air conditioners. Overall, refrigerators and electric heaters showed an upward trend, while air conditioners showed a downward trend.'
      }
    ],
    keyExpressions: [
      'The line graph shows the percentage of ... from 2018 to 2025.',
      'started at 90% and decreased slightly to 89%',
      'rose to a peak of 95%',
      'decreased steadily from 80% to 75% and 69%',
      'rose sharply to 76%, overtaking ...',
      'showed an upward / downward trend'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'The line graph shows the percentage of home appliance ownership in Vietnam from 2018 to 2025, including refrigerators, air conditioners, and electric heaters.',
        translationVi:
          'Biểu đồ đường thể hiện tỷ lệ sở hữu thiết bị gia dụng tại Việt Nam từ 2018 đến 2025 gồm tủ lạnh, điều hoà và máy sưởi điện.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'How did the percentage of refrigerators change from 2018 to 2025?',
        translationVi: 'Tỷ lệ sở hữu tủ lạnh thay đổi thế nào từ 2018 đến 2025?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'As you can see, the percentage of refrigerators started at 90% in 2018 and decreased slightly to 89% in 2021. Then, it rose to a peak of 95% in 2025.',
        translationVi:
          'Như bạn thấy, tủ lạnh khởi đầu ở 90% năm 2018 và giảm nhẹ xuống 89% năm 2021, sau đó tăng lên đỉnh 95% vào năm 2025.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'And what about air conditioners and electric heaters?',
        translationVi: 'Thế còn điều hoà và máy sưởi điện thì sao?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'Meanwhile, air conditioners decreased steadily from 80% in 2018 to 75% in 2021 and dropped to 69% in 2025. For electric heaters, the figure stood at 46% in 2018, increased gradually to 54% in 2021, and rose sharply to 76% in 2025, overtaking air conditioners. Overall, refrigerators and electric heaters showed an upward trend, while air conditioners showed a downward trend.',
        translationVi:
          'Trong khi đó, điều hoà giảm đều từ 80% xuống 75% năm 2021 và còn 69% năm 2025. Máy sưởi điện ở mức 46% năm 2018, tăng dần lên 54% năm 2021 rồi vọt lên 76% năm 2025, vượt qua điều hoà. Nhìn chung tủ lạnh và máy sưởi điện có xu hướng tăng, còn điều hoà có xu hướng giảm.'
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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào buổi sáng và chào mừng ứng viên đến với Công ty EVN theo đúng lời thoại Card.md.',
      contextHintB:
        'Chào buổi sáng nhà tuyển dụng một cách lịch sự và sẵn sàng bắt đầu phỏng vấn.',
      sampleLineA: 'Good morning! Welcome to EVN Company.',
      sampleLineB: 'Good morning!',
      closingStarter: 'A',
      closingHintA: 'Cảm ơn câu trả lời của ứng viên để kết thúc buổi phỏng vấn.',
      closingHintB: 'Đáp lại lịch sự khi kết thúc buổi phỏng vấn.',
      sampleClosingA: 'Thank you for your answer.',
      sampleClosingB: "You're welcome."
    },
    rows: [
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
        studentA: '(2) What did you learn from your last job?',
        studentB:
          'Internship at Samsung Company: repair and maintain electrical systems, design circuit boards, write technical reports',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What did you learn from your last job?',
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
        studentA: '(4) What are the strengths and weaknesses?',
        studentB:
          'Strength: communication skills & ability to work under high pressure; Weakness: lack work experience',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are the strengths and weaknesses?',
        suggestedAnswer:
          'My biggest strength is communication skills and the ability to work under high pressure. My weakness is that I lack work experience.'
      },
      {
        field: 'Reasons to employ',
        studentA: '(5) Why should we hire you?',
        studentB:
          'Contribute technical knowledge and Chinese communication skills, plus strategies for effective teamwork',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Why should we hire you?',
        suggestedAnswer:
          'Because I can contribute not only technical knowledge and Chinese communication skills, but also strategies for effective teamwork.'
      }
    ],
    keyExpressions: [
      'Good morning! Welcome to EVN Company.',
      'What are your career objectives?',
      'What did you learn from your last job?',
      'During my internship at ..., I learned to ...',
      'My biggest strength is ...',
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
        translationVi: 'Chào buổi sáng!'
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
        line: 'I want to become a good electrical and electronics engineer.',
        translationVi: 'Tôi muốn trở thành một kỹ sư điện – điện tử giỏi.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'What did you learn from your last job?',
        translationVi: 'Bạn đã học được gì từ công việc gần nhất?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'During my internship at Samsung Company, I learned to repair and maintain electrical systems, design circuit boards and write technical reports.',
        translationVi: 'Trong kỳ thực tập tại Công ty Samsung, tôi đã học cách sửa chữa và bảo trì hệ thống điện, thiết kế bảng mạch và viết báo cáo kỹ thuật.'
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
        translationVi: 'Tôi giỏi ngoại ngữ. Tôi có thể nói tiếng Anh và tiếng Trung rất tốt.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'What are the strengths and weaknesses?',
        translationVi: 'Điểm mạnh và điểm yếu là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'My biggest strength is communication skills and the ability to work under high pressure. My weakness is that I lack work experience.',
        translationVi: 'Điểm mạnh nhất của tôi là kỹ năng giao tiếp và khả năng làm việc dưới áp lực cao. Điểm yếu của tôi là thiếu kinh nghiệm làm việc.'
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
        line: 'Because I can contribute not only technical knowledge and Chinese communication skills, but also strategies for effective teamwork.',
        translationVi: 'Bởi vì tôi có thể đóng góp không chỉ kiến thức kỹ thuật và kỹ năng giao tiếp tiếng Trung, mà còn các chiến lược để làm việc nhóm hiệu quả.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewer',
        line: 'Thank you for your answer.',
        translationVi: 'Cảm ơn câu trả lời của bạn.'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: "You're welcome.",
        translationVi: 'Không có gì ạ.'
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
    leadIn: {
      starterSpeaker: 'A',
      contextHintA:
        'Chào đồng nghiệp B và dẫn dắt vào chủ đề bảo trì hệ thống máy giặt của khu nghỉ dưỡng.',
      contextHintB: 'Lắng nghe và phản hồi đồng tình để bắt đầu thảo luận từng bước bảo trì.',
      sampleLineA:
        'Hi B! I just want to say something about the maintenance of the washing machine system of this resort.',
      sampleLineB: 'Sure, please go ahead.',
      closingStarter: 'B',
      closingHintB: 'Đồng ý với 4 bước chốt phương án bảo trì và sẵn sàng thực hiện.',
      closingHintA: 'Đồng thuận và kết thúc cuộc họp.',
      sampleClosingB: "Great! Let's follow these four steps for our resort maintenance plan.",
      sampleClosingA: 'Sounds good! Thanks for the productive meeting.'
    },
    flowSteps: [
      {
        speaker: 'A',
        action: 'Make a point: Keep the washer level & clean the inside (once monthly)',
        sampleLine: 'I think we should keep the washer level and clean the inside once a month.'
      },
      {
        speaker: 'B',
        action: 'Interrupt: Firstly: Cut power to avoid electric shock',
        sampleLine:
          'Sorry to interrupt you, I think firstly we must cut the power to avoid electrical shock.'
      },
      {
        speaker: 'A',
        action: 'Strongly agree',
        sampleLine: 'I totally agree with you.'
      },
      {
        speaker: 'B',
        action: 'Make a point: Remove and clean the filter -> Help washer run efficiently; Polish the outside',
        sampleLine:
          'In my opinion, we should remove and clean the filter to help the washer run efficiently and polish the outside.'
      },
      {
        speaker: 'A',
        action: 'Comment and emphasize: Use a soft cloth to wipe out',
        sampleLine: 'Good idea! And we should use a soft cloth to wipe out the outside.'
      },
      {
        speaker: 'B',
        action: 'Strongly agree',
        sampleLine: 'I completely agree with you.'
      },
      {
        speaker: 'A',
        action: 'Make a point: Suggest replacing the hoses every 7 years',
        sampleLine: 'I think we should replace the hoses every 7 years.'
      },
      {
        speaker: 'B',
        action: 'Interrupt: Strongly disagree (7 years is a long period) -> Recommend 5 years',
        sampleLine:
          "I apologize for interrupting you. I'm afraid 7 years is a long period. How about replacing the hoses every 5 years?"
      },
      {
        speaker: 'A',
        action: 'Reach the decision: Summarize the 4 agreed steps (cut power, level/clean inside monthly, clean filter & polish with soft cloth, replace hoses every 5 years)',
        sampleLine:
          'Alright. To sum up, what we decide to do is: 1. First, cut power to avoid electric shock. 2. Second, keep the washer level and clean the inside once a month. 3. Next, clean the filter and polish the outside with a soft cloth. 4. Finally, replace the hoses every 5 years.'
      }
    ],
    keyExpressions: [
      'I just want to say something about ...',
      'Sorry to interrupt you, I think firstly ...',
      'I totally agree with you.',
      "I apologize for interrupting you. I'm afraid ... is a long period.",
      'How about replacing the hoses every 5 years?',
      'Alright. To sum up, what we decide to do is ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Hi B! I just want to say something about the maintenance of the washing machine system of this resort. I think we should keep the washer level and clean the inside once a month.',
        translationVi:
          'Chào B! Tôi muốn trao đổi về việc bảo trì hệ thống máy giặt của khu nghỉ dưỡng này. Tôi nghĩ chúng ta nên kê máy giặt cân bằng và vệ sinh lồng giặt mỗi tháng một lần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Sorry to interrupt you, I think firstly we must cut the power to avoid electrical shock.',
        translationVi:
          'Xin lỗi đã ngắt lời bạn, tôi nghĩ trước hết chúng ta phải ngắt nguồn điện để tránh bị điện giật.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I totally agree with you.',
        translationVi: 'Tôi hoàn toàn đồng ý với bạn.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'In my opinion, we should remove and clean the filter to help the washer run efficiently and polish the outside.',
        translationVi:
          'Theo ý kiến của tôi, chúng ta nên tháo và vệ sinh bộ lọc để giúp máy giặt chạy hiệu quả và lau bóng bên ngoài.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Good idea! And we should use a soft cloth to wipe out the outside.',
        translationVi: 'Ý hay đấy! Và chúng ta nên dùng khăn mềm để lau sạch bên ngoài.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'I completely agree with you.',
        translationVi: 'Tôi hoàn toàn đồng ý với bạn.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'I think we should replace the hoses every 7 years.',
        translationVi: 'Tôi nghĩ chúng ta nên thay ống dẫn nước mỗi 7 năm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "I apologize for interrupting you. I'm afraid 7 years is a long period. How about replacing the hoses every 5 years?",
        translationVi:
          'Xin lỗi vì đã ngắt lời bạn. Tôi e rằng 7 năm là khoảng thời gian quá dài. Thế còn thay ống dẫn nước mỗi 5 năm thì sao?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Alright. To sum up, what we decide to do is: 1. First, cut power to avoid electric shock. 2. Second, keep the washer level and clean the inside once a month. 3. Next, clean the filter and polish the outside with a soft cloth. 4. Finally, replace the hoses every 5 years.',
        translationVi:
          'Được rồi. Tóm lại, những gì chúng ta quyết định làm là: 1. Đầu tiên, ngắt điện để tránh điện giật. 2. Thứ hai, giữ máy giặt thăng bằng và vệ sinh bên trong mỗi tháng một lần. 3. Tiếp theo, vệ sinh bộ lọc và đánh bóng bên ngoài bằng khăn mềm. 4. Cuối cùng, thay ống dẫn nước mỗi 5 năm.'
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
    title: 'Line Graph: Home Appliance Ownership in Vietnam (2018–2025)',
    topicVi: 'Mô tả biểu đồ đường sở hữu tủ lạnh, điều hoà và máy sưởi điện (2018–2025)',
    script:
      'Today, I will talk about this line graph, which shows the percentage of home appliance ownership in Vietnam from 2018 to 2025, including refrigerators, air conditioners, and electric heaters. As you can see, the percentage of refrigerators started at 90% in 2018 and decreased slightly to 89% in 2021. Then, it rose to a peak of 95% in 2025. Meanwhile, the percentage of air conditioners decreased steadily from 80% in 2018 to 75% in 2021 and dropped to 69% in 2025. For electric heaters, the figure stood at 46% in 2018 and increased gradually to 54% in 2021. Then, it rose sharply to 76% in 2025, overtaking air conditioners. Overall, refrigerators and electric heaters showed an upward trend, while air conditioners showed a downward trend.'
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

import type { SpeakingCard } from '../../types/curriculum';

export const SPEAKING_CARDS: SpeakingCard[] = [
  /* ==========================================================================
   * UNIT 1: Companies in Electrical and Electronics fields
   * ======================================================================== */
  {
    id: 'card_u1_foxconn',
    unit: 1,
    cardCode: 'Card 1A',
    title: 'Hon Hai Precision Industry (Foxconn Technology Group)',
    subtitleVi: 'Trao đổi thông tin hồ sơ doanh nghiệp trước buổi phỏng vấn',
    source: 'card_docx',
    scenarioVi:
      'Hai sinh viên vừa tốt nghiệp ĐH Công nghiệp Hà Nội (HaUI) cùng nộp đơn vào Hon Hai Precision Industry Company và chuẩn bị phỏng vấn vào tuần tới. Student A và Student B trao đổi các thông tin còn thiếu trên phiếu hồ sơ công ty để sẵn sàng trả lời nhà tuyển dụng.',
    roleAName: 'Student A (Ứng viên HaUI)',
    roleBName: 'Student B (Ứng viên HaUI)',
    rows: [
      {
        field: 'Trading name',
        studentA: 'Foxconn Technology Group',
        studentB: '(1) What is its trading name?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is its trading name?',
        suggestedAnswer: 'Its trading name is Foxconn Technology Group.'
      },
      {
        field: 'Reputation',
        studentA: '(1) What is the company famous for?',
        studentB:
          "The world's largest contract electronics manufacturer; one of the biggest exporters of China",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the company famous for?',
        suggestedAnswer:
          "It is famous for being the world's largest contract electronics manufacturer and one of the biggest exporters of China."
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
        studentA: '(2) Where is its head office?',
        studentB: 'New Taipei City, Taiwan',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Where is its head office?',
        suggestedAnswer: 'Its head office is in New Taipei City, Taiwan.'
      },
      {
        field: 'Chairman',
        studentA: 'Terry Gou',
        studentB: '(3) Who is the chairman of the company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Who is the chairman of the company?',
        suggestedAnswer: 'The chairman is Terry Gou.'
      },
      {
        field: 'Specializations',
        studentA: '(3) What does the company specialize in?',
        studentB: 'Computer, Communication, Consumer electronics',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What does the company specialize in?',
        suggestedAnswer:
          'It specializes in computer, communication, and consumer electronics.'
      },
      {
        field: 'Products',
        studentA:
          'Electronic components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), Computer chips',
        studentB: '(4) What are its major products?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are its major products?',
        suggestedAnswer:
          'Its major products are electronic components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), and computer chips.'
      },
      {
        field: 'Number of employees',
        studentA: '(4) How many employees does it have?',
        studentB: '1.3 million',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'How many employees does it have?',
        suggestedAnswer: 'It has about 1.3 million employees.'
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
        suggestedAnswer: 'Its annual revenue is over $136 billion.'
      },
      {
        field: 'Mission',
        studentA:
          "Contribute to customers' success by developing effective products and services",
        studentB: '(6) What is its mission?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is its mission?',
        suggestedAnswer:
          "Its mission is to contribute to customers' success by developing effective products and services."
      },
      {
        field: 'Vision',
        studentA: '(6) What is its vision?',
        studentB:
          'Become a leader in developing creative, competitive, and comprehensive solutions for customers',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its vision?',
        suggestedAnswer:
          'Its vision is to become a leader in developing creative, competitive, and comprehensive solutions for customers.'
      }
    ],
    keyExpressions: [
      'What is its trading name?',
      'It was founded in ...',
      'Its head office / headquarters is in ...',
      'It specializes in ...',
      'Its major products are ...',
      'Its mission / vision is to ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Hi! We have an interview at Hon Hai Precision Industry Company next week.',
        translationVi: 'Chào bạn! Tuần tới chúng ta có buổi phỏng vấn tại Công ty Hon Hai Precision Industry.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Yes, we do. We should learn some information about the company first. Let’s exchange what we have.',
        translationVi: 'Đúng rồi. Chúng ta nên tìm hiểu thông tin công ty trước. Hãy trao đổi những thông tin đang có nhé.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'First, what is its trading name?',
        translationVi: 'Trước hết, tên thương mại của công ty là gì vậy?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its trading name is Foxconn Technology Group. What is the company famous for?',
        translationVi: 'Tên thương mại của công ty là Tập đoàn Công nghệ Foxconn. Công ty nổi tiếng về điều gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "It is famous for being the world's largest contract electronics manufacturer and one of the biggest exporters of China. When was it founded?",
        translationVi: 'Công ty nổi tiếng là nhà sản xuất điện tử theo hợp đồng lớn nhất thế giới và là một trong những nhà xuất khẩu lớn nhất Trung Quốc. Công ty được thành lập năm nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It was founded in 1974. Where is its head office?',
        translationVi: 'Công ty được thành lập năm 1974. Trụ sở chính của công ty đặt ở đâu?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its head office is in New Taipei City, Taiwan. Who is the chairman of the company?',
        translationVi: 'Trụ sở chính ở Thành phố Tân Bắc, Đài Loan. Chủ tịch công ty là ai?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'The chairman is Terry Gou. What does the company specialize in?',
        translationVi: 'Chủ tịch là ông Terry Gou. Công ty chuyên về lĩnh vực nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It specializes in computer, communication, and consumer electronics. What are its major products?',
        translationVi: 'Công ty chuyên về máy tính, truyền thông và điện tử tiêu dùng. Các sản phẩm chủ lực là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its major products are electronic components, PCBs (Printed Circuit Boards), Graphics Processing Units (GPUs), and computer chips. How many employees does it have?',
        translationVi: 'Các sản phẩm chính gồm linh kiện điện tử, bảng mạch in PCB, bộ xử lý đồ hoạ GPU và chip máy tính. Công ty có bao nhiêu nhân viên?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It has about 1.3 million employees. How many subsidiaries does it have?',
        translationVi: 'Công ty có khoảng 1,3 triệu nhân viên. Công ty có bao nhiêu công ty con?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It has 10 subsidiaries. What is its annual revenue?',
        translationVi: 'Công ty có 10 công ty con. Doanh thu hằng năm của công ty là bao nhiêu?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its annual revenue is over $136 billion. What is its mission?',
        translationVi: 'Doanh thu hằng năm hơn 136 tỷ đô la. Sứ mệnh của công ty là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "Its mission is to contribute to customers' success by developing effective products and services. And what is its vision?",
        translationVi: 'Sứ mệnh là đóng góp vào thành công của khách hàng bằng việc phát triển sản phẩm và dịch vụ hiệu quả. Thế còn tầm nhìn thì sao?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Its vision is to become a leader in developing creative, competitive, and comprehensive solutions for customers.',
        translationVi: 'Tầm nhìn là trở thành đơn vị dẫn đầu trong việc phát triển các giải pháp sáng tạo, cạnh tranh và toàn diện cho khách hàng.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "That's a lot of useful information. I think we are ready for the interview now!",
        translationVi: 'Thật nhiều thông tin hữu ích. Mình nghĩ chúng ta đã sẵn sàng cho buổi phỏng vấn rồi!'
      }
    ]
  },
  {
    id: 'card_u1_panasonic_bg',
    unit: 1,
    cardCode: 'Card 1B',
    title: 'Panasonic Corporation — Company Background Interview',
    subtitleVi: 'Phỏng vấn xin việc về bối cảnh, sứ mệnh và đóng góp tại Panasonic',
    source: 'card_docx',
    scenarioVi:
      'Student A là sinh viên tốt nghiệp ĐH Công nghiệp Hà Nội (HaUI) ứng tuyển vào Tập đoàn Panasonic. Student B là Giám đốc Nhân sự (HR Manager) của Panasonic phỏng vấn ứng viên về hiểu biết công ty, sứ mệnh, lý do ứng tuyển và đóng góp của bản thân (sử dụng cấu trúc nêu quan điểm).',
    roleAName: 'Student A (Interviewee - Ứng viên)',
    roleBName: 'Student B (Interviewer - HR Manager)',
    rows: [
      {
        field: 'Company background',
        studentA:
          "Multinational electronics corporation; The world's fourth-largest television manufacturer; Founded year: 1918; Specializations: Consumer electronics, home appliances",
        studentB: 'What do you know about our company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What do you know about our company?',
        suggestedAnswer:
          "As far as I know, Panasonic is a multinational electronics corporation and the world's fourth-largest television manufacturer. It was founded in 1918 and specializes in consumer electronics and home appliances."
      },
      {
        field: 'Company mission',
        studentA:
          'Create value and contribute to society with innovative technologies and products',
        studentB: "What is our company's mission?",
        bIsQuestionPrompt: true,
        suggestedQuestion: "What is our company's mission?",
        suggestedAnswer:
          'I think its mission is to create value and contribute to society with innovative technologies and products.'
      },
      {
        field: 'Reasons to work for the company',
        studentA:
          'Admire high-quality products, especially LED televisions; Enhance knowledge and skills; Gain experiences',
        studentB: 'Why do you want to work for our company?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Why do you want to work for our company?',
        suggestedAnswer:
          "In my opinion, Panasonic is a great workplace because I admire your high-quality products, especially LED televisions. I also want to enhance my knowledge and skills and gain more experience."
      },
      {
        field: 'Possible contribution to the company',
        studentA:
          'Technical knowledge and skills; English communication skills; Ability to work in groups',
        studentB: 'What can you contribute to our company if you are hired?',
        bIsQuestionPrompt: true,
        suggestedQuestion:
          'What can you contribute to our company if you are hired?',
        suggestedAnswer:
          "I'm sure that I can contribute my technical knowledge and skills, English communication skills, and ability to work effectively in groups."
      }
    ],
    keyExpressions: [
      'As far as I know, ...',
      'In my opinion, ...',
      "I'm sure that ...",
      'I strongly believe that ...',
      'create value and contribute to society'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "Good morning! Nice to meet you. I'm the HR Manager of Panasonic Corporation. Thank you for joining this interview today.",
        translationVi: 'Chào buổi sáng! Rất vui được gặp bạn. Tôi là Quản lý Nhân sự của Tập đoàn Panasonic. Cảm ơn bạn đã tham gia phỏng vấn hôm nay.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Good morning! Nice to meet you, too. Thank you for this opportunity.',
        translationVi: 'Chào buổi sáng! Rất vui được gặp anh/chị. Cảm ơn vì đã cho tôi cơ hội này.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'First of all, what do you know about our company?',
        translationVi: 'Trước tiên, bạn biết gì về công ty chúng tôi?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "As far as I know, Panasonic is a multinational electronics corporation and the world's fourth-largest television manufacturer. It was founded in 1918 and is famous for consumer electronics and home appliances.",
        translationVi: 'Theo những gì tôi biết, Panasonic là tập đoàn điện tử đa quốc gia và là nhà sản xuất tivi lớn thứ tư thế giới. Công ty thành lập năm 1918 và nổi tiếng về điện tử tiêu dùng cùng thiết bị gia dụng.'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "That's accurate. What is our company's mission?",
        translationVi: 'Chính xác. Vậy sứ mệnh của công ty chúng tôi là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'I believe its mission is to create value and contribute to society with innovative technologies and products.',
        translationVi: 'Tôi tin rằng sứ mệnh của công ty là tạo ra giá trị và đóng góp cho xã hội bằng các công nghệ và sản phẩm đổi mới.'
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
        line: "In my opinion, Panasonic is an ideal environment for an engineering graduate. I admire Panasonic's high-quality products, especially LED televisions, and I want to enhance my knowledge and skills and gain practical experience.",
        translationVi: 'Theo quan điểm của tôi, Panasonic là môi trường lý tưởng cho kỹ sư mới ra trường. Tôi rất ngưỡng mộ các sản phẩm chất lượng cao của Panasonic, đặc biệt là tivi LED, và tôi muốn nâng cao kiến thức, kỹ năng cũng như tích luỹ kinh nghiệm thực tế.'
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
        line: "I'm sure that I can contribute my technical knowledge and skills, English communication skills, and ability to work well in groups.",
        translationVi: 'Tôi chắc chắn mình có thể đóng góp kiến thức và kỹ năng chuyên môn, kỹ năng giao tiếp tiếng Anh và khả năng làm việc nhóm tốt.'
      }
    ]
  },
  {
    id: 'card_u1_panasonic_culture',
    unit: 1,
    cardCode: 'Card 1C',
    title: 'Panasonic Corporation — Culture, Management Style & 5-Year Goals',
    subtitleVi: 'Hỏi đáp văn hoá doanh nghiệp, phong cách quản lý và tầm nhìn 5 năm',
    source: 'card_docx',
    scenarioVi:
      'Trong phần hỏi đáp cuối buổi phỏng vấn tại Panasonic Corporation, Student A (Ứng viên) đặt câu hỏi để tìm hiểu về văn hoá công ty, phong cách quản lý, mục tiêu và định hướng 5 năm tới. Student B (HR Manager) giải đáp dựa trên thông tin công ty và các mẫu câu nêu quan điểm.',
    roleAName: 'Student A (Interviewee - Ứng viên)',
    roleBName: 'Student B (Interviewer - HR Manager)',
    rows: [
      {
        field: 'Company culture',
        studentA: "Can you describe the company's culture?",
        studentB:
          'Create culture: Focus on risk-taking and innovation; Encourage employee creativity by rewarding innovative ideas',
        aIsQuestionPrompt: true,
        suggestedQuestion: "Can you describe the company's culture?",
        suggestedAnswer:
          "I'd say our company focuses on risk-taking and innovation. We also encourage employee creativity by rewarding innovative ideas."
      },
      {
        field: "Company's management style",
        studentA: "What about the company's management style?",
        studentB:
          "Participative style: Encourage employee input in decision making; Reward team's effort",
        aIsQuestionPrompt: true,
        suggestedQuestion: "What about the company's management style?",
        suggestedAnswer:
          "In my opinion, our company follows a participative management style. We encourage employee input in decision-making and reward the team's effort."
      },
      {
        field: "Company's goals",
        studentA: "What are the company's goals?",
        studentB:
          'Increase annual revenue; Introduce non-electronics products to the market; Create new business and promote innovation',
        aIsQuestionPrompt: true,
        suggestedQuestion: "What are the company's goals?",
        suggestedAnswer:
          'I have no doubt that our goals are to increase annual revenue, introduce non-electronics products to the market, and create new businesses while promoting innovation.'
      },
      {
        field: "Company's possible position in next 5 years",
        studentA: 'Where do you think the company is headed in the next 5 years?',
        studentB: "The world's largest television manufacturer",
        aIsQuestionPrompt: true,
        suggestedQuestion:
          'Where do you think the company is headed in the next 5 years?',
        suggestedAnswer:
          "I strongly believe that in the next 5 years, our company will become the world's largest television manufacturer."
      }
    ],
    keyExpressions: [
      "I'd say that ...",
      'I think / suppose that ...',
      'I have no doubt that ...',
      'I strongly believe that ...',
      'participative management style'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'Do you have any questions for me about Panasonic Corporation?',
        translationVi: 'Bạn có câu hỏi nào dành cho tôi về Tập đoàn Panasonic không?'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "Yes, thank you. Can you describe the company's culture?",
        translationVi: 'Vâng, cảm ơn anh/chị. Anh/chị có thể mô tả văn hoá của công ty không ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "I'd say our company focuses strongly on risk-taking and innovation. We also encourage employee creativity by rewarding innovative ideas.",
        translationVi: 'Tôi có thể nói công ty chúng tôi tập trung mạnh vào tinh thần dám thử thách và đổi mới. Chúng tôi cũng khuyến khích sự sáng tạo bằng cách khen thưởng các ý tưởng mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "That sounds inspiring. What about the company's management style?",
        translationVi: 'Nghe rất truyền cảm hứng ạ. Thế còn phong cách quản lý của công ty thì sao ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "In my opinion, we have a participative management style. It encourages employees to give input in decision-making and rewards the team's effort.",
        translationVi: 'Theo tôi, chúng tôi áp dụng phong cách quản lý có sự tham gia. Phong cách này khuyến khích nhân viên đóng góp ý kiến vào quyết định chung và ghi nhận nỗ lực của cả nhóm.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: "What are the company's current goals?",
        translationVi: 'Các mục tiêu hiện tại của công ty là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: 'I have no doubt that our primary goals are to increase annual revenue, introduce non-electronics products to the market, and create new businesses while promoting innovation.',
        translationVi: 'Chắc chắn rằng mục tiêu trọng tâm của chúng tôi là tăng doanh thu hằng năm, đưa thêm các sản phẩm phi điện tử ra thị trường và phát triển kinh doanh mới song song với thúc đẩy đổi mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'And where do you think the company is headed in the next 5 years?',
        translationVi: 'Và anh/chị nghĩ công ty sẽ đạt vị thế nào trong 5 năm tới ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'HR Manager',
        line: "I strongly believe that in the next 5 years, Panasonic will become the world's largest television manufacturer.",
        translationVi: 'Tôi tin chắc rằng trong 5 năm tới, Panasonic sẽ trở thành nhà sản xuất tivi lớn nhất thế giới.'
      },
      {
        speaker: 'A',
        roleLabel: 'Interviewee',
        line: 'Thank you very much for your clear answers. I look forward to working with your team!',
        translationVi: 'Cảm ơn anh/chị rất nhiều vì những chia sẻ rõ ràng. Tôi rất mong được làm việc cùng đội ngũ công ty!'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 2: Smart products
   * ======================================================================== */
  {
    id: 'card_u2_gearfit2',
    unit: 2,
    cardCode: 'Card 2A',
    title: 'Samsung SM Gear Fit 2 Smartwatch',
    subtitleVi: 'Trao đổi thông số kỹ thuật, cảm biến và tính năng đồng hồ thông minh',
    source: 'card_docx',
    scenarioVi:
      'Student A và Student B trao đổi thông tin còn thiếu (Information Gap) để hoàn thành bảng mô tả thông số kỹ thuật và tính năng của đồng hồ thông minh Samsung SM Gear Fit 2.',
    roleAName: 'Student A',
    roleBName: 'Student B',
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
        suggestedAnswer:
          'It is compatible with Android 4.4 or higher and iOS 9.0 or above.'
      },
      {
        field: 'Integrated sensors',
        studentA: '(2) Which sensors is it integrated with?',
        studentB: 'Accelerometer, Gyroscope, Barometer',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Which sensors is it integrated with?',
        suggestedAnswer:
          'It is integrated with an accelerometer, a gyroscope, and a barometer.'
      },
      {
        field: 'Key features (Names)',
        studentA: 'GPS Exercise, Notifications, Music Player',
        studentB: '(3) What are its key features?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are its key features?',
        suggestedAnswer:
          'Its key features are GPS Exercise, Notifications, and Music Player.'
      },
      {
        field: 'Key features (Functions)',
        studentA:
          'Give accurate exercise statistics; Receive or respond to calls and text messages; Connect with Spotify to access online music and stream your favorite songs',
        studentB: '(4) What are their functions?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What are their functions?',
        suggestedAnswer:
          'GPS Exercise gives accurate exercise statistics. Notifications allow you to receive or respond to calls and text messages. Music Player connects with Spotify to access online music and stream your favorite songs.'
      },
      {
        field: 'Additional features (Names)',
        studentA: '(3) What are its additional features?',
        studentB:
          'Sleep Tracking, Auto Exercise Tracking, Auto Heart Rate Tracking',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are its additional features?',
        suggestedAnswer:
          'Its additional features are Sleep Tracking, Auto Exercise Tracking, and Auto Heart Rate Tracking.'
      },
      {
        field: 'Additional features (Functions)',
        studentA: '(4) What are their functions?',
        studentB:
          'Record sleeping hours and notify breaths per minute; Record your exercise; Measure heartbeat when training',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are their functions?',
        suggestedAnswer:
          'Sleep Tracking records sleeping hours and notifies breaths per minute. Auto Exercise Tracking records your exercise. Auto Heart Rate Tracking measures your heartbeat when training.'
      }
    ],
    keyExpressions: [
      'What processor is it powered by?',
      'What operating system does it run?',
      'Which sensors is it integrated with?',
      'It is compatible with ...',
      'Notifications allow you to ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "Hi! We each have half of the specs for the Samsung SM Gear Fit 2 smartwatch. Let's exchange the missing information.",
        translationVi: 'Chào bạn! Mỗi người chúng ta có một nửa thông số của đồng hồ Samsung SM Gear Fit 2. Hãy trao đổi thông tin còn thiếu nhé.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Sure, let's start. What operating system does it run?",
        translationVi: 'Chắc chắn rồi, bắt đầu nhé. Đồng hồ chạy hệ điều hành gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It runs on Tizen OS. What processor is it powered by?',
        translationVi: 'Nó chạy hệ điều hành Tizen OS. Nó dùng bộ vi xử lý nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is powered by an EX3250 dual-core 1GHz processor. What operating systems is it compatible with?',
        translationVi: 'Nó dùng bộ xử lý lõi kép EX3250 xung nhịp 1GHz. Nó tương thích với những hệ điều hành nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'It is compatible with Android 4.4 or higher and iOS 9.0 or above. Which sensors is it integrated with?',
        translationVi: 'Nó tương thích với Android 4.4 trở lên và iOS 9.0 trở lên. Nó được tích hợp những cảm biến nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'It is integrated with an accelerometer, a gyroscope, and a barometer. What are its key features?',
        translationVi: 'Nó tích hợp cảm biến gia tốc, con quay hồi chuyển và cảm biến áp suất. Các tính năng chính của nó là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Its key features are GPS Exercise, Notifications, and Music Player.',
        translationVi: 'Các tính năng chính gồm tập luyện GPS, thông báo và trình phát nhạc.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'What are their functions?',
        translationVi: 'Chức năng của từng tính năng đó là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'GPS Exercise gives accurate exercise statistics. Notifications allow you to receive or respond to calls and text messages. Music Player connects with Spotify to access online music and stream your favorite songs.',
        translationVi: 'GPS Exercise cung cấp thống kê luyện tập chính xác. Notifications cho phép nhận hoặc trả lời cuộc gọi và tin nhắn. Music Player kết nối Spotify để nghe nhạc trực tuyến và phát các bài hát yêu thích.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Now, what are its additional features?',
        translationVi: 'Vậy các tính năng bổ sung của nó là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'The additional features are Sleep Tracking, Auto Exercise Tracking, and Auto Heart Rate Tracking.',
        translationVi: 'Các tính năng bổ sung gồm Theo dõi giấc ngủ, Tự động ghi nhận bài tập và Tự động đo nhịp tim.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'And what are their functions?',
        translationVi: 'Chức năng của chúng là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Sleep Tracking records sleeping hours and notifies breaths per minute. Auto Exercise Tracking records your exercise. Auto Heart Rate Tracking measures your heartbeat when training.',
        translationVi: 'Theo dõi giấc ngủ ghi lại số giờ ngủ và báo số nhịp thở mỗi phút. Tự động ghi nhận bài tập theo dõi quá trình vận động. Tự động đo nhịp tim đo nhịp tim khi tập luyện.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'Great! Now we have all the information needed to complete the specification sheet.',
        translationVi: 'Tuyệt vời! Giờ chúng ta đã có đủ thông tin để hoàn thiện bảng thông số kỹ thuật rồi.'
      }
    ]
  },
  {
    id: 'card_u2_comparison',
    unit: 2,
    cardCode: 'Card 2B',
    title: 'Smartwatch Comparison (Apple Watch Series 2 vs. Samsung SM Gear Fit 2)',
    subtitleVi: 'Luyện tập so sánh thông số tương đồng & khác biệt giữa hai đồng hồ thông minh',
    source: 'textbook_supplement',
    scenarioVi:
      'Bổ sung từ giáo trình Unit 2 (Tutor’s Handouts tr. 294–296 & Student’s Book tr. 34–38): Student A giới thiệu Apple Watch Series 2 và Student B giới thiệu Samsung SM Gear Fit 2. Hai bạn sử dụng các cấu trúc so sánh của Unit 2 (like, similar to, both...and, unlike, whereas, in contrast) để đối chiếu và chọn thiết bị phù hợp.',
    roleAName: 'Student A (Apple Watch Series 2)',
    roleBName: 'Student B (Samsung SM Gear Fit 2)',
    rows: [
      {
        field: 'Operating System',
        studentA: 'WatchOS 3',
        studentB: 'Tizen OS',
        suggestedQuestion: 'How do their operating systems differ?',
        suggestedAnswer:
          'Unlike the Samsung SM Gear Fit 2 running Tizen OS, the Apple Watch Series 2 runs WatchOS 3.'
      },
      {
        field: 'Processor',
        studentA: 'S2 dual-core',
        studentB: 'EX3250 dual-core 1GHz',
        suggestedQuestion: 'What is similar about their processors?',
        suggestedAnswer:
          'Like the Samsung SM Gear Fit 2, the Apple Watch Series 2 is powered by a dual-core processor.'
      },
      {
        field: 'Compatibility',
        studentA: 'iOS 9.0 or above only',
        studentB: 'Android 4.4 or higher and iOS 9.0 or above',
        suggestedQuestion: 'Which smartphones are they compatible with?',
        suggestedAnswer:
          'Both smartwatches are compatible with iOS 9.0 or above. In contrast to the Apple Watch Series 2, the Gear Fit 2 also works with Android 4.4 or higher.'
      },
      {
        field: 'Integrated sensors',
        studentA:
          'Accelerometer, Ambient light sensor, Barometer, Heart Rate Monitor',
        studentB:
          'Accelerometer, Gyroscope, Barometer (plus Auto Heart Rate Tracking)',
        suggestedQuestion:
          'What sensors do both smartwatches share, and how are they different?',
        suggestedAnswer:
          'Both devices are integrated with an accelerometer and a barometer. However, the Apple Watch Series 2 has an ambient light sensor, whereas the Gear Fit 2 includes a gyroscope.'
      },
      {
        field: 'Key features',
        studentA:
          'Built-in GPS (map runs), Notifications, Water resistant 50 meters (prevent water ingress while swimming)',
        studentB:
          'GPS Exercise (exercise statistics), Notifications, Music Player (Spotify streaming)',
        suggestedQuestion: 'How do their key features compare?',
        suggestedAnswer:
          'Similarly, both watches offer built-in GPS and call/text notifications. While the Apple Watch Series 2 is water-resistant up to 50 meters for swimming, the Gear Fit 2 stands out with Spotify music streaming.'
      },
      {
        field: 'Additional features',
        studentA:
          'Sleep Tracking, Breathe tracker (monitor breathing), Force touch (easy interaction)',
        studentB:
          'Sleep Tracking, Auto Exercise Tracking, Auto Heart Rate Tracking',
        suggestedQuestion: 'What additional features make each watch unique?',
        suggestedAnswer:
          'Both watches feature Sleep Tracking. Unlike the Gear Fit 2 with automatic exercise and heart rate tracking, the Apple Watch Series 2 offers a Breathe tracker and Force Touch.'
      }
    ],
    keyExpressions: [
      'Like ..., ... is powered by ...',
      'Both ... and ... are compatible with ...',
      'Unlike ..., ... runs on ...',
      'Whereas / While ..., ...',
      'Similarly, ... / In contrast, ...',
      'different from ... / similar to ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "Let's compare the Apple Watch Series 2 and the Samsung SM Gear Fit 2. First, unlike the Gear Fit 2 running Tizen OS, the Apple Watch Series 2 runs WatchOS 3.",
        translationVi: 'Hãy cùng so sánh Apple Watch Series 2 và Samsung SM Gear Fit 2. Trước hết, khác với Gear Fit 2 chạy Tizen OS, Apple Watch Series 2 chạy WatchOS 3.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Right, their operating systems are different, but their processors are similar—like the Apple Watch Series 2 with its S2 dual-core chip, the Gear Fit 2 is powered by a dual-core 1GHz processor.',
        translationVi: 'Đúng vậy, hệ điều hành khác nhau nhưng vi xử lý khá tương đồng—giống như Apple Watch Series 2 dùng chip lõi kép S2, Gear Fit 2 cũng dùng bộ xử lý lõi kép 1GHz.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'How about smartphone compatibility? Both smartwatches are compatible with iOS 9.0 or above.',
        translationVi: 'Thế còn khả năng tương thích điện thoại? Cả hai đồng hồ đều tương thích với iOS 9.0 trở lên.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Yes, whereas the Apple Watch Series 2 only works with iOS, the Samsung SM Gear Fit 2 is also compatible with Android 4.4 or higher.',
        translationVi: 'Đúng thế, trong khi Apple Watch Series 2 chỉ dùng với iOS, Samsung SM Gear Fit 2 còn tương thích cả Android 4.4 trở lên.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'When it comes to sensors, both devices are integrated with an accelerometer and a barometer. However, the Apple Watch adds an ambient light sensor, while the Gear Fit 2 features a gyroscope.',
        translationVi: 'Về cảm biến, cả hai thiết bị đều tích hợp cảm biến gia tốc và cảm biến khí áp. Tuy nhiên, Apple Watch có thêm cảm biến ánh sáng môi trường, còn Gear Fit 2 lại có con quay hồi chuyển.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: 'Similarly, both watches provide built-in GPS and smartphone notifications. In contrast, the Apple Watch Series 2 is water-resistant to 50 meters for swimming, while the Gear Fit 2 focuses on Spotify streaming.',
        translationVi: 'Tương tự, cả hai đều có GPS tích hợp và thông báo từ điện thoại. Ngược lại, Apple Watch Series 2 chống nước 50 mét khi bơi, còn Gear Fit 2 tập trung vào nghe nhạc Spotify.'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: 'What about additional features? Both include Sleep Tracking, though the Apple Watch has Force Touch and a Breathe tracker, whereas the Gear Fit 2 offers Auto Exercise Tracking.',
        translationVi: 'Còn tính năng bổ sung thì sao? Cả hai đều có theo dõi giấc ngủ, nhưng Apple Watch có Force Touch và đo nhịp thở, trong khi Gear Fit 2 tự động nhận diện bài tập.'
      },
      {
        speaker: 'B',
        roleLabel: 'Student B',
        line: "Since I use an Android phone and love running with music, I'd choose the Samsung SM Gear Fit 2. Which one would you pick?",
        translationVi: 'Vì mình dùng điện thoại Android và thích chạy bộ nghe nhạc, mình sẽ chọn Samsung SM Gear Fit 2. Bạn sẽ chọn chiếc nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Student A',
        line: "I'd go for the Apple Watch Series 2 because I use an iPhone and want 50-meter water resistance for swimming.",
        translationVi: 'Mình sẽ chọn Apple Watch Series 2 vì mình dùng iPhone và cần chuẩn chống nước 50 mét để đi bơi.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 3: Installation
   * ======================================================================== */
  {
    id: 'card_u3_ceiling_fan',
    unit: 3,
    cardCode: 'Card 3A',
    title: 'Installing a Ceiling Fan',
    subtitleVi: 'Hướng dẫn 7 bước lắp đặt quạt trần dân dụng & lưu ý an toàn điện',
    source: 'card_docx',
    scenarioVi:
      'Student A là kỹ thuật viên mới (New Technician) hỏi kỹ thuật viên hướng dẫn (Student B - Instructor) cách lắp đặt một chiếc quạt trần trong nhà: dụng cụ cần chuẩn bị, kiểm tra trước khi lắp, 7 bước lắp đặt, kiểm tra sau lắp đặt và cảnh báo an toàn.',
    roleAName: 'Student A (New Technician)',
    roleBName: 'Student B (Instructor)',
    rows: [
      {
        field: 'Item',
        studentA: '(1) What device are we going to install?',
        studentB: 'Ceiling fan',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What device are we going to install?',
        suggestedAnswer: "We're going to install a ceiling fan."
      },
      {
        field: 'Location',
        studentA: 'House',
        studentB: '(1) Where are we going to install it?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Where are we going to install it?',
        suggestedAnswer: 'We are going to install it in a house.'
      },
      {
        field: 'Preparation',
        studentA: '(2) What equipment do we need & pre-check?',
        studentB:
          'Ladder, wire cutters, voltage tester, new ceiling fan; Check the fixture to see its compatibility',
        aIsQuestionPrompt: true,
        suggestedQuestion:
          'What equipment do we need, and what should we do before installation?',
        suggestedAnswer:
          'We need a ladder, wire cutters, a voltage tester, and a new ceiling fan. Before installation, we must cut off the power and check the existing fixture for compatibility.'
      },
      {
        field: 'Installation (7 Steps)',
        studentA:
          'Step 1: Disconnect wires and remove existing fixture -> Step 2: Check electrical box and ceiling -> Step 3: Attach new electrical box -> Step 4: Mount ceiling plate -> Step 5: Assemble fan components -> Step 6: Make wire connections -> Step 7: Attach blades',
        studentB: '(2) How can we install it?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How can we install the ceiling fan step by step?',
        suggestedAnswer:
          'First, disconnect the wires and remove the existing fixture. Next, check the electrical box and the ceiling. Then, attach the new electrical box. After that, mount the ceiling plate. Next, assemble the fan components. Then, make the wire connections. Finally, attach the blades.'
      },
      {
        field: 'Post-installation',
        studentA: '(3) What should we do after installation?',
        studentB:
          'Check the wire; Check the operation of the device and maintain it',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do after installation?',
        suggestedAnswer:
          'We should check all wire connections, test the operation of the ceiling fan, and maintain the device regularly.'
      },
      {
        field: 'Caution',
        studentA:
          'Do not twist the power cords; Use voltage tester to check the current',
        studentB: '(3) Are there any cautions?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any safety cautions?',
        suggestedAnswer:
          'Yes, you must not twist the power cords, and you must always use a voltage tester to check the current.'
      }
    ],
    keyExpressions: [
      'What equipment do we need?',
      'First, ... Next, ... Then, ... After that, ... Finally, ...',
      'Check the fixture to see its compatibility.',
      'Do not twist the power cords.',
      'Use a voltage tester to check the current.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: "Good morning, sir. I'm a new technician. Could you help me install this ceiling fan?",
        translationVi: 'Chào buổi sáng anh. Em là kỹ thuật viên mới. Anh có thể hướng dẫn em lắp chiếc quạt trần này không ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'Of course! Where are we going to install it?',
        translationVi: 'Tất nhiên rồi! Chúng ta sẽ lắp nó ở đâu?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'In a house. What equipment do we need for the job?',
        translationVi: 'Trong một căn nhà ạ. Chúng ta cần chuẩn bị những dụng cụ gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We need a ladder, wire cutters, a voltage tester, and the new ceiling fan.',
        translationVi: 'Chúng ta cần thang, kìm cắt dây, bút/đồng hồ thử điện và bộ quạt trần mới.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'What should we do before installation?',
        translationVi: 'Chúng ta nên làm gì trước khi lắp đặt ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'First, turn off the breaker, and check the existing fixture to see its compatibility with the new fan. Now, do you know the 7 installation steps?',
        translationVi: 'Trước tiên phải ngắt cầu dao và kiểm tra giá treo cũ xem có tương thích với quạt mới không. Em đã nắm được 7 bước lắp đặt chưa?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Let me check my notes. First, we disconnect the wires and remove the existing fixture. Next, we check the electrical box and the ceiling. Then, we attach the new electrical box.',
        translationVi: 'Để em kiểm tra lại ghi chú. Đầu tiên, ngắt dây điện và tháo thiết bị cũ. Tiếp theo, kiểm tra hộp đấu nối và trần nhà. Sau đó, gắn hộp đấu nối mới.'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: "Good. What's next?",
        translationVi: 'Tốt. Tiếp theo là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'After that, we mount the ceiling plate. Next, we assemble the fan components. Then, we make the wire connections. Finally, we attach the blades.',
        translationVi: 'Sau đó lắp mặt bích lên trần, kế tiếp lắp ráp các bộ phận của quạt, rồi đấu nối dây điện và cuối cùng là gắn cánh quạt.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'What should we do after installation?',
        translationVi: 'Sau khi lắp xong chúng ta cần làm gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We should check the wiring carefully, turn on the power to test the operation of the ceiling fan, and schedule regular maintenance. Are there any safety cautions we must remember?',
        translationVi: 'Chúng ta cần kiểm tra lại dây dẫn, cấp điện chạy thử quạt và bảo dưỡng định kỳ. Có lưu ý an toàn nào cần nhớ không em?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Yes! We must not twist the power cords, and we should always use a voltage tester to check the electrical current.',
        translationVi: 'Dạ có! Không được làm xoắn dây nguồn và phải luôn dùng thiết bị thử điện để kiểm tra dòng điện.'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'Exactly right! Let’s get started safely.',
        translationVi: 'Chính xác rồi! Chúng ta bắt đầu làm việc an toàn nhé.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Thank you very much for your help, sir.',
        translationVi: 'Em cảm ơn anh nhiều vì đã hướng dẫn ạ.'
      }
    ]
  },
  {
    id: 'card_u3_air_conditioner',
    unit: 3,
    cardCode: 'Card 3B',
    title: 'Installing an Air Conditioner',
    subtitleVi: 'Hướng dẫn 6 bước lắp đặt điều hoà cửa sổ (5K–10K BTU) & cảnh báo an toàn',
    source: 'card_docx',
    scenarioVi:
      'Student A là kỹ thuật viên mới hỏi kỹ thuật viên hướng dẫn (Student B) chi tiết về dụng cụ (11 vít loại A, 5 vít loại B, khoan, thước thủy), bước kiểm tra trước lắp đặt, 6 bước lắp đặt điều hoà cửa sổ, kiểm tra sau lắp đặt và 3 lưu ý an toàn.',
    roleAName: 'Student A (New Technician)',
    roleBName: 'Student B (Instructor)',
    rows: [
      {
        field: 'Item',
        studentA: 'air conditioner',
        studentB: '(1) What device are we going to install?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What device are we going to install?',
        suggestedAnswer: "We're going to install a window air conditioner."
      },
      {
        field: 'Location',
        studentA: 'in a house',
        studentB: '(2) Where are we going to install it?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'Where are we going to install it?',
        suggestedAnswer: 'We are going to install it in a house.'
      },
      {
        field: 'Required equipment',
        studentA: '(1) What equipment and tools do we need?',
        studentB:
          '11 type A and 5 type B screws, a drill, a level (plus 3 L-brackets, seal strip, seal, 2 guide panels, support bracket, drainpipe & washer, screwdriver, scissors, pencil, ruler, hammer)',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What equipment and tools do we need?',
        suggestedAnswer:
          'We need 11 type A and 5 type B screws, a drill, a level, along with brackets, seal strips, guide panels, a screwdriver, scissors, a pencil, a ruler, and a hammer.'
      },
      {
        field: 'Pre-installation',
        studentA: '(2) What should we do before installation?',
        studentB:
          'Check the air conditioner (5K, 6K, and 10K BTU units); Check the compatibility of the tools size with the air conditioner',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do before installation?',
        suggestedAnswer:
          'Before installation, check that the air conditioner is a 5K, 6K, or 10K BTU unit and verify the compatibility of the tools size with the air conditioner.'
      },
      {
        field: 'Installation (6 Steps)',
        studentA: '(3) How do we install it step by step?',
        studentB:
          '1. Measure & mark centerline of inner sill (+8 in above/below) -> 2. Cut adhesive seal strip to window width -> 3. Insert guide panels into AC guides -> 4. Set AC carefully on windowsill -> 5. Fasten curtains with four type-A screws per side -> 6. Cut seal and stuff sash between glass and window',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'How do we install the air conditioner step by step?',
        suggestedAnswer:
          'First, measure and mark the centerline of the inner sill and another line eight inches above and below. Next, cut the seal strip to the window width. Then, insert the guide panels into the guides of the air conditioner. After that, carefully set the AC on the windowsill. Next, fasten the curtains to the unit with four type-A screws on each side. Finally, cut the seal to the window width and stuff the sash between the glass and the window.'
      },
      {
        field: 'Post-installation',
        studentA: '(4) What should we do after installation?',
        studentB:
          'Check the wire; Check the operation of the device and maintain the device',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What should we do after installation?',
        suggestedAnswer:
          'After installation, we must check the wiring, verify the operation of the unit, and maintain the device regularly.'
      },
      {
        field: 'Cautions',
        studentA: '(5) Are there any cautions to keep in mind?',
        studentB:
          "2 or more technicians for safe installation; Don't twist the power cords; Don't make a hole on the base fan for draining",
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any cautions we should keep in mind?',
        suggestedAnswer:
          "Yes: you need 2 or more technicians for safe installation, don't twist the power cords, and don't make a hole on the base fan for draining."
      }
    ],
    keyExpressions: [
      'Check the compatibility of the tools size with the air conditioner.',
      'First, measure and mark ... Next, ... Then, ... After that, ... Finally, ...',
      '2 or more technicians are required for safe installation.',
      "Don't twist the power cords.",
      "Don't make a hole on the base fan for draining."
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: "Hi! Today I'll guide you through a new installation job. What device are we going to install, and where?",
        translationVi: 'Chào em! Hôm nay anh sẽ hướng dẫn em một ca lắp đặt mới. Chúng ta sẽ lắp thiết bị gì và ở đâu?'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: "We're going to install a window air conditioner in a house. What equipment do we need?",
        translationVi: 'Chúng ta sẽ lắp một máy điều hoà cửa sổ trong nhà dân ạ. Chúng ta cần chuẩn bị những thiết bị gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'We need an installation kit with 11 type A and 5 type B screws, brackets, seals, and guide panels, as well as tools like a drill, a level, a screwdriver, scissors, a ruler, and a hammer.',
        translationVi: 'Chúng ta cần bộ lắp đặt gồm 11 vít loại A, 5 vít loại B, giá đỡ, gioăng, thanh dẫn hướng, cùng các dụng cụ như máy khoan, thước thủy cân bằng, tua-vít, kéo, thước kẻ và búa.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Got it. What should we do during pre-installation?',
        translationVi: 'Em rõ rồi. Trước khi lắp đặt chúng ta cần kiểm tra những gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'First, check the air conditioner to confirm this instruction fits 5K, 6K, or 10K BTU units, and check the compatibility of the tool sizes with the unit.',
        translationVi: 'Trước tiên kiểm tra công suất máy thuộc dòng 5K, 6K hay 10K BTU theo đúng tài liệu hướng dẫn, và kiểm tra độ tương thích kích thước dụng cụ với máy.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'And how can we install it step by step?',
        translationVi: 'Vậy các bước lắp đặt cụ thể như thế nào ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'Follow 6 steps. First, measure and mark the centerline of the inner sill, plus lines eight inches above and below. Next, cut the seal strip to the window width. Then, insert the guide panels into the guides of the air conditioner.',
        translationVi: 'Gồm 6 bước. Đầu tiên, đo và đánh dấu đường tâm bệ cửa sổ cùng hai đường cách 8 inch phía trên và dưới. Tiếp theo, cắt dải đệm kín theo chiều rộng cửa sổ. Sau đó, lồng các tấm dẫn hướng vào rãnh của điều hoà.'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'After that, carefully set the AC on the windowsill. Next, fasten the curtains to the unit with four type-A screws on each side. Finally, cut the seal to the window width and stuff the sash between the glass and the window to keep out air and insects.',
        translationVi: 'Sau đó, nhẹ nhàng đặt máy điều hoà lên bệ cửa sổ. Kế tiếp, bắt cố định rèm chắn hai bên bằng 4 vít loại A mỗi bên. Cuối cùng, cắt gioăng xốp theo chiều rộng cửa và chèn giữa kính với khung cửa sổ để ngăn gió và côn trùng.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'What should we do after installation?',
        translationVi: 'Sau khi lắp xong cần làm gì tiếp ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: 'After installation, we must check the wiring, test the operation of the device, and schedule regular maintenance.',
        translationVi: 'Sau lắp đặt cần kiểm tra dây nguồn, chạy thử hoạt động của máy và bảo trì định kỳ.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Are there any special cautions?',
        translationVi: 'Có lưu ý an toàn đặc biệt nào không ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Instructor',
        line: "Yes, three important cautions: you need 2 or more technicians for safe installation, don't twist the power cords, and don't make a hole on the base fan for draining.",
        translationVi: 'Có 3 lưu ý quan trọng: cần từ 2 kỹ thuật viên trở lên để lắp an toàn, không được làm xoắn dây nguồn và tuyệt đối không khoan lỗ trên đế quạt để thoát nước.'
      },
      {
        speaker: 'A',
        roleLabel: 'New Technician',
        line: 'Thank you very much! Everything is crystal clear now.',
        translationVi: 'Cảm ơn anh rất nhiều! Giờ em đã nắm rõ toàn bộ quy trình rồi ạ.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 4: Maintenance and repairs
   * ======================================================================== */
  {
    id: 'card_u4_electrolux',
    unit: 4,
    cardCode: 'Card 4A',
    title: 'Electrolux Washing Machine Hotline (Model EFLS617STT — Alarm E10)',
    subtitleVi: 'Tổng đài kỹ thuật chẩn đoán & hướng dẫn xử lý mã lỗi E10 máy giặt Electrolux',
    source: 'card_docx',
    scenarioVi:
      'Student A là kỹ thuật viên trực tổng đài hỗ trợ kỹ thuật. Student B là khách hàng gọi đến báo máy giặt Electrolux (EFLS617STT) không cấp nước và hiển thị mã lỗi E10 dù đã kiểm tra vòi và ống cấp nước.',
    roleAName: 'Student A (Hotline Technician)',
    roleBName: 'Student B (Customer)',
    rows: [
      {
        field: 'Product name',
        studentA: 'What kind is your washing machine? / Product name?',
        studentB: 'Electrolux washing machine',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What kind is your washing machine?',
        suggestedAnswer: "It's an Electrolux washing machine."
      },
      {
        field: 'Model',
        studentA: "What's its model?",
        studentB: 'EFLS617STT',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is its model?',
        suggestedAnswer: "It's model EFLS617STT."
      },
      {
        field: 'Problem(s)',
        studentA: "What's the problem?",
        studentB: 'The machine does not fill.',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What is the problem with your machine?',
        suggestedAnswer: 'The machine does not fill with water.'
      },
      {
        field: 'Trouble signs',
        studentA: 'Are there any trouble signs on the display?',
        studentB: 'Alarm code E10 on the display',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Are there any trouble signs on the display?',
        suggestedAnswer: 'Yes, alarm code E10 appears on the display.'
      },
      {
        field: 'Taken actions',
        studentA: 'What did you do?',
        studentB:
          'Read the troubleshooting tips; Open the water tap to check -> not stuck; Check the inlet hose -> not squashed or kinked',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What actions have you taken so far?',
        suggestedAnswer:
          "I read the troubleshooting tips, opened the water tap to check—it wasn't stuck—and checked the inlet hose, which wasn't squashed or kinked."
      },
      {
        field: 'Possible cause(s)',
        studentA: 'Dirty inlet hose filter blocking water',
        studentB: 'What might be the causes for this problem?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What might be the causes for this problem?',
        suggestedAnswer:
          'I think a dirty inlet hose filter might be blocking the water.'
      },
      {
        field: 'Suggested solutions',
        studentA: 'Dismantle the water inlet hose filter and clean it',
        studentB: 'What should I do now?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do now?',
        suggestedAnswer:
          'You should dismantle the water inlet hose filter and clean it thoroughly.'
      },
      {
        field: 'Precautions for maintenance & repairs',
        studentA:
          'Clean hose filter regularly; Ask a professional technician to maintain the washing machine every year',
        studentB: 'What should I do to avoid this problem in the future?',
        bIsQuestionPrompt: true,
        suggestedQuestion:
          'What should I do to avoid this problem in the future?',
        suggestedAnswer:
          'You should clean the hose filter regularly and ask a professional technician to maintain the washing machine every year.'
      }
    ],
    keyExpressions: [
      'What kind is your washing machine?',
      'Are there any trouble signs on the display?',
      'What might be the cause(s) for this problem?',
      'A dirty inlet hose filter might be blocking the water.',
      'Dismantle the water inlet hose filter and clean it.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Hello, this is the Electronics Service Hotline. How can I help you?',
        translationVi: 'Xin chào, đây là tổng đài hỗ trợ kỹ thuật điện máy. Tôi có thể giúp gì cho bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "Hello, I have a problem with my washing machine. It isn't working properly.",
        translationVi: 'Chào anh/chị, máy giặt nhà tôi đang gặp sự cố và không hoạt động bình thường.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What kind is your washing machine, and what is its model?',
        translationVi: 'Máy giặt nhà bạn thuộc hãng nào và mã model là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "It's an Electrolux washing machine, model EFLS617STT.",
        translationVi: 'Đó là máy giặt Electrolux, mã EFLS617STT.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What is the problem, and are there any trouble signs on the display?',
        translationVi: 'Máy đang gặp lỗi gì và có dấu hiệu bất thường nào trên màn hình không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'The machine does not fill with water, and there is alarm code E10 on the display.',
        translationVi: 'Máy không cấp nước và màn hình hiển thị mã lỗi E10.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'I see. What did you do before calling us?',
        translationVi: 'Tôi hiểu rồi. Trước khi gọi tổng đài, bạn đã kiểm tra những gì rồi?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "I read the troubleshooting tips, opened the water tap to check—it wasn't stuck—and checked the inlet hose, but it wasn't squashed or kinked. What might be the causes for this problem?",
        translationVi: 'Tôi đã đọc mục xử lý sự cố, mở vòi nước kiểm tra thì không bị kẹt, và kiểm tra ống cấp nước cũng không bị gập hay xoắn. Nguyên nhân có thể là gì vậy?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'I think a dirty inlet hose filter might be blocking the water.',
        translationVi: 'Tôi nghĩ bộ lọc của ống cấp nước bị bẩn có thể đang làm tắc dòng nước.'
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
        translationVi: 'Bạn nên tháo rời lưới lọc ở đầu ống cấp nước và vệ sinh sạch sẽ.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'And what should I do to avoid this problem in the future?',
        translationVi: 'Và tôi cần làm gì để tránh lỗi này lặp lại trong tương lai?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'You should clean the hose filter regularly and ask a professional technician to maintain the washing machine every year.',
        translationVi: 'Bạn nên vệ sinh lưới lọc ống cấp nước thường xuyên và nhờ kỹ thuật viên chuyên nghiệp bảo dưỡng máy giặt hằng năm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'Thank you very much for your advice!',
        translationVi: 'Cảm ơn sự tư vấn của bạn rất nhiều!'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: "You're welcome. Don't hesitate to call us if the issue continues.",
        translationVi: 'Không có chi ạ. Đừng ngần ngại gọi lại nếu sự cố vẫn tiếp diễn.'
      }
    ]
  },
  {
    id: 'card_u4_samsung_ac',
    unit: 4,
    cardCode: 'Card 4B',
    title: 'Samsung Washing Machine WF220ANW Overheating Hotline',
    subtitleVi: 'Chẩn đoán lỗi quá nhiệt do vận hành liên tục 4–5 mẻ/ngày (giáo trình tr. 128)',
    source: 'textbook_supplement',
    scenarioVi:
      'Chuyển thể từ Activity Files tr. 128 (Unit 4, Lesson 1 – Activity 2): Khách hàng gọi tới tổng đài Samsung Electronics vì máy giặt cửa trước WF220ANW ngừng quay dù vẫn phát ra tiếng ồn, không hiển thị mã lỗi nhưng chạy liên tục 4–5 mẻ giặt mỗi ngày.',
    roleAName: 'Student A (Samsung Hotline Technician)',
    roleBName: 'Student B (Customer)',
    rows: [
      {
        field: 'Product name & Type',
        studentA: 'What kind is your washing machine?',
        studentB: 'Samsung front-load washing machine',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What kind is your washing machine?',
        suggestedAnswer: "It's a Samsung front-load washing machine."
      },
      {
        field: 'Model',
        studentA: "What's its model?",
        studentB: 'WF220ANW',
        aIsQuestionPrompt: true,
        suggestedQuestion: "What's its model?",
        suggestedAnswer: "It's WF220ANW."
      },
      {
        field: 'Problem(s) & Signs',
        studentA: 'What is the problem? Any trouble signs?',
        studentB: "Doesn't work but still makes noise; No trouble signs on display",
        aIsQuestionPrompt: true,
        suggestedQuestion:
          'What is the problem, and are there any trouble signs on the display?',
        suggestedAnswer:
          "It doesn't work even though it still makes noise, and there are no trouble signs on the display."
      },
      {
        field: 'Taken actions & Usage',
        studentA:
          'Have you checked the water supply & inlet valves? How did you use the machine?',
        studentB:
          'Read troubleshooting tips; water supply valve is on; inlet hose is not kinked or squashed; washes 4–5 loads per day',
        aIsQuestionPrompt: true,
        suggestedQuestion:
          'Have you checked the water valves, and how often do you run the machine?',
        suggestedAnswer:
          'Yes, both the supply valve and inlet hose are fine, and I often run four or five loads a day.'
      },
      {
        field: 'Possible cause(s)',
        studentA: 'Overheating from running 4–5 loads in a day',
        studentB: 'What might be causing the problem?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What might be causing this issue?',
        suggestedAnswer:
          'Your washing machine is probably overheating from running four or five loads a day.'
      },
      {
        field: 'Suggested solutions',
        studentA:
          'Wait for a few hours until the machine cools down, then test it later',
        studentB: 'What should I do now?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What should I do now?',
        suggestedAnswer:
          'You ought to wait for a few hours until the machine cools down and use it later. Call us if the problem persists.'
      },
      {
        field: 'Precautions',
        studentA:
          'Avoid running the machine for too long continuously; Ask a professional technician for an annual overhaul',
        studentB: 'How can I prevent overheating in the future?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How can I prevent this problem in the future?',
        suggestedAnswer:
          'You had better not run the machine continuously for too long, and you should ask a professional technician to overhaul it every year.'
      }
    ],
    keyExpressions: [
      'Have you checked the water supply valve?',
      'It might be kinked or squashed.',
      'Your washing machine is probably overheating.',
      'You ought to wait until the machine cools down.',
      'Ask a professional technician to overhaul the machine every year.'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Hello, this is the Samsung Electronics service hotline. How can I help?',
        translationVi: 'Xin chào, đây là tổng đài dịch vụ Samsung Electronics. Tôi có thể giúp gì cho bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "Hello, I have a problem with my washing machine. It isn't working properly.",
        translationVi: 'Xin chào, máy giặt của tôi đang gặp trục trặc.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What kind is your washing machine, and what is its model?',
        translationVi: 'Máy giặt nhà bạn thuộc loại nào và model là gì ạ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "It's a front-load washing machine, model WF220ANW.",
        translationVi: 'Là máy giặt cửa trước, mã model WF220ANW.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What is the problem, and are there any trouble signs on the display?',
        translationVi: 'Máy bị lỗi cụ thể thế nào và màn hình có báo lỗi gì không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "It doesn't wash, yet it still makes noise. No, there aren't any trouble signs on the display.",
        translationVi: 'Máy không chạy nhưng vẫn phát ra tiếng ồn. Không có mã lỗi nào hiện trên màn hình cả.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'What did you check? Have you checked the water supply valve and the inlet hose?',
        translationVi: 'Bạn đã kiểm tra những gì rồi? Van cấp nước đã mở và ống dẫn không bị gập chứ?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: "I read the troubleshooting tips and checked both the supply valve and the inlet hose—they're completely fine.",
        translationVi: 'Tôi đã đọc hướng dẫn khắc phục và kiểm tra cả van cấp lẫn ống dẫn nước, mọi thứ đều bình thường.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'If the water valves are not the cause, how have you been using the machine?',
        translationVi: 'Nếu không phải do van nước, vậy bạn đã sử dụng máy với tần suất như thế nào?'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'I often use it to wash four or five loads in a day.',
        translationVi: 'Tôi thường giặt 4 đến 5 mẻ trong một ngày.'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: 'Oh, your washing machine is probably overheating.',
        translationVi: 'Ồ, máy giặt của bạn rất có thể đang bị quá nhiệt rồi.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'What should I do now?',
        translationVi: 'Bây giờ tôi nên làm gì ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: "You ought to wait for a few hours until the machine cools down and use it later. From now on, you had better not run it continuously for long periods, and ask a professional technician to overhaul the washing machine every year.",
        translationVi: 'Bạn nên đợi vài tiếng cho máy nguội hẳn rồi hãy dùng lại. Từ giờ trở đi, bạn không nên vận hành máy liên tục quá lâu và hãy nhờ kỹ thuật viên bảo dưỡng toàn bộ định kỳ hằng năm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Customer',
        line: 'I see, thank you very much!',
        translationVi: 'Tôi hiểu rồi, cảm ơn anh rất nhiều!'
      },
      {
        speaker: 'A',
        roleLabel: 'Hotline Technician',
        line: "You're welcome! Don't hesitate to call us if the problem happens again.",
        translationVi: 'Không có chi ạ! Nếu sự cố tái diễn, hãy gọi lại cho chúng tôi nhé.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 5: Customer service
   * ======================================================================== */
  {
    id: 'card_u5_vaeco',
    unit: 5,
    cardCode: 'Card 5A',
    title: 'VAECO Vietnam Order Complaint (Order T6758 — Ms Joan Tran)',
    subtitleVi: 'Cuộc gọi xử lý khiếu nại giao thiếu cánh tuabin khí & nhầm mã cánh tĩnh',
    source: 'card_docx',
    scenarioVi:
      'Student A (Ms Joan Tran, Phòng Thu mua Vietnam Airlines) gọi điện khiếu nại Student B (Peter, Nhân viên kinh doanh VAECO Vietnam) về đơn hàng T6758: đặt 75 cánh tuabin khí (gas turbine blades TR16-957X) nhưng chỉ nhận 70 chiếc (thiếu 5 chiếc) và đặt cánh tĩnh ST23-56R (vanes) nhưng lại giao nhầm sang mã ST28-56R.',
    roleAName: 'Student A (Ms Joan Tran - Vietnam Airlines)',
    roleBName: 'Student B (Peter - VAECO Vietnam Staff)',
    rows: [
      {
        field: 'Order Reference & Customer',
        studentA: 'Order T6758 — Ms Joan Tran (Vietnam Airlines)',
        studentB: 'Invoice #100 (7 June, 2017) — VAECO Vietnam',
        suggestedQuestion: 'Can I have the order reference number, please?',
        suggestedAnswer: "It's T6758, for Ms Joan Tran of Vietnam Airlines."
      },
      {
        field: 'Problem 1: Gas turbine blades (TR16-957X)',
        studentA: 'Ordered 75 blades, received only 70 (5 missing)',
        studentB: 'Check inventory & send 5 extra blades this afternoon',
        suggestedQuestion: 'What seems to be the first problem?',
        suggestedAnswer:
          'I ordered 75 gas turbine blades, but I only received 70, so five blades are missing.'
      },
      {
        field: 'Problem 2: Vanes (ST23-56R)',
        studentA: 'Ordered ST23-56R vanes (60 pcs), received ST28-56R',
        studentB:
          'Apologize for warehouse mix-up after office move & exchange for ST23-56R right away',
        suggestedQuestion: 'Is there anything else wrong with the order?',
        suggestedAnswer:
          'It looks as if you shipped the wrong vanes. I ordered ST23-56R, but I received ST28-56R.'
      }
    ],
    flowSteps: [
      {
        speaker: 'B',
        action: 'Greet the customer and ask how you can help',
        sampleLine: 'Good morning. VAECO Vietnam. Peter speaking. How can I help?'
      },
      {
        speaker: 'A',
        action: 'Greet the staff and say you have problems with your last order',
        sampleLine: "Good morning. I'm having some problems with my last order."
      },
      {
        speaker: 'B',
        action: 'Show sympathy and ask for the order reference number',
        sampleLine:
          "I'm sorry to hear that. Can I have the order reference number, please?"
      },
      {
        speaker: 'A',
        action: 'Give the order reference number (T6758)',
        sampleLine: "OK. It's T6758."
      },
      {
        speaker: 'B',
        action: "Confirm the customer's name and company",
        sampleLine: 'Thanks. So you are Ms Joan Tran of Vietnam Airlines?'
      },
      {
        speaker: 'A',
        action: 'Confirm your identity',
        sampleLine: "That's right."
      },
      {
        speaker: 'B',
        action: 'Ask for details of the problems',
        sampleLine: 'And what seems to be the problem?'
      },
      {
        speaker: 'A',
        action:
          'Give detailed information about both problems (75 vs 70 blades; ST23 vs ST28 vanes)',
        sampleLine:
          'Firstly, I ordered 75 gas turbine blades, but I only received 70—five blades are missing. Secondly, it looks as if you shipped the wrong vanes: I ordered vanes ST23, but I received ST28.'
      },
      {
        speaker: 'B',
        action: 'Explain politely & give solutions to each problem',
        sampleLine:
          "I'm very sorry about that—we recently moved to a new facility. We'll check and send you 5 extra blades this afternoon, and we'll dispatch someone to exchange the vanes for ST23 right away."
      },
      {
        speaker: 'A',
        action: 'Respond to the solutions (agree)',
        sampleLine: "That's great. I really appreciate the fast resolution."
      },
      {
        speaker: 'A',
        action: 'Say thanks',
        sampleLine: 'Thank you very much!'
      },
      {
        speaker: 'B',
        action: 'Respond to the thanks & offer further assistance',
        sampleLine:
          "You're welcome. And if you need any further assistance, just call us again."
      }
    ],
    keyExpressions: [
      'Good morning. VAECO Vietnam. [Name] speaking. How can I help?',
      'Can I have the order reference number, please?',
      'What seems to be the problem?',
      'It looks as if you shipped the wrong vanes.',
      "We'll send someone to exchange them right away.",
      'If you need any further assistance, just call us again.'
    ],
    sampleDialogue: [
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: 'Good morning. VAECO Vietnam. Peter speaking. How can I help?',
        translationVi: 'Chào buổi sáng. Công ty VAECO Việt Nam, tôi là Peter nghe máy. Tôi có thể giúp gì cho chị?'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: "Good morning. I'm having some problems with my last order.",
        translationVi: 'Chào anh. Tôi đang gặp vài vấn đề với đơn hàng gần nhất của mình.'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: "I'm sorry to hear that. Can I have the order reference number, please?",
        translationVi: 'Rất tiếc khi nghe điều đó. Chị vui lòng cho tôi xin mã tham chiếu đơn hàng được không ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: "OK. It's T6758.",
        translationVi: 'Vâng. Mã đơn hàng là T6758.'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: "Thanks. So you're Ms Joan Tran of Vietnam Airlines?",
        translationVi: 'Cảm ơn chị. Vậy chị là chị Joan Tran ở Vietnam Airlines đúng không ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: "That's right.",
        translationVi: 'Đúng rồi ạ.'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: 'And what seems to be the problem?',
        translationVi: 'Vậy đơn hàng có vấn đề gì thế ạ?'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: 'Firstly, I ordered 75 gas turbine blades, but I only received 70. Five blades are missing.',
        translationVi: 'Thứ nhất, tôi đặt 75 cánh tuabin khí nhưng chỉ nhận được 70 chiếc. Thiếu mất 5 chiếc.'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: "Well, we'll check our warehouse right away and send you the 5 extra blades this afternoon. Is there anything else, Ms Tran?",
        translationVi: 'Vâng, chúng tôi sẽ kiểm tra kho ngay và gửi bù 5 cánh tuabin vào chiều nay. Còn vấn đề nào khác nữa không thưa chị Tran?'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: 'Yes, it looks as if you shipped the wrong vanes. I ordered vanes ST23, but I received vanes ST28.',
        translationVi: 'Có đấy ạ, có vẻ như bên anh đã giao nhầm cánh tĩnh. Tôi đặt mã ST23 nhưng lại nhận được mã ST28.'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: "I'm sorry to hear that. We recently moved to a new building, which seems to have caused some mix-ups. We'll send someone to exchange the vanes for the correct ones right away.",
        translationVi: 'Rất xin lỗi chị về sự nhầm lẫn này. Công ty vừa chuyển sang toà nhà mới nên có chút sai sót. Chúng tôi sẽ cử người qua đổi đúng mã ST23 ngay lập tức.'
      },
      {
        speaker: 'A',
        roleLabel: 'Customer (Ms Joan Tran)',
        line: "That's great. Thank you!",
        translationVi: 'Tuyệt quá. Cảm ơn anh nhiều!'
      },
      {
        speaker: 'B',
        roleLabel: 'VAECO Staff (Peter)',
        line: "You're welcome. And if you need any further assistance, just call us again.",
        translationVi: 'Không có chi ạ. Nếu chị cần hỗ trợ thêm bất kỳ điều gì, cứ gọi lại cho chúng tôi nhé.'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 6: Data Analysis (Supplemented from Textbook & Tutor's Handouts)
   * ======================================================================== */
  {
    id: 'card_u6_trends_charts',
    unit: 6,
    cardCode: 'Card 6A',
    title: 'Describing Electrical & Electronics Trend Graphs (Mono-talk & Pair Q&A)',
    subtitleVi: 'Mô tả 3 biểu đồ xu hướng tiêu biểu trong giáo trình (Điều hoà, iPad & Tỷ lệ hỏng hóc)',
    source: 'textbook_supplement',
    scenarioVi:
      'Bổ sung từ giáo trình Unit 6 (Tutor’s Handouts tr. 351–353 & Student’s Book tr. 92–93): Student A thuyết trình (Mono-talk) mô tả 3 biểu đồ kỹ thuật/thị trường bằng mẫu câu dẫn chiếu biểu đồ và cấu trúc S + V + Adv / There + be + Adj + N; Student B đóng vai người nghe đặt câu hỏi làm rõ số liệu.',
    roleAName: 'Student A (Presenter)',
    roleBName: 'Student B (Colleague / Examiner)',
    charts: [
      {
        title: 'Number of AC sold in Vietnam (2010–2014)',
        chartType: 'line',
        unitLabel: 'units',
        points: [
          { label: '2010', value: 200000 },
          { label: '2012', value: 900000 },
          { label: '2014', value: 900000 }
        ]
      },
      {
        title: 'Number of iPads sold (2006–2015)',
        chartType: 'line',
        unitLabel: 'million units',
        points: [
          { label: '2006', value: 4.3 },
          { label: '2009', value: 2.5 },
          { label: '2012', value: 3.0 },
          { label: '2015', value: 3.5 }
        ]
      },
      {
        title: 'Average breakdowns per household (2008–2014)',
        chartType: 'line',
        unitLabel: 'breakdowns / household',
        points: [
          { label: '2008', value: 1.0, series: 'Air Conditioner' },
          { label: '2010', value: 1.5, series: 'Air Conditioner' },
          { label: '2012', value: 4.4, series: 'Air Conditioner' },
          { label: '2014', value: 1.8, series: 'Air Conditioner' }
        ],
        multiSeries: [
          {
            name: 'Air Conditioner',
            color: '#2563eb',
            points: [
              { label: '2008', value: 1.0 },
              { label: '2010', value: 1.5 },
              { label: '2012', value: 4.4 },
              { label: '2014', value: 1.8 }
            ]
          },
          {
            name: 'Washing Machine',
            color: '#0d9488',
            points: [
              { label: '2008', value: 1.8 },
              { label: '2010', value: 2.3 },
              { label: '2012', value: 4.8 },
              { label: '2014', value: 2.6 }
            ]
          }
        ]
      }
    ],
    rows: [
      {
        field: 'Chart 1: AC sold in Vietnam',
        studentA:
          '2010: 200,000 -> 2012: 900,000 (sharp rise) -> 2014: 900,000 (remained constant)',
        studentB: 'What is the overall trend of AC sales from 2010 to 2014?',
        bIsQuestionPrompt: true,
        suggestedQuestion:
          'What does the first line graph show about AC sales in Vietnam?',
        suggestedAnswer:
          'The number of air conditioners sold in Vietnam rose sharply from 200,000 in 2010 to 900,000 in 2012, and then remained constant through 2014.'
      },
      {
        field: 'Chart 2: iPads sold (million)',
        studentA:
          '2006: 4.3M -> 2009: 2.5M (sharp decline) -> 2012: 3.0M -> 2015: 3.5M (steady recovery)',
        studentB: 'How did iPad sales change between 2006 and 2015?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'How did iPad sales change between 2006 and 2015?',
        suggestedAnswer:
          'There was a sharp fall from 4.3 million in 2006 to 2.5 million in 2009, followed by a steady growth to 3.5 million in 2015.'
      },
      {
        field: 'Chart 3: Household breakdowns',
        studentA:
          'Both AC & washing machine breakdowns rose slightly (2008–2010), peaked in 2012 (4.4 vs 4.8), then dropped sharply by 2014 (1.8 vs 2.6)',
        studentB: 'When did appliance breakdowns reach a peak?',
        bIsQuestionPrompt: true,
        suggestedQuestion:
          'What happened to average household breakdowns between 2008 and 2014?',
        suggestedAnswer:
          'Average breakdowns per household peaked in 2012—at around 4.4 for air conditioners and 4.8 for washing machines—before falling significantly by 2014.'
      }
    ],
    keyExpressions: [
      "I'd like to refer to ...",
      'This line graph represents ...',
      'As you can see, ...',
      "I'd like to draw your attention to ...",
      'There was a sharp rise / decline in ...',
      'remained constant / leveled off at ...',
      'peaked at ... in 2012'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: "Good morning! Today I'd like to refer to three trend graphs from our engineering market report.",
        translationVi: 'Chào buổi sáng! Hôm nay tôi xin phép trình bày ba biểu đồ xu hướng từ báo cáo thị trường kỹ thuật của chúng ta.'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'First, if we take a look at Graph 1, this line graph represents the number of air conditioners sold in Vietnam between 2010 and 2014. As you can see, sales increased dramatically from 200,000 units in 2010 to 900,000 in 2012, and then leveled off at 900,000 through 2014.',
        translationVi: 'Đầu tiên, nhìn vào Biểu đồ 1, đồ thị đường này thể hiện số lượng điều hoà bán ra tại Việt Nam từ 2010 đến 2014. Như các bạn thấy, doanh số tăng đột biến từ 200.000 chiếc năm 2010 lên 900.000 chiếc năm 2012, sau đó đi ngang ở mức 900.000 chiếc đến năm 2014.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'Thank you. What about Graph 2—how did iPad sales change from 2006 to 2015?',
        translationVi: 'Cảm ơn bạn. Thế còn Biểu đồ 2—doanh số iPad đã thay đổi thế nào từ 2006 đến 2015?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: "I'd like to draw your attention to the two contrasting phases in Graph 2. There was a sharp fall from around 4.3 million units in 2006 to 2.5 million in 2009. After that, sales grew steadily to 3.0 million in 2012 and 3.5 million in 2015.",
        translationVi: 'Tôi muốn thu hút sự chú ý của bạn vào hai giai đoạn trái ngược ở Biểu đồ 2. Doanh số giảm mạnh từ khoảng 4,3 triệu máy năm 2006 xuống 2,5 triệu năm 2009, sau đó tăng đều lên 3,0 triệu năm 2012 và 3,5 triệu năm 2015.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'And if we look at the third graph, when did appliance breakdowns reach a peak?',
        translationVi: 'Và nhìn vào biểu đồ thứ ba, tỷ lệ hỏng hóc thiết bị đạt đỉnh vào năm nào?'
      },
      {
        speaker: 'A',
        roleLabel: 'Presenter',
        line: 'You will notice in Graph 3 that average breakdowns per household climbed slowly between 2008 and 2010, then peaked sharply in 2012—at roughly 4.4 for air conditioners and 4.8 for washing machines—before dropping markedly to 1.8 and 2.6 in 2014.',
        translationVi: 'Bạn sẽ nhận thấy ở Biểu đồ 3 rằng số lần hỏng hóc trung bình mỗi hộ tăng chậm giai đoạn 2008–2010, đạt đỉnh mạnh vào năm 2012—khoảng 4,4 lần với điều hoà và 4,8 lần với máy giặt—rồi giảm rõ rệt xuống 1,8 và 2,6 lần vào năm 2014.'
      },
      {
        speaker: 'B',
        roleLabel: 'Colleague',
        line: 'That decline after 2012 suggests much better product reliability and regular maintenance!',
        translationVi: 'Đà giảm sau năm 2012 cho thấy độ tin cậy sản phẩm và việc bảo trì định kỳ đã tốt hơn nhiều!'
      }
    ]
  },
  {
    id: 'card_u6_visual_aids',
    unit: 6,
    cardCode: 'Card 6B',
    title: 'Seasonal Sales Presentation (Air Conditioners vs. Heaters)',
    subtitleVi: 'Thuyết trình biểu đồ kết hợp: Doanh số ròng & biến động mùa vụ Điều hoà vs. Máy sưởi',
    source: 'textbook_supplement',
    scenarioVi:
      'Bổ sung từ Student’s Book Unit 6 Lesson 2 (tr. 94–95): Student A thuyết trình báo cáo doanh số 10 tháng đầu năm bằng biểu đồ cột (Net Sales) và biểu đồ đường đa chuỗi (Air Conditioners vs. Heaters). Student B đặt câu hỏi về nguyên nhân biến động tháng 7 và đề xuất giải pháp xuất khẩu.',
    roleAName: 'Student A (Sales Analyst)',
    roleBName: 'Student B (Manager - Audience Q&A)',
    charts: [
      {
        title: 'Air Conditioner vs. Heater Sales (Jan–Oct)',
        chartType: 'line',
        unitLabel: '$ million',
        points: [
          { label: 'Jan', value: 2.2, series: 'Air Conditioners' },
          { label: 'Feb', value: 2.0, series: 'Air Conditioners' },
          { label: 'Mar', value: 1.8, series: 'Air Conditioners' },
          { label: 'Apr', value: 1.5, series: 'Air Conditioners' },
          { label: 'May', value: 1.2, series: 'Air Conditioners' },
          { label: 'Jun', value: 0.9, series: 'Air Conditioners' },
          { label: 'Jul', value: 0.6, series: 'Air Conditioners' },
          { label: 'Aug', value: 0.9, series: 'Air Conditioners' },
          { label: 'Sep', value: 1.3, series: 'Air Conditioners' },
          { label: 'Oct', value: 1.6, series: 'Air Conditioners' }
        ],
        multiSeries: [
          {
            name: 'Air Conditioners',
            color: '#2563eb',
            points: [
              { label: 'Jan', value: 2.2 },
              { label: 'Feb', value: 2.0 },
              { label: 'Mar', value: 1.8 },
              { label: 'Apr', value: 1.5 },
              { label: 'May', value: 1.2 },
              { label: 'Jun', value: 0.9 },
              { label: 'Jul', value: 0.6 },
              { label: 'Aug', value: 0.9 },
              { label: 'Sep', value: 1.3 },
              { label: 'Oct', value: 1.6 }
            ]
          },
          {
            name: 'Heaters',
            color: '#dc2626',
            points: [
              { label: 'Jan', value: 0.8 },
              { label: 'Feb', value: 0.9 },
              { label: 'Mar', value: 1.0 },
              { label: 'Apr', value: 1.3 },
              { label: 'May', value: 1.7 },
              { label: 'Jun', value: 2.1 },
              { label: 'Jul', value: 1.1 },
              { label: 'Aug', value: 1.5 },
              { label: 'Sep', value: 1.9 },
              { label: 'Oct', value: 0.9 }
            ]
          }
        ]
      },
      {
        title: 'Monthly Net Sales (First 10 Months)',
        chartType: 'bar',
        unitLabel: '$ million',
        points: [
          { label: 'Jan', value: 1.6 },
          { label: 'Feb', value: 1.5 },
          { label: 'Mar', value: 1.7 },
          { label: 'Apr', value: 2.5 },
          { label: 'May', value: 3.2 },
          { label: 'Jun', value: 3.1 },
          { label: 'Jul', value: 1.4 },
          { label: 'Aug', value: 1.9 },
          { label: 'Sep', value: 2.0 },
          { label: 'Oct', value: 2.1 }
        ]
      }
    ],
    rows: [
      {
        field: 'Net sales bar graph (Jan–Oct)',
        studentA:
          'Steady in Jan–Mar -> marked increase in Apr -> peaked in May (~3.2M) -> dramatic drop in Jul -> slight recovery in Aug -> upward trend',
        studentB: 'What is the reason for the sharp drop in July?',
        bIsQuestionPrompt: true,
        suggestedQuestion: 'What is the reason for the sharp drop in July?',
        suggestedAnswer:
          'This was mainly due to the drop-off in air conditioner sales, which is a seasonal effect.'
      },
      {
        field: 'AC vs. Heater line graph',
        studentA:
          'AC (blue): dropped steadily Jan–Jul, bottoming out in Jul; Heaters (red): steady rise Mar–Jun, marked drop Jun–Jul, recovered through Sep, pronounced drop in Oct',
        studentB: 'Does this explain the fluctuation in total sales?',
        bIsQuestionPrompt: true,
        suggestedQuestion:
          'Does this seasonal shift explain the fluctuation in total sales?',
        suggestedAnswer:
          'Largely, yes. Together, air conditioners and heaters represent over half of our total sales and vary seasonally, while other appliances stay fairly constant.'
      },
      {
        field: 'Strategic takeaway',
        studentA:
          'Export to Europe and America to balance off-season demand',
        studentB: "We can't sell air conditioners when it's cold—what's the solution?",
        bIsQuestionPrompt: true,
        suggestedQuestion:
          "We can't sell air conditioners when it's cold. What's the solution?",
        suggestedAnswer:
          'We could export to counter-seasonal markets in Europe and America, though of course that is easier said than done.'
      }
    ],
    keyExpressions: [
      "Now, I'd like to refer to the first graph ...",
      "If I could draw your attention to the next diagram, ...",
      "As you'll note, ... bottoming out in July.",
      'peaked in May at around 3.2 million',
      'experienced a steady growth / dramatic drop',
      'represent more than half of our total sales'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Sales Analyst',
        line: "Now, I'd like to refer to the first graph. As you can see, this is a bar graph measuring net sales for the first ten months of the year. You'll notice that sales stayed steady in the first few months, then there was a marked increase in April, peaking in May at around 3.2 million. After a dramatic drop in July, there was a slight recovery in August, and that upward trend has continued up to the present.",
        translationVi: 'Bây giờ tôi xin phép dẫn chiếu biểu đồ đầu tiên. Như các bạn thấy, đây là biểu đồ cột đo doanh số ròng 10 tháng đầu năm. Doanh số ổn định vài tháng đầu, tăng mạnh vào tháng 4 và đạt đỉnh tháng 5 khoảng 3,2 triệu. Sau khi giảm mạnh vào tháng 7, doanh số phục hồi nhẹ trong tháng 8 và tiếp tục xu hướng đi lên tới nay.'
      },
      {
        speaker: 'B',
        roleLabel: 'Manager',
        line: 'What is the reason for the sharp decline in July?',
        translationVi: 'Nguyên nhân nào dẫn đến cú sụt giảm mạnh trong tháng 7 vậy?'
      },
      {
        speaker: 'A',
        roleLabel: 'Sales Analyst',
        line: 'This was mainly due to the drop-off in air conditioner sales, so it is primarily a seasonal effect.',
        translationVi: 'Chủ yếu là do doanh số điều hoà giảm sút, nên đây là tác động mang tính mùa vụ.'
      },
      {
        speaker: 'B',
        roleLabel: 'Manager',
        line: 'Could it also be a consequence of higher interest rates?',
        translationVi: 'Liệu đó cũng có thể là hệ quả của việc lãi suất tăng không?'
      },
      {
        speaker: 'A',
        roleLabel: 'Sales Analyst',
        line: "Possibly. Now if I could draw your attention to the next diagram, this is a line graph of sales. The blue line represents air conditioner sales, while the red line shows heaters. As you'll note, air conditioner sales dropped steadily from January to July, bottoming out then. Meanwhile, heater sales experienced a steady rise from March to June, dropped markedly from June to July, recovered through September, and had a pronounced drop in October.",
        translationVi: 'Cũng có thể ạ. Bây giờ mời mọi người hướng mắt sang biểu đồ tiếp theo, đây là biểu đồ đường về doanh số. Đường xanh dương là điều hoà, đường đỏ là máy sưởi. Có thể thấy doanh số điều hoà giảm đều từ tháng 1 và chạm đáy vào tháng 7; trong khi máy sưởi tăng đều từ tháng 3 đến tháng 6, giảm rõ rệt sang tháng 7, phục hồi tới tháng 9 rồi giảm mạnh vào tháng 10.'
      },
      {
        speaker: 'B',
        roleLabel: 'Manager',
        line: 'Does this explain the fluctuation in total sales?',
        translationVi: 'Điều này có giải thích cho sự biến động trong tổng doanh số không?'
      },
      {
        speaker: 'A',
        roleLabel: 'Sales Analyst',
        line: 'Largely, yes. Together, air conditioners and heaters account for more than half of our total sales and vary seasonally, whereas other appliances remain fairly stable throughout the year.',
        translationVi: 'Phần lớn là vậy ạ. Điều hoà và máy sưởi cộng lại chiếm hơn một nửa tổng doanh số và biến động theo mùa, trong khi các thiết bị gia dụng khác khá ổn định quanh năm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Manager',
        line: "Well, we can't sell air conditioners when it's cold. What's the solution?",
        translationVi: 'Chà, trời lạnh thì không bán được điều hoà. Vậy giải pháp là gì?'
      },
      {
        speaker: 'A',
        roleLabel: 'Sales Analyst',
        line: 'Export to Europe and America.',
        translationVi: 'Xuất khẩu sang thị trường châu Âu và châu Mỹ ạ.'
      },
      {
        speaker: 'B',
        roleLabel: 'Manager',
        line: 'Easier said than done, but definitely worth exploring!',
        translationVi: 'Nói thì dễ hơn làm, nhưng chắc chắn rất đáng để nghiên cứu triển khai!'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 7: Career Orientation
   * ======================================================================== */
  {
    id: 'card_u7_evn_interview',
    unit: 7,
    cardCode: 'Card 7A',
    title: 'EVN Company Electrical Engineer Job Interview',
    subtitleVi: 'Phỏng vấn vị trí Kỹ sư Điện tại Tập đoàn Điện lực Việt Nam (EVN)',
    source: 'card_docx',
    scenarioVi:
      'Student A là nhà tuyển dụng của Công ty EVN phỏng vấn Student B cho vị trí Kỹ sư Điện (Electrical Engineer). Hai bạn thực hành đầy đủ 6 hạng mục trên phiếu: Chào hỏi, Mục tiêu nghề nghiệp, Kinh nghiệm thực tập, Kỹ năng, Điểm mạnh & Điểm yếu, và Lý do nên tuyển dụng.',
    roleAName: 'Student A (Interviewer - EVN Company)',
    roleBName: 'Student B (Interviewee - Candidate)',
    rows: [
      {
        field: 'Greeting',
        studentA: 'Greet and welcome the candidate to EVN Company',
        studentB: 'Greet politely and thank the interviewer',
        aIsQuestionPrompt: true,
        suggestedQuestion:
          'Good morning! Welcome to EVN Company. Please have a seat.',
        suggestedAnswer:
          'Good morning! Thank you very much for inviting me to this interview.'
      },
      {
        field: 'Career objectives',
        studentA: 'What are your career objectives?',
        studentB:
          'Become a skilled electrical/electronics engineer and grow into project leadership at EVN',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are your career objectives?',
        suggestedAnswer:
          'My short-term objective is to become a competent electronics and electrical engineer, and in the long term I aim to lead technical projects at EVN.'
      },
      {
        field: 'Experience',
        studentA: 'What did you learn from your last job / internship?',
        studentB:
          'Internship at Samsung Company: repaired and maintained electrical systems, designed circuit boards, and wrote technical reports',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What did you learn from your last job or internship?',
        suggestedAnswer:
          'During my internship at Samsung Company, I learned to repair and maintain electrical systems, design circuit boards, and write technical reports.'
      },
      {
        field: 'Skills',
        studentA: 'Do you have any special skills?',
        studentB:
          'Foreign languages (English and Chinese), circuit diagnostics, and technical teamwork',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Do you have any special skills?',
        suggestedAnswer:
          "I'm good at languages—I can speak English and Chinese very well—in addition to diagnosing malfunctioning electrical systems."
      },
      {
        field: 'Strengths and weaknesses',
        studentA: 'What are your strengths and weaknesses?',
        studentB:
          'Strengths: communication skills & ability to work under high pressure; Weakness: lack of extensive full-time work experience',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'What are your strengths and weaknesses?',
        suggestedAnswer:
          'My biggest strengths are strong communication skills and the ability to work under high pressure. My weakness is that I still lack extensive full-time work experience, which I am eager to build quickly.'
      },
      {
        field: 'Reasons to employ',
        studentA: 'Why should we hire you?',
        studentB:
          'Contribute technical knowledge & skills, English and Chinese communication, and effective teamwork strategies',
        aIsQuestionPrompt: true,
        suggestedQuestion: 'Why should we hire you?',
        suggestedAnswer:
          'Because I can contribute not only solid technical knowledge and skills, along with English and Chinese communication, but also effective strategies for teamwork.'
      }
    ],
    keyExpressions: [
      'What are your career objectives?',
      'During my internship at ..., I learned to ...',
      'I am good at ... / My main strengths are ...',
      'ability to work under high pressure',
      'not only ... but also ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'Good morning! Welcome to EVN Company. Thank you for coming today.',
        translationVi: 'Chào buổi sáng! Chào mừng bạn đến với Công ty EVN. Cảm ơn bạn đã đến dự phỏng vấn hôm nay.'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'Good morning! Thank you for giving me this opportunity.',
        translationVi: 'Chào buổi sáng! Cảm ơn anh/chị đã trao cho tôi cơ hội này ạ.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'First, what are your career objectives?',
        translationVi: 'Trước hết, mục tiêu nghề nghiệp của bạn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'My short-term objective is to become a skilled electrical and electronics engineer, and in the future I plan to take charge of major power engineering projects at EVN.',
        translationVi: 'Mục tiêu ngắn hạn của tôi là trở thành một kỹ sư Điện – Điện tử giỏi, và trong tương lai tôi dự định phụ trách các dự án kỹ thuật điện trọng điểm tại EVN.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'What did you learn from your last job or internship?',
        translationVi: 'Bạn đã học được gì từ công việc hoặc kỳ thực tập gần nhất?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'During my internship at Samsung Company, I learned to repair and maintain electrical systems, design circuit boards, and write clear technical reports.',
        translationVi: 'Trong kỳ thực tập tại Công ty Samsung, tôi đã học cách sửa chữa và bảo trì hệ thống điện, thiết kế bảng mạch in và viết báo cáo kỹ thuật rõ ràng.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'Do you have any special skills?',
        translationVi: 'Bạn có kỹ năng đặc biệt nào không?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: "Yes, I'm good at languages—I can speak English and Chinese very well, which helps me read technical manuals and communicate with international partners.",
        translationVi: 'Có ạ, tôi có thế mạnh ngoại ngữ—tôi có thể giao tiếp tốt bằng cả tiếng Anh và tiếng Trung, giúp tôi đọc tài liệu kỹ thuật và làm việc với đối tác quốc tế.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'What are your strengths and weaknesses?',
        translationVi: 'Điểm mạnh và điểm yếu của bạn là gì?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'My biggest strengths are communication skills and the ability to work under high pressure. My weakness is that I still lack extensive full-time work experience, though I learn very fast.',
        translationVi: 'Điểm mạnh lớn nhất của tôi là kỹ năng giao tiếp và khả năng làm việc dưới áp lực cao. Điểm yếu là tôi chưa có nhiều kinh nghiệm làm việc toàn thời gian, nhưng tôi tiếp thu rất nhanh.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'Finally, why should we hire you?',
        translationVi: 'Cuối cùng, tại sao chúng tôi nên tuyển dụng bạn?'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: 'Because I can contribute not only technical knowledge and hands-on skills, as well as English and Chinese communication, but also strategies for effective teamwork.',
        translationVi: 'Bởi vì tôi có thể đóng góp không chỉ kiến thức chuyên môn, kỹ năng thực hành và khả năng giao tiếp tiếng Anh – tiếng Trung, mà còn cả các phương pháp làm việc nhóm hiệu quả.'
      },
      {
        speaker: 'A',
        roleLabel: 'EVN Interviewer',
        line: 'Thank you for your answers! We will contact you soon.',
        translationVi: 'Cảm ơn những câu trả lời của bạn! Chúng tôi sẽ liên hệ lại với bạn sớm.'
      },
      {
        speaker: 'B',
        roleLabel: 'Candidate',
        line: "You're welcome. Have a great day!",
        translationVi: 'Không có chi ạ. Chúc anh/chị một ngày làm việc tốt lành!'
      }
    ]
  },

  /* ==========================================================================
   * UNIT 8: Meetings and discussion
   * ======================================================================== */
  {
    id: 'card_u8_washer_meeting',
    unit: 8,
    cardCode: 'Card 8A',
    title: 'Resort Washing Machine System Maintenance Meeting',
    subtitleVi: 'Họp kỹ thuật thống nhất quy trình bảo trì hệ thống máy giặt khu nghỉ dưỡng',
    source: 'card_docx',
    scenarioVi:
      'Student A và Student B là hai kỹ thuật viên họp bàn kế hoạch bảo trì hệ thống máy giặt cho một khu nghỉ dưỡng (resort) theo đúng lưu đồ Unit 8: nêu quan điểm, ngắt lời lịch sự, đồng tình mạnh mẽ, nhấn mạnh dùng khăn mềm lau vỏ ngoài, phản biện chu kỳ thay ống dẫn từ 7 năm xuống 5 năm và chốt 4 quyết định cuối cùng.',
    roleAName: 'Student A (Maintenance Technician)',
    roleBName: 'Student B (Senior Technician)',
    flowSteps: [
      {
        speaker: 'A',
        action:
          'Make a point: Keep the washer level & clean the inside once a month',
        sampleLine:
          'I just want to say something about maintaining the washing machine system of this resort. I think we should keep the washer level and clean the inside once a month.'
      },
      {
        speaker: 'B',
        action: 'Interrupt: Firstly, cut the power to avoid electric shock',
        sampleLine:
          'Sorry to interrupt you, but I think firstly we must cut the power to avoid electric shock.'
      },
      {
        speaker: 'A',
        action: 'Strongly agree',
        sampleLine: 'I totally agree with you.'
      },
      {
        speaker: 'B',
        action:
          'Make a point: Remove and clean the filter (help the washer run efficiently) & polish the outside',
        sampleLine:
          'In my opinion, we should remove and clean the filter to help the washer run efficiently, and polish the outside.'
      },
      {
        speaker: 'A',
        action: 'Comment and emphasize: Use a soft cloth to wipe the outside',
        sampleLine:
          'Yes, and let me emphasize that we should use a soft cloth to wipe the outside so we do not scratch it.'
      },
      {
        speaker: 'B',
        action: 'Strongly agree',
        sampleLine: "I couldn't agree with you more."
      },
      {
        speaker: 'A',
        action: 'Make a point: Replace the hoses every 7 years',
        sampleLine: 'Also, I think we should replace the hoses every 7 years.'
      },
      {
        speaker: 'B',
        action:
          'Interrupt & strongly disagree (7 years is too long a period) -> recommend 5 years',
        sampleLine:
          "I apologize for interrupting you, but I'm afraid 7 years is too long a period. How about replacing the hoses every 5 years?"
      },
      {
        speaker: 'Both',
        action: 'Reach the decision: Summarize the 4 agreed maintenance actions',
        sampleLine:
          'Alright. To sum up, what we decide to do is: first, cut the power to avoid electric shock; second, keep the washer level and clean the inside once a month; third, clean the filter and polish the outside with a soft cloth; and finally, replace the hoses every 5 years.'
      }
    ],
    keyExpressions: [
      'I just want to say something about ...',
      'Sorry to interrupt you, ... / I apologize for interrupting you, ...',
      "I totally agree with you. / I couldn't agree with you more.",
      "I'm afraid ... / How about + V-ing ...?",
      'To sum up, what we decide to do is ...'
    ],
    sampleDialogue: [
      {
        speaker: 'A',
        roleLabel: 'Technician A',
        line: 'Hi! I just want to say something about the maintenance of the washing machine system at this resort. I think we should keep the washer level and clean the inside once a month.',
        translationVi: 'Chào bạn! Tôi muốn trao đổi một chút về việc bảo trì hệ thống máy giặt của khu nghỉ dưỡng. Tôi nghĩ chúng ta nên giữ máy kê thăng bằng và vệ sinh lồng giặt mỗi tháng một lần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Senior Technician B',
        line: 'Sorry to interrupt you, but I think firstly we must cut the power to avoid electric shock.',
        translationVi: 'Xin lỗi đã ngắt lời bạn, nhưng tôi nghĩ việc đầu tiên bắt buộc phải làm là ngắt nguồn điện để tránh bị điện giật.'
      },
      {
        speaker: 'A',
        roleLabel: 'Technician A',
        line: 'Absolutely! I totally agree with you.',
        translationVi: 'Chính xác! Tôi hoàn toàn đồng ý với bạn.'
      },
      {
        speaker: 'B',
        roleLabel: 'Senior Technician B',
        line: 'In my opinion, we should also remove and clean the filter to help the washer run efficiently, and polish the outside.',
        translationVi: 'Theo tôi, chúng ta cũng nên tháo và vệ sinh lưới lọc để máy chạy hiệu quả hơn, rồi lau bóng vỏ ngoài.'
      },
      {
        speaker: 'A',
        roleLabel: 'Technician A',
        line: 'That is a great point—and let me emphasize that we should use a soft cloth to wipe the outside.',
        translationVi: 'Ý kiến rất hay—và tôi xin nhấn mạnh là cần dùng khăn mềm để lau bên ngoài.'
      },
      {
        speaker: 'B',
        roleLabel: 'Senior Technician B',
        line: "I couldn't agree with you more.",
        translationVi: 'Tôi hoàn toàn nhất trí với bạn.'
      },
      {
        speaker: 'A',
        roleLabel: 'Technician A',
        line: 'Next, I think we should replace the hoses every 7 years.',
        translationVi: 'Tiếp theo, tôi nghĩ chúng ta nên thay các ống dẫn nước định kỳ 7 năm một lần.'
      },
      {
        speaker: 'B',
        roleLabel: 'Senior Technician B',
        line: "I apologize for interrupting you, but I'm afraid 7 years is too long a period. How about replacing the hoses every 5 years?",
        translationVi: 'Xin lỗi phải ngắt lời bạn, nhưng tôi e rằng 7 năm là khoảng thời gian quá dài. Thế còn thay ống dẫn mỗi 5 năm thì sao?'
      },
      {
        speaker: 'A',
        roleLabel: 'Technician A',
        line: 'Alright, 5 years is much safer. To sum up, what we decide to do is: first, cut the power to avoid electric shock; second, keep the washer level and clean the inside once a month; third, clean the filter and polish the outside with a soft cloth; and finally, replace the hoses every 5 years.',
        translationVi: 'Đồng ý, 5 năm sẽ an toàn hơn nhiều. Tóm lại, phương án chúng ta chốt là: một, ngắt nguồn điện để tránh điện giật; hai, giữ máy thăng bằng và vệ sinh bên trong mỗi tháng một lần; ba, làm sạch lưới lọc và lau vỏ ngoài bằng khăn mềm; cuối cùng, thay ống dẫn nước mỗi 5 năm.'
      }
    ]
  }
];

export const CARDS_BY_UNIT: Record<number, SpeakingCard[]> = SPEAKING_CARDS.reduce<
  Record<number, SpeakingCard[]>
>((acc, card) => {
  if (!acc[card.unit]) {
    acc[card.unit] = [];
  }
  acc[card.unit].push(card);
  return acc;
}, {});

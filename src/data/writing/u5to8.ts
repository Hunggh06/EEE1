import type { UnitWritingTask } from '../../types/curriculum';

export const WRITING_U5_TO_U8: UnitWritingTask[] = [
  {
    unit: 5,
    title: 'Reply Email to a Customer Complaint (Order 60335/01)',
    taskTypeVi: 'Email phản hồi khiếu nại',
    objectiveVi:
      'Luyện viết từng câu hoàn chỉnh để ghép thành một email trả lời khiếu nại khách hàng (đơn hàng 60335/01 thiếu bộ đổi nguồn) chuẩn văn phong trang trọng, lịch sự với cấu trúc seem/appear và thiện chí bồi hoàn.',
    targetChecklist: [
      'Mở đầu trang trọng bằng "Dear Mr. [Surname]," và cảm ơn kèm mã đơn hàng.',
      'Bày tỏ sự đồng cảm ("I was very sorry to hear that...") và xin lỗi chân thành.',
      'Giải thích nguyên nhân khách quan bằng cấu trúc "seem / appear" (không đổ lỗi).',
      'Đưa ra giải pháp khắc phục ngay lập tức kèm cử chỉ thiện chí ("as a gesture of goodwill").',
      'Cam kết cải thiện chất lượng và kết thư trang trọng ("Yours sincerely").'
    ],
    sentences: [
      {
        id: 'u5-w1',
        order: 1,
        sectionLabel: 'Lời chào & Cảm ơn',
        vietnamesePrompt:
          'Kính gửi ông Bradwell, cảm ơn ông đã gửi email phản ánh về chiếc máy tính xách tay Mace thuộc mã đơn hàng 60335/01.',
        grammarTargets: ['Formal Salutation (Dear Mr.)', 'Thank you for your email regarding...', 'order number'],
        keywordSkeleton:
          'Dear Mr. Bradwell, / thank / your email / regarding / Mace notebook computer / under order number 60335/01.',
        modelSentence:
          'Dear Mr. Bradwell, thank you for your email regarding the Mace notebook computer under order number 60335/01.',
        tipVi:
          'Mở email trang trọng bằng "Dear Mr. [Họ]," rồi nhắc lại rõ tên sản phẩm và mã đơn hàng để khách hàng thấy yêu cầu đã được tiếp nhận chính xác.'
      },
      {
        id: 'u5-w2',
        order: 2,
        sectionLabel: 'Đồng cảm & Xác nhận lỗi',
        vietnamesePrompt:
          'Tôi rất lấy làm tiếc khi nghe tin lô hàng đến muộn và bộ đổi nguồn dường như đã bị thiếu trong hộp.',
        grammarTargets: ['I was very sorry to hear that...', 'appear to be missing', 'shipment'],
        keywordSkeleton:
          'I / very sorry / hear / shipment / arrive / late / power adapter / appear / missing / from / box.',
        modelSentence:
          'I was very sorry to hear that the shipment arrived late and that the power adapter appeared to be missing from the box.',
        tipVi:
          'Cụm "I was very sorry to hear that..." thể hiện sự cảm thông ngay lập tức, kết hợp "appeared to be missing" giúp câu văn lịch sự.'
      },
      {
        id: 'u5-w3',
        order: 3,
        sectionLabel: 'Giải thích lịch sự',
        vietnamesePrompt:
          'Sau khi kiểm tra hồ sơ xuất kho, dường như đã xảy ra một sai sót đóng gói tại kho hàng trong đợt nâng cấp hệ thống gần đây của chúng tôi.',
        grammarTargets: ['There seems to have been + N', 'polite explanation', 'warehouse'],
        keywordSkeleton:
          'After check / dispatch records, / there / seem / be / packing error / at / warehouse / during / recent system upgrade.',
        modelSentence:
          'After checking our dispatch records, there seems to have been a packing error at our warehouse during our recent system upgrade.',
        tipVi:
          'Dùng "there seems to have been + danh từ" để trình bày nguyên nhân sự cố một cách mềm mỏng, chuyên nghiệp mà không đổ lỗi cho nhân viên hay khách hàng.'
      },
      {
        id: 'u5-w4',
        order: 4,
        sectionLabel: 'Giải pháp khắc phục ngay',
        vietnamesePrompt:
          'Tôi vui mừng thông báo rằng chúng tôi đã gửi ngay một bộ đổi nguồn thay thế qua chuyển phát nhanh và hàng sẽ tới vào sáng mai.',
        grammarTargets: ['I am pleased to inform you that...', 'Present Perfect', 'express courier'],
        keywordSkeleton:
          'I / pleased / inform / we / already dispatch / replacement adapter / express courier, / which / arrive / tomorrow morning.',
        modelSentence:
          'I am pleased to inform you that we have already dispatched a replacement adapter by express courier, which will arrive tomorrow morning.',
        tipVi:
          'Dùng mẫu câu báo tin tốt trong template SGK ("I am pleased to inform you that...") cùng hành động đã triển khai ngay để tạo sự yên tâm.'
      },
      {
        id: 'u5-w5',
        order: 5,
        sectionLabel: 'Cử chỉ thiện chí',
        vietnamesePrompt:
          'Ngoài ra, như một cử chỉ thiện chí, chúng tôi xin gửi tặng ông mức giảm giá 10% cho đơn hàng tiếp theo tại cửa hàng của chúng tôi.',
        grammarTargets: ['In addition', 'as a gesture of goodwill', 'offer + O + discount'],
        keywordSkeleton:
          'In addition, / gesture / goodwill, / we / would like / offer / 10% discount / next purchase / from / store.',
        modelSentence:
          'In addition, as a gesture of goodwill, we would like to offer you a 10% discount on your next purchase from our store.',
        tipVi:
          'Cụm "as a gesture of goodwill" là điểm nhấn chuẩn Unit 5 giúp xoa dịu sự không hài lòng và khuyến khích khách hàng quay lại mua sắm.'
      },
      {
        id: 'u5-w6',
        order: 6,
        sectionLabel: 'Xin lỗi & Cam kết chất lượng',
        vietnamesePrompt:
          'Một lần nữa, tôi xin chân thành xin lỗi vì sự bất tiện mà ông đã gặp phải và cam đoan rằng chúng tôi đang siết chặt khâu kiểm tra chất lượng.',
        grammarTargets: ['apologise for the inconvenience', 'Present Perfect', 'assure + O + that'],
        keywordSkeleton:
          'Once again, / would like / apologise / inconvenience / you / experience / assure / we / tighten / quality checks.',
        modelSentence:
          'Once again, I would like to apologise for the inconvenience you have experienced and assure you that we are tightening our quality checks.',
        tipVi:
          'Nhắc lại lời xin lỗi ("apologise for the inconvenience") kèm cam kết cải tiến quy trình ("tightening our quality checks") giúp củng cố uy tín doanh nghiệp.'
      },
      {
        id: 'u5-w7',
        order: 7,
        sectionLabel: 'Kết thư trang trọng',
        vietnamesePrompt:
          'Xin đừng ngần ngại liên hệ với tôi nếu ông có thêm bất kỳ thắc mắc nào; trân trọng, Quản lý Dịch vụ Khách hàng tại IT Online Ltd.',
        grammarTargets: ['Please do not hesitate to contact me', 'further queries', 'Yours sincerely'],
        keywordSkeleton:
          'Please / not hesitate / contact me / if / have / further queries; / yours sincerely, / Customer Service Manager / IT Online Ltd.',
        modelSentence:
          'Please do not hesitate to contact me if you have any further queries; yours sincerely, Customer Service Manager at IT Online Ltd.',
        tipVi:
          'Dùng câu kết mở lòng hỗ trợ ("do not hesitate to contact me") với danh từ "queries" và ký tên "Yours sincerely" khi đã xưng hô tên riêng ở đầu thư.'
      }
    ]
  },
  {
    unit: 6,
    title: 'Electrical Appliance Sales Trend Analysis (2018–2023)',
    taskTypeVi: 'Đoạn văn mô tả biểu đồ',
    objectiveVi:
      'Xây dựng đoạn văn phân tích biểu đồ đường hoàn chỉnh gồm 7 câu, kết hợp thành thạo hai cấu trúc S + V + Adv và There + be + Adj + N, cùng từ nối tương phản và cụm diễn đạt tỷ trọng.',
    targetChecklist: [
      'Giới thiệu đúng loại biểu đồ, đối tượng số liệu và mốc thời gian.',
      'Nêu xu hướng tổng quan bắt đầu bằng "Overall,". ',
      'Dùng linh hoạt cả hai cấu trúc "S + V + Adv" và "There + be + Adj + N".',
      'Sử dụng động từ đặc trưng biểu đồ: peaked at, remained constant, declined gradually, accounted for.',
      'Kết luận ngắn gọn khái quát bức tranh dữ liệu.'
    ],
    sentences: [
      {
        id: 'u6-w1',
        order: 1,
        sectionLabel: 'Mở bài (Introduction)',
        vietnamesePrompt:
          'Biểu đồ đường minh họa số liệu doanh số hằng năm của máy điều hòa thông minh, tủ lạnh biến tần và máy sưởi truyền thống từ năm 2018 đến năm 2023.',
        grammarTargets: ['The line graph illustrates...', 'figures for', 'between ... and ...'],
        keywordSkeleton:
          'The line graph / illustrate / annual sales figures / smart air conditioners, inverter refrigerators, and traditional heaters / between 2018 / 2023.',
        modelSentence:
          'The line graph illustrates annual sales figures for smart air conditioners, inverter refrigerators, and traditional heaters between 2018 and 2023.',
        tipVi:
          'Câu mở bài luôn nêu rõ loại biểu đồ (line graph), động từ mô tả (illustrates) và đủ ba nhóm đối tượng kèm giai đoạn thời gian.'
      },
      {
        id: 'u6-w2',
        order: 2,
        sectionLabel: 'Tổng quan (Overall)',
        vietnamesePrompt:
          'Nhìn chung, doanh số máy điều hòa thông minh và tủ lạnh biến tần cho thấy xu hướng đi lên rõ rệt, trong khi nhu cầu máy sưởi truyền thống lại đi xuống.',
        grammarTargets: ['Overall,...', 'upward / downward trend', 'whereas'],
        keywordSkeleton:
          'Overall, / sales / smart air conditioners / inverter refrigerators / show / clear upward trends, / whereas / traditional heater demand / move / downward.',
        modelSentence:
          'Overall, sales of smart air conditioners and inverter refrigerators showed clear upward trends, whereas traditional heater demand moved downward.',
        tipVi:
          'Mở câu tổng quan bằng "Overall," và dùng "whereas" để đối chiếu ngắn gọn hai xu hướng đối nghịch mà chưa đưa con số chi tiết.'
      },
      {
        id: 'u6-w3',
        order: 3,
        sectionLabel: 'Thân bài 1 (S + V + Adv)',
        vietnamesePrompt:
          'Vào năm 2018, doanh số máy điều hòa thông minh khởi điểm ở mức 20.000 chiếc và tăng đều đặn lên 45.000 chiếc vào năm 2021.',
        grammarTargets: ['S + V + Adv (rose steadily)', 'started at', 'to + target figure'],
        keywordSkeleton:
          'In 2018, / smart air-conditioner sales / start / 20,000 units / rise / steady / 45,000 units / by 2021.',
        modelSentence:
          'In 2018, smart air-conditioner sales started at 20,000 units and rose steadily to 45,000 units by 2021.',
        tipVi:
          'Áp dụng cấu trúc "S + V + Adv" (rose steadily) kết hợp đúng cặp giới từ "at" (mức ban đầu) và "to" (mức đạt tới).'
      },
      {
        id: 'u6-w4',
        order: 4,
        sectionLabel: 'Thân bài 2 (There was a... & Peak)',
        vietnamesePrompt:
          'Sau đó, có một sự gia tăng đột biến ở lượng mua máy điều hòa thông minh, đạt đỉnh ở mức 70.000 chiếc vào năm 2023.',
        grammarTargets: ['There was a + Adj + N + in...', 'dramatic increase', 'peaked at'],
        keywordSkeleton:
          'Subsequently, / there / dramatic increase / smart air-conditioner purchases, / which / peak / 70,000 units / in 2023.',
        modelSentence:
          'Subsequently, there was a dramatic increase in smart air-conditioner purchases, which peaked at 70,000 units in 2023.',
        tipVi:
          'Đa dạng hóa câu văn bằng cấu trúc "There was a dramatic increase in..." rồi nối mệnh đề quan hệ với "peaked at" chỉ điểm cực đại.'
      },
      {
        id: 'u6-w5',
        order: 5,
        sectionLabel: 'Thân bài 3 (Tương phản ổn định & giảm)',
        vietnamesePrompt:
          'Trái lại, doanh số tủ lạnh biến tần giữ nguyên ổn định ở mức khoảng 30.000 chiếc trong ba năm đầu, trong khi doanh số máy sưởi truyền thống giảm dần xuống còn 10.000 chiếc.',
        grammarTargets: ['By contrast', 'remained constant at', 'declined gradually to'],
        keywordSkeleton:
          'By contrast, / inverter refrigerator sales / remain / constant / around 30,000 units / first three years, / while / traditional heater sales / decline / gradual / 10,000 units.',
        modelSentence:
          'By contrast, inverter refrigerator sales remained constant at around 30,000 units over the first three years, while traditional heater sales declined gradually to 10,000 units.',
        tipVi:
          'Ghép khéo léo hai đường còn lại trong cùng một câu tương phản bằng "By contrast" và "while", dùng "remained constant at" và "declined gradually to".'
      },
      {
        id: 'u6-w6',
        order: 6,
        sectionLabel: 'Chi tiết tỷ trọng (Proportional Detail)',
        vietnamesePrompt:
          'Vào cuối giai đoạn, máy điều hòa thông minh chiếm phần lớn tổng doanh số thiết bị gia dụng với gần 58 phần trăm.',
        grammarTargets: ['accounted for', 'the majority of', 'at + percentage'],
        keywordSkeleton:
          'By / end / period, / smart air conditioners / account / majority / total appliance sales / nearly 58 percent.',
        modelSentence:
          'By the end of the period, smart air conditioners accounted for the majority of total appliance sales at nearly 58 percent.',
        tipVi:
          'Cụm "accounted for the majority of..." giúp nhấn mạnh tỷ trọng dẫn đầu bằng con số phần trăm cụ thể ở cuối chu kỳ.'
      },
      {
        id: 'u6-w7',
        order: 7,
        sectionLabel: 'Kết luận (Conclusion)',
        vietnamesePrompt:
          'Tóm lại, có thể thấy rằng các thiết bị làm mát thông minh tiết kiệm năng lượng đã vượt trội hơn thiết bị sưởi truyền thống trong suốt giai đoạn sáu năm.',
        grammarTargets: ['In conclusion, it can be seen that...', 'throughout + period'],
        keywordSkeleton:
          'In conclusion, / it / can be seen / energy-efficient smart cooling devices / outperform / conventional heating appliances / throughout / six-year period.',
        modelSentence:
          'In conclusion, it can be seen that energy-efficient smart cooling devices outperformed conventional heating appliances throughout the six-year period.',
        tipVi:
          'Khép đoạn ngắn gọn bằng cụm chuẩn Unit 6 "In conclusion, it can be seen that..." để tóm lược xu hướng chủ đạo cả giai đoạn.'
      }
    ]
  },
  {
    unit: 7,
    title: 'Engineering CV Summary & Interview Self-Introduction',
    taskTypeVi: 'Tóm tắt CV & Tự giới thiệu phỏng vấn',
    objectiveVi:
      'Luyện viết đoạn tự giới thiệu và tóm tắt CV ứng tuyển vị trí Kỹ sư Điện – Điện tử (HaUI), vận dụng chuẩn xác hậu tố từ loại (Suffixes) và phối hợp ba thì Quá khứ đơn, Hiện tại hoàn thành, Tương lai.',
    targetChecklist: [
      'Nêu mục tiêu nghề nghiệp ngắn hạn bằng tính từ chuẩn hậu tố (-ed, -al, -ic).',
      'Dùng thì Quá khứ đơn cho bằng cấp tốt nghiệp, GPA, học bổng và kinh nghiệm thực tập.',
      'Dùng thì Hiện tại hoàn thành cho chuyên môn kỹ thuật và công cụ (PCB, PLC, multimeter) tích luỹ tới nay.',
      'Trình bày thế mạnh bằng thành ngữ "When it comes to..." và biến điểm yếu thành động lực cải thiện.',
      'Kết thúc bằng mục tiêu dài hạn và đóng góp giá trị ("make a measurable impact").'
    ],
    sentences: [
      {
        id: 'u7-w1',
        order: 1,
        sectionLabel: 'Mục tiêu nghề nghiệp (Objective)',
        vietnamesePrompt:
          'Là một sinh viên tốt nghiệp tích cực, mục tiêu ngắn hạn của tôi là được làm việc ở vị trí kỹ sư điện tử trong một môi trường chuyên nghiệp và năng động.',
        grammarTargets: ['motivated (adj)', 'short-term objective', 'professional and dynamic environment'],
        keywordSkeleton:
          'As / motivated graduate, / my short-term objective / work / electronics engineer / professional and dynamic environment.',
        modelSentence:
          'As a motivated graduate, my short-term objective is to work as an electronics engineer in a professional and dynamic environment.',
        tipVi:
          'Dùng các tính từ đúng hậu tố Unit 7 ("motivated", "professional", "dynamic") để khẳng định thái độ nghề nghiệp ngay từ câu mở đầu.'
      },
      {
        id: 'u7-w2',
        order: 2,
        sectionLabel: 'Học vấn & Học bổng (Qualifications)',
        vietnamesePrompt:
          'Tôi tốt nghiệp Trường Đại học Công nghiệp Hà Nội với bằng Cử nhân Kỹ thuật Điện tử, đạt điểm trung bình 3.4 và nhận được hai học bổng học tập.',
        grammarTargets: ['Past Simple (graduated)', "bachelor's degree", 'academic scholarships'],
        keywordSkeleton:
          'I / graduate / Hanoi University of Industry / bachelor’s degree / Electronics Engineering, / achieve / 3.4 GPA / receive / two academic scholarships.',
        modelSentence:
          "I graduated from Hanoi University of Industry with a bachelor's degree in Electronics Engineering, achieving a 3.4 GPA and receiving two academic scholarships.",
        tipVi:
          'Sự kiện tốt nghiệp đã hoàn tất dùng Quá khứ đơn ("graduated"), nối các thành tích đi kèm bằng cụm phân từ "achieving... and receiving..." cho súc tích.'
      },
      {
        id: 'u7-w3',
        order: 3,
        sectionLabel: 'Kinh nghiệm thực tập (Experience)',
        vietnamesePrompt:
          'Trong kỳ thực tập sáu tháng tại một nhà máy sản xuất vào năm ngoái, tôi đã chẩn đoán các hệ thống gặp sự cố và hỗ trợ các kỹ sư giàu kinh nghiệm kiểm thử các cụm mạch mới.',
        grammarTargets: ['Past Simple action verbs', 'diagnose malfunctioning systems', 'assist + O + in V-ing'],
        keywordSkeleton:
          'During / six-month internship / manufacturing plant / last year, / I / diagnose / malfunctioning systems / assist / senior engineers / test / new circuit assemblies.',
        modelSentence:
          'During my six-month internship at a manufacturing plant last year, I diagnosed malfunctioning systems and assisted senior engineers in testing new circuit assemblies.',
        tipVi:
          'Với mốc "last year", dùng cặp động từ hành động mạnh ở Quá khứ đơn ("diagnosed", "assisted") và nhớ cấu trúc "assist someone in + V-ing".'
      },
      {
        id: 'u7-w4',
        order: 4,
        sectionLabel: 'Chuyên môn & Thiết bị (Expertise)',
        vietnamesePrompt:
          'Tôi đã tích lũy được chuyên môn kỹ thuật vững chắc về thiết kế mạch in PCB, lập trình PLC và xử lý sự cố mạch tương tự bằng đồng hồ vạn năng số và máy hiện sóng.',
        grammarTargets: ['Present Perfect (have gained)', 'technical expertise', 'digital multimeter'],
        keywordSkeleton:
          'I / gain / solid technical expertise / PCB layout, PLC programming, / troubleshoot / analog circuits / digital multimeter / oscilloscope.',
        modelSentence:
          'I have gained solid technical expertise in PCB layout, PLC programming, and troubleshooting analog circuits with a digital multimeter and oscilloscope.',
        tipVi:
          'Thì Hiện tại hoàn thành ("have gained") nhấn mạnh kiến thức thực hành đã tích luỹ từ đại học/thực tập và vẫn áp dụng được ngay lúc phỏng vấn.'
      },
      {
        id: 'u7-w5',
        order: 5,
        sectionLabel: 'Điểm mạnh nổi bật (Strengths)',
        vietnamesePrompt:
          'Khi nói đến những điểm mạnh cốt lõi, tôi mang đến sự tỉ mỉ cao độ, kỹ năng giao tiếp phối hợp hiệu quả và sự tận tâm thực sự để hoàn thành đúng hạn dự án.',
        grammarTargets: ['When it comes to...', 'attention to detail', 'interpersonal skills & commitment'],
        keywordSkeleton:
          'When / come / key strengths, / I / bring / strong attention to detail, / effective interpersonal skills, / genuine commitment / meet / project deadlines.',
        modelSentence:
          'When it comes to my key strengths, I bring strong attention to detail, effective interpersonal skills, and genuine commitment to meeting project deadlines.',
        tipVi:
          'Mở câu bằng thành ngữ Unit 7 "When it comes to..." (tiếp theo là danh từ) và liệt kê ba danh từ phẩm chất ăn điểm trong mọi JD kỹ sư.'
      },
      {
        id: 'u7-w6',
        order: 6,
        sectionLabel: 'Cải thiện điểm yếu (Growth)',
        vietnamesePrompt:
          'Mặc dù trước đây tôi từng dành thêm thời gian trau chuốt những mối hàn nhỏ, hiện tôi đang chủ động cải thiện quản lý thời gian bằng cách đặt thứ tự ưu tiên kiểm tra rõ ràng.',
        grammarTargets: ['Although + clause', 'used to + V', 'Present Continuous'],
        keywordSkeleton:
          'Although / I / use / spend / extra time / perfect / minor solder joints, / I / actively improve / time management / set / clear inspection priorities.',
        modelSentence:
          'Although I used to spend extra time perfecting minor solder joints, I am actively improving my time management by setting clear inspection priorities.',
        tipVi:
          'Công thức trả lời câu hỏi điểm yếu: ghép "used to" (thói quen cũ từng cầu toàn) với thì Hiện tại tiếp diễn ("am actively improving") để thể hiện sự tiến bộ.'
      },
      {
        id: 'u7-w7',
        order: 7,
        sectionLabel: 'Đóng góp & Tương lai (Contribution)',
        vietnamesePrompt:
          'Về dài hạn, tôi hy vọng sẽ đóng góp các kỹ năng kỹ thuật thực tế của mình nhằm tạo ra tác động rõ rệt lên độ tin cậy sản phẩm của quý công ty.',
        grammarTargets: ['In the long term', 'hope to + V', 'make an impact on'],
        keywordSkeleton:
          'In / long term, / I / hope / contribute / hands-on engineering skills / make / measurable impact / your company’s product reliability.',
        modelSentence:
          "In the long term, I hope to contribute my hands-on engineering skills to make a measurable impact on your company's product reliability.",
        tipVi:
          'Khép lại phần tự giới thiệu bằng cụm "In the long term" và "make a measurable impact on..." cho thấy tầm nhìn gắn bó và đóng góp cụ thể.'
      }
    ]
  },
  {
    unit: 8,
    title: 'HVAC Maintenance Meeting Minutes & Summary',
    taskTypeVi: 'Biên bản & Tóm tắt cuộc họp kỹ thuật',
    objectiveVi:
      'Luyện viết 7 câu chuẩn mực để lập thành biên bản tóm tắt cuộc họp bảo trì hệ thống điều hòa tòa nhà, vận dụng đủ to-infinitive chỉ mục đích, Gerund sau giới từ, Should + V và Mệnh đề danh ngữ (Noun Clause).',
    targetChecklist: [
      'Nêu tên cuộc họp, thời gian, địa điểm và mục đích bằng cấu trúc "to + V".',
      'Xác định chủ tọa (chairperson), người ghi biên bản ("in charge of taking...") và thành viên tham dự.',
      'Trình bày mục nghị sự (agenda) và vấn đề kỹ thuật trọng tâm ("issue").',
      'Tường thuật đề xuất an toàn với "should + V" và cách giải quyết bất đồng.',
      'Chốt đầu việc hành động bằng Mệnh đề danh ngữ ("What we decided to do is...") và lịch họp kế tiếp.'
    ],
    sentences: [
      {
        id: 'u8-w1',
        order: 1,
        sectionLabel: 'Tiêu đề & Mục đích (Purpose)',
        vietnamesePrompt:
          'Cuộc họp bảo trì hệ thống điều hòa không khí tòa nhà hằng tháng đã được tổ chức vào ngày 10 tháng 6 tại Phòng họp 23 nhằm rà soát và cải thiện phương án bảo trì điều hòa.',
        grammarTargets: ['Passive Past Simple (was held)', 'to-infinitive of purpose', 'scheme'],
        keywordSkeleton:
          'The monthly building HVAC maintenance meeting / hold / June 10 / Meeting Room 23 / review / improve / air-conditioning maintenance scheme.',
        modelSentence:
          'The monthly building HVAC maintenance meeting was held on June 10 in Meeting Room 23 to review and improve the air-conditioning maintenance scheme.',
        tipVi:
          'Biên bản họp mở đầu bằng câu bị động quá khứ ("was held on... in...") và dùng "to + V" (to review and improve) nêu mục đích cuộc họp.'
      },
      {
        id: 'u8-w2',
        order: 2,
        sectionLabel: 'Thành phần & Phân công (Roles)',
        vietnamesePrompt:
          'Ông Johnson Lee làm chủ tọa, cô Linh phụ trách ghi biên bản cuộc họp và toàn bộ năm thành viên bảo trì đều có mặt đầy đủ, không có người vắng mặt.',
        grammarTargets: ['chairperson & participants', 'in charge of + V-ing', 'take the minutes'],
        keywordSkeleton:
          'Mr. Johnson Lee / serve / chairperson, / Ms. Linh / in charge of / take / minutes, / all five maintenance participants / attend / zero apologies.',
        modelSentence:
          'Mr. Johnson Lee served as chairperson, Ms. Linh was in charge of taking the minutes, and all five maintenance participants attended with zero apologies.',
        tipVi:
          'Ghi nhận đủ ba vai trò theo Minutes Plan Unit 8 và chú ý chia Gerund sau giới từ: "in charge of taking the minutes".'
      },
      {
        id: 'u8-w3',
        order: 3,
        sectionLabel: 'Nghị sự & Vấn đề (Agenda & Issue)',
        vietnamesePrompt:
          'Nội dung đầu tiên trong chương trình nghị sự đề cập đến vấn đề lặp đi lặp lại về ống thoát nước bị tắc và dàn ngưng ngoài trời bám bụi làm giảm hiệu suất làm lạnh.',
        grammarTargets: ['item on the agenda', 'issue', 'clogged drain lines & condenser coils'],
        keywordSkeleton:
          'The first item / agenda / address / recurring issue / clogged drain lines / dusty outdoor condenser coils / reduce / cooling efficiency.',
        modelSentence:
          'The first item on the agenda addressed a recurring issue of clogged drain lines and dusty outdoor condenser coils reducing cooling efficiency.',
        tipVi:
          'Kết hợp từ vựng họp ("item on the agenda", "issue") với thuật ngữ bảo trì điều hòa Unit 8 ("clogged drain lines", "condenser coils").'
      },
      {
        id: 'u8-w4',
        order: 4,
        sectionLabel: 'Đề xuất kỹ thuật (Suggestion)',
        vietnamesePrompt:
          'Trong quá trình thảo luận, kỹ thuật viên cao cấp đề xuất rằng cả nhóm nên ngắt nguồn điện trước khi xịt rửa dàn ngưng ngoài trời và thông rửa các đường ống thoát nước.',
        grammarTargets: ['suggest that + S + should + V', 'cut off power', 'before + V-ing'],
        keywordSkeleton:
          'During / discussion, / senior technician / suggest / team / should / cut off power / before / rinse / outdoor condenser coils / flush / drain lines.',
        modelSentence:
          'During the discussion, the senior technician suggested that the team should cut off power first before rinsing the outdoor condenser coils and flushing the drain lines.',
        tipVi:
          'Dùng cấu trúc "suggested that + S + should + V" để tường thuật lời khuyên an toàn điện và dùng V-ing song song sau "before" ("rinsing... and flushing...").'
      },
      {
        id: 'u8-w5',
        order: 5,
        sectionLabel: 'Phản biện & Dung hòa (Resolution)',
        vietnamesePrompt:
          'Mặc dù ban đầu một thành viên không đồng ý về việc kiểm tra bộ điều nhiệt, cả nhóm đã đạt được thỏa thuận dung hòa là xác minh lại hiệu chuẩn nhiệt độ phòng trên từng thiết bị.',
        grammarTargets: ['Although + clause', 'disagreed about + V-ing', 'thermostat'],
        keywordSkeleton:
          'Although / one member / initially disagree / check / thermostat, / team / reach / compromise / verify / room temperature calibration / every unit.',
        modelSentence:
          'Although one member initially disagreed about checking the thermostat, the team reached a compromise to verify room temperature calibration on every unit.',
        tipVi:
          'Cấu trúc "Although..." giúp ghi nhận quan điểm phản biện và kết quả đồng thuận trong biên bản một cách khách quan, ngắn gọn.'
      },
      {
        id: 'u8-w6',
        order: 6,
        sectionLabel: 'Chốt quyết định (Noun Clause)',
        vietnamesePrompt:
          'Điều chúng tôi quyết định thực hiện là tự triển khai kiểm tra lọc gió hằng tháng và thuê ngoài các chuyên gia được chứng nhận cho công tác đại tu dàn lạnh hằng năm.',
        grammarTargets: ['Noun Clause as Subject (What we decided to do is...)', 'implement', 'contract out'],
        keywordSkeleton:
          'What / we / decide / do / implement / monthly filter inspections / in-house / contract out / annual deep chiller overhauls / certified specialists.',
        modelSentence:
          'What we decided to do is to implement monthly filter inspections in-house and contract out annual deep chiller overhauls to certified specialists.',
        tipVi:
          'Mệnh đề danh ngữ làm chủ ngữ ("What we decided to do is to + V") là cấu trúc trọng tâm Unit 8 để chốt rõ đầu việc hành động (action points).'
      },
      {
        id: 'u8-w7',
        order: 7,
        sectionLabel: 'Bế mạc & Lịch họp tiếp theo',
        vietnamesePrompt:
          'Vì không còn vấn đề phát sinh nào khác cần thảo luận, chủ tọa đã kết thúc cuộc họp lúc 4 giờ 30 chiều và ấn định buổi rà soát tiếp theo vào ngày 10 tháng 7 tại Phòng Hội nghị B.',
        grammarTargets: ['to-infinitive (to discuss)', 'closed the meeting', 'next review'],
        keywordSkeleton:
          'With / no further business / discuss, / chairperson / close / meeting / 4:30 p.m. / schedule / next review / July 10 / Conference Room B.',
        modelSentence:
          'With no further business to discuss, the chairperson closed the meeting at 4:30 p.m. and scheduled the next review for July 10 in Conference Room B.',
        tipVi:
          'Chốt biên bản đúng chuẩn Minutes Plan bằng việc xác nhận hết phần phát sinh (AOB), giờ đóng họp và ngày, địa điểm cuộc họp tiếp theo.'
      }
    ]
  }
];

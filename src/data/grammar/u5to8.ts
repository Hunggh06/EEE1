import type { UnitGrammarModule } from '../../types/curriculum';

export const GRAMMAR_U5_TO_U8: UnitGrammarModule[] = [
  {
    unit: 5,
    title: 'Customer service',
    subtitleVi:
      'Cấu trúc giải thích vấn đề lịch sự (seem, appear, look like, look as if, sound as if, may/might) & văn phong email CSKH',
    sections: [
      {
        id: 'u5-sec-1',
        title: '1. Seem & Appear (Làm mềm nhận định về lỗi kỹ thuật)',
        explanationVi:
          'Trong dịch vụ khách hàng kỹ thuật, dùng "seem" hoặc "appear" giúp thông báo sự cố (linh kiện lỗi, thiếu phụ tùng, sai mã đơn hàng) một cách nhẹ nhàng, khách quan thay vì khẳng định gay gắt.',
        formulas: [
          {
            label: 'Khẳng định / Phủ định với động từ thường',
            pattern: 'S + seem(s) / appear(s) + to V  |  S + don’t / doesn’t + seem / appear + to V',
            example: "The activation key doesn't seem to work. / The blender appears to be faulty.",
            translationVi: 'Mã kích hoạt có vẻ không hoạt động. / Chiếc máy xay có vẻ bị lỗi.'
          },
          {
            label: 'Cấu trúc chủ ngữ giả There',
            pattern: 'There + seem(s) / appear(s) + to be + Noun',
            example: 'There seems to be a missing rotor disc in the spare-parts shipment.',
            translationVi: 'Có vẻ như đang bị thiếu một đĩa rô-tô trong lô hàng phụ tùng.'
          },
          {
            label: 'Suy đoán hành động đã xảy ra',
            pattern: 'S + seem(s) / appear(s) + to have + P2',
            example: 'You seem to have used the wrong PO number on the invoice.',
            translationVi: 'Có vẻ như bạn đã nhập nhầm mã đơn đặt hàng trên hóa đơn.'
          }
        ],
        notes: [
          'Động từ seem / appear chia theo chủ ngữ hoặc danh từ đứng sau "to be" (There seems to be a problem / There seem to be two issues).',
          'Trong câu phủ định lịch sự, đặt trợ động từ don’t / doesn’t trước seem hoặc appear: "doesn’t seem to work".',
          'Không dùng V-ing ngay sau seem / appear (sai: ~~seem having~~ -> đúng: seem to have).'
        ]
      },
      {
        id: 'u5-sec-2',
        title: '2. It looks like / looks as if / sounds as if + Clause',
        explanationVi:
          'Dùng để phỏng đoán nguyên nhân vấn đề dựa trên dấu hiệu quan sát thấy (looks like / looks as if) hoặc dựa trên mô tả của khách hàng qua điện thoại (sounds as if).',
        formulas: [
          {
            label: 'Phỏng đoán theo dấu hiệu quan sát',
            pattern: 'It looks as if / It looks like + S + V (clause)',
            example: 'It looks as if the fridge has stopped working. / It looks like the system is a little slow today.',
            translationVi: 'Có vẻ như chiếc tủ lạnh đã ngừng hoạt động. / Có vẻ như hệ thống hôm nay hơi chậm.'
          },
          {
            label: 'Phỏng đoán qua thông tin khách mô tả',
            pattern: 'It sounds as if + S + V (clause)',
            example: 'It sounds as if your antivirus program might be causing the installation problem.',
            translationVi: 'Nghe có vẻ như phần mềm diệt virus của bạn đang gây ra sự cố cài đặt.'
          }
        ],
        notes: [
          'Chủ ngữ là "It" ngôi thứ ba số ít nên luôn thêm "-s": "It looks..." và "It sounds...".',
          'Không ghép nhầm "like" với "if" (sai: ~~It looks like if~~ -> đúng: It looks like hoặc It looks as if).',
          'Thì của mệnh đề phía sau chia theo thời điểm xảy ra sự cố: quá khứ dùng Past Simple (delivered, typed), hiện tại dùng Present Continuous (is not working) hoặc Present Perfect (has stopped).'
        ]
      },
      {
        id: 'u5-sec-3',
        title: '3. May / Might + bare V & Ngôn ngữ email phản hồi khiếu nại',
        explanationVi:
          'Dùng động từ khuyết thiếu "may / might" để nêu khả năng gây lỗi (< 50% chắc chắn) một cách khéo léo, kết hợp từ vựng trang trọng (formal) trong email giải quyết khiếu nại.',
        formulas: [
          {
            label: 'Khả năng gây lỗi ở hiện tại',
            pattern: 'S + may / might + bare V (hoặc be + V-ing)  |  There + may / might + be + N',
            example: 'There might be some problems with the device. / Your firewall may block the update.',
            translationVi: 'Có thể đang có một số trục trặc với thiết bị. / Tường lửa có thể đang chặn bản cập nhật.'
          },
          {
            label: 'Khả năng sai sót trong quá khứ',
            pattern: 'There + may / might + have been + N  |  S + may / might + have + P2',
            example: 'There might have been some mistake when we delivered the goods.',
            translationVi: 'Có thể đã có chút nhầm lẫn khi chúng tôi giao lô hàng.'
          },
          {
            label: 'Cụm từ chuẩn trong email trả lời khiếu nại',
            pattern: 'Thank you for... / I was sorry to hear... / I am pleased to inform you... / as a gesture of goodwill',
            example: 'In addition, as a gesture of goodwill, we will give you a 10% discount on your next purchase.',
            translationVi: 'Ngoài ra, như một cử chỉ thiện chí, chúng tôi sẽ giảm giá 10% cho lần mua hàng tiếp theo của quý khách.'
          }
        ],
        notes: [
          'Sau may / might bắt buộc là động từ nguyên thể không "to" (sai: ~~might are~~, ~~may is~~ -> đúng: might be, may be).',
          'Phân biệt cặp từ trang trọng (Formal) dùng trong email CSKH và từ thân mật (Informal): receive / get, inform / tell, assist / help, contact / get in touch, enquire / ask, regret / be sorry.'
        ]
      }
    ],
    questions: [
      {
        id: 'u5-q1',
        unit: 5,
        type: 'fill',
        prompt: 'The aeroplane is being checked right now because ______ seems to be a problem with the new rotor disc.',
        promptVi: 'Điền từ thích hợp (1 từ) để hoàn thành cấu trúc giải thích vấn đề với "seems to be".',
        acceptedAnswers: ['there'],
        displayAnswer: 'there',
        explanationVi:
          'Cấu trúc chủ ngữ giả nêu vấn đề một cách khách quan là "there seems to be + danh từ số ít (a problem)".'
      },
      {
        id: 'u5-q2',
        unit: 5,
        type: 'mcq',
        prompt: "I'm having problems trying to install the AlarmightA4 home security system. The alarm code ______.",
        promptVi: 'Chọn cấu trúc lịch sự đúng ngữ pháp để báo mã báo động không hoạt động.',
        options: [
          "doesn't seem to work",
          "doesn't seems to work",
          'seems not working',
          "isn't seeming to work"
        ],
        acceptedAnswers: ["doesn't seem to work", "does not seem to work"],
        displayAnswer: "doesn't seem to work",
        explanationVi:
          'Sau trợ động từ phủ định "doesn’t", động từ "seem" giữ nguyên mẫu và theo sau bởi "to + V": doesn’t seem to work.'
      },
      {
        id: 'u5-q3',
        unit: 5,
        type: 'fill',
        prompt: 'The new airflow vane ______ (seem) to be out of order according to the inspection log.',
        promptVi: 'Chia động từ trong ngoặc ở thì hiện tại đơn sao cho đúng với chủ ngữ số ít.',
        acceptedAnswers: ['seems'],
        displayAnswer: 'seems',
        explanationVi:
          'Chủ ngữ "The new airflow vane" là danh từ số ít nên động từ "seem" thêm "-s": seems to be out of order.'
      },
      {
        id: 'u5-q4',
        unit: 5,
        type: 'fill',
        prompt: 'It sounds as if the shipping department ______ (deliver) the wrong item yesterday.',
        promptVi: 'Chia động từ trong ngoặc theo đúng dấu hiệu thời gian "yesterday".',
        acceptedAnswers: ['delivered'],
        displayAnswer: 'delivered',
        explanationVi:
          'Trong mệnh đề sau "It sounds as if", có trạng từ "yesterday" nên động từ chia ở thì Quá khứ đơn: delivered.'
      },
      {
        id: 'u5-q5',
        unit: 5,
        type: 'mcq',
        prompt: 'Choose the grammatically correct sentence to explain a software installation issue politely.',
        promptVi: 'Chọn câu đúng ngữ pháp khi dùng động từ khuyết thiếu hoặc cấu trúc phỏng đoán lịch sự.',
        options: [
          'Your antivirus program might be preventing you from installing this software.',
          'Your antivirus program might is preventing you from installing this software.',
          'There might are too many pairs of pliers in this shipment.',
          'It looks like if you have typed the wrong activation key.'
        ],
        acceptedAnswers: ['Your antivirus program might be preventing you from installing this software.'],
        displayAnswer: 'Your antivirus program might be preventing you from installing this software.',
        explanationVi:
          'Sau "might" phải dùng động từ nguyên thể không "to" ("might be preventing"), không dùng "might is" hay "might are", và không gộp "like if".'
      },
      {
        id: 'u5-q6',
        unit: 5,
        type: 'mcq',
        prompt: 'In a formal complaint-reply email, which group of verbs belongs strictly to the formal register?',
        promptVi: 'Nhóm động từ nào thuộc văn phong trang trọng (Formal) trong email phản hồi khách hàng?',
        options: [
          'assist / inform / enquire / regret',
          'help / tell / ask / be sorry',
          'get in touch / put off / answer / need',
          'get / tell / set up / OK'
        ],
        acceptedAnswers: ['assist / inform / enquire / regret'],
        displayAnswer: 'assist / inform / enquire / regret',
        explanationVi:
          'Theo bảng đối chiếu Unit 5: assist (= help), inform (= tell), enquire (= ask), regret (= be sorry) là các động từ văn phong trang trọng.'
      },
      {
        id: 'u5-q7',
        unit: 5,
        type: 'rewrite',
        prompt: 'Rewrite the direct complaint politely using "seem": "The activation key doesn\'t work."',
        promptVi: 'Viết lại câu báo lỗi thẳng sau thành câu lịch sự dùng động từ "seem".',
        acceptedAnswers: [
          "The activation key doesn't seem to work.",
          "The activation key doesn't seem to work",
          'The activation key does not seem to work.',
          'The activation key does not seem to work'
        ],
        displayAnswer: "The activation key doesn't seem to work.",
        explanationVi:
          'Áp dụng công thức "S + doesn’t seem + to V" để chuyển nhận định trực tiếp thành câu báo lỗi nhẹ nhàng theo đúng ví dụ SGK trang 69.'
      },
      {
        id: 'u5-q8',
        unit: 5,
        type: 'rewrite',
        prompt: 'Rewrite the sentence politely starting with "It looks as if": "The fridge has stopped working."',
        promptVi: 'Viết lại câu hoàn chỉnh bắt đầu bằng "It looks as if" để diễn đạt lịch sự hơn.',
        acceptedAnswers: [
          'It looks as if the fridge has stopped working.',
          'It looks as if the fridge has stopped working'
        ],
        displayAnswer: 'It looks as if the fridge has stopped working.',
        explanationVi:
          'Cấu trúc "It looks as if + mệnh đề" giữ nguyên thì Hiện tại hoàn thành của câu gốc để phỏng đoán tình trạng thiết bị một cách mềm mỏng.'
      }
    ]
  },
  {
    unit: 6,
    title: 'Data Analysis',
    subtitleVi:
      'Ngôn ngữ dẫn chiếu biểu đồ (visual aids) & cấu trúc mô tả xu hướng (S + V + Adv ↔ There + be + Adj + N)',
    sections: [
      {
        id: 'u6-sec-1',
        title: '1. Referring to Visual Aids (Dẫn chiếu biểu đồ khi thuyết trình)',
        explanationVi:
          'Khi thuyết trình số liệu kỹ thuật (biểu đồ đường, biểu đồ cột, biểu đồ tròn), người trình bày dùng các mẫu câu chuẩn để giới thiệu biểu đồ và hướng sự chú ý của người nghe vào xu hướng chính.',
        formulas: [
          {
            label: 'Giới thiệu loại biểu đồ và chủ đề',
            pattern: "I'd like to show you / refer to + a line/bar graph which represents ...",
            example: "I'd like to refer to a bar graph which represents net sales of electronics in the first ten months.",
            translationVi: 'Tôi xin đề cập tới biểu đồ cột thể hiện doanh số ròng ngành điện tử trong mười tháng đầu năm.'
          },
          {
            label: 'Nêu nội dung minh họa của biểu đồ',
            pattern: 'This graph / chart + represents / shows / illustrates / gives information about ...',
            example: 'This line graph illustrates average yearly spending on mobile and landline services.',
            translationVi: 'Biểu đồ đường này minh họa mức chi tiêu trung bình hằng năm cho dịch vụ điện thoại di động và cố định.'
          },
          {
            label: 'Hướng sự chú ý của người nghe',
            pattern: "I'd like to draw your attention to ...  |  As you can see, ...  |  If we take a look we can see ...",
            example: 'As you can see, air-conditioner sales dropped steadily from January to July.',
            translationVi: 'Như quý vị có thể thấy, doanh số điều hòa giảm đều đặn từ tháng 1 đến tháng 7.'
          }
        ],
        notes: [
          'Luôn đi kèm giới từ "to" sau động từ refer: "refer to the second graph" (không bỏ "to").',
          'Biểu đồ đường (line graph) và biểu đồ cột nhiều mốc thời gian (bar graph) thường dùng để mô tả xu hướng (trends); biểu đồ tròn (pie chart) thường dùng với "account for / make up" để nêu tỷ trọng.'
        ]
      },
      {
        id: 'u6-sec-2',
        title: '2. Describing Trends: S + V + Adv vs. There + be + Adj + N',
        explanationVi:
          'Đây là cặp cấu trúc cốt lõi để mô tả biến động số liệu. Có thể biến đổi linh hoạt giữa hai cấu trúc bằng cách chuyển cặp Động từ–Trạng từ thành cặp Tính từ–Danh từ tương ứng.',
        formulas: [
          {
            label: 'Cấu trúc Động từ + Trạng từ',
            pattern: 'Subject + Verb + Adverb (+ from A to B / by X)',
            example: 'The number of Internet users rises sharply. / Spending dropped by nearly $200.',
            translationVi: 'Số lượng người dùng Internet tăng mạnh. / Mức chi tiêu giảm gần 200 đô la.'
          },
          {
            label: 'Cấu trúc Danh từ với There be',
            pattern: 'There + be + (a/an) + Adjective + Noun + in + Subject',
            example: 'There is a sharp rise in the number of Internet users.',
            translationVi: 'Có một sự gia tăng mạnh về số lượng người dùng Internet.'
          },
          {
            label: 'Mô tả tỷ trọng, cực trị & giai đoạn đi ngang',
            pattern: 'account for / make up + %  |  peak at ...  |  level off at ...  |  remain constant/stable at ...',
            example: 'Android OS accounts for the majority of smartphones, while iOS sales leveled off in 2014.',
            translationVi: 'Hệ điều hành Android chiếm đa số điện thoại thông minh, trong khi doanh số iOS chững lại vào năm 2014.'
          }
        ],
        notes: [
          'Danh từ của "grow" là "growth" (lưu ý không dùng cụm "grow up" cho số liệu kinh tế – kỹ thuật).',
          'Phân biệt động từ quá khứ "fell" (của fall) với danh từ "a fall": sai ~~a significant fell~~ -> đúng: a significant fall.',
          'Sau cụm "There was a/an + Adj + N" luôn dùng giới từ "in" trước đối tượng số liệu (in the lifespan of...).'
        ]
      },
      {
        id: 'u6-sec-3',
        title: '3. Direction Verbs/Nouns & Size/Speed Modifiers & Prepositions',
        explanationVi:
          'Chọn chính xác nhóm từ chỉ hướng thay đổi, mức độ/tốc độ thay đổi và giới từ đi kèm con số giúp bài mô tả biểu đồ đạt độ chính xác kỹ thuật cao.',
        formulas: [
          {
            label: 'Hướng tăng / giảm / ổn định / dao động',
            pattern: 'Up: climb, go up, increase, rise, grow (N: increase, rise, growth)  |  Down: decline, decrease, fall, go down',
            example: 'There was a steady growth in female engineering students, whereas defects fell sharply.',
            translationVi: 'Có sự tăng trưởng đều đặn ở số nữ sinh viên kỹ thuật, trong khi lỗi sản phẩm giảm mạnh.'
          },
          {
            label: 'Đi ngang & Dao động',
            pattern: 'Level: remain/stay constant/stable, not change (N: no change)  |  Other: fluctuate (N: fluctuation)',
            example: 'The supply voltage remained constant at 24 volts, while grid load fluctuated slightly.',
            translationVi: 'Điện áp nguồn giữ nguyên không đổi ở mức 24 vôn, trong khi tải lưới điện dao động nhẹ.'
          },
          {
            label: 'Mức độ & Tốc độ (Adjectives ↔ Adverbs)',
            pattern: 'Size: sharp(ly), significant(ly), slight(ly), insignificant(ly)  |  Speed: dramatic(ally), sudden(ly), gradual(ly), steady/steadily, slow(ly)',
            example: 'Storage capacity increased dramatically from 2000 to 2010.',
            translationVi: 'Dung lượng lưu trữ tăng đột biến từ năm 2000 đến năm 2010.'
          }
        ],
        notes: [
          'Giới từ đi kèm số liệu: "from A to B" (từ A tới B), "increase/drop by X" (chênh lệch thêm/bớt X), "peak at X / remain constant at X" (tại mức X).',
          'Thì của động từ theo mốc thời gian: mốc đã qua (between 2000 and 2010, last year) dùng Quá khứ đơn; kéo dài tới hiện tại (in recent years, in the last decade) dùng Hiện tại hoàn thành.'
        ]
      }
    ],
    questions: [
      {
        id: 'u6-q1',
        unit: 6,
        type: 'fill',
        prompt: "Now I'd like to refer ______ the second graph, which compares the sales of our best-selling electronic devices.",
        promptVi: 'Điền giới từ còn thiếu (1 từ) sau động từ "refer" khi dẫn chiếu biểu đồ.',
        acceptedAnswers: ['to'],
        displayAnswer: 'to',
        explanationVi:
          'Cụm động từ dẫn chiếu tài liệu trực quan trong thuyết trình luôn là "refer to + graph/chart".'
      },
      {
        id: 'u6-q2',
        unit: 6,
        type: 'mcq',
        prompt: 'Choose the correct word to fix the error in: "There was a significant fell in the number of male students between 1992 and 2002."',
        promptVi: 'Chọn từ đúng thay cho từ sai "fell" trong câu mô tả biểu đồ trên.',
        options: ['fall', 'falling', 'fallen', 'falls'],
        acceptedAnswers: ['fall'],
        displayAnswer: 'fall',
        explanationVi:
          'Sau mạo từ và tính từ "a significant" cần một danh từ số ít. "Fell" là dạng quá khứ của động từ, còn danh từ là "fall".'
      },
      {
        id: 'u6-q3',
        unit: 6,
        type: 'mcq',
        prompt: 'The number of processors produced ______ dramatically in recent years thanks to updated applications.',
        promptVi: 'Chọn cụm động từ đúng về mặt ngữ nghĩa số liệu và thì hiện tại hoàn thành.',
        options: ['has grown', 'has grown up', 'grew up', 'is grow'],
        acceptedAnswers: ['has grown'],
        displayAnswer: 'has grown',
        explanationVi:
          'Với số liệu sản lượng dùng "grow" (tăng), không dùng "grow up" (lớn lên/trưởng thành). Trạng ngữ "in recent years" đi với thì Hiện tại hoàn thành: has grown.'
      },
      {
        id: 'u6-q4',
        unit: 6,
        type: 'fill',
        prompt: "Android OS accounts ______ the majority of smartphones' operating systems shown in the pie chart.",
        promptVi: 'Điền giới từ thích hợp (1 từ) để tạo thành cụm động từ mang nghĩa "chiếm tỷ trọng".',
        acceptedAnswers: ['for'],
        displayAnswer: 'for',
        explanationVi:
          'Cụm động từ "account for" (= make up) dùng để diễn đạt tỷ lệ hoặc tỷ trọng đóng góp của một thành phần.'
      },
      {
        id: 'u6-q5',
        unit: 6,
        type: 'fill',
        prompt: 'The quantity of companies working in electrical and electronics fields has increased ______ (slight) in recent years.',
        promptVi: 'Chuyển tính từ trong ngoặc thành từ loại đúng để bổ nghĩa cho động từ "increased".',
        acceptedAnswers: ['slightly'],
        displayAnswer: 'slightly',
        explanationVi:
          'Theo cấu trúc "S + V + Adv", đứng sau động từ "increased" phải dùng trạng từ "slightly".'
      },
      {
        id: 'u6-q6',
        unit: 6,
        type: 'mcq',
        prompt: 'Which sentence has the same meaning as "There was a steady growth in the number of female engineering students"?',
        promptVi: 'Chọn câu diễn đạt lại tương đương bằng cấu trúc "S + V + Adv".',
        options: [
          'The number of female engineering students grew steadily.',
          'The number of female engineering students grew steady.',
          'The number of female engineering students growth steadily.',
          'The number of female engineering students was grown steady.'
        ],
        acceptedAnswers: ['The number of female engineering students grew steadily.'],
        displayAnswer: 'The number of female engineering students grew steadily.',
        explanationVi:
          'Tính từ "steady" chuyển thành trạng từ "steadily"; danh từ "growth" chuyển thành động từ quá khứ "grew" để khớp với "There was".'
      },
      {
        id: 'u6-q7',
        unit: 6,
        type: 'rewrite',
        prompt: 'Rewrite using "There was...": "The lifespan of these electronic devices increased significantly."',
        promptVi: 'Chuyển đổi câu sau từ cấu trúc "S + V + Adv" sang "There was + a/an + Adj + N + in...".',
        acceptedAnswers: [
          'There was a significant increase in the lifespan of these electronic devices.',
          'There was a significant increase in the lifespan of these electronic devices'
        ],
        displayAnswer: 'There was a significant increase in the lifespan of these electronic devices.',
        explanationVi:
          'Chuyển trạng từ "significantly" thành tính từ "significant", động từ "increased" thành danh từ "increase", và thêm giới từ "in" trước chủ ngữ gốc.'
      },
      {
        id: 'u6-q8',
        unit: 6,
        type: 'rewrite',
        prompt: 'Rewrite using the verb structure (S + V + Adv): "There was a sudden increase in the number of Internet users."',
        promptVi: 'Chuyển đổi câu "There was..." sau về cấu trúc "S + V + Adv".',
        acceptedAnswers: [
          'The number of Internet users increased suddenly.',
          'The number of Internet users increased suddenly',
          'The number of internet users increased suddenly.',
          'The number of internet users increased suddenly',
          'The number of Internet users rose suddenly.',
          'The number of Internet users rose suddenly',
          'The number of Internet users grew suddenly.',
          'The number of Internet users grew suddenly'
        ],
        displayAnswer: 'The number of Internet users increased suddenly.',
        explanationVi:
          'Đưa cụm danh từ sau "in" (The number of Internet users) lên làm chủ ngữ, đổi danh từ "increase" sang động từ quá khứ "increased" và tính từ "sudden" sang trạng từ "suddenly".'
      }
    ]
  },
  {
    unit: 7,
    title: 'Career Orientation',
    subtitleVi:
      'Cấu tạo từ với hậu tố (Suffixes) & ôn tập thì (Past Simple vs. Present Perfect vs. Future) trong CV và phỏng vấn',
    sections: [
      {
        id: 'u7-sec-1',
        title: '1. Noun & Verb Suffixes (Hậu tố Danh từ & Động từ chuyên ngành)',
        explanationVi:
          'Hậu tố (suffix) gắn vào cuối gốc từ để biến đổi từ loại. Nắm vững hệ thống hậu tố giúp nhận diện chính xác chức danh, thiết bị, phẩm chất nghề nghiệp và động từ hành động khi đọc JD hoặc viết CV.',
        formulas: [
          {
            label: 'Danh từ chỉ người & thiết bị (-er/-or, -ian/-ant, -ist, -eer, -ee)',
            pattern: '-er/-or: trainer, supervisor, transmitter, receiver  |  -ian/-ant: electrician, technician, applicant  |  -ist: scientist  |  -eer: engineer  |  -ee: interviewee, employee',
            example: 'John is responsible for the operation and supervision of the assembly lines.',
            translationVi: 'John chịu trách nhiệm vận hành và giám sát các dây chuyền lắp ráp.'
          },
          {
            label: 'Danh từ lĩnh vực, hành động & phẩm chất (-ics, -ion/-tion, -ment, -ity/-ness, -ship)',
            pattern: '-ics: electronics, mechanics  |  -ion/-tion/-ation: production, inspection, transmission  |  -ment: management, achievement  |  -ity/-ness: productivity, happiness  |  -ship: leadership',
            example: 'Leading the university Robocon team strengthened my leadership and project management skills.',
            translationVi: 'Việc dẫn dắt đội Robocon của trường đã củng cố kỹ năng lãnh đạo và quản lý dự án của tôi.'
          },
          {
            label: 'Hậu tố Động từ (-en, -ify, -ize)',
            pattern: '-en: soften, harden  |  -ify: identify, simplify  |  -ize: industrialize, modernize',
            example: 'Engineers aim to simplify fault diagnosis and modernize factory power panels.',
            translationVi: 'Các kỹ sư hướng tới đơn giản hóa việc chẩn đoán lỗi và hiện đại hóa tủ điện nhà máy.'
          }
        ],
        notes: [
          'Phân biệt cặp hậu tố chỉ vai trò: "-er/-or" là người/thiết bị thực hiện (interviewer, transmitter); "-ee" là người tiếp nhận (interviewee, employee).',
          'Các từ chỉ ngành học kết thúc bằng "-ics" (electronics, mechanics) chia động từ số ít khi nói về môn học hoặc lĩnh vực.'
        ]
      },
      {
        id: 'u7-sec-2',
        title: '2. Adjective & Adverb Suffixes (Hậu tố Tính từ & Trạng từ mô tả năng lực)',
        explanationVi:
          'Chọn đúng hậu tố tính từ và trạng từ giúp mô tả chính xác phẩm chất bản thân, trình độ chuyên môn và môi trường làm việc mục tiêu trong CV hoặc phỏng vấn.',
        formulas: [
          {
            label: 'Tính từ (-ing/-ed, -able/-ible, -al/-ial, -ic)',
            pattern: '-ing: interesting, exciting  |  -ed: interested, qualified  |  -able/-ible: manageable, responsible  |  -al/-ial: electrical, technical, mechanical  |  -ic: enthusiastic',
            example: 'Jane is an ideal candidate because she is enthusiastic and qualified.',
            translationVi: 'Jane là ứng viên lý tưởng vì cô ấy nhiệt huyết và có đầy đủ bằng cấp chuyên môn.'
          },
          {
            label: 'Tính từ (-ful, -ive/-ative, -ous/-ious, -less)',
            pattern: '-ful: thoughtful, cheerful  |  -ive/-ative: creative, imaginative, innovative  |  -ous/-ious: ambitious, studious  |  -less: useless, careless',
            example: 'He wants to work in a professional and dynamic environment.',
            translationVi: 'Anh ấy muốn làm việc trong một môi trường chuyên nghiệp và năng động.'
          },
          {
            label: 'Hậu tố Trạng từ (-ly)',
            pattern: 'Adjective + -ly -> Adverb (happily, creatively, effectively)',
            example: 'She tested the transmitters and receivers accurately before shipment.',
            translationVi: 'Cô ấy đã kiểm tra chính xác các bộ phát và bộ thu trước khi xuất hàng.'
          }
        ],
        notes: [
          'Khi nối hai từ bằng "and", phải giữ song song cùng từ loại: "enthusiastic and qualified" (cùng Adj, không dùng ~~qualification~~); "diagnosing and evaluating" (cùng V-ing sau giới từ for).'
        ]
      },
      {
        id: 'u7-sec-3',
        title: '3. Tenses Review in CV & Interview (Quá khứ đơn, Hiện tại hoàn thành & Tương lai)',
        explanationVi:
          'Phân biệt rạch ròi các thì giúp nhà tuyển dụng nắm chính xác mốc học vấn/kinh nghiệm đã kết thúc, năng lực tích luỹ tới hiện tại và định hướng phát triển tương lai.',
        formulas: [
          {
            label: 'Quá khứ đơn (Past Simple) – Mốc thời gian đã kết thúc',
            pattern: 'S + was/were  |  S + V-ed / V2  (last, ago, in 2016, from 2012 to 2016, when I was...)',
            example: 'I studied at Hanoi University of Industry from 2012 to 2016 and worked in China for a year.',
            translationVi: 'Tôi học tại Đại học Công nghiệp Hà Nội từ 2012 đến 2016 và từng làm việc tại Trung Quốc một năm.'
          },
          {
            label: 'Hiện tại hoàn thành (Present Perfect) – Kéo dài tới hiện tại / Kinh nghiệm',
            pattern: 'S + have/has + P2  (for + khoảng thời gian tới nay, since, so far, recently, yet, ever)',
            example: 'I got a Master’s degree in 2010 and I have worked as an electrical engineer since then.',
            translationVi: 'Tôi lấy bằng Thạc sĩ năm 2010 và đã làm kỹ sư điện kể từ đó đến nay.'
          },
          {
            label: 'Định hướng tương lai (Future & Career Objectives)',
            pattern: 'would like to + V  |  hope to + V  |  plan to + V  |  will + V',
            example: 'For my long-term plan, I would like to lead a technical team and contribute to automation projects.',
            translationVi: 'Với kế hoạch dài hạn, tôi mong muốn dẫn dắt một nhóm kỹ thuật và đóng góp vào các dự án tự động hóa.'
          }
        ],
        notes: [
          'Cẩn thận với giới từ "for": nếu hành động đã chấm dứt trong quá khứ dùng Past Simple ("worked in China for a year, then went to Japan"); nếu vẫn đang tiếp diễn tới nay dùng Present Perfect ("have worked here for 5 years").',
          'Không dùng Present Perfect khi trong câu đã có mốc thời gian quá khứ xác định như "last summer" hay "in 2015".'
        ]
      }
    ],
    questions: [
      {
        id: 'u7-q1',
        unit: 7,
        type: 'mcq',
        prompt: 'Jane should be an ideal candidate for the position because she is enthusiastic and ______.',
        promptVi: 'Chọn dạng từ đúng (tính từ song song với "enthusiastic") theo bảng hậu tố Unit 7.',
        options: ['qualified', 'qualification', 'qualify', 'qualifying'],
        acceptedAnswers: ['qualified'],
        displayAnswer: 'qualified',
        explanationVi:
          'Liên từ "and" nối hai tính từ song song sau động từ "is": "enthusiastic" (tính từ) và "qualified" (tính từ đuôi -ed nghĩa là đủ trình độ chuyên môn).'
      },
      {
        id: 'u7-q2',
        unit: 7,
        type: 'fill',
        prompt: 'John is responsible for the ______ (operate) and supervision of the assembly lines.',
        promptVi: 'Biến đổi động từ trong ngoặc thành danh từ có hậu tố thích hợp.',
        acceptedAnswers: ['operation'],
        displayAnswer: 'operation',
        explanationVi:
          'Sau mạo từ "the" và song song với danh từ "supervision" cần danh từ kết thúc bằng hậu tố "-tion": operation (sự vận hành).'
      },
      {
        id: 'u7-q3',
        unit: 7,
        type: 'mcq',
        prompt: 'Choose the correct pair of words: "He wants to work in a ______ and dynamic environment where he can ______ testing workflows."',
        promptVi: 'Chọn cặp Tính từ (đuôi -al) và Động từ (đuôi -ify) phù hợp nhất.',
        options: [
          'professional / simplify',
          'profession / simple',
          'professionally / simplify',
          'professional / simple'
        ],
        acceptedAnswers: ['professional / simplify'],
        displayAnswer: 'professional / simplify',
        explanationVi:
          'Trước danh từ "environment" cần tính từ "professional"; sau động từ khuyết thiếu "can" cần động từ hậu tố "-ify": simplify (đơn giản hóa).'
      },
      {
        id: 'u7-q4',
        unit: 7,
        type: 'fill',
        prompt: 'I ______ (study) at Hanoi University of Industry from 2012 to 2016.',
        promptVi: 'Chia động từ trong ngoặc theo đúng thì của mốc thời gian đã hoàn tất.',
        acceptedAnswers: ['studied'],
        displayAnswer: 'studied',
        explanationVi:
          'Giai đoạn "from 2012 to 2016" đã kết thúc hoàn toàn trong quá khứ nên chia ở thì Quá khứ đơn: studied.'
      },
      {
        id: 'u7-q5',
        unit: 7,
        type: 'fill',
        prompt: "I got a Master's degree in electrical engineering in 2010 and I ______ (work) as an electrical engineer since then.",
        promptVi: 'Chia động từ trong ngoặc (dạng đầy đủ, không viết tắt) với dấu hiệu "since then".',
        acceptedAnswers: ['have worked', "I've worked", 'have been working'],
        displayAnswer: 'have worked',
        explanationVi:
          'Cụm từ "since then" (kể từ lúc đó tới hiện tại) đi với thì Hiện tại hoàn thành: have worked.'
      },
      {
        id: 'u7-q6',
        unit: 7,
        type: 'mcq',
        prompt: 'In my previous job, I was responsible for ______ and ______ malfunctioning systems.',
        promptVi: 'Chọn cặp dạng động từ đúng sau giới từ "for".',
        options: [
          'diagnosing / evaluating',
          'diagnosing / evaluate',
          'diagnose / evaluating',
          'diagnosed / evaluated'
        ],
        acceptedAnswers: ['diagnosing / evaluating'],
        displayAnswer: 'diagnosing / evaluating',
        explanationVi:
          'Sau giới từ "responsible for" dùng danh động từ V-ing, đồng thời hai động từ nối bằng "and" phải chia song song: diagnosing / evaluating.'
      },
      {
        id: 'u7-q7',
        unit: 7,
        type: 'rewrite',
        prompt: 'Correct the tense error and rewrite the full sentence: "I work as a leader in my Robot club when I was at high school."',
        promptVi: 'Sửa lỗi thì động từ và viết lại cả câu hoàn chỉnh đúng ngữ pháp.',
        acceptedAnswers: [
          'I worked as a leader in my Robot club when I was at high school.',
          'I worked as a leader in my Robot club when I was at high school',
          'I worked as a leader in my robot club when I was at high school.',
          'I worked as a leader in my robot club when I was at high school'
        ],
        displayAnswer: 'I worked as a leader in my Robot club when I was at high school.',
        explanationVi:
          'Mệnh đề "when I was at high school" chỉ mốc thời gian trong quá khứ nên động từ "work" phải chia ở thì Quá khứ đơn là "worked".'
      },
      {
        id: 'u7-q8',
        unit: 7,
        type: 'rewrite',
        prompt: 'Rewrite using the Present Perfect with "since 2022": "I started working as a maintenance technician in 2022, and I still work there."',
        promptVi: 'Viết lại câu bằng thì Hiện tại hoàn thành kết hợp "since 2022".',
        acceptedAnswers: [
          'I have worked as a maintenance technician since 2022.',
          'I have worked as a maintenance technician since 2022',
          "I've worked as a maintenance technician since 2022.",
          "I've worked as a maintenance technician since 2022",
          'I have been working as a maintenance technician since 2022.',
          'I have been working as a maintenance technician since 2022'
        ],
        displayAnswer: 'I have worked as a maintenance technician since 2022.',
        explanationVi:
          'Hành động bắt đầu trong quá khứ (2022) và vẫn tiếp diễn ở hiện tại được diễn đạt bằng Present Perfect + "since 2022".'
      }
    ]
  },
  {
    unit: 8,
    title: 'Meetings and discussion',
    subtitleVi:
      'Đề xuất (Should + V), Gerund & To-infinitive, Mệnh đề danh ngữ (Noun Clauses) & Ngôn ngữ điều phối cuộc họp',
    sections: [
      {
        id: 'u8-sec-1',
        title: '1. Suggestions (Should + V) & Gerunds vs. Infinitives',
        explanationVi:
          'Trong cuộc họp kỹ thuật, ta dùng "should + V" để đưa ra lời khuyên/đề xuất, "to-infinitive" để nêu mục đích cuộc họp hoặc đi sau động từ chỉ quyết định/ý định, và Gerund (V-ing) sau giới từ phân công nhiệm vụ.',
        formulas: [
          {
            label: 'Đề xuất và lời khuyên trong họp',
            pattern: 'S + should (not) + V (infinitive)',
            example: 'In my opinion, we should maintain the indoor unit of the air-conditioner system regularly.',
            translationVi: 'Theo ý kiến của tôi, chúng ta nên bảo trì dàn lạnh của hệ thống điều hòa định kỳ.'
          },
          {
            label: 'To-infinitive chỉ mục đích & sau động từ ý định',
            pattern: 'to + V (trả lời "Why?")  |  choose / decide / expect / hope / intend / plan / want / would like + to + V',
            example: 'We are here today to discuss how to maintain the electrical system. / We have decided to expand the scheme.',
            translationVi: 'Hôm nay chúng ta có mặt để thảo luận cách bảo trì hệ thống điện. / Chúng tôi đã quyết định mở rộng phương án.'
          },
          {
            label: 'Gerund (V-ing) sau giới từ',
            pattern: 'be in charge of / be responsible for / What about / apologize for + V-ing',
            example: 'Mr. Chang was in charge of taking the minutes of the meeting last week.',
            translationVi: 'Ông Chang đã phụ trách việc ghi biên bản cuộc họp tuần trước.'
          }
        ],
        notes: [
          'Cẩn thận giới từ đi kèm: "in charge of + V-ing" và "responsible for + V-ing" (không viết ~~responsible of~~).',
          'Sau "What about" hoặc giới từ luôn dùng V-ing: "What about installing the new condenser?"; sau "should" là V nguyên thể không "to".'
        ]
      },
      {
        id: 'u8-sec-2',
        title: '2. Noun Clauses (Mệnh đề danh ngữ làm Chủ ngữ & Bổ ngữ)',
        explanationVi:
          'Mệnh đề danh ngữ (gồm chủ ngữ + động từ, hoặc cụm từ để hỏi + to-V) hoạt động như một danh từ trong câu để nhấn mạnh mục tiêu cuộc họp hoặc tổng kết quyết định chung.',
        formulas: [
          {
            label: 'Mệnh đề danh ngữ làm Chủ ngữ (Subject)',
            pattern: 'What + S + V + is/are + (to) V / Adj / Noun',
            example: 'What we decide to do is to change the logo of the company. / What you are talking about is very interesting!',
            translationVi: 'Điều chúng ta quyết định làm là thay đổi biểu trưng của công ty. / Điều bạn đang nói rất thú vị!'
          },
          {
            label: 'Mệnh đề danh ngữ làm Bổ ngữ chủ ngữ (Subject Complement)',
            pattern: 'The main content / objective / reason ... + is + to V / how to V / that + S + V',
            example: 'The main content of the meeting is how to deal with complaints of the customers.',
            translationVi: 'Nội dung chính của cuộc họp là cách xử lý các khiếu nại từ khách hàng.'
          }
        ],
        notes: [
          'Mệnh đề danh ngữ đứng đầu làm chủ ngữ luôn đi với động từ chia ở ngôi thứ ba số ít ("is", "was").',
          'Sau "The reason/objective is..." dùng "to + V nguyên thể" (sai: ~~is to discussing~~ -> đúng: is to discuss).'
        ]
      },
      {
        id: 'u8-sec-3',
        title: '3. Formal Meeting Expressions (Ngôn ngữ điều phối cuộc họp)',
        explanationVi:
          'Bộ mẫu câu chuẩn giúp kỹ sư nêu quan điểm rõ ràng, ngắt lời lịch sự khi cần bổ sung lưu ý an toàn, xử lý khi bị chen ngang, đồng thuận/phản biện và chốt action points.',
        formulas: [
          {
            label: 'Nêu ý kiến & Ngắt lời lịch sự',
            pattern: "Give opinion: My point is... / In my opinion,... / I'm positive that...  |  Interrupt: Sorry to interrupt you... / I apologize for interrupting, but... / May I have a word?",
            example: 'I apologize for interrupting, but the very first thing we should do is cut power to the unit.',
            translationVi: 'Tôi xin lỗi vì đã ngắt lời, nhưng việc đầu tiên chúng ta cần làm là cắt nguồn điện tới thiết bị.'
          },
          {
            label: 'Xử lý ngắt lời (Tạm hoãn hoặc Cho phép)',
            pattern: "Hold: Hold on, please. / Just a second, please. I promise we'll come right back to you.  |  Accept: Over to you! / Sure, go ahead!",
            example: "Just a second, please. Let me finish this safety point, and we'll come right back to you.",
            translationVi: 'Xin vui lòng đợi một chút. Để tôi nói nốt ý an toàn này rồi sẽ quay lại ý kiến của bạn ngay.'
          },
          {
            label: 'Đồng ý / Phản đối / Đề xuất & Chốt quyết định',
            pattern: "Agree: I couldn't agree with you more.  |  Disagree: I'm afraid I can't agree with you there.  |  Confirm: So, to sum up, what we decide is... / We've decided to...",
            example: "So, to sum up, what we decided is to clean the drain line and verify the thermostat.",
            translationVi: 'Vậy tổng kết lại, điều chúng ta quyết định là vệ sinh đường ống thoát nước và kiểm tra bộ điều nhiệt.'
          }
        ],
        notes: [
          'Dùng cụm cố định "In my opinion,..." (KHÔNG dùng ~~From my opinion~~).',
          'Khi phản biện ý kiến trong họp kỹ thuật, dùng "I’m afraid I can’t agree with you there" để giữ thái độ tôn trọng và chuyên nghiệp.'
        ]
      }
    ],
    questions: [
      {
        id: 'u8-q1',
        unit: 8,
        type: 'fill',
        prompt: 'We are here today ______ (discuss) how to deal with recurring complaints from our industrial customers.',
        promptVi: 'Chia động từ trong ngoặc theo cấu trúc chỉ mục đích của cuộc họp.',
        acceptedAnswers: ['to discuss'],
        displayAnswer: 'to discuss',
        explanationVi:
          'Dùng động từ nguyên mẫu có "to" (to-infinitive) để diễn tả mục đích cuộc họp (trả lời câu hỏi "Why are we here?").'
      },
      {
        id: 'u8-q2',
        unit: 8,
        type: 'fill',
        prompt: 'Who is going to be in charge of ______ (take) the minutes of the technical meeting today?',
        promptVi: 'Chia động từ trong ngoặc sau giới từ "of" trong cụm "in charge of".',
        acceptedAnswers: ['taking'],
        displayAnswer: 'taking',
        explanationVi:
          'Sau giới từ ("in charge of") bắt buộc dùng danh động từ Gerund (V-ing): taking the minutes.'
      },
      {
        id: 'u8-q3',
        unit: 8,
        type: 'mcq',
        prompt: 'Choose the correct form to fix the underlined error: "The reason we are at the meeting today is to discussing how to improve our customer services."',
        promptVi: 'Chọn đáp án sửa đúng cho phần sai "to discussing".',
        options: ['to discuss', 'discussing', 'for discuss', 'discussed'],
        acceptedAnswers: ['to discuss'],
        displayAnswer: 'to discuss',
        explanationVi:
          'Sau động từ to be khi nêu mục đích dùng "to + V nguyên thể" (to discuss), không bao giờ dùng "to + V-ing" trong cấu trúc này.'
      },
      {
        id: 'u8-q4',
        unit: 8,
        type: 'mcq',
        prompt: 'Which sentence is grammatically accurate during a technical discussion?',
        promptVi: 'Chọn câu đúng cả về cấu trúc đề xuất lẫn giới từ/động từ khuyết thiếu.',
        options: [
          'What about installing the new air-conditioner system instead of contracting it out?',
          'What about install the new air-conditioner system instead of contracting it out?',
          'In my opinion, we should not giving refunds without a receipt.',
          'From my opinion, we should maintain the indoor unit regularly.'
        ],
        acceptedAnswers: ['What about installing the new air-conditioner system instead of contracting it out?'],
        displayAnswer: 'What about installing the new air-conditioner system instead of contracting it out?',
        explanationVi:
          'Sau giới từ "about" dùng V-ing ("installing"); "should" đi với V nguyên thể (không dùng "should not giving"), và cụm đúng là "In my opinion" (không dùng "From my opinion").'
      },
      {
        id: 'u8-q5',
        unit: 8,
        type: 'mcq',
        prompt: 'A colleague interrupts while you are explaining an electrical lockout step, and you want them to wait briefly. Which expression is best?',
        promptVi: 'Chọn mẫu câu xử lý khi bị ngắt lời nhằm đề nghị đồng nghiệp chờ một chút.',
        options: [
          "Just a second, please. I promise we'll come right back to you.",
          "I'm afraid I can't agree with you there.",
          'So, to sum up, what we decide is to expand the scheme.',
          "I couldn't agree with you more."
        ],
        acceptedAnswers: ["Just a second, please. I promise we'll come right back to you."],
        displayAnswer: "Just a second, please. I promise we'll come right back to you.",
        explanationVi:
          'Mẫu câu "Just a second, please. I promise we’ll come right back to you." dùng để tạm hoãn sự ngắt lời một cách lịch sự trong Unit 8.'
      },
      {
        id: 'u8-q6',
        unit: 8,
        type: 'fill',
        prompt: "I apologize for ______ (interrupt) you, but I'm positive that we must cut power before rinsing the condenser coils.",
        promptVi: 'Chia động từ trong ngoặc theo đúng mẫu câu ngắt lời lịch sự Unit 8.',
        acceptedAnswers: ['interrupting'],
        displayAnswer: 'interrupting',
        explanationVi:
          'Sau giới từ "for" trong mẫu câu "I apologize for..." phải dùng Gerund (V-ing): interrupting.'
      },
      {
        id: 'u8-q7',
        unit: 8,
        type: 'rewrite',
        prompt: 'Rewrite using "objective": "The reason we are at the meeting today is to discuss how to change the slogan of our department."',
        promptVi: 'Viết lại câu sử dụng danh từ "objective" làm chủ ngữ mở đầu câu.',
        acceptedAnswers: [
          'The objective of the meeting today is to discuss how to change the slogan of our department.',
          'The objective of the meeting today is to discuss how to change the slogan of our department',
          'The objective of our meeting today is to discuss how to change the slogan of our department.',
          'The objective of our meeting today is to discuss how to change the slogan of our department',
          'Our objective today is to discuss how to change the slogan of our department.',
          'Our objective today is to discuss how to change the slogan of our department'
        ],
        displayAnswer: 'The objective of the meeting today is to discuss how to change the slogan of our department.',
        explanationVi:
          'Thay thế "The reason we are at the meeting" bằng "The objective of the meeting", giữ nguyên phần bổ ngữ "is to discuss how to..." theo bài tập Writing Practice 1 (Unit 8).'
      },
      {
        id: 'u8-q8',
        unit: 8,
        type: 'rewrite',
        prompt: 'Rewrite using a Noun Clause starting with "What we decided to do is": "We decided to replace the clogged drain line and clean the indoor filters."',
        promptVi: 'Viết lại câu chốt quyết định bằng Mệnh đề danh ngữ bắt đầu với "What we decided to do is".',
        acceptedAnswers: [
          'What we decided to do is to replace the clogged drain line and clean the indoor filters.',
          'What we decided to do is to replace the clogged drain line and clean the indoor filters',
          'What we decided to do is replace the clogged drain line and clean the indoor filters.',
          'What we decided to do is replace the clogged drain line and clean the indoor filters',
          'What we decided to do is to replace the clogged drain line and to clean the indoor filters.',
          'What we decided to do is to replace the clogged drain line and to clean the indoor filters'
        ],
        displayAnswer: 'What we decided to do is to replace the clogged drain line and clean the indoor filters.',
        explanationVi:
          'Đưa mệnh đề danh ngữ "What we decided to do" lên làm chủ ngữ, theo sau là động từ số ít "is" và cụm động từ nguyên mẫu chỉ quyết định được chốt.'
      }
    ]
  }
];
